import React from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';

const MusicBot = () => {
  const handleMessage = async (message) => {
    return "음악 생성 중...";
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="음원 생성 봇"
        onSendMessage={handleMessage}
        placeholder="원하는 음악 스타일을 설명해주세요..."
      />
    </BotContainer>
  );
};

export default MusicBot;