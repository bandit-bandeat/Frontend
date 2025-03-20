import axios from 'axios';

const API_BASE_URL = 'http://18.139.20.145:8080'; 

// 로고 생성 함수
export const createLogo = async (lyrics) => {
    try {
        const email = localStorage.getItem('email');
        console.log("가사 내용: ", lyrics, "현재 이메일: ", email);
        console.log("엑세스 토큰: ", localStorage.getItem('accessToken'));
        
        const response = await axios.post(`${API_BASE_URL}/generatelogo`, { lyrics, email }, {
            headers: {
                'Content-Type': 'application/json',
                'AccessToken': localStorage.getItem('accessToken')
            }
        });
        
        // 성공적으로 응답이 오면 로고 이름과 이미지 URL 반환
        const { logo_name, s3_url } = response.data;
        console.log("생성된 로고 이름:", logo_name);
        console.log("로고 이미지 URL:", s3_url);

        return {
            logoName: logo_name,
            imageUrl: s3_url
        };
    } catch (error) {
        console.log("에러 확인: ", error);
        console.log("에러 응답 확인: ", error.response);
        console.log("에러 메세지 확인: ", error.message);

        if (error.response) {
            // 서버에서 작성한 에러 메시지 출력
            const eMessage = error.response.data.error;
            return { error: eMessage };
        } else {
            return { error: "알 수 없는 오류가 발생했습니다." };
        }
    }
};

