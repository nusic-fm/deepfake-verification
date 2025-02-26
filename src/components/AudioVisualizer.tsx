import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface AudioVisualizerProps {
  audioData: Uint8Array | null;
  height: number;
  width: number;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ audioData, height, width }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioData) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Set up the visualization style
    const barWidth = width / audioData.length;
    const barGap = 2;
    const adjustedBarWidth = barWidth - barGap;
    
    // Draw the frequency bars
    for (let i = 0; i < audioData.length; i++) {
      const barHeight = (audioData[i] / 255) * height;
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
      gradient.addColorStop(0, '#2196f3');
      gradient.addColorStop(0.5, '#03a9f4');
      gradient.addColorStop(1, '#00bcd4');
      
      ctx.fillStyle = gradient;
      
      // Draw bar
      ctx.fillRect(
        i * barWidth, 
        height - barHeight, 
        adjustedBarWidth, 
        barHeight
      );
    }
  }, [audioData, height, width]);

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <canvas 
        ref={canvasRef} 
        height={height} 
        width={width} 
        style={{ 
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.05)',
        }}
      />
    </Box>
  );
};

export default AudioVisualizer; 