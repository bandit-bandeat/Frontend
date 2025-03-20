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
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import { Main, StyledListItem, drawerStyles } from '../styles/SidebarStyles';

const CommunityBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();

  const boardTypes = [
    { name: '밴드 구인', icon: <GroupsIcon />, path: 'band' },
    { name: '과외 구인', icon: <SchoolIcon />, path: 'lesson' }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" sx={drawerStyles}>
        <Typography
          variant="h6"
          sx={{
            color: 'white',
            padding: '20px 24px',
            fontWeight: 600,
            letterSpacing: '1px'
          }}
        >
          COMMUNITY
        </Typography>
        <Divider 
          sx={{ 
            margin: '0 16px 16px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)'
          }} 
        />
        <List>
          {boardTypes.map((board) => (
            <StyledListItem
              key={board.path}
              onClick={() => navigate(`/community/${board.path}`)}
              selected={currentPath === board.path}
              // button prop을 제거
            >
              <ListItemIcon>{board.icon}</ListItemIcon>
              <ListItemText primary={board.name} />
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

export default CommunityBar;