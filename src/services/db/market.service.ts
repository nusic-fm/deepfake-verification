export type Market = {
  id: string;
  imagePath: string;
  realAudioPath: string;
  deepfakeAudioPath: string;
  enableCountdown: boolean;
  minBetAmount: number;
  stepAmount: number;
  duration: number;
};
export type MarketDoc = Market & {
  createdAt: Date;
  result: "real" | "deepfake";
};
