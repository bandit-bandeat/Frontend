import { styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';

export const ChartCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  backgroundColor: 'rgba(255,255,255,0.03)',
  backdropFilter: 'blur(10px)',
  borderRadius: theme.spacing(1.5),
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  border: '1px solid rgba(255,255,255,0.05)',
  height: '65px',
  '&:hover': {
    transform: 'translateY(-3px)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    boxShadow: '0 8px 30px rgba(233,30,99,0.1)'
  },
}));

export const RankTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #e91e63, #ffffff)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '1.5rem',
}));

export const pageStyles = {
  mainBox: {
    bgcolor: 'black',
    minHeight: '100vh',
    color: 'white',
    py: 8, // 상하 여백 증가
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 6,
    position: 'relative'
  },
  titleBox: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1
  },
  titleTypography: {
    background: 'linear-gradient(45deg, #c2185b, #e91e63, #ffffff)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700,
    fontSize: '3.5rem', // 제목 크기 증가
  },
  genreSelect: {
    minWidth: 150,
    zIndex: 2,
    '& .MuiOutlinedInput-root': {
      color: 'white',
      borderRadius: '20px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      '& fieldset': {
        border: 'none',
      },
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.08)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255,255,255,0.1)',
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
    },
    '& .MuiSelect-icon': {
      color: 'rgba(255,255,255,0.7)',
    },
    '& .MuiMenuItem-root': {
      fontSize: '0.9rem',
    }
  },
  chartList: {
    display: 'flex', 
    flexDirection: 'column', 
    gap: 1,
    maxWidth: '1200px', // 차트 너비 조정
    mx: 'auto'
  },
  cardContent: {
    flex: 1,
    py: 1,
    px: 2,
    '&:last-child': { pb: 0 }
  },
  songTitle: {
    color: 'white',
    fontSize: '1rem',
    lineHeight: 1.2,
    mb: 0.5,
    fontWeight: 500
  },
  artistName: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '0.875rem',
    lineHeight: 1.2
  },
  infoButton: {
    color: 'secondary.main',
    p: 1,
    '&:hover': {
      backgroundColor: 'rgba(255,0,153,0.1)',
    }
  }
};