import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { saveUserProfile } from '../api/userProfile'; // Adjust the path as necessary
import { uploadKYC } from '../api/kyc'; // Adjust the path as necessary

const UserProfileWithKYC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState('');
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleUserProfileSubmit = () => {
    const profileData = { fullName, email, phoneNumber, address };
    saveUserProfile(profileData)
      .then(() => {
        setNotification({ open: true, message: 'User profile saved!', severity: 'success' });
      })
      .catch((error) => {
        setNotification({ open: true, message: 'Failed to save user profile.', severity: 'error' });
      });
  };

  const handleKYCUpload = () => {
    const userId = "user-id"; // Replace with actual user ID
    if (file && documentType) {
      uploadKYC(file, userId, documentType)
        .then(() => {
          setNotification({ open: true, message: 'KYC document uploaded!', severity: 'success' });
        })
        .catch((error) => {
          setNotification({ open: true, message: 'Failed to upload KYC document.', severity: 'error' });
        });
    } else {
      setNotification({ open: true, message: 'Please select a file and document type.', severity: 'warning' });
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <TextField
        label="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <Button variant="contained" color="primary" onClick={handleUserProfileSubmit}>
        Save Profile
      </Button>

      {/* KYC Document Upload */}
      <Typography variant="h5" gutterBottom>
        Upload KYC Document
      </Typography>
      <TextField
        label="Document Type"
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        accept="image/*,application/pdf" // Adjust based on what document types you want to accept
      />
      <Button variant="contained" color="primary" onClick={handleKYCUpload}>
        Upload Document
      </Button>

      {/* Notification Snackbar */}
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfileWithKYC;
