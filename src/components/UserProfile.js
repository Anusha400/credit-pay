import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const saveUserProfile = async (profileData) => {
  try {
    await addDoc(collection(db, 'userProfiles'), profileData);
    console.log("User profile saved successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error saving user profile:", error);
    return { success: false, error };
  }
};

const UserProfile = () => {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setNotification({ open: true, message: 'You must be logged in to save a profile.', severity: 'error' });
      return;
    }

    const result = await saveUserProfile(profile);
    if (result.success) {
      setNotification({ open: true, message: 'Profile saved successfully!', severity: 'success' });
    } else {
      setNotification({ open: true, message: 'Failed to save profile.', severity: 'error' });
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
        name="fullName"
        value={profile.fullName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        value={profile.phoneNumber}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={profile.address}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Changes
      </Button>

      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification}>
        <Alert onClose={handleCloseNotification} severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserProfile;
