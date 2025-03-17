import { styled } from '@mui/material/styles';
import { ListItem } from '@mui/material';

export const drawerWidth = 280;

export const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  height: 'calc(100vh - 80px)',
  display: 'flex',
  flexDirection: 'column',
  width: `calc(100% - ${drawerWidth}px)`,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

export const StyledListItem = styled(ListItem)(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? theme.palette.secondary.main : 'transparent',
  margin: '8px 16px',
  borderRadius: '12px',
  padding: '16px 24px',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: isSelected 
      ? theme.palette.secondary.dark 
      : 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(5px)',
    boxShadow: isSelected 
      ? '0 4px 12px rgba(0,0,0,0.2)'
      : '0 2px 8px rgba(255,255,255,0.1)',
  },

  '& .MuiListItemIcon-root': {
    color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.8)',
    minWidth: '45px',
    '& svg': {
      fontSize: '28px',
      transition: 'transform 0.3s ease',
    }
  },

  '& .MuiListItemText-primary': {
    color: isSelected ? 'white' : 'rgba(255, 255, 255, 0.9)',
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },

  '&:hover .MuiListItemIcon-root svg': {
    transform: 'scale(1.1)',
  }
}));

export const drawerStyles = {
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    marginTop: '80px',
    padding: '16px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(8px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '4px 0 15px rgba(0, 0, 0, 0.2)',
  },
};