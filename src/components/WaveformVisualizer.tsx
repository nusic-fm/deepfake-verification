import { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

interface WaveformVisualizerProps {
  audioUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  showIcon?: boolean;
}

const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  audioUrl,
  isPlaying,
  onPlayPause,
  showIcon = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // initializeAudio();
    if (audioRef.current) {
      return;
    }
    const audio = new Audio();
    audio.src = audioUrl;
    audio.preload = "auto";
    audioRef.current = audio;
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  //   const initializeAudio = async () => {
  //     if (initialized) return;

  //     try {
  //       // Create and load the audio element
  //       const audio = new Audio();
  //       audio.src = audioUrl;
  //       audio.preload = "auto";
  //       audioRef.current = audio;

  //       // Create audio context and nodes
  //       const audioContext = new (window.AudioContext ||
  //         (window as any).webkitAudioContext)();
  //       const analyser = audioContext.createAnalyser();
  //       const source = audioContext.createMediaElementSource(audio);

  //       // Connect the audio nodes
  //       source.connect(analyser);
  //       analyser.connect(audioContext.destination);
  //       analyser.fftSize = 256;

  //       audioContextRef.current = audioContext;
  //       analyserRef.current = analyser;

  //       // Add event listeners
  //       audio.addEventListener("ended", () => {
  //         onPlayPause();
  //       });

  //       setInitialized(true);
  //     } catch (error) {
  //       console.error("Error initializing audio:", error);
  //     }
  //   };

  //   useEffect(() => {
  //     if (!initialized) return;

  //     const audio = audioRef.current;
  //     const audioContext = audioContextRef.current;

  //     if (!audio || !audioContext) return;

  //     if (isPlaying) {
  //       // Resume audio context if suspended
  //       if (audioContext.state === "suspended") {
  //         audioContext.resume();
  //       }

  //       // Play audio
  //       const playPromise = audio.play();
  //       if (playPromise !== undefined) {
  //         playPromise.catch((error) => {
  //           console.error("Playback failed:", error);
  //         });
  //       }

  //       // Start visualization
  //       startVisualization();
  //     } else {
  //       // Pause audio
  //       audio.pause();
  //       if (animationRef.current) {
  //         cancelAnimationFrame(animationRef.current);
  //       }
  //     }

  //     return () => {
  //       if (animationRef.current) {
  //         cancelAnimationFrame(animationRef.current);
  //       }
  //     };
  //   }, [isPlaying, initialized]);

  //   const startVisualization = () => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas?.getContext("2d");
  //     const analyser = analyserRef.current;

  //     if (!canvas || !ctx || !analyser) return;

  //     const dataArray = new Uint8Array(analyser.frequencyBinCount);

  //     const animate = () => {
  //       animationRef.current = requestAnimationFrame(animate);
  //       analyser.getByteFrequencyData(dataArray);

  //       ctx.fillStyle = "rgba(10, 10, 18, 0.2)";
  //       ctx.fillRect(0, 0, canvas.width, canvas.height);

  //       const barWidth = (canvas.width / dataArray.length) * 2.5;
  //       let barHeight;
  //       let x = 0;

  //       for (let i = 0; i < dataArray.length; i++) {
  //         barHeight = dataArray[i] / 2;
  //         ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
  //         ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
  //         x += barWidth + 1;
  //       }
  //     };

  //     animate();
  //   };

  const togglePlay = async () => {
    try {
      if (!initialized) {
        //   await initializeAudio();
      }
      onPlayPause();
    } catch (error) {
      console.error("Error toggling play:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", height: "120px" }}>
      {/* <canvas
        ref={canvasRef}
        width={400}
        height={120}
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.2)",
          borderRadius: "8px",
        }}
      /> */}
      <IconButton
        onClick={togglePlay}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(255,255,255,0.1)",
          "&:hover": {
            backgroundColor: "rgba(255,255,255,0.2)",
          },
        }}
      >
        {showIcon ? isPlaying ? <PauseIcon /> : <PlayArrowIcon /> : null}
      </IconButton>
    </Box>
  );
};

export default WaveformVisualizer;
