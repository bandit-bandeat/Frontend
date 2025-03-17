import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { motion } from 'framer-motion';

const EatBotIntro = () => {
  const features = [
    {
      title: "음원 봇",
      description: "똑똑한 AI가 당신만의 특별한 멜로디를 요리해드려요! 🎵",
      position: 'left'
    },
    {
      title: "코드 봇",
      description: "완벽한 코드 진행을 위한 비밀 레시피를 알려드려요! ✨",
      position: 'right'
    },
    {
      title: "추천 봇",
      description: "당신의 취향을 저격하는 특별 메뉴를 준비했어요! 🎯",
      position: 'left'
    },
    {
      title: "이미지 봇",
      description: "밴드의 개성을 담은 로고를 맛있게 디자인해드려요! 🎨",
      position: 'right'
    }
  ];

  const MessageBubble = ({ feature, index }) => (
    <motion.div
      initial={{ opacity: 0, x: feature.position === 'left' ? -50 : 50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        delay: index * 0.2, 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ scale: 1.02 }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: feature.position === 'left' ? 'row' : 'row-reverse',
          mb: 4,
          gap: 2,
        }}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #FF0099, #e91e63)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 4px 20px rgba(233, 30, 99, 0.3)',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 35 }} />
          </Box>
        </motion.div>
        
        <Paper
          elevation={0}
          sx={{
            background: 'linear-gradient(to right, #fff, #fafafa)',
            borderRadius: 4,
            p: 3,
            position: 'relative',
            flex: 1,
            maxWidth: '500px',
            border: '2px solid rgba(233, 30, 99, 0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #FF0099, #e91e63)',
            },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: '#333',
              fontWeight: 700,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {feature.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontSize: '1.1rem',
              lineHeight: 1.6,
            }}
          >
            {feature.description}
          </Typography>
        </Paper>
      </Box>
    </motion.div>
  );

  return (
    <Box sx={{ 
      bgcolor: 'white',
      minHeight: '100vh',
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      background: 'linear-gradient(45deg, #fff 30%, #fef6f9 90%)',
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h1"
            align="center"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 800,
              background: 'linear-gradient(45deg, #FF0099, #e91e63)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '2px 2px 4px rgba(233, 30, 99, 0.2)',
            }}
          >
            EAT BOT
          </Typography>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                color: '#333',
                fontSize: { xs: '1.5rem', md: '2.2rem' },
                fontWeight: 600,
                mb: 8,
                letterSpacing: '0.5px',
              }}
            >
              음악을 더 맛있게 만들어드려요 ✨
            </Typography>
          </motion.div>
        </motion.div>

        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {features.map((feature, index) => (
            <MessageBubble key={index} feature={feature} index={index} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default EatBotIntro;