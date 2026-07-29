package com.herguardian.app.network;

import com.herguardian.app.model.SecretPhraseResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;

/**
 * Matches your AuthController endpoints exactly
 * We only need ONE endpoint in Android —
 * the rest is handled by your React app in WebView
 */
public interface ApiService {

    // ── Matches your: GET /api/auth/voice-phrase/{email} ──
    // Returns SecretPhraseResponse { voicePhrase: string }
    @GET("api/auth/voice-phrase/{email}")
    Call<SecretPhraseResponse> getVoicePhrase(
            @Path("email") String email
    );
}