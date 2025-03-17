import React from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';

const ImageBot = () => {
  const handleMessage = async (message) => {
    // 로고 생성 AI API 호출
    return "로고를 생성중입니다...";
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="로고 생성 봇"
        onSendMessage={handleMessage}
        placeholder="원하는 로고 스타일을 설명해주세요..."
      />
    </BotContainer>
  );
};

export default ImageBot;