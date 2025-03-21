import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { auth } from '../firebase'; // Adjust path as necessary
import { signOut, onAuthStateChanged } from 'firebase/auth';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return unsubscribe;
  }, []);

  const toggleDrawer = () => {
    if (isAuthenticated) {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleNavigation = (path) => {
    setDrawerOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      setDrawerOpen(false);
      navigate('/login'); // Redirect to login/signup page after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {isAuthenticated ? (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'rotateY(180deg)', // Adds a 3D rotation on hover
              },
            }}
          >
            <MenuIcon sx={{ fontSize: 32 }} />
          </IconButton>
        ) : (
          <IconButton edge="start" color="inherit" aria-label="menu" disabled>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CredPe
        </Typography>
      </Toolbar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 250,
            transformStyle: 'preserve-3d',
            transform: drawerOpen ? 'rotateY(0deg)' : 'rotateY(-90deg)', // Creates a 3D opening effect
            transition: 'transform 0.5s ease', // Smooth transition
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          <List>
            {[
              { text: 'User Profile', path: '/profile' },
              { text: 'Add Bank Account', path: '/add-bank-account' },
              { text: 'Apply for Loan', path: '/apply-loan' },
              { text: 'Upload KYC Documents', path: '/upload-kyc' },
              { text: 'Loan Calculator', path: '/loan-calculator' },
              { text: 'Loan Applications Table', path: '/loan-applications' },
              { text: 'Admin Login (Approve Dialog)', path: '/admin-login' },
            ].map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateZ(10px) scale(1.05)', // 3D pop-out effect
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
                    backgroundColor: '#f0f0f0', // Optional background color on hover
                  },
                  marginY: 1,
                  padding: '12px 20px',
                  borderRadius: '8px', // Slight rounding for a softer 3D look
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateZ(10px) scale(1.05)',
                  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.3)',
                  backgroundColor: '#f0f0f0',
                },
                marginY: 1,
                padding: '12px 20px',
                borderRadius: '8px',
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
