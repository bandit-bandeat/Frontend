import React from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';
import {createChord} from '../api/chordApi';

const ChordBot = () => {
  const handleMessage = async (message) => {
    // 코드 추천 AI API 호출
    console.log("입력한 메세지: ", message)  ;
    const response = await createChord(message, "asd");
    console.log(response);
    return response;

  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="코드 추천 봇"
        onSendMessage={handleMessage}
        placeholder="원하는 노래와 바꾸고 싶은 장르를 적어주세요... ex) 00의 00을 00장르로 바꿔줘"
      />
    </BotContainer>
  );
};

export default ChordBot;