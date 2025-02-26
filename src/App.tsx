import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  useTheme,
  LinearProgress,
  IconButton,
  Divider,
  Snackbar,
  Alert,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  Paper,
  InputAdornment,
  Badge,
  Tab,
  Tabs
} from '@mui/material';
import {
  CheckCircle as RealIcon,
  Cancel as FakeIcon,
  PlayArrow,
  Pause,
  Timer as TimerIcon,
  Send as SendIcon,
  Chat as ChatIcon,
  ShowChart as ChartIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import SolanaWalletConnect from "./components/SolanaWalletConnect";
import AudioVisualizer from "./components/AudioVisualizer";

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

// Update the POPULAR_VOICES array with more diverse options and working images

const POPULAR_VOICES = [
  {
    name: "Elon Musk", 
    userId: "elon_musk",
    topics: ["AI Safety", "Mars Colonization", "Tesla Updates"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg"
  },
  { 
    name: "Donald Trump", 
    userId: "donald_trump",
    topics: ["Election Speech", "Policy Announcement", "Rally Address"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/5/56/Donald_Trump_official_portrait.jpg"
  },
  { 
    name: "Joe Biden", 
    userId: "joe_biden", 
    topics: ["State Address", "Policy Briefing", "Campaign Speech"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Joe_Biden_presidential_portrait.jpg"
  },
  { 
    name: "Barack Obama", 
    userId: "barack_obama", 
    topics: ["Keynote Speech", "Foundation Address", "Podcast Excerpt"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8d/President_Barack_Obama.jpg"
  },
  { 
    name: "Oprah Winfrey", 
    userId: "oprah_winfrey", 
    topics: ["Show Intro", "Interview Question", "Inspirational Message"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/b/bf/Oprah_in_2014.jpg"
  },
  { 
    name: "Morgan Freeman", 
    userId: "morgan_freeman",
    topics: ["Narration", "Interview Moment", "Award Speech"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Morgan_Freeman_Deauville_2018.jpg"
  },
  { 
    name: "Beyoncé", 
    userId: "beyonce", 
    topics: ["Album Announcement", "Concert Speech", "Interview Excerpt"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png"
  },
  { 
    name: "Dwayne Johnson", 
    userId: "dwayne_johnson", 
    topics: ["Movie Promotion", "Workout Motivation", "Fan Message"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Dwayne_Johnson_2014_%28cropped%29.jpg"
  },
  { 
    name: "Kamala Harris", 
    userId: "kamala_harris", 
    topics: ["Campaign Rally", "Policy Speech", "Press Conference"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/41/Kamala_Harris_Vice_Presidential_Portrait.jpg"
  },
  { 
    name: "Tom Hanks", 
    userId: "tom_hanks", 
    topics: ["Award Acceptance", "Film Promotion", "Charity Appeal"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Tom_Hanks_TIFF_2019.jpg"
  },
  { 
    name: "Meryl Streep", 
    userId: "meryl_streep", 
    topics: ["Award Speech", "Interview", "Public Address"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_December_2018.jpg"
  },
  { 
    name: "Samuel L. Jackson", 
    userId: "samuel_jackson", 
    topics: ["Movie Promo", "Motivational Speech", "Interview Clip"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Samuel_L._Jackson_2019_by_Glenn_Francis.jpg"
  },
  { 
    name: "Jennifer Lawrence", 
    userId: "jennifer_lawrence", 
    topics: ["Interview Moment", "Award Acceptance", "Public Statement"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Jennifer_Lawrence_SDCC_2015_X-Men.jpg"
  },
  { 
    name: "Leonardo DiCaprio", 
    userId: "leonardo_dicaprio", 
    topics: ["Environmental Speech", "Award Acceptance", "Film Discussion"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Leonardo_Dicaprio_Cannes_2019.jpg"
  },
  { 
    name: "Emma Watson", 
    userId: "emma_watson", 
    topics: ["UN Speech", "Interview Excerpt", "Equality Campaign"],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7f/Emma_Watson_2013.jpg"
  }
];

// Add these arrays for crypto usernames and NFT profile pictures

// Crypto-themed usernames
const cryptoUsernames = [
  "MoonBoi420",
  "DiamondHands",
  "HODL_King",
  "SatoshisDisciple",
  "CryptoWizard",
  "NFTCollector",
  "BlockchainBaron",
  "DeFiDegen",
  "TokenWhale",
  "RektHunter",
  "ApeInvestor",
  "MetaMaskMafia",
  "GasFeeVictim",
  "LaserEyesClub",
  "RugPullSurvivor",
  "VitalikFan",
  "ShibaArmy",
  "DogeToMars",
  "YieldFarmer",
  "CryptoPunk9999",
  "BoredApeHolder",
  "FlippedMyJPEG",
  "FungibleGuy",
  "Web3Believer",
  "GweiGasper",
  "AltcoinAddict",
  "MintMaster",
  "ChainlinkMarine",
  "StakingChad",
  "BullMarketBaron"
];

// NFT profile picture URLs
const nftProfilePics = [
  // Bored Apes
  "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/i5dYZRkVCUK97bfprQ3WXyrT9BnLSZtVKGJlKQ919uaUB0sxbngVCioaiyu9r6snqfi2aaTyIvv6DHm4m2R3y7hMajbsv14pSZK8mhs?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/H-eyNE1MwL5ohL-tCfn_Xa1Sl9M9B4612tLYeUlQubzt4ewhr4huJIR5OLuyO3Z5PpJFSwdm7rq-TikAh7f5eUw338A2cy6HRH75?auto=format&dpr=1&w=256",
  
  // CryptoPunks
  "https://i.seadn.io/gae/BdxvLseXcfl57BiuQcQYdJ64v-aI8din7WPk0Pgo3qQFhAUH-B6i-dCqqc_mCkRIzULmwzwecnohLhrcH8A9mpWIZqA7ygc52Sr81hE?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/2KP0E-Uc_nSQ7_QQECrHVDAJE1OCnGuLCZNZevH1N0CJJEnKzXdTuWwzG2QvWc-XGcBUBfGhkS8YvP7jvpx-kQ9ibPwlP-Qz-KM?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=256",
  
  // Doodles
  "https://i.seadn.io/gae/7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/sn5iLHUcNuUO98w0BfTuCZ3VNGn5VEvPdDKYC0HqgWfcQYeqxu2W_BmGcsQ35op5QnQQEBv8HgJnvz3b3AaHIgJwSjSiEGC6Mxsx?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/7rQxqp2cAN4J-pFJ6A22Ncb_tm2j6Lz61zXMi9bNJbmAk8PheVXcL1xBLEIUwubqRWv-CDgEKfwXpELu5O5h9Qk?auto=format&dpr=1&w=256",
  
  // Azuki
  "https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/5KIxEGmnAiL5ucSRdPOV9_p_ScAh1MFGj8CgS_L-_Th00Q_gOx8ROvtZOmrhfd_ZpOhILnUDDT1prk_Z_WpPGYyF5hk8C2OPj9xY?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/uQlEVJb3PCU3_6RYFwh7nv9cjv8HTmKFGMUjYJ9Sdv_5Yj8lmSzOF2Bkd4U4vX7MzGK5ZVyUKYMGJGp4HuHH5Y1-EAJwl1EgRQRUPQ?auto=format&dpr=1&w=256",
  
  // Pudgy Penguins
  "https://i.seadn.io/gae/yNi-XdGxsgQCPpqSio4o31ygAV6wURdIdInWRcFIl46UjUQ1eV7BEndGe8L661OoG-clRi7EgInLX4LPu9Jfw4fq0bnVYHqg7RFi?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/DdOHccLt-B1WvwI2n5zNP_URYfZBR-4gM9OfME3-8KeLrBJpKqjJxYnYGwEXnfBNEn1fYBzv13Q3X9iZ-CgKL10UQ2-KbcJJqZrK?auto=format&dpr=1&w=256",
  "https://i.seadn.io/gae/2Ncvl5fvGQ8TBMQB8cHs4XlO5hq0uH_GQgoLuNSbymL5YeSkKSsGRjWZgSLx8h6cNQR-oncX-uB5m9_Zce-MQGgNpSzQgEwUAGo?auto=format&dpr=1&w=256"
];

// Get a random crypto username
const getRandomCryptoUsername = () => {
  return cryptoUsernames[Math.floor(Math.random() * cryptoUsernames.length)];
};

// Get a random NFT profile picture
const getRandomNftProfilePic = () => {
  return nftProfilePics[Math.floor(Math.random() * nftProfilePics.length)];
};

// Enhanced BetchaLogo component with text split effect and animated audio waves

const BetchaLogo: React.FC = () => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'flex-start',
      position: 'relative',
      mt: 2,
      mb: 3,
      pl: 1
    }}>
      {/* Subtle background glow */}
      <Box sx={{
        position: 'absolute',
        top: -20,
        left: -10,
        width: '120%',
        height: '150%',
        background: 'radial-gradient(ellipse at center, rgba(68,138,255,0.1) 0%, transparent 70%)',
        filter: 'blur(20px)',
        zIndex: 0
      }} />
      
      {/* Main logo container */}
      <Box sx={{ 
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center'
      }}>
        {/* Main logo text with improved visibility */}
        <Box sx={{ 
          position: 'relative',
          height: { xs: '3.5rem', sm: '4.2rem' },
          mr: 1.5
        }}>
          {/* Main text - single piece for guaranteed visibility */}
          <Typography 
            variant="h1" 
            fontWeight="900" 
      sx={{
              fontSize: { xs: '2.8rem', sm: '3.5rem' },
              background: 'linear-gradient(135deg, #FF4081 0%, #FF9100 50%, #448AFF 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              letterSpacing: '0.02em',
              fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
              textShadow: '0 5px 30px rgba(255,64,129,0.2)',
              position: 'relative',
              zIndex: 2
            }}
          >
            BETCHA!
          </Typography>
          
          {/* Horizontal split line */}
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)',
            zIndex: 3,
            transform: 'translateY(-1px)'
          }} />
        </Box>
        
        {/* Audio wave icon with more consistent styling but organic motion */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          width: 50,
          position: 'relative',
          mt: 1
        }}>
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.2)',
            filter: 'blur(8px)',
            transform: 'translateY(5px) scale(0.8)',
            zIndex: 0
          }} />
          
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF4081, #448AFF)',
            boxShadow: '0 4px 20px rgba(255,64,129,0.3)',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)',
              borderRadius: '50% 50% 0 0'
            }
          }}>
            {/* Animated sound wave bars with consistent width */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              height: '60%', 
              gap: '3px' 
            }}>
              {/* First bar */}
              <Box sx={{
                width: 2,
                backgroundColor: '#fff',
                borderRadius: 4,
                opacity: 0.95,
                animation: 'wave-anim-1 2.1s ease-in-out infinite',
                '@keyframes wave-anim-1': {
                  '0%': { height: '30%' },
                  '20%': { height: '45%' },
                  '40%': { height: '35%' },
                  '60%': { height: '50%' },
                  '80%': { height: '40%' },
                  '100%': { height: '30%' }
                }
              }} />
              
              {/* Second bar */}
              <Box sx={{
                width: 2,
                backgroundColor: '#fff',
                borderRadius: 4,
                opacity: 0.95,
                animation: 'wave-anim-2 1.7s ease-in-out infinite',
                '@keyframes wave-anim-2': {
                  '0%': { height: '60%' },
                  '25%': { height: '80%' },
                  '50%': { height: '65%' },
                  '75%': { height: '85%' },
                  '100%': { height: '60%' }
                }
              }} />
              
              {/* Third bar */}
              <Box sx={{
                width: 2,
                backgroundColor: '#fff',
                borderRadius: 4,
                opacity: 0.95,
                animation: 'wave-anim-3 1.3s ease-in-out infinite',
                '@keyframes wave-anim-3': {
                  '0%': { height: '75%' },
                  '20%': { height: '95%' },
                  '40%': { height: '85%' },
                  '60%': { height: '100%' },
                  '80%': { height: '90%' },
                  '100%': { height: '75%' }
                }
              }} />
              
              {/* Fourth bar */}
              <Box sx={{
                width: 2,
                backgroundColor: '#fff',
                borderRadius: 4,
                opacity: 0.95,
                animation: 'wave-anim-4 1.5s ease-in-out infinite',
                '@keyframes wave-anim-4': {
                  '0%': { height: '65%' },
                  '33%': { height: '85%' },
                  '66%': { height: '70%' },
                  '100%': { height: '65%' }
                }
              }} />
              
              {/* Fifth bar */}
              <Box sx={{
                width: 2,
                backgroundColor: '#fff',
                borderRadius: 4,
                opacity: 0.95,
                animation: 'wave-anim-5 1.9s ease-in-out infinite',
                '@keyframes wave-anim-5': {
                  '0%': { height: '40%' },
                  '30%': { height: '55%' },
                  '60%': { height: '35%' },
                  '100%': { height: '40%' }
                }
              }} />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tagline */}
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mt: 1,
          ml: 0.5,
          fontWeight: 500,
          letterSpacing: '0.05em',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '0.95rem',
          fontFamily: '"Montserrat", "Roboto", "Helvetica", "Arial", sans-serif',
        }}
      >
        <Box component="span" sx={{ color: '#448AFF', fontWeight: 600 }}>
          Real voice
        </Box>
        {' or '}
        <Box component="span" sx={{ color: '#FF4081', fontWeight: 600 }}>
          deepfake
        </Box>
        ? <Box component="span" sx={{ fontWeight: 'bold' }}>Bet on it!</Box>
      </Typography>
    </Box>
  );
};

// Add these types for chat and bids
interface ChatMessage {
  id: string;
  user: string;
  avatar: string;
  message: string;
  timestamp: number;
  isSystem?: boolean;
}

interface LiveBid {
  id: string;
  user: string;
  avatar: string;
  marketId: string;
  marketName: string;
  amount: number;
  choice: 'real' | 'fake';
  timestamp: number;
  isHighlighted?: boolean;
}

const App: React.FC = () => {
  const theme = useTheme();
  const [markets, setMarkets] = useState<VoiceEmotion[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [marketTimers, setMarketTimers] = useState<{[key: string]: number}>({});
  const [audioListened, setAudioListened] = useState<{[key: string]: boolean}>({});
  const [bettingWindows, setBettingWindows] = useState<{[key: string]: number | null}>({});
  const [notification, setNotification] = useState({ open: false, message: "", type: "success" });
  const [lastSimulationTime, setLastSimulationTime] = useState<number>(Date.now());
  const [recentBets, setRecentBets] = useState<{[key: string]: string}>({});
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioData, setAudioData] = useState<Uint8Array | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [liveBids, setLiveBids] = useState<LiveBid[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sidebarTab, setSidebarTab] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [unreadBids, setUnreadBids] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());
  // Add these states for audio playback
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fix the market initialization and countdown timer issues

  // Update the generateRandomMarket function to start with $0 bids and 50/50 spread
  const generateRandomMarket = useCallback(() => {
    const randomVoice = POPULAR_VOICES[Math.floor(Math.random() * POPULAR_VOICES.length)];
    const randomTopic = randomVoice.topics[Math.floor(Math.random() * randomVoice.topics.length)];
    
    return {
      name: `${randomVoice.name} - ${randomTopic}`,
      userId: randomVoice.userId,
      emotionId: `emotion_${Math.random().toString(36).substring(2, 9)}`,
      audioUrl: `https://example.com/audio/${randomVoice.userId}_${Math.random().toString(36).substring(2, 9)}.mp3`,
      marketId: `market_${Math.random().toString(36).substring(2, 9)}`,
      totalBets: 0, // Start with $0 bids
      realVotePercentage: 50, // Perfect 50/50 spread
      fakeVotePercentage: 50, // Perfect 50/50 spread
      preview: randomVoice.imageUrl
    };
  }, []);

  // Add this effect to initialize markets
  useEffect(() => {
    // Generate initial markets
    const initialMarkets = [];
    for (let i = 0; i < 6; i++) {
      initialMarkets.push(generateRandomMarket());
    }
    
    // Set the markets
    setMarkets(initialMarkets);
    
    // Initialize betting windows
    const initialBettingWindows: {[key: string]: number | null} = {};
    initialMarkets.forEach(market => {
      initialBettingWindows[market.marketId] = 60;
    });
    
    // Set the betting windows
    setBettingWindows(initialBettingWindows);
    
    console.log("Initialized markets:", initialMarkets);
    console.log("Initialized betting windows:", initialBettingWindows);
  }, [generateRandomMarket]);

  // Fix the countdown timer issue by updating the audio play handler

  // First, let's update the handlePlayAudio function in the existing code
  useEffect(() => {
    // Find the existing handlePlayAudio function and update it
    const handlePlayAudio = (audioUrl: string, index: number, marketId: string) => {
      // If already playing this audio, pause it
      if (playingIndex === index && audioElement) {
        audioElement.pause();
        setPlayingIndex(null);
        return;
      }
      
      // Pause any currently playing audio
      if (audioElement) {
        audioElement.pause();
      }
      
      // Create a new audio element
      const newAudioElement = new Audio(audioUrl);
      setAudioElement(newAudioElement);
      
      // Play the new audio
      newAudioElement.play().catch(error => {
        console.error("Error playing audio:", error);
        setNotification({
          open: true,
          message: "Error playing audio. Please try again.",
          type: "error"
        });
      });
      
      // Update the playing index
      setPlayingIndex(marketId);
      
      // Mark as listened
      setAudioListened(prev => ({
        ...prev,
        [marketId]: true
      }));
      
      // Start betting window (60 seconds)
      setBettingWindows(prev => ({
        ...prev,
        [marketId]: 60
      }));
    };
    
    // Replace the existing function with our updated version
    window.handlePlayAudio = handlePlayAudio;
  }, [playingIndex, audioElement]);

  // Add this effect to initialize betting windows when markets are created
  useEffect(() => {
    // Initialize betting windows for all markets
    const initialBettingWindows: {[key: string]: number | null} = {};
    markets.forEach(market => {
      // Set initial betting window to 60 seconds for demonstration
      initialBettingWindows[market.marketId] = 60;
    });
    
    setBettingWindows(prev => ({
      ...prev,
      ...initialBettingWindows
    }));
  }, [markets]);

  // Fix the countdown timer functionality

  // Use this effect to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Use this effect to update the betting windows based on the current time
  useEffect(() => {
    // Only update if we have markets and betting windows
    if (markets.length > 0 && Object.keys(bettingWindows).length > 0) {
      // Create a copy of the current betting windows
      const updatedWindows = { ...bettingWindows };
      let anyUpdated = false;
      let expiredMarkets = [];
      
      // Update each betting window
      Object.keys(updatedWindows).forEach(marketId => {
        if (updatedWindows[marketId] !== null && updatedWindows[marketId]! > 0) {
          updatedWindows[marketId] = updatedWindows[marketId]! - 1;
          anyUpdated = true;
          
          // If the timer just reached zero, add to expired markets list
          if (updatedWindows[marketId] === 0) {
            expiredMarkets.push(marketId);
            const marketName = markets.find(m => m.marketId === marketId)?.name || 'market';
            
            setNotification({
              open: true,
              message: `Betting window closed for ${marketName}`,
              type: "warning"
            });
          }
        } else if (updatedWindows[marketId] === 0) {
          // Also add already expired markets to the list
          expiredMarkets.push(marketId);
        }
      });
      
      // Handle expired markets
      if (expiredMarkets.length > 0) {
        // Remove expired markets from the UI
        setMarkets(prev => prev.filter(m => !expiredMarkets.includes(m.marketId)));
        
        // Remove expired markets from betting windows
        expiredMarkets.forEach(marketId => {
          delete updatedWindows[marketId];
        });
        
        // Generate new markets to replace expired ones
        setTimeout(() => {
          expiredMarkets.forEach(() => {
            const newMarket = generateRandomMarket();
            
            // Add the new market to the beginning (top left in the grid)
            setMarkets(prev => [newMarket, ...prev]);
            
            // Set a new betting window for the new market
            setBettingWindows(prev => ({
              ...prev,
              [newMarket.marketId]: 60
            }));
            
            // Show notification for new market
            setNotification({
              open: true,
              message: `New market available: ${newMarket.name}`,
              type: "info"
            });
          });
        }, 2000);
      }
      
      // Only update the state if any windows were actually updated
      if (anyUpdated || expiredMarkets.length > 0) {
        setBettingWindows(updatedWindows);
      }
    }
  }, [currentTime, markets, generateRandomMarket]);

  // Initialize betting windows with staggered times
  useEffect(() => {
    if (markets.length > 0) {
      console.log("Initializing betting windows for markets:", markets.length);
      
      // Create new betting windows object with staggered times
      const initialBettingWindows: {[key: string]: number | null} = {};
      
      // Set each market to have a staggered countdown (60, 55, 50, etc.)
      markets.forEach((market, index) => {
        initialBettingWindows[market.marketId] = Math.max(10, 60 - (index * 5));
      });
      
      // Update the betting windows
      setBettingWindows(initialBettingWindows);
      
      console.log("Initialized staggered betting windows:", initialBettingWindows);
    }
  }, [markets.length]); // Only run when markets.length changes

  // Update the handleResetAllTimers function to use staggered times
  const handleResetAllTimers = useCallback(() => {
    console.log("Resetting all timers with staggered times");
    
    // Create new betting windows object with staggered times
    const newBettingWindows: {[key: string]: number | null} = {};
    
    // Set each market to have a staggered countdown (60, 55, 50, etc.)
    markets.forEach((market, index) => {
      newBettingWindows[market.marketId] = Math.max(10, 60 - (index * 5));
    });
    
    // Update the betting windows
    setBettingWindows(newBettingWindows);
    
    // Show notification
    setNotification({
      open: true,
      message: "All betting windows reset with staggered times",
      type: "info"
    });
    
    console.log("Reset all timers with staggered times:", newBettingWindows);
  }, [markets]);

  // Add this function to handle audio analysis
  const setupAudioAnalysis = useCallback((audioElement: HTMLAudioElement) => {
    // Create audio context if it doesn't exist
    if (!audioContext) {
      const newAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      setAudioContext(newAudioContext);
      
      // Create analyzer
      const analyser = newAudioContext.createAnalyser();
      analyser.fftSize = 256; // Must be power of 2
      audioAnalyserRef.current = analyser;
      
      // Connect audio element to analyzer
      const source = newAudioContext.createMediaElementSource(audioElement);
      source.connect(analyser);
      analyser.connect(newAudioContext.destination);
      
      // Create data array for analyzer
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      
      // Update audio data on animation frame
      const updateAudioData = () => {
        if (audioAnalyserRef.current) {
          audioAnalyserRef.current.getByteFrequencyData(dataArray);
          setAudioData([...dataArray]);
          animationFrameRef.current = requestAnimationFrame(updateAudioData);
        }
      };
      
      // Start animation
      updateAudioData();
    }
  }, [audioContext]);

  // Update the handlePlayAudio function
  const handlePlayAudio = useCallback((market: VoiceEmotion) => {
    // Use dummy audio URL for testing
    const audioUrl = "https://firebasestorage.googleapis.com/v0/b/nusic-ai-agent.firebasestorage.app/o/audio(11).wav?alt=media&token=470dcf76-3dbe-4a4a-9c4f-25ce19f2d33f";
    
    if (playingAudio === market.marketId) {
      // If this audio is already playing, pause it
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setPlayingAudio(null);
      
      // Stop animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    } else {
      // If another audio is playing, pause it
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      // Stop previous animation frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      
      // Play this audio
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      // Set up audio analysis when audio is ready
      audio.addEventListener('canplaythrough', () => {
        try {
          // Create audio context if it doesn't exist
          if (!audioContext) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            const newAudioContext = new AudioContext();
            setAudioContext(newAudioContext);
            
            // Create analyser node
            const analyser = newAudioContext.createAnalyser();
            analyser.fftSize = 256;
            audioAnalyserRef.current = analyser;
            
            // Create data array for frequency data
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            setAudioData(dataArray);
            
            // Create source from audio element
            const source = newAudioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(newAudioContext.destination);
          } else {
            // If audio context exists, create new analyser
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            audioAnalyserRef.current = analyser;
            
            // Create data array for frequency data
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            setAudioData(dataArray);
            
            // Create source from audio element
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
          }
        } catch (error) {
          console.error("Error setting up audio analysis:", error);
        }
      });
      
      // Update progress
      audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        setAudioProgress(progress);
      });
      
      audio.onended = () => {
        setPlayingAudio(null);
        setAudioProgress(0);
        
        // Mark this audio as listened
        setAudioListened(prev => ({
          ...prev,
          [market.marketId]: true
        }));
        
        // Start a 10-second betting window after audio finishes
        setBettingWindows(prev => ({
          ...prev,
          [market.marketId]: 10
        }));
        
        // Stop animation frame
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      };
      
      audio.play().catch(error => {
        console.error("Audio playback error:", error);
        setNotification({
          open: true,
          message: "Error playing audio. Please try again.",
          type: "error"
        });
      });
      
      setPlayingAudio(market.marketId);
    }
  }, [playingAudio, audioContext]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (audioContext) {
        audioContext.close().catch(console.error);
      }
    };
  }, [audioContext]);

  // Update market timers
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketTimers(prev => {
        const updated = { ...prev };
        let needsRefresh = false;
        
        Object.keys(updated).forEach(marketId => {
          if (updated[marketId] > 0) {
            updated[marketId] -= 1;
            if (updated[marketId] <= 0) {
              needsRefresh = true;
            }
          }
        });
        
        if (needsRefresh) {
          // Replace expired markets
          const expiredMarketIds = Object.keys(updated).filter(id => updated[id] <= 0);
          
          expiredMarketIds.forEach(expiredId => {
            const newMarket = generateRandomMarket();
            console.log(`Created new market: ${newMarket.name} with ID ${newMarket.marketId}`);
            
            // Update markets - add new market at the beginning of the array
            setMarkets(prev => {
              // Filter out the expired market
              const filteredMarkets = prev.filter(market => market.marketId !== expiredId);
              // Add the new market at the beginning
              return [newMarket, ...filteredMarkets];
            });
            
            // Update timers
            updated[newMarket.marketId] = 60;
            delete updated[expiredId];
            
            // Update audio listened state
            setAudioListened(prev => {
              const newState = { ...prev };
              delete newState[expiredId];
              newState[newMarket.marketId] = false;
              return newState;
            });
            
            // Update betting windows
            setBettingWindows(prev => {
              const newState = { ...prev };
              delete newState[expiredId];
              newState[newMarket.marketId] = null;
              return newState;
            });
            
            // Show notification
            setNotification({
              open: true,
              message: `New market available: "${newMarket.name}"!`,
              type: "success"
            });
          });
        }
        
        return updated;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [generateRandomMarket]);

  // Update betting windows
  useEffect(() => {
    const interval = setInterval(() => {
      setBettingWindows(prev => {
        const updated = { ...prev };
        
        Object.keys(updated).forEach(marketId => {
          if (updated[marketId] !== null && updated[marketId]! > 0) {
            updated[marketId] = updated[marketId]! - 1;
          }
        });
        
        return updated;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Update the handlePlaceBet function to round percentages to integers
  const handlePlaceBet = useCallback((marketId: string, betType: 'REAL' | 'FAKE') => {
    // Find the market
    const market = markets.find(m => m.marketId === marketId);
    if (!market) return;
    
    // Generate a random bet amount between $50 and $1000 for more noticeable changes
    const betAmount = Math.floor(Math.random() * 950) + 50;
    
    // Update the recent bets
    setRecentBets(prev => ({
      ...prev,
      [marketId]: betType
    }));
    
    // Create a new bid with highlighted styling for user's own bets
    const newBid: LiveBid = {
      id: `bid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: 'You',
      avatar: 'https://i.pravatar.cc/40?img=1',
      marketId: marketId,
      marketName: market.name,
      amount: betAmount,
      choice: betType.toLowerCase() as "real" | "fake",
      timestamp: Date.now(),
      isHighlighted: true // Flag to highlight user's own bets
    };
    
    // Add to live bids at the top
    setLiveBids(prev => [newBid, ...prev].slice(0, 50));
    
    // Update market stats
    setMarkets(prev => 
      prev.map(m => {
        if (m.marketId === marketId) {
          // Calculate new percentages based on the bet
          const newTotalBets = m.totalBets + betAmount;
          let newRealPercentage, newFakePercentage;
          
          if (betType === "REAL") {
            const currentRealAmount = (m.realVotePercentage / 100) * m.totalBets;
            const newRealAmount = currentRealAmount + betAmount;
            newRealPercentage = (newRealAmount / newTotalBets) * 100;
            newFakePercentage = 100 - newRealPercentage;
          } else {
            const currentFakeAmount = (m.fakeVotePercentage / 100) * m.totalBets;
            const newFakeAmount = currentFakeAmount + betAmount;
            newFakePercentage = (newFakeAmount / newTotalBets) * 100;
            newRealPercentage = 100 - newFakePercentage;
          }
          
          return {
            ...m,
            totalBets: newTotalBets,
            realVotePercentage: Math.round(newRealPercentage), // Round to integer
            fakeVotePercentage: Math.round(newFakePercentage)  // Round to integer
          };
        }
        return m;
      })
    );
    
    // Add a chat message about the bet to make it more visible
    const betMessage: ChatMessage = {
      id: `msg_bet_${Date.now()}`,
      user: 'System',
      avatar: 'https://i.pravatar.cc/40?img=60',
      message: `You just placed a $${betAmount} bet on ${market.name} being ${betType}!`,
      timestamp: Date.now(),
      isSystem: true
    };
    
    setChatMessages(prev => [...prev, betMessage]);
    
    // Show notification
    setNotification({
      open: true,
      message: `Bet placed: $${betAmount} on ${betType}`,
      type: "success"
    });
    
    // Disable betting window
    setBettingWindows(prev => ({
      ...prev,
      [marketId]: null
    }));
    
    // Increment unread bids counter if not on the Live Bids tab
    if (sidebarTab !== 1) {
      setUnreadBids(prev => prev + 1);
    }
    
    console.log(`Bet placed: ${betType} on market ${marketId} for $${betAmount}`);
  }, [markets, sidebarTab]);

  // Improved calculation functions for more accurate betting metrics

  // Calculate potential winnings based on bet amount and current market state
  const calculatePotentialWinnings = (market: VoiceEmotion, betAmount: number, choice: "real" | "fake") => {
    // If no bets have been placed yet, return a default multiplier
    if (market.totalBets === 0) {
      return betAmount * 2; // 2x return on first bet
    }
    
    // Calculate the odds based on current vote percentages
    const realPercentage = market.realVotePercentage / 100;
    const fakePercentage = market.fakeVotePercentage / 100;
    
    // Calculate the implied probability and odds
    let impliedProbability;
    if (choice === "real") {
      impliedProbability = realPercentage;
    } else {
      impliedProbability = fakePercentage;
    }
    
    // Prevent division by zero or very small numbers
    impliedProbability = Math.max(0.05, Math.min(0.95, impliedProbability));
    
    // Calculate the fair odds (1/probability)
    const fairOdds = 1 / impliedProbability;
    
    // Apply a house edge (5%)
    const oddsWithHouseEdge = fairOdds * 0.95;
    
    // Calculate potential winnings
    const potentialWinnings = betAmount * oddsWithHouseEdge;
    
    // Round to nearest dollar
    return Math.round(potentialWinnings);
  };

  // Get a multiplier string for display
  const getMultiplierString = (market: VoiceEmotion, choice: "real" | "fake") => {
    // Calculate for a standard $100 bet
    const winnings = calculatePotentialWinnings(market, 100, choice);
    const multiplier = winnings / 100;
    
    // Format with three decimal places for more precision
    return `${multiplier.toFixed(3)}x`;
  };

  // Update the simulation effect to create a constant stream of live bids

  // Create a function to generate a new bid
  const generateNewBid = useCallback(() => {
    if (markets.length === 0) return;
    
    const randomMarketIndex = Math.floor(Math.random() * markets.length);
    const randomMarket = markets[randomMarketIndex];
    const isRealBet = Math.random() > 0.5;
    const betAmount = Math.floor(Math.random() * 490) + 10;
    
    const newBid: LiveBid = {
      id: `bid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      user: getRandomCryptoUsername(),
      avatar: getRandomNftProfilePic(),
      marketId: randomMarket.marketId,
      marketName: randomMarket.name,
      amount: betAmount,
      choice: isRealBet ? 'real' : 'fake',
      timestamp: Date.now()
    };
    
    // Add the new bid to the top of the list
    setLiveBids(prev => [newBid, ...prev].slice(0, 50));
    
    // Update market stats to match the bid
    setMarkets(prev => 
      prev.map(m => {
        if (m.marketId === randomMarket.marketId) {
          // Calculate new percentages based on the bet
          const newTotalBets = m.totalBets + betAmount;
          let newRealPercentage, newFakePercentage;
          
          if (isRealBet) {
            const currentRealAmount = (m.realVotePercentage / 100) * m.totalBets;
            const newRealAmount = currentRealAmount + betAmount;
            newRealPercentage = (newRealAmount / newTotalBets) * 100;
            newFakePercentage = 100 - newRealPercentage;
          } else {
            const currentFakeAmount = (m.fakeVotePercentage / 100) * m.totalBets;
            const newFakeAmount = currentFakeAmount + betAmount;
            newFakePercentage = (newFakeAmount / newTotalBets) * 100;
            newRealPercentage = 100 - newFakePercentage;
          }
          
          return {
            ...m,
            totalBets: newTotalBets,
            realVotePercentage: newRealPercentage,
            fakeVotePercentage: newFakePercentage
          };
        }
        return m;
      })
    );
    
    // If we're not on the Live Bids tab, increment the unread counter
    if (sidebarTab !== 1) {
      setUnreadBids(prev => prev + 1);
    }
  }, [markets, sidebarTab]);

  // Update the useEffect for simulating bids
  useEffect(() => {
    // Create initial bids with crypto usernames and NFT profile pics
    const initialBids: LiveBid[] = [];
    for (let i = 0; i < 10; i++) {
      if (markets.length === 0) break;
      
      const randomMarketIndex = Math.floor(Math.random() * markets.length);
      const randomMarket = markets[randomMarketIndex];
      const isRealBet = Math.random() > 0.5;
      const betAmount = Math.floor(Math.random() * 490) + 10;
      
      initialBids.push({
        id: `initial_bid_${i}_${Math.random().toString(36).substring(2, 9)}`,
        user: getRandomCryptoUsername(),
        avatar: getRandomNftProfilePic(),
        marketId: randomMarket?.marketId || 'unknown',
        marketName: randomMarket?.name || 'Unknown Market',
        amount: betAmount,
        choice: isRealBet ? 'real' : 'fake',
        timestamp: Date.now() - (1000 * 60 * (10 - i)) // Staggered timestamps
      });
    }
    
    setLiveBids(initialBids);
    
    // Set up interval for generating new bids
    const interval = setInterval(generateNewBid, 1000); // Every 1 second
    
    return () => clearInterval(interval);
  }, [markets, generateNewBid]);

  // Update the handleSendMessage function to generate more frequent responses
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newChatMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      user: 'You',
      avatar: 'https://i.pravatar.cc/40?img=1', // Keep your avatar consistent
      message: newMessage,
      timestamp: Date.now()
    };
    
    setChatMessages(prev => [...prev, newChatMessage]);
    setNewMessage('');
    
    // Generate 1-3 responses after a short delay
    const responseCount = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < responseCount; i++) {
      setTimeout(() => {
        const responses = [
          "Interesting bet! I think that's real.",
          "No way that's real, definitely AI generated.",
          "The odds on this one are pretty good!",
          "I just won 500 on the last one!",
          "Has anyone heard the Morgan Freeman one yet?",
          "The Trump voice is scary accurate...",
          "I can't tell the difference anymore 😱",
          "This is addictive, I can't stop betting!",
          "Just aped in with my last ETH 🦍",
          "WAGMI on these voice bets 🚀",
          "Ser, this is financial advice - bet FAKE",
          "My diamond hands are ready for more bets 💎👐",
          "Bullish on the Obama voice markets",
          "When voice token airdrop? 🤑",
          "This platform is the future of prediction markets",
          "I'm listening for background noise to tell the difference",
          "The AI can't replicate the emotion in real voices yet",
          "Just made 10x on my last bet!",
          "Who's joining the Discord?",
          "We need a DAO to govern these voice markets"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage: ChatMessage = {
          id: `msg_${Date.now()}_${i}`,
          user: getRandomCryptoUsername(),
          avatar: getRandomNftProfilePic(),
          message: randomResponse,
          timestamp: Date.now()
        };
        
        setChatMessages(prev => [...prev, responseMessage]);
        
        if (sidebarTab !== 0) {
          setUnreadMessages(prev => prev + 1);
        }
      }, 1000 + Math.random() * 2000 + (i * 1500)); // Stagger the responses
    }
  };

  // Add this function to handle tab changes
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSidebarTab(newValue);
    
    // Reset unread counters when switching to the tab
    if (newValue === 0) {
      setUnreadMessages(0);
    } else if (newValue === 1) {
      setUnreadBids(0);
    }
  };

  // Add this function to format timestamps
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Update the useEffect for initializing chat messages with more messages
  useEffect(() => {
    const initialMessages: ChatMessage[] = [
      {
        id: 'msg_1',
        user: 'MoonBoi420',
        avatar: nftProfilePics[0],
        message: 'Hey everyone! Ready to win some bets today?',
        timestamp: Date.now() - 1000 * 60 * 30 // 30 minutes ago
      },
      {
        id: 'msg_2',
        user: 'DiamondHands',
        avatar: nftProfilePics[1],
        message: 'That Elon Musk one was definitely fake, the cadence was off',
        timestamp: Date.now() - 1000 * 60 * 28 // 28 minutes ago
      },
      {
        id: 'msg_3',
        user: 'NFTCollector',
        avatar: nftProfilePics[2],
        message: 'These are getting harder to tell apart every day!',
        timestamp: Date.now() - 1000 * 60 * 25 // 25 minutes ago
      },
      {
        id: 'msg_4',
        user: 'CryptoWizard',
        avatar: nftProfilePics[3],
        message: 'Just won 300 on the Obama clip! The real ones have subtle background noise.',
        timestamp: Date.now() - 1000 * 60 * 22 // 22 minutes ago
      },
      {
        id: 'msg_5',
        user: 'BlockchainBaron',
        avatar: nftProfilePics[4],
        message: 'Anyone else notice the Trump voice sounds more real than the actual Trump?',
        timestamp: Date.now() - 1000 * 60 * 20 // 20 minutes ago
      },
      {
        id: 'msg_6',
        user: 'TokenWhale',
        avatar: nftProfilePics[5],
        message: 'I keep losing on these bets. The AI is too good now.',
        timestamp: Date.now() - 1000 * 60 * 18 // 18 minutes ago
      },
      {
        id: 'msg_7',
        user: 'SatoshisDisciple',
        avatar: nftProfilePics[6],
        message: 'Betting 500 on every market. YOLO!',
        timestamp: Date.now() - 1000 * 60 * 15 // 15 minutes ago
      },
      {
        id: 'msg_8',
        user: 'RektHunter',
        avatar: nftProfilePics[7],
        message: 'The Morgan Freeman one is the hardest to tell. His voice is already so smooth.',
        timestamp: Date.now() - 1000 * 60 * 12 // 12 minutes ago
      },
      {
        id: 'msg_9',
        user: 'ApeInvestor',
        avatar: nftProfilePics[8],
        message: 'Just aped in with my last ETH on Biden being fake 🦍',
        timestamp: Date.now() - 1000 * 60 * 10 // 10 minutes ago
      },
      {
        id: 'msg_10',
        user: 'LaserEyesClub',
        avatar: nftProfilePics[9],
        message: 'When token? When airdrop? 👀',
        timestamp: Date.now() - 1000 * 60 * 8 // 8 minutes ago
      },
      {
        id: 'msg_11',
        user: 'DogeToMars',
        avatar: nftProfilePics[10],
        message: 'The key is to listen for background noise and mic quality. AI is too clean.',
        timestamp: Date.now() - 1000 * 60 * 6 // 6 minutes ago
      },
      {
        id: 'msg_12',
        user: 'YieldFarmer',
        avatar: nftProfilePics[11],
        message: 'I\'m up 2000 today! The odds on these markets are insane.',
        timestamp: Date.now() - 1000 * 60 * 4 // 4 minutes ago
      },
      {
        id: 'msg_13',
        user: 'CryptoPunk9999',
        avatar: nftProfilePics[12],
        message: 'Anyone want to create a betting pool for the next drop?',
        timestamp: Date.now() - 1000 * 60 * 2 // 2 minutes ago
      },
      {
        id: 'msg_14',
        user: 'BoredApeHolder',
        avatar: nftProfilePics[13],
        message: 'This is the future of prediction markets. Bullish AF.',
        timestamp: Date.now() - 1000 * 60 * 1 // 1 minute ago
      }
    ];
    
    setChatMessages(initialMessages);
  }, []);

  // Add an effect to periodically add new chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      // 30% chance of generating a new chat message
      if (Math.random() < 0.3) {
        const messages = [
          "Anyone else think the Oprah one sounds too robotic?",
          "I'm on a winning streak today! 5 for 5!",
          "These voice models are getting scary good",
          "I can't believe I lost 200 on that last one",
          "The key is to listen for breathing patterns",
          "AI can't do the subtle throat clearing sounds yet",
          "I'm going all in on the next Morgan Freeman",
          "Has anyone been keeping track of their win rate?",
          "I think I'm developing an ear for the fake ones",
          "The real voices have more dynamic range in volume",
          "Betting on FAKE has better odds usually",
          "I've made more on this today than my actual job lol",
          "The Biden one was so obviously AI",
          "I'm going to need a bigger wallet for all these winnings",
          "Who's in the top of the leaderboard right now?"
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        const newMessage: ChatMessage = {
          id: `msg_auto_${Date.now()}`,
          user: getRandomCryptoUsername(),
          avatar: getRandomNftProfilePic(),
          message: randomMessage,
          timestamp: Date.now()
        };
        
        setChatMessages(prev => [...prev, newMessage]);
        
        if (sidebarTab !== 0) {
          setUnreadMessages(prev => prev + 1);
        }
      }
    }, 8000); // Try to add a new message every 8 seconds
    
    return () => clearInterval(interval);
  }, [sidebarTab]);

  // Update the calculateMarketMetrics function to handle edge cases and prevent infinity
  const calculateMarketMetrics = useCallback((market: VoiceEmotion) => {
    // Calculate total dollar amount in the market
    const totalDollarAmount = market.totalBets;
    
    // Calculate amount bet on each side
    const realAmount = (market.realVotePercentage / 100) * totalDollarAmount;
    const fakeAmount = (market.fakeVotePercentage / 100) * totalDollarAmount;
    
    // Calculate potential winnings on $100 bet
    // If no bets yet or if one side has 0%, return 2x (even odds)
    let potentialRealWinnings = 200;
    let potentialFakeWinnings = 200;
    
    if (totalDollarAmount > 0) {
      // Only calculate if there's money in the pool and both sides have some percentage
      if (realAmount > 0 && fakeAmount > 0) {
        // Calculate potential winnings, but cap at total pool size
        potentialRealWinnings = Math.min(
          Math.round((100 / realAmount) * totalDollarAmount),
          totalDollarAmount
        );
        
        potentialFakeWinnings = Math.min(
          Math.round((100 / fakeAmount) * totalDollarAmount),
          totalDollarAmount
        );
      }
    }
    
    return {
      totalDollarAmount,
      realAmount,
      fakeAmount,
      potentialRealWinnings,
      potentialFakeWinnings
    };
  }, []);

  // Audio visualization component
  const AudioVisualizer = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    useEffect(() => {
      if (!canvasRef.current || !audioAnalyserRef.current || !audioData) return;
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const analyser = audioAnalyserRef.current;
      const dataArray = audioData;
      
      const renderFrame = () => {
        if (!analyser || !dataArray || !ctx) return;
        
        animationFrameRef.current = requestAnimationFrame(renderFrame);
        
        analyser.getByteFrequencyData(dataArray);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const barWidth = (canvas.width / dataArray.length) * 2.5;
        let barHeight;
        let x = 0;
        
        for (let i = 0; i < dataArray.length; i++) {
          barHeight = dataArray[i] / 2;
          
          ctx.fillStyle = `rgb(${barHeight + 100}, 200, 255)`;
          ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
          
          x += barWidth + 1;
        }
      };
      
      renderFrame();
      
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [audioData]);
    
    return (
      <canvas 
        ref={canvasRef} 
        width={300} 
        height={40} 
        style={{ width: '100%', height: '100%' }}
      />
    );
  };
  
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom, #121212, #1e1e1e)' }}>
      {/* Add this button for testing */}
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={handleResetAllTimers}
        sx={{ position: 'fixed', bottom: 20, left: 20, zIndex: 1000 }}
      >
        Reset All Timers
      </Button>
      
      {/* Rest of your UI */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', pb: 8 }}>
        <Container maxWidth="lg">
          <BetchaLogo />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" component="h2" fontWeight="bold">
              Real or Fake Voice?
            </Typography>
        <SolanaWalletConnect />
      </Box>

      <Grid container spacing={3}>
            {markets.map((market, index) => (
              <Grid item xs={12} sm={6} md={4} key={market.marketId}>
                <Card sx={{ 
                  height: '100%', 
                  bgcolor: '#1e1e1e', 
                  color: 'white', 
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  transform: recentBets[market.marketId] ? 'scale(1.02)' : 'scale(1)',
                  boxShadow: recentBets[market.marketId] 
                    ? '0 0 15px rgba(255, 215, 0, 0.7)' 
                    : 'none',
                  border: recentBets[market.marketId] 
                    ? '1px solid gold' 
                    : '1px solid transparent',
                }}>
                  <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 5 }}>
                    <Chip 
                      icon={<TimerIcon fontSize="small" />}
                      label={`${bettingWindows[market.marketId] || 0}s`} 
                      color={(bettingWindows[market.marketId] || 0) < 10 ? "error" : "primary"}
                      size="small"
                      data-timer="true"
                    />
                  </Box>
                  
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {market.name}
                    </Typography>
                    
                    <Box sx={{ 
                      height: 180, 
                      mb: 2, 
                      borderRadius: 2, 
                      overflow: 'hidden', 
                      position: 'relative',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0,0,0,0.2)'
                    }}>
                      <img 
                        src={market.preview} 
                        alt={market.name}
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '100%', 
                          objectFit: 'contain',
                          position: 'relative',
                          zIndex: 1
                        }} 
                      />
                      
                      {/* Audio play button */}
                      <IconButton
                        onClick={() => handlePlayAudio(market)}
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          right: 10,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          '&:hover': {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                          },
                          zIndex: 2
                        }}
                      >
                        {playingAudio === market.marketId ? <Pause /> : <PlayArrow />}
                      </IconButton>
                      
                      {/* Audio waveform visualization */}
                      {playingAudio === market.marketId && (
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '40px',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 1
                        }}>
                          <AudioVisualizer />
                          <LinearProgress 
                            variant="determinate" 
                            value={audioProgress} 
                            sx={{ 
                              position: 'absolute', 
                              bottom: 0, 
                              left: 0, 
                              right: 0, 
                              height: '3px',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: theme.palette.primary.main
                              }
                            }} 
                          />
                        </Box>
                      )}
                      
                      {/* "Listened" indicator */}
                      {audioListened[market.marketId] && (
                        <Chip
                          label="Listened"
                          size="small"
                          color="primary"
                          sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            zIndex: 2,
                            backgroundColor: 'rgba(76,175,80,0.8)'
                          }}
                        />
                      )}
                      
                      {/* Betting window countdown */}
                      {bettingWindows[market.marketId] !== null && bettingWindows[market.marketId] > 0 && (
                        <Box sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          backgroundColor: 'rgba(0,0,0,0.7)',
                          color: 'white',
                          borderRadius: '50%',
                          width: 40,
                          height: 40,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2
                        }}>
                          <Typography variant="body2">
                            {bettingWindows[market.marketId]}s
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    {/* Market metrics */}
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Real: ${Math.round((market.realVotePercentage / 100) * market.totalBets).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Fake: ${Math.round((market.fakeVotePercentage / 100) * market.totalBets).toLocaleString()}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Win: ${calculateMarketMetrics(market).potentialRealWinnings}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          Win: ${calculateMarketMetrics(market).potentialFakeWinnings}
                        </Typography>
                      </Box>
                      
                      <LinearProgress 
                        variant="determinate" 
                        value={market.realVotePercentage} 
                        sx={{ 
                          height: 8,
                          borderRadius: 4,
                          bgcolor: 'rgba(255,64,129,0.3)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: 'rgba(76,175,80,0.8)'
                          }
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Button 
                        variant="contained" 
                        color="success" 
                        startIcon={<RealIcon />}
                        fullWidth 
                        sx={{ mr: 1 }}
                        onClick={() => handlePlaceBet(market.marketId, 'REAL')}
                      >
                        REAL ({Math.round(market.realVotePercentage)}%)
                      </Button>
                      <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<FakeIcon />}
                        fullWidth 
                        sx={{ ml: 1 }}
                        onClick={() => handlePlaceBet(market.marketId, 'FAKE')}
                      >
                        FAKE ({Math.round(market.fakeVotePercentage)}%)
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Notification */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={6000} 
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(prev => ({ ...prev, open: false }))} 
          severity={notification.type as any} 
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
      
      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sx={{
          width: 320,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 320,
            boxSizing: 'border-box',
            bgcolor: '#1a1a1a',
            color: 'white'
          },
        }}
      >
        {/* Sidebar content */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Activity Feed</Typography>
            <IconButton 
              onClick={() => setSidebarOpen(false)}
              sx={{ color: 'white' }}
            >
              &times;
            </IconButton>
          </Box>
          
          <Tabs 
            value={sidebarTab} 
            onChange={(_, newValue) => {
              setSidebarTab(newValue);
              if (newValue === 0) setUnreadMessages(0);
              if (newValue === 1) setUnreadBids(0);
            }}
            sx={{ 
              mb: 2,
              '& .MuiTab-root': { color: 'rgba(255,255,255,0.7)' },
              '& .Mui-selected': { color: 'white' }
            }}
          >
            <Tab 
              icon={
                <Badge badgeContent={unreadMessages} color="error">
                  <ChatIcon />
                </Badge>
              } 
              label="Chat" 
            />
            <Tab 
              icon={
                <Badge badgeContent={unreadBids} color="error">
                  <ChartIcon />
                </Badge>
              } 
              label="Live Bids" 
            />
            <Tab icon={<PersonIcon />} label="You" />
          </Tabs>
          
          {/* Chat Tab */}
          {sidebarTab === 0 && (
            <>
              <Box sx={{ 
                height: 'calc(100vh - 200px)', 
                overflowY: 'auto',
                mb: 2,
                pr: 1,
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                }
              }}>
                {chatMessages.map((message) => (
                  <Box 
                    key={message.id} 
                    sx={{ 
                      mb: 2,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor: message.isSystem ? 'rgba(255,215,0,0.1)' : 'transparent',
                      border: message.isSystem ? '1px solid rgba(255,215,0,0.3)' : 'none'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                      <Avatar src={message.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {message.user}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {message.message}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', ml: 5 }}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Box sx={{ position: 'sticky', bottom: 0, bgcolor: '#1a1a1a', pt: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && chatInput.trim()) {
                      const newMessage: ChatMessage = {
                        id: `msg_user_${Date.now()}`,
                        user: 'You',
                        avatar: 'https://i.pravatar.cc/40?img=1',
                        message: chatInput.trim(),
                        timestamp: Date.now()
                      };
                      setChatMessages(prev => [...prev, newMessage]);
                      setChatInput('');
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton 
                          edge="end" 
                          onClick={() => {
                            if (chatInput.trim()) {
                              const newMessage: ChatMessage = {
                                id: `msg_user_${Date.now()}`,
                                user: 'You',
                                avatar: 'https://i.pravatar.cc/40?img=1',
                                message: chatInput.trim(),
                                timestamp: Date.now()
                              };
                              setChatMessages(prev => [...prev, newMessage]);
                              setChatInput('');
                            }
                          }}
                          sx={{ color: 'white' }}
                        >
                          <SendIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { 
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.3)'
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'rgba(255,255,255,0.5)'
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main'
                      }
                    }
                  }}
                />
              </Box>
            </>
          )}
          
          {/* Live Bids Tab */}
          {sidebarTab === 1 && (
            <Box sx={{ 
              height: 'calc(100vh - 150px)', 
              overflowY: 'auto',
              pr: 1,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: '4px',
              }
            }}>
              {liveBids.map((bid) => (
                <Paper 
                  key={bid.id} 
                  elevation={0}
                  sx={{ 
                    mb: 2, 
                    p: 1.5, 
                    borderRadius: 2,
                    bgcolor: bid.isHighlighted ? 'rgba(255,215,0,0.1)' : 'rgba(255,255,255,0.05)',
                    border: bid.isHighlighted ? '1px solid rgba(255,215,0,0.3)' : 'none'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar src={bid.avatar} sx={{ width: 32, height: 32, mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {bid.user}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ ml: 5 }}>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      Bet <strong>${bid.amount}</strong> on <strong>{bid.choice.toUpperCase()}</strong>
                    </Typography>
                    
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {bid.marketName}
                    </Typography>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      mt: 1
                    }}>
                      <Chip 
                        label={bid.choice.toUpperCase()} 
                        size="small"
                        color={bid.choice === 'real' ? 'success' : 'error'}
                        sx={{ height: 24 }}
                      />
                      
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        {new Date(bid.timestamp).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          )}
          
          {/* User Tab */}
          {sidebarTab === 2 && (
            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                mb: 3
              }}>
                <Avatar 
                  src="https://i.pravatar.cc/150?img=1" 
                  sx={{ width: 80, height: 80, mb: 2 }}
                />
                <Typography variant="h6">Your Account</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  0x7a...3d4f
                </Typography>
              </Box>
              
              <Paper sx={{ p: 2, mb: 3, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>Balance</Typography>
                <Typography variant="h5" sx={{ mb: 1 }}>$4,285.00</Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={70} 
                  sx={{ 
                    mb: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: '#4caf50'
                    }
                  }}
                />
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  +$1,285.00 today
                </Typography>
              </Paper>
              
              <Typography variant="subtitle2" sx={{ mb: 2 }}>Your Stats</Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Win Rate
                    </Typography>
                    <Typography variant="h6">68%</Typography>
                  </Paper>
        </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Total Bets
                    </Typography>
                    <Typography variant="h6">47</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Avg. Bet
                    </Typography>
                    <Typography variant="h6">$215</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      Rank
                    </Typography>
                    <Typography variant="h6">#42</Typography>
                  </Paper>
        </Grid>
      </Grid>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default App;
