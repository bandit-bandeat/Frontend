import React from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';

const ChordBot = () => {
  const handleMessage = async (message) => {
    // 코드 추천 AI API 호출
    return "코드 진행을 생성중입니다...";
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="코드 추천 봇"
        onSendMessage={handleMessage}
        placeholder="원하는 코드 진행을 설명해주세요..."
      />
    </BotContainer>
  );
};

export default ChordBot;