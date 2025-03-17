import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

export const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  '& svg': {
    fontSize: 40,
    marginRight: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
}));

export const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(1),
}));

export const submitButtonStyles = {
  mt: 3,
  mb: 2
};

export const genreChipStyles = {
  backgroundColor: 'secondary.main',
  color: 'white'
};

export const genreLabelStyles = {
  backgroundColor: 'white',
  px: 1
};

export const genres = [
  '발라드', '댄스', '트로트', '랩/힙합', 'R&B',
  '록', 'EDM', '인디 음악', '포크/블루스'
];