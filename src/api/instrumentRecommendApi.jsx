import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

export const instrumentRecommendApi = {
  getRecommendations: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/recommend`, 
        { message },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const { recommendations, models } = response.data;
      
      return {
        success: true,
        recommendations,
        models
      };
      
    } catch (error) {
      console.error("API 에러:", error);
      return {
        success: false,
        error: error.response?.data?.error || '서버 통신 중 오류가 발생했습니다.'
      };
    }
  }
};