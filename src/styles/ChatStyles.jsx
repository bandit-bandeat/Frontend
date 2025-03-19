import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChatContainer = styled(Paper)(({ theme }) => ({
  flex: 1,
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  height: 'calc(100vh - 100px)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: 'none',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  [theme.breakpoints.down('sm')]: {
    height: 'calc(100vh - 80px)',
    borderRadius: 0,
    border: 'none'
  }
}));

export const MessagesBox = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));

export const MessageBubble = styled(Box)(({ theme, isBot }) => ({
  maxWidth: '85%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  backgroundColor: isBot ? theme.palette.grey[100] : theme.palette.primary.main,
  color: isBot ? theme.palette.text.primary : theme.palette.primary.contrastText,
  marginLeft: isBot ? 0 : 'auto',
  marginRight: isBot ? 'auto' : 0,
  fontSize: '1rem',
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
    padding: theme.spacing(1.5),
    fontSize: '0.95rem'
  }
}));

export const InputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2)
  }
}));