import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  Divider,
  TextField,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = 'http://18.139.20.145:8080';

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(8),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
}));

function MyPage() {
  const { logout } = useAuth();
  const [formData, setFormData] = useState({
    nickname: '',
    birth: '',
    preGenres: '',
  });
  const [userInfo, setUserInfo] = useState({
    email: '',
    preGenres: [],
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`${API_BASE_URL}/auth/userinfo`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { email, preGenre } = response.data.userDto;
        setUserInfo({
          email,
          preGenres: preGenre,
        });
        setFormData({
          nickname: response.data.userDto.nickname,
          birth: response.data.userDto.birth,
          preGenres: preGenre.join(', '),
        });
      } catch (error) {
        setError('사용자 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE_URL}/auth/update`, {
        nickname: formData.nickname,
        birth: formData.birth,
        preGenres: formData.preGenres.split(',').map(genre => genre.trim())
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('사용자 정보가 성공적으로 업데이트되었습니다.');
      setUserInfo(prev => ({ ...prev, ...formData }));
      setOpen(false);
    } catch (error) {
      setError(error.response?.data?.message || '업데이트에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE_URL}/auth/delete`, {
        email: userInfo.email
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('사용자가 성공적으로 삭제되었습니다.');
      logout();
    } catch (error) {
      setError(error.response?.data?.message || '탈퇴에 실패했습니다.');
    }
  };

  const handleMembership = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(`${API_BASE_URL}/auth/membership`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccess('멤버십에 성공적으로 가입되었습니다.');
    } catch (error) {
      setError(error.response?.data?.message || '멤버십 가입에 실패했습니다.');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!userInfo.email) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <ProfilePaper elevation={6}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <LargeAvatar>
            <PersonIcon sx={{ fontSize: 40 }} />
          </LargeAvatar>
          <Typography variant="h5" gutterBottom>
            {formData.nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {userInfo.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            선호 장르: {userInfo.preGenres.join(', ')}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ mt: 2 }}
            onClick={handleClickOpen}
          >
            프로필 수정
          </Button>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box sx={{ mt: 4 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Button
            fullWidth variant="contained" color="primary"
            sx={{ mt: 2 }} onClick={handleMembership}
          >
            멤버십 가입
          </Button>
          <Button
            fullWidth variant="contained" color="secondary"
            sx={{ mt: 2 }} onClick={handleDelete}
          >
            회원 탈퇴
          </Button>
        </Box>
      </ProfilePaper>

      {/* 프로필 수정 다이얼로그 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>프로필 수정</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined" margin="normal" fullWidth
            id="nickname" label="닉네임" name="nickname"
            value={formData.nickname} onChange={handleChange}
          />
          <TextField
            variant="outlined" margin="normal" fullWidth
            id="preGenres" label="선호 장르" name="preGenres"
            value={formData.preGenres} onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleUpdate} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyPage;