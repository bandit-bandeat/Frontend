import React from 'react';
import { Box } from '@mui/material';
import ChatTemplate from './ChatTemplate';

const MusicBot = () => {
  const handleMessage = async (message) => {
    return "음악 생성 중...";
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
        botName="음원 생성 봇"
        onSendMessage={handleMessage}
        placeholder="원하는 음악 스타일을 설명해주세요..."
      />
    </Box>
  );
};

export default MusicBot;