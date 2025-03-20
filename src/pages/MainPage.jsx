import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PianoIcon from '@mui/icons-material/Piano';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import PaletteIcon from '@mui/icons-material/Palette';
import Lottie from 'lottie-react';
import soundAnimation from '../assets/sound.json';
import { useNavigate } from 'react-router-dom';


// 클릭하면 해당 기능으로 이동하게 설정
const features = [
  {
    icon: <AudiotrackIcon sx={{ fontSize: 60 }} />,
    title: "악기 추천",
    description: "현재 목표에 맞는 최적의 악기를 찾아드립니다!"
  },
  {
    icon: <PianoIcon sx={{ fontSize: 60 }} />,
    title: "코드 추천",
    description: "장르에 맞는 최적의 코드 진행을 추천합니다!"
  },
  {
    icon: <PlaylistPlayIcon sx={{ fontSize: 60 }} />,
    title: "곡 추천",
    description: "멤버들의 취향을 분석해 딱 맞는 곡을 찾아드려요!"
  },
  {
    icon: <PaletteIcon sx={{ fontSize: 60 }} />,
    title: "로고 생성",
    description: "우리 밴드만의 개성있는 로고를 디자인하세요!"
  }
];

const AnimatedTitle = styled(Typography)({
  '@keyframes gradient': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' }
  },
  fontSize: '6rem',
  fontWeight: 700,
  background: 'linear-gradient(45deg, #c2185b, #e91e63, #ffffff, #ffffff, #ffffff)',
  backgroundSize: '200% 200%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: 'gradient 5s ease infinite',
});

const Footer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  marginTop: 'auto',
}));

const MainPage = () => {
  const renderHeroSection = () => (
    <Box sx={{
      height: '30vh',
      minHeight: '300px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    }}>
      <Box sx={{
      width: '200px',  
      height: '250px', 
      mb: 1, 
    }}>
      <Lottie
        animationData={soundAnimation}
        loop={true}
      />
    </Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatedTitle variant="h1">
          BANDIT
        </AnimatedTitle>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 300,
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '800px',
            mt: 2,
            mb: 6,
          }}
        >
          당신의 밴드 여정을 함께할 AI 뮤직 파트너
        </Typography>
      </motion.div>
    </Box>
  );

  const renderFeatureCard = (feature, index) => (
    <Grid item xs={12} md={3} key={index}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 * index, duration: 0.8 }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            height: '100%',
            backgroundColor: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: 4,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-8px)',
              backgroundColor: 'rgba(255,255,255,0.08)',
              boxShadow: '0 12px 40px rgba(233,30,99,0.15)'
            },
          }}
        >
          <Box sx={{ color: '#e91e63', mb: 3 }}>{feature.icon}</Box>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              background: 'linear-gradient(45deg, #e91e63, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}
          >
            {feature.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}
          >
            {feature.description}
          </Typography>
        </Paper>
      </motion.div>
    </Grid>
  );

  return (
    <Box sx={{
      bgcolor: 'black',
      Height: '100vh',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Container maxWidth="lg" sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        py: 4 
      }}>
        {renderHeroSection()}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Grid container spacing={4} sx={{ 
            minHeight: '400px',
            mt: 2 
          }}>
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </Grid>
        </motion.div>

        <Footer>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem',
              letterSpacing: '1px'
            }}
          >
            Copyright © 2024 SK Shieldus Rookies_2. All rights reserved.
          </Typography>
        </Footer>
      </Container>
    </Box>
  );
};

export default MainPage;