import React from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItemIcon, 
  ListItemText,
  Typography,
  Divider 
} from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RecommendIcon from '@mui/icons-material/Recommend';
import ImageIcon from '@mui/icons-material/Image';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import Mic from '@mui/icons-material/Mic';
import { Main, StyledListItem, drawerStyles } from '../styles/SidebarStyles';

const pulseAnimation = {
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  }
};

const CreateBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const handleEatBotClick = () => {
    navigate('/create');
  };

  const botTypes = [
    { name: '음원 봇', icon: <MusicNoteIcon />, path: 'music' },
    { name: '코드 봇', icon: <AutoAwesomeIcon />, path: 'chord' },
    { name: '추천 봇', icon: <RecommendIcon />, path: 'recommend' },
    { name: '이미지 봇', icon: <ImageIcon />, path: 'image' },
    { name: 'MP3 변환기', icon: <Mic />, path: 'mp3'}
  ];

  return (
    <Box sx={{ display: 'flex', ...pulseAnimation }}>
      <Drawer variant="permanent" sx={drawerStyles}>
        <Box
          onClick={handleEatBotClick}
          sx={{
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <SmartToyIcon 
            sx={{ 
              fontSize: '32px', 
              color: 'white',
              animation: 'pulse 2s infinite'
            }} 
          />
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 800,
              letterSpacing: '3px',
              fontFamily: "'Orbitron', sans-serif",
              textTransform: 'uppercase',
              background: 'linear-gradient(45deg, #c2185b, #e91e63, #ffffff, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: '-5px',
                height: '3px',
                width: '30%',
                background: 'linear-gradient(45deg, #c2185b, #e91e63, #ffffff, #ffffff)',
                transition: 'width 0.3s ease',
              },
              '&:hover::before': {
                width: '100%',
              }
            }}
          >
            Eat Bots
          </Typography>
        </Box>
        <Divider 
          sx={{ 
            margin: '0 16px 16px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }} 
        />
        <List>
          {botTypes.map((bot) => (
            <StyledListItem
              button
              key={bot.path}
              onClick={() => navigate(`/create/${bot.path}`)}
              isSelected={currentPath === bot.path}
            >
              <ListItemIcon>{bot.icon}</ListItemIcon>
              <ListItemText primary={bot.name} />
            </StyledListItem>
          ))}
        </List>
      </Drawer>
      <Main>
        <Outlet />
      </Main>
    </Box>
  );
};

export default CreateBar;