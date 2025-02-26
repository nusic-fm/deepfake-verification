import { storage } from "../firebase.service";
import { ref, uploadBytes } from "firebase/storage";

const FOLDER_NAME = "markets";

const uploadMarketImage = async (image: File, marketId: string) => {
  const storageRef = ref(storage, `${FOLDER_NAME}/${marketId}/image.png`);
  await uploadBytes(storageRef, image);
};

const uploadMarketRealAudio = async (audio: File, marketId: string) => {
  const storageRef = ref(storage, `${FOLDER_NAME}/${marketId}/real-audio.mp3`);
  await uploadBytes(storageRef, audio);
};

const uploadMarketDeepfakeAudio = async (audio: File, marketId: string) => {
  const storageRef = ref(
    storage,
    `${FOLDER_NAME}/${marketId}/deepfake-audio.mp3`
  );
  await uploadBytes(storageRef, audio);
};

export { uploadMarketImage, uploadMarketRealAudio, uploadMarketDeepfakeAudio };
