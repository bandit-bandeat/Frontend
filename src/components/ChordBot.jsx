import React from 'react';
import { Box } from '@mui/material';
import ChatTemplate from './ChatTemplate';

const ChordBot = () => {
  const handleMessage = async (message) => {
    // 코드 추천 AI API 호출
    return "코드 진행을 생성중입니다...";
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
      botName="코드 추천 봇"
      onSendMessage={handleMessage}
      pl
      aceholder="원하는 코드 진행을 설명해주세요..."
    />
  </Box>
  );
};

export default ChordBot;