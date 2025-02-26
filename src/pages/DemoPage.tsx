import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import AudioPlayer from '../components/AudioPlayer';

const DemoPage: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Audio Player Demo
        </Typography>
        
        <Typography variant="subtitle1" gutterBottom>
          Playing dummy audio file from Firebase Storage
        </Typography>
        
        <AudioPlayer useDummy={true} />
      </Box>
    </Container>
  );
};

export default DemoPage; 