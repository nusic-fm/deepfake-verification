import React, { useEffect, useState, useRef } from 'react';
import ytAudioStorage from '../services/storage/ytAudio.storage';
import { Box, IconButton, Slider, Typography, Stack } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';

interface AudioPlayerProps {
  audioId?: string;
  useDummy?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioId, useDummy = false }) => {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const loadAudio = async () => {
      try {
        let url;
        if (useDummy || !audioId) {
          url = await ytAudioStorage.getDummyAudioUrl();
        } else {
          url = await ytAudioStorage.getAudioUrl(audioId);
        }
        setAudioUrl(url);
      } catch (error) {
        console.error('Error loading audio:', error);
      }
    };

    loadAudio();
  }, [audioId, useDummy]);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
      };
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };
      
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current && typeof newValue === 'number') {
      audioRef.current.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 500, p: 2 }}>
      {audioUrl && (
        <>
          <audio ref={audioRef} src={audioUrl} preload="metadata" />
          
          <Stack spacing={2} direction="row" alignItems="center" sx={{ mb: 1 }}>
            <IconButton onClick={togglePlayPause} aria-label={isPlaying ? 'pause' : 'play'}>
              {isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            
            <Slider
              value={currentTime}
              min={0}
              max={duration || 100}
              onChange={handleSliderChange}
              aria-labelledby="audio-slider"
            />
            
            <Typography variant="caption" color="text.secondary">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Typography>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default AudioPlayer; 