import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link, InputAdornment, IconButton, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { login } from '../api/authApi'; 
import { StyledPaper, LogoBox, StyledForm, submitButtonStyles } from '../styles/AuthStyles';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      console.log('Login form data:', formData);
      await login(formData.email, formData.password);
      authLogin(); // 로그인 상태 업데이트
      navigate('/'); 
    } catch (error) {
      console.error('Login error:', error.message || '로그인에 실패했습니다.');
      setError(error.message || '로그인에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <LogoBox>
          <MusicNoteIcon />
          <Typography component="h1" variant="h5">로그인</Typography>
        </LogoBox>
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        <StyledForm onSubmit={handleSubmit}>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            id="email" label="이메일" name="email"
            autoComplete="email" autoFocus
            value={formData.email} onChange={handleChange}
          />
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="password" label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="password" autoComplete="current-password"
            value={formData.password} onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit" fullWidth variant="contained" color="secondary"
            sx={submitButtonStyles} disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/signup" variant="body2" color="secondary">
              계정이 없으신가요? 회원가입
            </Link>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
}

export default Login;