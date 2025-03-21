// src/components/Home.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate('/login'))
      .catch((error) => console.error("Logout Error: ", error));
  };

  return (
    <div style={{ backgroundImage: "url('/background.jpg')", backgroundSize: "cover", height: "100vh" }}>
      <NavBar />
      <Box textAlign="center" color="white" p={4}>
        <Typography variant="h3">Welcome to CredPe</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 3 }}>
          Logout
        </Button>
      </Box>
    </div>
  );
};

export default Home;
