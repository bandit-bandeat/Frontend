import React from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';

const RecommendBot = () => {
  const handleMessage = async (message) => {
    return "음악을 추천중입니다...";
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="음악 추천 봇"
        onSendMessage={handleMessage}
        placeholder="어떤 음악을 찾으시나요?"
      />
    </BotContainer>
  );
};

export default RecommendBot;