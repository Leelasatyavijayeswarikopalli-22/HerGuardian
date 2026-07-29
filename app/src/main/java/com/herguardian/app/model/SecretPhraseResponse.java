package com.herguardian.app.model;

import com.google.gson.annotations.SerializedName;

/**
 * Matches your backend SecretPhraseResponse DTO:
 * ─────────────────────────────────────────────
 * public class SecretPhraseResponse {
 *     private String voicePhrase;
 * }
 */
public class SecretPhraseResponse {

    // Matches the "voicePhrase" field in your DTO
    @SerializedName("voicePhrase")
    private String voicePhrase;

    public String getVoicePhrase() {
        return voicePhrase;
    }
}