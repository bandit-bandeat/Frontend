import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, Button, Divider, Avatar, IconButton, TextField,
  List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { CircularProgress } from '@mui/material';  
import postApi from '../api/postApi'; // postApi import
import axios from 'axios';

const BASE_URL = 'http://18.139.20.145:8080';






const PostDetailPage = () => {
  const { boardType, postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [writerName, setWriterName] = useState('작성자 없음');
  const [writerInitial, setWriterInitial] = useState('');
  const [nowUser, setNowUser] = useState(localStorage.getItem("email"));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [postLikeCount, setPostLikeCount] = useState(0);


  useEffect(() => {
    const fetchPost = async () => {
      const email = localStorage.getItem('email');
      try {
        const data = await postApi.getPostDetail(postId,email);
        setPost(data.post); // 응답 데이터의 post가 없으면 빈 객체 할당
        const writer = data?.writer || '작성자 없음';
        setWriterName(writer);
        setWriterInitial(writer.charAt(0));

        // 이메일 출력 확인 -> 이걸 통해 작성자만 삭제/ 수정 버튼 보이게
        setComments(data.commentList || []);
        setIsPostLiked(data.post?.isLike || false);
        setPostLikeCount(data.post?.heart || 0);
        
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handlePostLike = async () => {
    if (!nowUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('postId', postId);
      const response = await axios.post(`${BASE_URL}/post/like`, formData, {
        headers: {
          'Authorization': `${accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("좋아요 응답:", response.data);
      const email = localStorage.getItem('email');
      const updatedPost = await postApi.getPostDetail(postId,email);
      setIsPostLiked(updatedPost.post.isLiked);
      setPostLikeCount(updatedPost.post.likeCount);
    } catch (error) {
      console.error('게시글 좋아요 실패:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const accessToken = localStorage.getItem('accessToken');
        await postApi.deletePost(postId, accessToken);
        navigate(`/community/${boardType}`);
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!nowUser) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      await postApi.writeComment(accessToken, postId, newComment);
      setNewComment('');
      // 댓글 작성 후 게시글 다시 조회
      const email = localStorage.getItem('email');
      const updatedPost = await postApi.getPostDetail(postId,email);
      setComments(updatedPost.commentList || []);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };
  
  // 댓글 삭제
  const handleCommentDelete = async (cmtId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      await postApi.deleteComment(accessToken, cmtId);  // cmtId로 수정
      // 댓글 삭제 후 게시글 다시 조회
      const email = localStorage.getItem('email');
      const updatedPost = await postApi.getPostDetail(postId,email);
      setComments(updatedPost.commentList || []);
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
    }
  };
  
  // 댓글 좋아요
  const handleCommentLike = async (cmtId) => {
    if (!nowUser) {
      alert('로그인이 필요합니다.');
      return;
    }
  
    try {
      const accessToken = localStorage.getItem('accessToken');
      await postApi.likeComment(accessToken, cmtId);  // cmtId로 수정
      // 좋아요 후 게시글 다시 조회
      const email = localStorage.getItem('email');
      const updatedPost = await postApi.getPostDetail(postId,email);
      setComments(updatedPost.commentList || []);
    } catch (error) {
      console.error('댓글 좋아요 실패:', error);
    }
  };

  if (!post) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh'  
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      p: 3, 
      maxWidth: '100%',
      margin: '0 auto',
      width: '900px'
    }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        {/* 게시글 헤더 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <IconButton onClick={() => navigate(`/community/${boardType}`)} sx={{ mr: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            {post.title || '제목 없음'} {/* 제목이 없을 경우 기본값 설정 */}
          </Typography>
        </Box>

        {/* 작성자 정보 */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1
        }}>
          <Avatar sx={{ mr: 2, width: 40, height: 40 }}>
            {writerInitial}
          </Avatar> 
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{writerName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {post.created || '날짜 없음'} • 조회 {post.cnt || 0}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 게시글 본문 */}
        <Typography 
          variant="body1" 
          sx={{ 
            minHeight: '100px',
            mb: 3,
            whiteSpace: 'pre-wrap',
            p: 2
          }}
        >
          {post.content || '내용 없음'} {/* 내용이 없을 경우 기본값 설정 */}
        </Typography>

        {/* 좋아요 버튼 */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-end', 
          my: 2
        }}>
          <IconButton
            onClick={handlePostLike}
            color={isPostLiked ? "primary" : "default"}
            size="medium"
          >
            {isPostLiked ? 
              <FavoriteIcon sx={{ fontSize: 24 }} /> : 
              <FavoriteBorderIcon sx={{ fontSize: 24 }} />
            }
          </IconButton>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            {postLikeCount}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 댓글 섹션 */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            댓글 {comments.length}개
          </Typography>

          {/* 댓글 작성 폼 */}
          {nowUser && (
            <Box component="form" onSubmit={handleCommentSubmit} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                multiline
                rows={2}
                placeholder="댓글을 작성하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 1 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}> 
                <Button type="submit" variant="contained">
                  댓글 작성
                </Button>
              </Box>
            </Box>
          )}

          {/* 댓글 목록 */}
          {comments.length > 0 ? (
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.cmtId} divider sx={{ py: 1.5 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ mr: 1, width: 28, height: 28 }}>
                          {comment.nickname?.charAt(0)}
                        </Avatar>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          {comment.nickname}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 0.5, ml: 4 }}>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          {comment.content}
                        </Typography>
  
                      </Box>
                    }
                  />
                  {/* 삭제/좋아요 버튼 */}
                  
                    <Box>
                      {nowUser === comment.email && (
                      <IconButton onClick={() => handleCommentDelete(comment.cmtId)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      )}
                      <IconButton onClick={() => handleCommentLike(comment.cmtId)}>
                        <FavoriteBorderIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body2" color="text.secondary">댓글이 없습니다.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default PostDetailPage;