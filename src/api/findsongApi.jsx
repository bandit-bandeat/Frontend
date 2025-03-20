import axios from 'axios';

const API_BASE_URL ='http://18.139.20.145:8080';

export const findsongApi = {
  getRecommendations: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/play/recommend_songs`,
        data,  // { songs: [...] } 형태로 전송
        {
          headers: {
            'Content-Type': 'application/json',
            'AccessToken': localStorage.getItem('accessToken')
          }
        }
      );
      
      // 서버의 응답을 그대로 반환
      return response.data;
      
    } catch (error) {
      console.error("에러 확인: ", error);
      throw error;
    }
  }
};