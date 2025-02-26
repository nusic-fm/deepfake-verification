import axios from "axios";

const textToSpeech = async (
  text: string,
  audio_url: string
): Promise<string> => {
  const response = await axios.post(
    `${import.meta.env.VITE_AGENT_SERVER_URL}/llasa-voice-synthesizer`,
    {
      text,
      audio_url,
    }
  );
  const url = response.data.url;
  return url;
};

export { textToSpeech };
