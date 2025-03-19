import axios from 'axios';

const BASE_URL = 'http://18.139.20.145:8080';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    // 게시글 볼 때는 엑세스 토큰 필요 없음
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      //config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // if (error.response && error.response.status === 401) {
    //   localStorage.removeItem('accessToken');
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

const postApi = {
  // 게시글 작성
  writePost: async (title, content, kind, token, files) => {
    console.log(title)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('kind', kind);
    
    // 파일이 있을 경우 formData에 첨부
    if (files) {
      files.forEach(file => formData.append('files', file));
    }

    try {
      const response = await axiosInstance.post('/post/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${token}`,  // 토큰을 Authorization 헤더로 전송
        },
      });
      return response.data;
    } catch (error) {
      console.error('writePost Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

    // 게시글 목록 조회 (전체)
    getAllPosts: async (size, page) => {
      try {
        const response = await axiosInstance.get('/post/get/all', {
          params: { size, page },
        });
        return response.data;
      } catch (error) {
        console.error('getAllPosts Error:', error);
        throw error;
      }
    },

  // 게시글 목록 조회 (카테고리별)
  getPostsByKind: async (size, page, kind) => {
    try {
      const response = await axiosInstance.get('/post/get/kind', {
        params: { size, page, kind },
      });
      console.log("게시판 불러오는 중: ", kind);
      return response.data;
    } catch (error) {
      console.error('getPostsByKind Error:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  getPostDetail: async (postId) => {
    try {
      const response = await axiosInstance.get(`/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('getPostDetail Error:', error);
      throw error;
    }
  },

  // 게시글 수정
  updatePost: async (postId, content, token, files) => {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('content', content);
    if (Array.isArray(files)) {
      files.forEach(file => formData.append('files', file));
    }
    console.log("토큰확인 2: ", token);
    try {
      const response = await axiosInstance.post('/post/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token,
        },
      });
      return response.data;
    } catch (error) {
      console.error('updatePost Error:', error);
      throw error;
    }
  },

  // 게시글 검색
  searchPosts: async (category, keyword, size, page) => {
    try {
      // category가 '제목+내용'으로 처리되도록 수정
      const response = await axiosInstance.get('/post/search', {
        params: {
          category: "제목+내용", // 제목과 내용으로 검색
          keyword,
          size,
          page,
        },
      });
      return response.data;
    } catch (error) {
      console.error('searchPosts Error:', error);
      throw error;
    }
  },


  // 게시글 삭제
  deletePost: async (postId, token) => {
    try {
      const response = await axiosInstance.post(
        `/post/delete/${postId}`,  // URL에 postId를 포함
        null, // 본문을 비워둡니다
        {
          headers: {
            'Authorization': `${token}`,  // Authorization 헤더에 토큰을 포함 (Bearer 토큰 형식)
          }
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error('deletePost Error:', error.response ? error.response.data : error.message);
      throw error;
    }
  },

  // 게시글 좋아요
  likePost: async (token, postId) => {
    try {
      const response = await axiosInstance.post('/post/like', { token, postId });
      return response.data;
    } catch (error) {
      console.error('likePost Error:', error);
      throw error;
    }
  },

  // 댓글 작성
  writeComment: async (token, postId, content) => {
    try {
      const response = await axiosInstance.post('/comment/write', { token, postId, content });
      return response.data;
    } catch (error) {
      console.error('writeComment Error:', error);
      throw error;
    }
  },

  // 댓글 삭제
  deleteComment: async (token, commentId) => {
    try {
      const response = await axiosInstance.post('/comment/delete', { token, commentId });
      return response.data;
    } catch (error) {
      console.error('deleteComment Error:', error);
      throw error;
    }
  },

  // 댓글 좋아요
  likeComment: async (token, commentId) => {
    try {
      const response = await axiosInstance.post('/comment/like', { token, commentId });
      return response.data;
    } catch (error) {
      console.error('likeComment Error:', error);
      throw error;
    }
  },
};

export default postApi;