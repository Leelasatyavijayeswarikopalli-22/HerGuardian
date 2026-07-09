import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const getVoicePhrase = async (email) => {

    const response = await axios.get(
        `${API}/voice-phrase/${email}`
    );

    return response.data.voicePhrase;
};