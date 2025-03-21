// src/components/NotFound.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
      <Typography variant="h4">404 - Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;
