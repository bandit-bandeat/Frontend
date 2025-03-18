import React, { useState } from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';
import { createLogo } from '../api/imageApi'; 

const ImageBot = () => {
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  const handleMessage = async (message) => {
    setLoading(true); // 로고 생성 중 로딩 상태 활성화

    // 로고 생성 중 메시지를 반환
    const loadingMessage = "로고 생성 중...";

    try {
      // 로고 생성 AI API 호출
      const result = await createLogo(message);
      
      if (result.error) {
        return `로고 생성에 실패했습니다: ${result.error}`;
      }

      // 로고 이름과 이미지 URL을 반환
      const { logoName, imageUrl } = result;
      console.log("생성된 이미지 URL: ", imageUrl);

      return (
        <div>
          <p>생성된 로고 이름: {logoName}</p>
          <img src={imageUrl} alt="Generated Logo" style={{ width: '200px', height: '200px' }} />
           <a href={imageUrl} download={logoName} style={{ display: 'block', marginTop: '10px' }}>
            다운로드
          </a>
        </div>
      );
    } catch (error) {
      console.log("에러 발생:", error);
      return "로고 생성 중 오류가 발생했습니다.";
    } finally {
      setLoading(false); // 로딩 상태 비활성화
    }
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="로고 생성 봇"
        onSendMessage={handleMessage}
        placeholder={loading ? "로고 생성 중..." : "원하는 로고 스타일을 얘기하거나 가사를 적어주세요."}
      />
    </BotContainer>
  );
};

export default ImageBot;
