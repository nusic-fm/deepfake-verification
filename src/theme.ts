import { createTheme } from '@mui/material/styles';

// Create a custom theme with vibrant colors
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00e676', // Bright green
    },
    secondary: {
      main: '#ff3d00', // Vibrant orange
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    error: {
      main: '#ff1744',
    },
    success: {
      main: '#00e676',
    },
    info: {
      main: '#2979ff',
    },
    warning: {
      main: '#ffea00',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(0, 230, 118, 0.4)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #00e676 30%, #00c853 90%)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #ff3d00 30%, #dd2c00 90%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
