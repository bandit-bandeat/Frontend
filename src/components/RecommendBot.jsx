import React from 'react';
import { Box } from '@mui/material';
import ChatTemplate from './ChatTemplate';

const RecommendBot = () => {
  const handleMessage = async (message) => {
    return "음악을 추천중입니다...";
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: { xs: '100%', md: 'calc(100vh - 80px)' },
      display: 'flex',
      flexDirection: 'column',
      p: { xs: 1, sm: 2},
      overflow: 'auto'
    }}>
    <ChatTemplate
      botName="음악 추천 봇"
      onSendMessage={handleMessage}
      placeholder="어떤 음악을 찾으시나요?"
    />
  </Box>
  );
};

export default RecommendBot;