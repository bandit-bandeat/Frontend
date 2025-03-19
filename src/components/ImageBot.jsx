import React, { useState } from 'react';
import ImageTemplate from './ImageTemplate';
import { BotContainer } from '../styles/BotStyles';
import { createLogo } from '../api/imageApi'; 

const ImageBot = () => {
  const [loading, setLoading] = useState(false); 

  const handleMessage = async (message) => {
    setLoading(true); 

    
    const loadingMessage = "로고 생성 중...";

    try {
    
      const result = await createLogo(message);
      
      if (result.error) {
        return `로고 생성에 실패했습니다: ${result.error}`;
      }

     
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
      setLoading(false); 
    }
  };

  return (
    <BotContainer>
      <ImageTemplate
        botName="로고 생성 봇"
        onSendMessage={handleMessage}
        placeholder={loading ? "로고 생성 중..." : "원하는 로고 스타일을 얘기하거나 가사를 적어주세요."}
      />
    </BotContainer>
  );
};

export default ImageBot;
