import React, { useState } from 'react';
import ChatTemplate from './ChatTemplate';
import { BotContainer } from '../styles/BotStyles';
import { instrumentRecommendApi } from '../api/instrumentRecommendApi';

const MusicBot = () => {
  const [loading, setLoading] = useState(false);

  const handleMessage = async (message) => {
    try {
      setLoading(true);
      
      const response = await instrumentRecommendApi.getRecommendations(message);
      console.log("추천 결과:", response);
      
      if (response.success) {
        return (
          <>
            <div style={{ whiteSpace: 'pre-line' }}>
              {response.recommendations}
            </div>

            {response.models && response.models.length > 0 && (
              <div style={{ marginTop: '20px' }}>
                {response.models.map((product, index) => (
                  <div key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '12px',
                    padding: '15px',
                    marginBottom: '15px',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {product.image && (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        style={{
                          width: '100%',
                          maxWidth: '250px',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto 15px',
                          borderRadius: '8px'
                        }}
                      />
                    )}
                    <h3 style={{ 
                      margin: '0 0 10px 0',
                      fontSize: '1.1rem',
                      color: '#333'
                    }}>
                      {product.name}
                    </h3>
                    {product.price && (
                      <p style={{ 
                        margin: '5px 0',
                        fontSize: '1.2rem',
                        color: '#e44d26',
                        fontWeight: 'bold'
                      }}>
                        {Number(product.price).toLocaleString()}원
                      </p>
                    )}
                    {product.link && (
                      <a 
                        href={product.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '8px 16px',
                          backgroundColor: '#FF0099',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          marginTop: '10px',
                          transition: 'background-color 0.2s',
                          hover: {
                            backgroundColor: '#d4007f'
                          }
                        }}
                      >
                        구매하기
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        );
      } else {
        return response.error || '죄송합니다. 추천을 가져오는데 실패했습니다.';
      }
      
    } catch (error) {
      console.error("에러 발생:", error);
      return '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.';
    } finally {
      setLoading(false);
    }
  };

  const getInitialMessage = () => {
    if (loading) {
      return "악기 추천을 찾아보는 중입니다...";
    }
    return null;
  };

  return (
    <BotContainer>
      <ChatTemplate
        botName="악기 봇"
        onSendMessage={handleMessage}
        initialMessage={getInitialMessage()}
        placeholder={loading ? "잠시만 기다려주세요..." : "원하는 악기와 예산을 입력해주세요... ex) 50만원대 일렉기타 추천해줘"}
      />
    </BotContainer>
  );
};

export default MusicBot;