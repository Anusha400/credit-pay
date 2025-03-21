// SignUp.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure you have your Firebase config set up

const SignUp = () => {
  const [email, setEmail] = useState('anusha@gmail.com');
  const [password, setPassword] = useState('Anusha@123');
  const [confirmPassword, setConfirmPassword] = useState('Anusha@123');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile'); // Navigate to profile after successful sign-up
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Sign up failed. Please try again.');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e0f7fa', // Change to your desired background color
        overflow: 'hidden',
        p: 3,
        perspective: '1000px',
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
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3), 0 15px 50px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
          color: '#333',
        }}
      >
        {/* Signup Logo */}
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
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#fff">
            LOGO
          </Typography>
        </Box>

        <Typography variant="h4" fontWeight="600" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSignUp}>
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
                borderRadius: '8px',
              },
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
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{
              input: { color: '#333' },
              '& .MuiFilledInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '8px',
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
              transition: 'transform 0.2s, background 0.3s',
              '&:hover': {
                background: 'linear-gradient(to right, #ff4b2b, #ff416c)',
              },
            }}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" marginTop={2}>
          Already have an account? <Link to="/login">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
