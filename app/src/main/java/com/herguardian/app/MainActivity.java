package com.herguardian.app;
import android.annotation.SuppressLint;
import android.content.Context;
import android.Manifest;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;

import com.herguardian.app.model.SecretPhraseResponse;
import com.herguardian.app.network.ApiClient;
import com.herguardian.app.network.ApiService;
import com.herguardian.app.service.VoiceListenerService;
import com.herguardian.app.util.SessionManager;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private WebView webView;
    private SessionManager sessionManager;

    // ══════════════════════════════════════════════
    //  Listen for SOS broadcast from VoiceService
    //  → tells React app to show SOS alert
    // ══════════════════════════════════════════════
    private final BroadcastReceiver sosReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {

            String contact1 = intent.getStringExtra("contact1");
            String contact2 = intent.getStringExtra("contact2");
            String contact3 = intent.getStringExtra("contact3");

            Log.d(TAG, "SOS broadcast received");

            // ── Tell React app to activate SOS ──
            // This calls window.onAndroidSOS() in your React app
            runOnUiThread(() -> {
                String js = String.format(
                        "window.onAndroidSOS('%s','%s','%s');",
                        contact1 != null ? contact1 : "",
                        contact2 != null ? contact2 : "",
                        contact3 != null ? contact3 : ""
                );
                webView.evaluateJavascript(js, null);
            });
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        sessionManager = new SessionManager(this);
        webView = findViewById(R.id.webView);

        setupWebView();
        requestPermissions();
        registerSOSReceiver();
    }

    // ══════════════════════════════════════════════
    //  WebView Setup
    //  Loads your existing React web app
    // ══════════════════════════════════════════════
    private void setupWebView() {
        WebSettings settings = webView.getSettings();

        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setGeolocationEnabled(true);
        settings.setMediaPlaybackRequiresUserGesture(false);
        settings.setAllowFileAccessFromFileURLs(true);
        settings.setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        settings.setUserAgentString(
                settings.getUserAgentString() + " HerGuardianAndroid/1.0"
        );

        // ── Add JavaScript Bridge ──
        // Your React app calls window.AndroidBridge.METHOD()
        webView.addJavascriptInterface(
                new AndroidBridge(), "AndroidBridge"
        );

        webView.setWebViewClient(new WebViewClient());

        // ── Load your React app ──
        // Change this to your deployed URL
        webView.loadUrl("https://her-guardian.vercel.app");

        // For local development:
        // webView.loadUrl("http://10.0.2.2:5173");
    }

    // ══════════════════════════════════════════════
    //  JavaScript Bridge
    //  Your React app calls these methods
    // ══════════════════════════════════════════════

    private class AndroidBridge {

        @JavascriptInterface
        public void onUserLoggedIn(
                String token,
                String email,
                String fullName,
                String emergencyContact1,
                String emergencyContact2,
                String emergencyContact3
        ) {
            Log.d(TAG, "✅ Login received from React: " + email);

            // Save to SharedPreferences
            sessionManager.saveLoginData(
                    token, email, fullName,
                    emergencyContact1, emergencyContact2, emergencyContact3
            );

            // Fetch voice phrase from backend (DO NOT START SERVICE YET)
            fetchAndSaveVoicePhrase(email, token);
        }

        // 🚀 CALLED WHEN USER CLICKS "START JOURNEY" IN REACT
        @JavascriptInterface
        public void onJourneyStarted() {
            Log.d(TAG, "🛡 Journey Started! Activating background voice listener...");
            startVoiceService(); // Microphone starts HERE
        }

        // 🛑 CALLED WHEN USER REACHES DESTINATION OR ENDS JOURNEY
        @JavascriptInterface
        public void onJourneyEnded() {
            Log.d(TAG, "🏁 Journey Ended! Stopping voice listener to save battery.");
            stopVoiceService(); // Microphone stops HERE
        }

        @JavascriptInterface
        public void onUserLoggedOut() {
            Log.d(TAG, "User logged out");
            sessionManager.clearSession();
            stopVoiceService();
        }
    }

    // ══════════════════════════════════════════════
    //  Fetch voice phrase from your Spring Boot backend
    //  GET /api/auth/voice-phrase/{email}
    //  Returns SecretPhraseResponse { voicePhrase }
    // ══════════════════════════════════════════════
    private void fetchAndSaveVoicePhrase(String email, String token) {

        ApiService apiService = ApiClient
                .getClient(token)
                .create(ApiService.class);

        apiService.getVoicePhrase(email)
                .enqueue(new Callback<SecretPhraseResponse>() {

                    @Override
                    public void onResponse(
                            Call<SecretPhraseResponse> call,
                            Response<SecretPhraseResponse> response
                    ) {
                        if (response.isSuccessful()
                                && response.body() != null) {

                            String phrase =
                                    response.body().getVoicePhrase();

                            // Save phrase to SharedPreferences
                            sessionManager.saveVoicePhrase(phrase);

                            Log.d(TAG, "✅ Voice phrase saved: " + phrase);

                            // Start the voice listener service
                            startVoiceService();
                        }
                    }

                    @Override
                    public void onFailure(
                            Call<SecretPhraseResponse> call, Throwable t
                    ) {
                        Log.e(TAG, "Phrase fetch failed: " + t.getMessage());
                        // Start service anyway with existing phrase if any
                        startVoiceService();
                    }
                });
    }

    private void startVoiceService() {
        Intent intent = new Intent(this, VoiceListenerService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent);
        } else {
            startService(intent);
        }
    }

    private void stopVoiceService() {
        Intent intent = new Intent(this, VoiceListenerService.class);
        stopService(intent);
    }
    @SuppressLint("UnspecifiedRegisterReceiverFlag")
    private void registerSOSReceiver() {

        IntentFilter filter =
                new IntentFilter("com.herguardian.SOS_TRIGGERED");

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {

            registerReceiver(
                    sosReceiver,
                    filter,
                    Context.RECEIVER_NOT_EXPORTED
            );

        } else {

            registerReceiver(sosReceiver, filter);
        }
    }

    private void requestPermissions() {
        String[] permissions = {
                Manifest.permission.RECORD_AUDIO
        };

        boolean allGranted = true;
        for (String perm : permissions) {
            if (ActivityCompat.checkSelfPermission(this, perm)
                    != PackageManager.PERMISSION_GRANTED) {
                allGranted = false;
                break;
            }
        }

        if (!allGranted) {
            ActivityCompat.requestPermissions(this, permissions, 100);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        try {
            unregisterReceiver(sosReceiver);
        } catch (Exception ignored) {}
    }
}