import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BotContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: {
    xs: '100%',
    md: 'calc(100vh - 80px)',
  },
  display: 'flex',
  flexDirection: 'column',
  padding: {
    xs: theme.spacing(1),
    sm: theme.spacing(2),
  },
  overflow: 'auto',
}));