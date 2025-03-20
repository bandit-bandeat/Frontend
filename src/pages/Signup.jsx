import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, TextField, Button, Typography, Link, InputAdornment, IconButton, Alert, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { signup } from '../api/authApi';
import { StyledPaper, LogoBox, StyledForm, submitButtonStyles, genreChipStyles, genreLabelStyles, genres } from '../styles/AuthStyles';

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    birth: '',
    preGenres: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setLoading(true);
    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        birth: formData.birth,
        preGenres: formData.preGenres
      };
      console.log('Signup Data:', signupData); // 디버깅을 위해 로그 추가
      await signup(signupData.email, signupData.password, signupData.nickname, signupData.birth, signupData.preGenres); // signup 함수 호출
      navigate('/login');
    } catch (error) {
      setError(error.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <LogoBox>
          <MusicNoteIcon />
          <Typography component="h1" variant="h5">회원가입</Typography>
        </LogoBox>
        {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}
        <StyledForm onSubmit={handleSubmit}>
          <label htmlFor="email">이메일</label>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            id="email" label="이메일" name="email"
            autoComplete="email" value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">비밀번호</label>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="password" label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="password" value={formData.password}
            onChange={handleChange}
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
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="confirmPassword" label="비밀번호 확인"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <label htmlFor="nickname">닉네임</label>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="nickname" label="닉네임"
            id="nickname" value={formData.nickname} onChange={handleChange}
          />
          <label htmlFor="birth">생년월일</label>
          <TextField
            variant="outlined" margin="normal" required fullWidth
            name="birth" label="생년월일" type="date"
            id="birth" value={formData.birth} onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel id="genre-label" sx={genreLabelStyles}>선호 장르</InputLabel>
            <Select
              labelId="genre-label" multiple name="preGenres"
              id="preGenres" value={formData.preGenres} onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} sx={genreChipStyles} />
                  ))}
                </Box>
              )}
            >
              {genres.map((genre) => (
                <MenuItem key={genre} value={genre}>{genre}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit" fullWidth variant="contained" color="secondary"
            sx={submitButtonStyles} disabled={loading}
          >
            {loading ? '가입 중...' : '가입하기'}
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link component={RouterLink} to="/login" variant="body2" color="secondary">
              이미 계정이 있으신가요? 로그인
            </Link>
          </Box>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
}

export default Signup;