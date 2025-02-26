import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  Typography,
  IconButton,
  Modal,
} from "@mui/material";
import { VoiceEmotion } from "../App";
import WaveformVisualizer from "./WaveformVisualizer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface VoiceMarketProps {
  market: VoiceEmotion;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: "600px",
  bgcolor: "rgba(20, 20, 30, 0.95)",
  border: "2px solid #000",
  borderRadius: "16px",
  boxShadow: 24,
  p: 4,
};

const stampStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%) rotate(-15deg)",
  padding: "10px 20px",
  border: "4px solid",
  borderRadius: "8px",
  fontSize: "24px",
  fontWeight: "bold",
  textTransform: "uppercase",
  opacity: 0.8,
  pointerEvents: "none",
};

const VoiceMarket: React.FC<VoiceMarketProps> = ({
  market,
  isPlaying,
  onPlayPause,
}) => {
  const [showWaveforms, setShowWaveforms] = useState(false);
  const [countdown, setCountdown] = useState(59);
  const [activeWaveform, setActiveWaveform] = useState<number | null>(null);
  const [waveformLabels, setWaveformLabels] = useState<{
    [key: number]: "legit" | "deepfake" | null;
  }>({
    1: null,
    2: null,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showWaveforms && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleClose(); // Auto close when countdown reaches 0
    }
    return () => clearInterval(timer);
  }, [showWaveforms, countdown]);

  const handleListen = () => {
    setShowWaveforms(true);
    setCountdown(59);
  };

  const handleWaveformPlay = (index: number) => {
    if (activeWaveform === index) {
      setActiveWaveform(null);
    } else {
      setActiveWaveform(index);
    }
  };

  const handleLabel = (waveformIndex: number, label: "legit" | "deepfake") => {
    setWaveformLabels((prev) => {
      // If the same label is clicked again, remove both labels
      if (prev[waveformIndex] === label) {
        return { 1: null, 2: null };
      }

      const otherIndex = waveformIndex === 1 ? 2 : 1;
      const otherLabel = label === "legit" ? "deepfake" : "legit";
      return {
        [waveformIndex]: label,
        [otherIndex]: otherLabel,
      };
    });
  };

  const handleClose = () => {
    setShowWaveforms(false);
    setCountdown(59);
    setActiveWaveform(null);
    setWaveformLabels({ 1: null, 2: null });
  };

  return (
    <Card
      sx={{
        background: "rgba(20, 20, 30, 0.8)",
        borderRadius: "16px",
        padding: "1rem",
      }}
    >
      <Typography variant="h6">{market.name}</Typography>

      <Box sx={{ position: "relative", mt: 2 }}>
        <img
          src={market.preview}
          alt="Preview"
          style={{
            width: "100%",
            height: "100px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={() => setShowWaveforms(true)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          }}
        >
          Listen to Bid
        </Button>
      </Box>

      <Modal
        open={showWaveforms}
        onClose={handleClose}
        aria-labelledby="waveform-modal"
      >
        <Box sx={modalStyle}>
          <Typography
            variant="h6"
            align="center"
            color="primary"
            sx={{ mb: 2 }}
          >
            {countdown} seconds remaining to Place your Bid
          </Typography>

          {[1, 2].map((index) => (
            <Box key={index} sx={{ mb: 2, position: "relative" }}>
              <Typography variant="subtitle1">Waveform {index}</Typography>
              <Box sx={{ position: "relative" }}>
                <WaveformVisualizer
                  audioUrl={market.audioUrl}
                  isPlaying={activeWaveform === index}
                  onPlayPause={() => handleWaveformPlay(index)}
                  showIcon={!waveformLabels[index]}
                />
                {waveformLabels[index] && (
                  <Box
                    sx={{
                      ...stampStyle,
                      color:
                        waveformLabels[index] === "legit"
                          ? "#4CAF50"
                          : "#FF0000",
                      borderColor:
                        waveformLabels[index] === "legit"
                          ? "#4CAF50"
                          : "#FF0000",
                    }}
                  >
                    {waveformLabels[index]}
                  </Box>
                )}
              </Box>
              {!waveformLabels[index] ? (
                <Box display="flex" justifyContent="center" mt={1}>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<VerifiedUserIcon />}
                    onClick={() => handleLabel(index, "legit")}
                    sx={{ mr: 1 }}
                  >
                    Legit
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="error"
                    startIcon={<SmartToyIcon />}
                    onClick={() => handleLabel(index, "deepfake")}
                  >
                    Deepfake
                  </Button>
                </Box>
              ) : null}
            </Box>
          ))}

          {Object.values(waveformLabels).every(Boolean) && (
            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                background: "linear-gradient(45deg, #FF9800 30%, #FFB74D 90%)",
              }}
            >
              Bid 0.5 SOL
            </Button>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default VoiceMarket;
