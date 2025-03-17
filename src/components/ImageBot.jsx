import React from 'react';
import { Box } from '@mui/material';
import ChatTemplate from './ChatTemplate';

const ImageBot = () => {
  const handleMessage = async (message) => {
    // 로고 생성 AI API 호출
    return "로고를 생성중입니다...";
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
      botName="로고 생성 봇"
      onSendMessage={handleMessage}
      placeholder="원하는 로고 스타일을 설명해주세요..."
    />
  </Box>
  );
};

export default ImageBot;