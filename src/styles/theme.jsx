import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FF0099',
    },
    accent: {
      blue: '#0099FF',
      orange: '#FF6B00',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Noto Sans KR", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
        },
      },
    },
  },
});