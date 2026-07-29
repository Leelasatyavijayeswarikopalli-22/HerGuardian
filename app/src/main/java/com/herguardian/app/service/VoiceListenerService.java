package com.herguardian.app.service;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.res.AssetManager;
import android.os.IBinder;
import android.os.PowerManager;
import android.os.Vibrator;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.herguardian.app.MainActivity;
import com.herguardian.app.R;
import com.herguardian.app.util.SessionManager;

import org.vosk.Model;
import org.vosk.Recognizer;
import org.vosk.android.RecognitionListener;
import org.vosk.android.SpeechService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * ══════════════════════════════════════════════════════════
 *  VoiceListenerService
 *  ───────────────────────────────────────────────────────
 *  RUNS 24/7 — even when screen is OFF
 *
 *  Listens for:
 *  1. User's personal voicePhrase (from your User entity)
 *  2. Standard SOS triggers (help me, danger, etc.)
 *
 *  On detection:
 *  → Shows SOS notification
 *  → Vibrates device
 *  → Sends broadcast to MainActivity
 *    (MainActivity tells your React app via JS Bridge)
 * ══════════════════════════════════════════════════════════
 */
public class VoiceListenerService extends Service
        implements RecognitionListener {

    private static final String TAG        = "VoiceListenerService";
    public  static final String CHANNEL_ID = "HerGuardianVoiceChannel";
    public  static final int    NOTIF_ID   = 1001;

    // ── Vosk offline speech engine ──
    private SpeechService speechService;
    private Model         voskModel;

    // ── WakeLock — keeps CPU alive when screen is off ──
    private PowerManager.WakeLock wakeLock;

    // ── Session — reads voicePhrase stored after login ──
    private SessionManager sessionManager;

    // ── SOS cooldown (prevent multiple triggers) ──
    private long lastSosTriggerTime = 0;
    private static final long SOS_COOLDOWN_MS = 10_000; // 10 seconds

    // ══════════════════════════════════════════════
    //  Standard SOS phrases
    //  (same as your React app's triggers array)
    // ══════════════════════════════════════════════
    private static final String[] STANDARD_TRIGGERS = {
            "help me",
            "danger",
            "emergency",
            "save me",
            "sos",
            "please help",
            "i am scared",
            "someone follows me",
            "someone is following me"
    };

    // ════════════════════════════════
    //  onCreate — service starts here
    // ════════════════════════════════
    @Override
    public void onCreate() {
        super.onCreate();

        sessionManager = new SessionManager(this);

        // ── Acquire WakeLock so CPU stays on with screen off ──
        PowerManager pm =
                (PowerManager) getSystemService(Context.POWER_SERVICE);
        wakeLock = pm.newWakeLock(
                PowerManager.PARTIAL_WAKE_LOCK,
                "HerGuardian:VoiceWakeLock"
        );
        wakeLock.acquire();

        // ── Must call startForeground immediately ──
        createNotificationChannel();
        startForeground(NOTIF_ID, buildPersistentNotification());

        // ── Initialize Vosk on background thread ──
        new Thread(this::initVosk).start();

        Log.d(TAG, "✅ VoiceListenerService started");
    }

    // ════════════════════════════════════════════════
    //  Init Vosk model
    //  Model must be in: app/src/main/assets/model/
    // ════════════════════════════════════════════════
    private void initVosk() {
        try {
            // 1) Copy model from assets/model -> app internal storage (files/model)
            ensureModelExtracted();

            // 2) Load Vosk model from file path (NOT from Context+String)
            File modelDir = new File(getFilesDir(), "model");
            voskModel = new Model(modelDir.getAbsolutePath());

            // 3) Create recognizer
            Recognizer recognizer = new Recognizer(voskModel, 16000.0f);

            // 4) Create speech service (constructor: SpeechService(Recognizer, float))
            speechService = new SpeechService(recognizer, 16000.0f);

            // 5) Start listening
            speechService.startListening(this);

            Log.d(TAG, "✅ Vosk recognition started");

        } catch (Exception e) {
            Log.e(TAG, "❌ Vosk model failed: " + e.getMessage(), e);
        }
    }
    private void ensureModelExtracted() throws IOException {
        File modelDir = new File(getFilesDir(), "model");

        // If already extracted once, skip (saves time)
        if (modelDir.exists() && modelDir.listFiles() != null && modelDir.listFiles().length > 0) {
            return;
        }

        copyAssetFolder("model", modelDir);
    }

    private void copyAssetFolder(String assetPath, File targetDir) throws IOException {
        AssetManager assetManager = getAssets();
        if (!targetDir.exists()) targetDir.mkdirs();

        String[] items = assetManager.list(assetPath);
        if (items == null) return;

        for (String item : items) {
            String newAssetPath = assetPath + "/" + item;
            File newTargetFile = new File(targetDir, item);

            String[] children = assetManager.list(newAssetPath);

            if (children != null && children.length > 0) {
                // directory
                copyAssetFolder(newAssetPath, newTargetFile);
            } else {
                // file
                copyAssetFile(newAssetPath, newTargetFile);
            }
        }
    }

    private void copyAssetFile(String assetFilePath, File outFile) throws IOException {
        AssetManager assetManager = getAssets();

        try (InputStream in = assetManager.open(assetFilePath);
             FileOutputStream out = new FileOutputStream(outFile)) {

            byte[] buffer = new byte[4096];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
        }
    }
    // ════════════════════════════════════════════════
    //  RecognitionListener callbacks
    // ════════════════════════════════════════════════

    @Override
    public void onResult(String hypothesis) {
        if (hypothesis == null) return;
        Log.d(TAG, "Result: " + hypothesis);
        // Vosk returns JSON: {"text": "the spoken words"}
        processSpokenText(hypothesis);
    }

    @Override
    public void onPartialResult(String hypothesis) {
        if (hypothesis == null) return;
        // Check partial results too for faster response
        processSpokenText(hypothesis);
    }

    @Override
    public void onFinalResult(String hypothesis) {
        // handled in onResult
    }

    @Override
    public void onError(Exception e) {
        Log.e(TAG, "Speech error: " + e.getMessage());
        restartListening();
    }

    @Override
    public void onTimeout() {
        // Keep restarting so it listens forever
        restartListening();
    }

    // ════════════════════════════════════════════════
    //  Core logic — check spoken text against:
    //  1. User's personal voicePhrase
    //  2. Standard SOS triggers
    // ════════════════════════════════════════════════
    private void processSpokenText(String hypothesis) {

        // Convert to lowercase for comparison
        String spokenText = hypothesis.toLowerCase();

        // ── SOS cooldown check ──
        long now = System.currentTimeMillis();
        if (now - lastSosTriggerTime < SOS_COOLDOWN_MS) return;

        // ── 1. Check personal voice phrase from your User entity ──
        //  SessionManager reads the voicePhrase saved after login
        String personalPhrase = sessionManager.getVoicePhrase();

        if (!personalPhrase.isEmpty()
                && spokenText.contains(personalPhrase)) {

            Log.d(TAG, "🚨 PERSONAL PHRASE DETECTED: " + personalPhrase);
            lastSosTriggerTime = now;
            activateSOS("Personal phrase detected");
            return;
        }

        // ── 2. Check standard triggers ──
        for (String trigger : STANDARD_TRIGGERS) {
            if (spokenText.contains(trigger)) {
                Log.d(TAG, "🚨 TRIGGER DETECTED: " + trigger);
                lastSosTriggerTime = now;
                activateSOS("Trigger: " + trigger);
                return;
            }
        }
    }

    // ════════════════════════════════════════════════
    //  SOS Activation
    //  → Notifies your React app via broadcast
    //  → React app handles emergency contact logic
    // ════════════════════════════════════════════════
    private void activateSOS(String reason) {
        Log.d(TAG, "🚨 SOS ACTIVATED — " + reason);

        // ── 1. Show SOS notification (visible on lock screen) ──
        showSOSNotification(reason);

        // ── 2. Vibrate the device ──
        vibrateDevice();

        // ── 3. Send broadcast to MainActivity ──
        //  MainActivity will call JS bridge to trigger
        //  your React app's activateSOS() function
        Intent sosIntent = new Intent("com.herguardian.SOS_TRIGGERED");
        sosIntent.putExtra("reason", reason);
        sosIntent.putExtra("email", sessionManager.getEmail());
        // Pass emergency contacts so React app can notify them
        sosIntent.putExtra("contact1", sessionManager.getEmergencyContact1());
        sosIntent.putExtra("contact2", sessionManager.getEmergencyContact2());
        sosIntent.putExtra("contact3", sessionManager.getEmergencyContact3());
        sendBroadcast(sosIntent);
    }

    // ════════════════════════════════════════════════
    //  Show high-priority SOS notification
    //  (visible even on lock screen)
    // ════════════════════════════════════════════════
    private void showSOSNotification(String reason) {
        NotificationManager nm =
                (NotificationManager) getSystemService(
                        Context.NOTIFICATION_SERVICE);

        // Tap notification → open app
        Intent intent = new Intent(this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_CLEAR_TASK);

        PendingIntent pendingIntent = PendingIntent.getActivity(
                this, 0, intent,
                PendingIntent.FLAG_IMMUTABLE
        );

        Notification sosNotif = new NotificationCompat
                .Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_dialog_alert)
                .setContentTitle("🚨 HerGuardian SOS ACTIVATED")
                .setContentText("Emergency contacts are being notified!")
                .setStyle(new NotificationCompat.BigTextStyle()
                        .bigText("SOS triggered: " + reason
                                + "\nEmergency contacts are being notified!"))
                .setPriority(NotificationCompat.PRIORITY_MAX)
                .setCategory(NotificationCompat.CATEGORY_ALARM)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(pendingIntent)
                .setAutoCancel(false)
                .build();

        nm.notify(1002, sosNotif);
    }

    // ════════════════════════════════════════════════
    //  Persistent notification (required for service)
    // ════════════════════════════════════════════════
    private Notification buildPersistentNotification() {

        // Tap → open app
        Intent intent = new Intent(this, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(
                this, 0, intent,
                PendingIntent.FLAG_IMMUTABLE
        );

        String phraseStatus = sessionManager.getVoicePhrase().isEmpty()
                ? "Waiting for login..."
                : "Personal phrase active ✓";

        return new NotificationCompat.Builder(this, CHANNEL_ID)
                .setSmallIcon(android.R.drawable.ic_lock_silent_mode_off)
                .setContentTitle("HerGuardian Active 🛡️")
                .setContentText(phraseStatus)
                .setPriority(NotificationCompat.PRIORITY_LOW)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setContentIntent(pendingIntent)
                .setOngoing(true)    // cannot be swiped away
                .setSilent(true)     // no sound
                .build();
    }

    private void createNotificationChannel() {
        NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "HerGuardian Protection",
                NotificationManager.IMPORTANCE_LOW
        );
        channel.setDescription(
                "HerGuardian is listening for your safety");
        channel.setShowBadge(false);

        NotificationManager nm =
                (NotificationManager) getSystemService(
                        Context.NOTIFICATION_SERVICE);
        nm.createNotificationChannel(channel);
    }

    private void vibrateDevice() {
        Vibrator vibrator =
                (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        if (vibrator != null && vibrator.hasVibrator()) {
            // SOS pattern: ... --- ...
            long[] pattern = {
                    0, 200, 100, 200, 100, 200,  // ...
                    300,                           // pause
                    500, 100, 500, 100, 500,       // ---
                    300,                           // pause
                    200, 100, 200, 100, 200        // ...
            };
            vibrator.vibrate(pattern, -1);
        }
    }

    private void restartListening() {
        if (speechService != null) {
            try {
                speechService.cancel();
                speechService.startListening(this);
            } catch (Exception e) {
                Log.e(TAG, "Restart failed: " + e.getMessage());
            }
        }
    }

    // ════════════════════════════════════════════════
    //  Service lifecycle
    // ════════════════════════════════════════════════

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // START_STICKY → Android restarts this if killed
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        if (speechService != null) {
            speechService.stop();
            speechService.shutdown();
        }
        if (voskModel != null) {
            voskModel.close();
        }
        if (wakeLock != null && wakeLock.isHeld()) {
            wakeLock.release();
        }

        Log.d(TAG, "VoiceListenerService destroyed");
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}