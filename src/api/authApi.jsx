import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://18.139.20.145:8080';

export const login = async (email, password) => {
  try {
    console.log('Sending login request:', { email, password });
    const response = await axios.post(`${API_BASE_URL}/auth/login`, qs.stringify({ email, password }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });
    console.log('Login response:', response.data);
    // 엑세스토큰 저장
    localStorage.setItem('accessToken',response.headers['accesstoken']);
    // 이메일 저장
    localStorage.setItem('email',response.data.userDto.email);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('로그인에 실패했습니다.');
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.post(`${API_BASE_URL}/auth/logout`, {}, {
      withCredentials: true
    });
    console.log(response)
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('email');
  }
};

export const signup = async (email, password, nickname, birth, preGenres) => {
  try {
    console.log('Sending signup request:', { email, password, nickname, birth, preGenres });
    const response = await axios.post(`${API_BASE_URL}/auth/join`, { email, password, nickname, birth, preGenres }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Signup response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Signup error:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('회원가입에 실패했습니다.');
  }
};
