import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // useParams, useNavigate import
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';  // MUI 컴포넌트들 import
import ArrowBackIcon from '@mui/icons-material/ArrowBack';  // 아이콘들 import
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import postApi from '../api/postApi';  // postApi import

const PostDetailPage = () => {
  const { boardType, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [writerName, setWriterName] = useState('작성자 없음');
  const [writerInitial, setWriterInitial] = useState('');
  const [nowUser, setNowUser] = useState(localStorage.getItem("email"));
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postApi.getPostDetail(postId);
        setPost(data.post);  // 응답 데이터의 post가 없으면 빈 객체 할당
        const writer = data?.writer || '작성자 없음';
        setWriterName(writer);
        setWriterInitial(writer.charAt(0));  // 작성자의 첫 글자

        // 이메일 출력 확인 -> 이걸 통해 작성자만 삭제/ 수정 버튼 보이게
        // console.log("이메일 출력: ",data.post.email);
        // console.log("현재 유저 이메일: ", nowUser);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const accessToken = localStorage.getItem('accessToken'); // localStorage에서 액세스 토큰 가져오기
    
        await postApi.deletePost(postId, accessToken);
        navigate(`/community/${boardType}`);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (!post) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1000, margin: '0 auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate(`/community/${boardType}`)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            {post.title || '제목 없음'} {/* 제목이 없을 경우 기본값 설정 */}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{writerInitial}</Avatar> {/* 작성자의 첫 글자를 기본값으로 사용 */}
          <Box>
            <Typography variant="subtitle1">{writerName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.created || '날짜 없음'} • 조회 {post.cnt || 0}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography 
          variant="body1" 
          sx={{ 
            minHeight: '200px', 
            mb: 3,
            whiteSpace: 'pre-wrap'
          }}
        >
          {post.content || '내용 없음'} {/* 내용이 없을 경우 기본값 설정 */}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/community/${boardType}`)}
          >
            목록으로
          </Button>
          {nowUser === post.email && (
              <Box>
                <Button
                    startIcon={<EditIcon />}
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/community/${boardType}/edit/${postId}`)}
                >
                  수정
                </Button>
                <Button
                    startIcon={<DeleteIcon />}
                    color="error"
                    onClick={handleDelete}
                >
                  삭제
                </Button>
              </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PostDetailPage;