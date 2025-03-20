import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  Avatar,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { ChatContainer, MessagesBox, MessageBubble, InputContainer } from '../styles/ChatStyles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const ImageTemplate = ({ botName, onSendMessage, placeholder }) => {
  const { isLoggedIn } = useAuth(); 
  const navigate = useNavigate(); 
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: `안녕하세요! ${botName}입니다. 어떤 도움이 필요하신가요?`, isBot: true },
  ]);
  const [isLoading, setIsLoading] = useState(false); 

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (!isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/login'); 
      return;
    }

    const userMessage = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

   
    const loadingMessage = { id: Date.now() + 1, text: '생성 중입니다... 잠시만 기다려 주세요.', isBot: true };
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true); 

    if (onSendMessage) {
      const response = await onSendMessage(input);


      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      const botMessage = { id: Date.now() + 2, text: response, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false); 
    }
  };

  return (
    <Box sx={{ 
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: { xs: 0, sm: 2, md: 3 }
    }}>
      <ChatContainer>
        <MessagesBox>
          {messages.map((message) => (
            <Stack
              key={message.id}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                justifyContent: message.isBot ? 'flex-start' : 'flex-end',
                mb: 2,
              }}
            >
              {message.isBot && (
                <Avatar 
                  sx={{ 
                    bgcolor: 'primary.main',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 }
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Avatar>
              )}
              <MessageBubble isBot={message.isBot}>
                <Typography variant="body1">{message.text}</Typography>
              </MessageBubble>
              {!message.isBot && (
                <Avatar 
                  sx={{ 
                    bgcolor: 'secondary.main',
                    width: { xs: 32, sm: 40 },
                    height: { xs: 32, sm: 40 }
                  }}
                >
                  <PersonIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Avatar>
              )}
            </Stack>
          ))}
          <div ref={messagesEndRef} />
        </MessagesBox>
        <Box sx={{ 
          p: { xs: 1.5, sm: 2, md: 3 }, 
          borderTop: 1, 
          borderColor: 'divider'
        }}>
          <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder={placeholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: { xs: '6px', sm: '8px' },
                  backgroundColor: 'background.paper',
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }
              }}
            />
            <IconButton 
              color="primary" 
              onClick={handleSend}
              sx={{ 
                p: { xs: 1.5, sm: 2 },
                borderRadius: { xs: '6px', sm: '8px' },
                bgcolor: 'primary.main', 
                color: 'white',
                '&:hover': { 
                  bgcolor: 'primary.dark' 
                }
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </Box>
      </ChatContainer>
    </Box>
  );
};

export default ImageTemplate;
