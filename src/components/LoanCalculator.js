import React, { useState } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';

const LoanCalculator = () => {
  const [amount, setAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [months, setMonths] = useState(1);
  const [repayment, setRepayment] = useState(0);

  const calculateRepayment = () => {
    const monthlyRate = interestRate / 100 / 12;
    const payment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    setRepayment(payment.toFixed(2));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={3}>
      <Typography variant="h4" gutterBottom>
        Loan Calculator
      </Typography>
      <TextField label="Loan Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth margin="normal" />
      <TextField label="Interest Rate (%)" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} fullWidth margin="normal" />
      <TextField label="Repayment Period (months)" type="number" value={months} onChange={(e) => setMonths(e.target.value)} fullWidth margin="normal" />
      <Button variant="contained" color="primary" onClick={calculateRepayment}>
        Calculate Repayment
      </Button>
      {repayment > 0 && (
        <Typography variant="h6" marginTop={2}>
          Monthly Repayment: ₹{repayment}
        </Typography>
      )}
    </Box>
  );
};

export default LoanCalculator;
