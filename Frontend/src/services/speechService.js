import axios from "axios";

const API = "https://herguardian-production-2950.up.railway.app/api/auth";

export const getVoicePhrase = async (email) => {

    const response = await axios.get(
        `${API}/voice-phrase/${email}`
    );

    return response.data.voicePhrase;
};