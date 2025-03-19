import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Avatar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: '#fff',
  boxShadow: 'none',
  borderBottom: '1px solid #eee',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  height: 80,
  '@media (min-width: 0px)': {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: '8px 5px',
  fontSize: '1.1rem',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.secondary.main,
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: '1.8rem',
  fontWeight: 'bold',
  letterSpacing: '1px',
}));

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <LogoText
          component="div"
          onClick={handleLogoClick}
          sx={{
            flexGrow: 1,
            color: 'primary.main',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          BANDIT
        </LogoText>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <NavButton component={Link} to="/create">
            Create
          </NavButton>
          <NavButton component={Link} to="/community">
            Community
          </NavButton>
          <NavButton component={Link} to="/music">
            Music
          </NavButton>

          {isLoggedIn ? (
            <>
              <IconButton 
                onClick={() => navigate('/mypage')}
                sx={{ ml: 2 }}
              >
                <Avatar sx={{ width: 40, height: 40 }} />
              </IconButton>
              <Button
                onClick={handleLogout}
                color="primary"
                sx={{ 
                  fontSize: '1.05rem',
                  px: 3
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                onClick={() => navigate('/login')}
                color="primary"
                sx={{ 
                  fontSize: '1.05rem',
                  px: 3
                }}
              >
                Login
              </Button>
            </Box>
          )}
        </Box>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;