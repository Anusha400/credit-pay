import React, { useState } from 'react';
import { Button, Snackbar, Alert } from '@mui/material';

const ApprovalComponent = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleApprove = () => {
    console.log("Approve button clicked");
    setSnackbarMessage('Successfully Approved');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleReject = () => {
    console.log("Reject button clicked");
    setSnackbarMessage('Successfully Rejected');
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleApprove}>
        Approve
      </Button>
      <Button variant="contained" color="secondary" onClick={handleReject} style={{ marginLeft: '10px' }}>
        Reject
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ApprovalComponent;
