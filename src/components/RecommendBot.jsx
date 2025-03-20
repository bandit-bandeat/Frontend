import React, { useState } from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';
import { findsongApi } from '../api/findsongApi';

const RecommendBot = () => {
  const [isLoading, setIsLoading] = useState(false);

  const validateInput = (message) => {
    const pattern = /^.+\s*-\s*.+$/;
    if (!pattern.test(message)) {
      return {
        isValid: false,
        error: "올바른 형식으로 입력해주세요 (예: Blinding Lights - The Weeknd)"
      };
    }
    return { isValid: true };
  };

  const handleMessage = async (message) => {
    try {
      const validation = validateInput(message);
      if (!validation.isValid) {
        return validation.error;
      }

      setIsLoading(true);
      
      const response = await findsongApi.getRecommendations({
        songs: [message]
      });

      if (!response.recommendations || response.recommendations.trim() === '') {
        return "죄송합니다. 추천 결과를 받아오지 못했습니다.";
      }

      return formatResponse(response.recommendations);

    } catch (error) {
      console.error("음악 추천 오류:", error);
      return "음악 추천 중 오류가 발생했습니다.";
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (response) => {
    try {
      const sections = response.split(/(?=\d\.)/);
      
      return (
        <div style={{ whiteSpace: 'pre-line', textAlign: 'left' }}>
          {sections.map((section, index) => {
            const [title, ...content] = section.split('\n');
            return (
              <div key={index}>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginTop: '10px', 
                  color: '#2c3e50' 
                }}>
                  {title.trim()}
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  {content
                    .filter(line => line.trim())
                    .map((line, i) => (
                      <div key={i} style={{ margin: '5px 0' }}>
                        {line.trim()}
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    } catch (error) {
      console.error('응답 형식 처리 오류:', error);
      return <div style={{ whiteSpace: 'pre-line' }}>{response}</div>;
    }
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="음악 추천 봇"
        onSendMessage={handleMessage}
        placeholder="곡 제목 - 아티스트 형식으로 입력하세요 (예: Blinding Lights - The Weeknd)"
        isLoading={isLoading}
      />
    </BotContainer>
  );
};

export default RecommendBot;
