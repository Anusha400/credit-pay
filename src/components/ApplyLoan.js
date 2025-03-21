import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Snackbar, Alert } from '@mui/material';
import { db } from '../firebase'; // Adjust path as needed
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Function to save loan application data to Firestore
const submitLoanApplication = async (loanData) => {
  try {
    const docRef = await addDoc(collection(db, 'loanApplications'), loanData);
    console.log("Loan application submitted successfully!", docRef.id);
    return { success: true };
  } catch (error) {
    console.error("Error submitting loan application:", error);
    return { success: false, error };
  }
};

const LoanApplication = ({ onApprove }) => {
  const [loanData, setLoanData] = useState({
    applicantName: '',
    applicantEmail: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
    purpose: '',
  });

  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });

  // Handle input change
  const handleChange = (e) => {
    setLoanData({ ...loanData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setNotification({ open: true, message: 'User is not authenticated. Please log in.', severity: 'error' });
      return;
    }

    const result = await submitLoanApplication(loanData);
    if (result.success) {
      setNotification({ open: true, message: 'Loan application submitted successfully!', severity: 'success' });
      handleApprove(); // Call handleApprove if the submission was successful
    } else {
      setNotification({ open: true, message: 'Failed to submit loan application.', severity: 'error' });
    }
  };

  // Conditionally call onApprove if it's defined
  const handleApprove = () => {
    if (typeof onApprove === 'function') {
      onApprove();
    } else {
      console.warn("onApprove function is not defined");
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Loan Application
      </Typography>
      {/* Applicant Name */}
      <TextField
        label="Applicant Name"
        name="applicantName"
        value={loanData.applicantName}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {/* Applicant Email */}
      <TextField
        label="Applicant Email"
        name="applicantEmail"
        value={loanData.applicantEmail}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {/* Loan Amount */}
      <TextField
        label="Loan Amount"
        name="loanAmount"
        value={loanData.loanAmount}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {/* Loan Term */}
      <TextField
        label="Loan Term (in years)"
        name="loanTerm"
        value={loanData.loanTerm}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {/* Interest Rate */}
      <TextField
        label="Interest Rate (%)"
        name="interestRate"
        value={loanData.interestRate}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        required
      />
      {/* Purpose of Loan */}
      <TextField
        label="Purpose of Loan"
        name="purpose"
        value={loanData.purpose}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={3}
        required
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Loan Application
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

export default LoanApplication;
