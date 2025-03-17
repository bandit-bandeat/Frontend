import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Avatar,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import postApi from '../api/postApi';

const PostDetailPage = () => {
  const { boardType, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postApi.getPostDetail(postId);
        setPost(data.post);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await postApi.deletePost(postId, 'your-token-here');
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
            {post.title}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{post.writer[0]}</Avatar>
          <Box>
            <Typography variant="subtitle1">{post.writer}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.date} • 조회 {post.views}
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
          {post.content}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/community/${boardType}`)}
          >
            목록으로
          </Button>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default PostDetailPage;