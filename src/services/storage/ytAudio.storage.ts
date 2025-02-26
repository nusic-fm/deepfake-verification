import { getStorage, ref, getDownloadURL } from 'firebase/storage';

/**
 * Service for handling YouTube audio files stored in Firebase Storage
 */
export class YTAudioStorage {
  private static instance: YTAudioStorage;
  private storage = getStorage();

  private constructor() {}

  /**
   * Get singleton instance of YTAudioStorage
   */
  public static getInstance(): YTAudioStorage {
    if (!YTAudioStorage.instance) {
      YTAudioStorage.instance = new YTAudioStorage();
    }
    return YTAudioStorage.instance;
  }

  /**
   * Get the URL for a dummy audio file
   * @returns Promise with the download URL
   */
  public async getDummyAudioUrl(): Promise<string> {
    // Using the provided Firebase Storage URL
    return "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio(11).wav?alt=media&token=470dcf76-3dbe-4a4a-9c4f-25ce19f2d33f";
  }

  /**
   * Get the URL for an audio file by its ID
   * @param audioId The ID of the audio file
   * @returns Promise with the download URL
   */
  public async getAudioUrl(audioId: string): Promise<string> {
    try {
      const audioRef = ref(this.storage, `audio/${audioId}.wav`);
      return await getDownloadURL(audioRef);
    } catch (error) {
      console.error("Error getting audio URL:", error);
      // Fallback to dummy audio if there's an error
      return this.getDummyAudioUrl();
    }
  }
}

export default YTAudioStorage.getInstance();
