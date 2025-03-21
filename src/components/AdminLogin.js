// src/components/AdminLogin.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your authentication logic here (e.g., Firebase auth)
    // Mock login for demonstration:
    if (username === 'myproject@gmail.com' && password === 'Anusha@123') {
      navigate('/admin-dashboard'); // Redirect to the Admin Dashboard after successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                type="password"
                fullWidth
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Link href="/signup" variant="body2" style={{ textAlign: 'center', display: 'block' }}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AdminLogin;
