import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import WaveformVisualizer from "./components/WaveformVisualizer";
import VoiceMarket from "./components/VoiceMarket";
import ChatWindow from "./components/ChatWindow";
import "./app.css";
import SolanaWalletConnect from "./components/SolanaWalletConnect";
import LaunchNewMarket from "./components/LaunchNewMarket";

export type VoiceEmotion = {
  name: string;
  userId: string;
  emotionId: string;
  audioUrl: string;
  marketId: string;
  totalBets: number;
  realVotePercentage: number;
  fakeVotePercentage: number;
  preview?: string;
};

const INITIAL_MARKETS: VoiceEmotion[] = [
  {
    name: "Elon Musk on AI Safety",
    userId: "elon_musk",
    emotionId: "concerned",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_1",
    totalBets: 1420,
    realVotePercentage: 65,
    fakeVotePercentage: 35,
    preview: `https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/previews%2Feinstein.jpg?alt=media`,
  },
  {
    name: "Donald Trump Speech Excerpt",
    userId: "donald_trump",
    emotionId: "confident",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_2",
    totalBets: 2250,
    realVotePercentage: 48,
    fakeVotePercentage: 52,
    preview: `https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/previews%2Ftrump.jpg?alt=media`,
  },
  {
    name: "Kanye West Interview Clip",
    userId: "kanye_west",
    emotionId: "passionate",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_3",
    totalBets: 890,
    realVotePercentage: 72,
    fakeVotePercentage: 28,
  },
  {
    name: "Joe Rogan Podcast Moment",
    userId: "joe_rogan",
    emotionId: "excited",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_4",
    totalBets: 1150,
    realVotePercentage: 58,
    fakeVotePercentage: 42,
  },
  {
    name: "Morgan Freeman Narration",
    userId: "morgan_freeman",
    emotionId: "calm",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_5",
    totalBets: 1680,
    realVotePercentage: 45,
    fakeVotePercentage: 55,
  },
  {
    name: "Barack Obama Speech",
    userId: "barack_obama",
    emotionId: "inspiring",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_6",
    totalBets: 1890,
    realVotePercentage: 62,
    fakeVotePercentage: 38,
  },
  {
    name: "Taylor Swift Interview",
    userId: "taylor_swift",
    emotionId: "cheerful",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_7",
    totalBets: 2100,
    realVotePercentage: 70,
    fakeVotePercentage: 30,
  },
  {
    name: "David Attenborough Nature",
    userId: "david_attenborough",
    emotionId: "serene",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_8",
    totalBets: 950,
    realVotePercentage: 75,
    fakeVotePercentage: 25,
  },
  {
    name: "Snoop Dogg Freestyle",
    userId: "snoop_dogg",
    emotionId: "laid_back",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_9",
    totalBets: 1320,
    realVotePercentage: 55,
    fakeVotePercentage: 45,
  },
  {
    name: "Jordan Peterson Lecture",
    userId: "jordan_peterson",
    emotionId: "serious",
    audioUrl:
      "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio%20(11).wav?alt=media", // placeholder
    marketId: "market_10",
    totalBets: 780,
    realVotePercentage: 68,
    fakeVotePercentage: 32,
  },
];

const App: React.FC = () => {
  const [markets, setMarkets] = useState<VoiceEmotion[]>(INITIAL_MARKETS);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handleNewMarket = (marketData: any) => {
    // Handle the new market data here
    console.log("New market data:", marketData);
    // You would typically send this to your backend
  };

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      flexDirection="column"
      sx={{
        background: "rgba(10, 10, 18, 0.96)",
        backdropFilter: "blur(20px)",
        padding: "2rem",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="h4">Voice Prediction Market</Typography>
          <LaunchNewMarket onSubmit={handleNewMarket} />
        </Box>
        <SolanaWalletConnect />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Grid container spacing={2}>
            {markets.map((market, index) => (
              <Grid item xs={12} md={6} key={market.marketId}>
                <VoiceMarket
                  market={market}
                  isPlaying={playingIndex === index}
                  onPlayPause={() => {
                    setPlayingIndex(playingIndex === index ? null : index);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <ChatWindow />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
