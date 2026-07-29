package com.herguardian.app.util;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

/**
 * ══════════════════════════════════════════════════
 *  SessionManager
 *  ─────────────────────────────────────────────────
 *  Stores user data from your LoginResponse +
 *  the voicePhrase from your SecretPhraseResponse
 *  ─────────────────────────────────────────────────
 *  Your LoginResponse fields stored here:
 *  ✅ token
 *  ✅ email
 *  ✅ fullName
 *  ✅ emergencyContact1/2/3
 *  ✅ voicePhrase (fetched separately)
 * ══════════════════════════════════════════════════
 */
public class SessionManager {

    private static final String TAG = "SessionManager";

    // SharedPreferences file name
    private static final String PREF_NAME = "HerGuardianSession";

    // Keys — matching your LoginResponse + SecretPhraseResponse fields
    private static final String KEY_TOKEN              = "token";
    private static final String KEY_EMAIL              = "email";
    private static final String KEY_FULL_NAME          = "fullName";
    private static final String KEY_EMERGENCY_1        = "emergencyContact1";
    private static final String KEY_EMERGENCY_2        = "emergencyContact2";
    private static final String KEY_EMERGENCY_3        = "emergencyContact3";

    // From your SecretPhraseResponse → voicePhrase field
    private static final String KEY_VOICE_PHRASE       = "voicePhrase";

    private static final String KEY_LOGGED_IN          = "isLoggedIn";
    private static final String KEY_SERVICE_ACTIVE     = "serviceActive";

    private final SharedPreferences prefs;
    private final SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        prefs  = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    // ══════════════════════════════════════════════
    //  Called from JavaScript Bridge after login
    //  Stores all fields from your LoginResponse
    // ══════════════════════════════════════════════
    public void saveLoginData(
            String token,
            String email,
            String fullName,
            String emergencyContact1,
            String emergencyContact2,
            String emergencyContact3
    ) {
        editor.putString(KEY_TOKEN, token);
        editor.putString(KEY_EMAIL, email);
        editor.putString(KEY_FULL_NAME, fullName);
        editor.putString(KEY_EMERGENCY_1, emergencyContact1);
        editor.putString(KEY_EMERGENCY_2, emergencyContact2);
        editor.putString(KEY_EMERGENCY_3, emergencyContact3);
        editor.putBoolean(KEY_LOGGED_IN, true);
        editor.apply();

        Log.d(TAG, "✅ Login data saved for: " + email);
    }

    // ══════════════════════════════════════════════
    //  Called from JavaScript Bridge after fetching
    //  voice phrase from your /api/auth/voice-phrase
    //  endpoint → SecretPhraseResponse.voicePhrase
    // ══════════════════════════════════════════════
    public void saveVoicePhrase(String phrase) {
        // Store lowercase for case-insensitive matching
        String normalised = phrase.toLowerCase().trim();
        editor.putString(KEY_VOICE_PHRASE, normalised);
        editor.putBoolean(KEY_SERVICE_ACTIVE, true);
        editor.apply();

        Log.d(TAG, "✅ Voice phrase saved");
    }

    // ══════════════════════════════════════════════
    //  Getters
    // ══════════════════════════════════════════════

    // Returns the voicePhrase from SecretPhraseResponse
    public String getVoicePhrase() {
        return prefs.getString(KEY_VOICE_PHRASE, "");
    }

    public String getEmail() {
        return prefs.getString(KEY_EMAIL, "");
    }

    public String getToken() {
        return prefs.getString(KEY_TOKEN, "");
    }

    public String getFullName() {
        return prefs.getString(KEY_FULL_NAME, "");
    }

    // Emergency contacts from your User entity
    public String getEmergencyContact1() {
        return prefs.getString(KEY_EMERGENCY_1, "");
    }

    public String getEmergencyContact2() {
        return prefs.getString(KEY_EMERGENCY_2, "");
    }

    public String getEmergencyContact3() {
        return prefs.getString(KEY_EMERGENCY_3, "");
    }

    public boolean isLoggedIn() {
        return prefs.getBoolean(KEY_LOGGED_IN, false);
    }

    public boolean isServiceActive() {
        return prefs.getBoolean(KEY_SERVICE_ACTIVE, false);
    }

    // ── Called on logout ──
    public void clearSession() {
        editor.clear();
        editor.apply();
        Log.d(TAG, "Session cleared");
    }
}