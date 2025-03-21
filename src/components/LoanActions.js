import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';

const LoanActions = ({ onApprove, onReject }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleApprove = () => {
    if (onApprove) {
      onApprove(); // Call the passed-in onApprove function
      setSnackbarMessage('Successfully Approved');
      setAlertSeverity('success');
      setSnackbarOpen(true);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(); // Call the passed-in onReject function
      setSnackbarMessage('Successfully Rejected');
      setAlertSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Button variant="contained" color="primary" onClick={handleApprove}>
        Approve
      </Button>
      <Button variant="contained" color="secondary" onClick={handleReject}>
        Reject
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={alertSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoanActions;
