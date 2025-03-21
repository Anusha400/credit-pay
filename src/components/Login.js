// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0f7fa',  // Change this to your desired background color
        overflow: 'hidden',
        p: 3,
        perspective: '1000px',  // Adds depth for 3D effect
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 420,
          p: 4,
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(8px)',
          borderRadius: '20px',
          transform: 'rotateX(6deg) rotateY(-6deg)',  // Slight 3D rotation
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 15px 50px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.2s ease',
          '&:hover': {
            transform: 'rotateX(0deg) rotateY(0deg)',  // Lifts on hover
          },
          textAlign: 'center',
          color: '#333',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 3,
            bgcolor: 'linear-gradient(135deg, #8f94fb, #4e54c8)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            transform: 'translateZ(20px)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#fff">
            LOGO
          </Typography>
        </Box>
        
        <Typography variant="h4" fontWeight="600" gutterBottom sx={{ color: '#333', textShadow: '1px 2px 2px rgba(0, 0, 0, 0.2)' }}>
          Welcome Back
        </Typography>
        
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              input: { color: '#333' },
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                transform: 'translateZ(5px)',  // 3D lift effect
              },
              mb: 2,
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              input: { color: '#333' },
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
                borderRadius: '8px',
                transform: 'translateZ(5px)',
              },
            }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            sx={{
              mt: 3,
              borderRadius: '8px',
              background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
              color: '#fff',
              fontWeight: 'bold',
              boxShadow: '0px 10px 20px rgba(255, 75, 43, 0.3)',
              transform: 'translateZ(10px)',  // Gives a 3D hover lift
              transition: 'transform 0.2s, background 0.3s',
              '&:hover': {
                transform: 'scale(1.05) translateZ(15px)',
                background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
              },
            }}
          >
            Login
          </Button>
        </form>

        <Typography variant="body2" mt={3} sx={{ color: '#666', textShadow: '1px 1px rgba(255, 255, 255, 0.3)' }}>
          Don’t have an account?{' '}
          <IconButton
            component={Link}
            to="/signup"
            sx={{
              color: '#ff416c',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              '&:hover': {
                color: '#ff4b2b',
                transform: 'translateZ(5px)',  // Lift effect on hover
              },
            }}
          >
            <PersonAddIcon sx={{ mr: 0.5 }} /> Sign Up
          </IconButton>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
