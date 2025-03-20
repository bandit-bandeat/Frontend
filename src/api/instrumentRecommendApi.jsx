import axios from 'axios';

const API_BASE_URL ='http://18.139.20.145:8080';

export const instrumentRecommendApi = {
  getRecommendations: async (message) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/ins/recommend`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
            'AccessToken':localStorage.getItem('accessToken')
          }
        }
      );
      
      // API 응답을 그대로 반환 (이미 success, recommendations, models를 포함하고 있음)
      return response.data;
      
    } catch (error) {
      console.error("에러 확인: ", error);
      console.error("에러 응답 확인: ", error.response);
      console.error("에러 메세지 확인: ", error.message);
      
      let errorMessage = '서버 통신 중 오류가 발생했습니다.';
      if (error.response) {
        // 서버가 응답을 반환한 경우
        if (error.response.data && error.response.data.error) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = `서버 오류: ${error.response.status} - ${error.response.statusText}`;
        }
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        errorMessage = '서버로부터 응답을 받지 못했습니다.';
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        errorMessage = `요청 설정 오류: ${error.message}`;
      }
      
      return {
        success: false,
        error: errorMessage
      };
    }
  }
};