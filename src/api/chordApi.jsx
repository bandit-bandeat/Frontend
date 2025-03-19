import axios from 'axios';

const API_BASE_URL = 'http://18.139.20.145:8080';


export const createChord = async(question) => {
    try{
        const email = localStorage.getItem('email');
        console.log("질문 내용: ", question, "현재 이메일: ", email);
        console.log("엑세스 토큰: ", localStorage.getItem('accessToken'));
        const response = await axios.post(`${API_BASE_URL}/change/code`,{question, email},{
            headers: {
                'Content-Type': 'application/json',
                'AccessToken':localStorage.getItem('accessToken')
            }
        })
        return response.data.answer;
    }catch (error) {
        console.log("에러 확인: ", error);
        console.log("에러 응답 확인: ", error.response);
        console.log("에러 메세지 확인: ", error.message);
        if (error.response) {
            // 서버에서 작성한 에러 메시지 출력
            const eMessage = error.response.data.error;
            return eMessage;
        }
        else{
            return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
        }
    }
}

export const changeMp3 = async(formData) => {
    try{
        // 폼 데이터 확인
        formData.forEach((value, key) => {
            console.log(key, value);  // key는 필드명, value는 필드의 값
        });
        const response = await axios.post(`${API_BASE_URL}/change/music`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'AccessToken':localStorage.getItem('accessToken')
            },
            responseType: 'blob',  // 파일을 blob 형태로 받기
        })
        return response.data;
    }catch (error) {
        if (error.response) {
            // 서버에서 작성한 에러 메시지 출력
            const text = await error.response.data.text();
            const eMessage = JSON.parse(text).error;
            console.log(eMessage)
            return eMessage;
        }
        else{
            return "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
        }
    }
}