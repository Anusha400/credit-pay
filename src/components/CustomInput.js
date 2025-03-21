// src/components/CustomInput.js
import React from 'react';
import { TextField } from '@mui/material';

const CustomInput = () => (
  <TextField 
    label="Your Text" 
    variant="outlined" 
    writingsuggestions="true" // Replacing textprediction
    fullWidth
  />
);

export default CustomInput;
