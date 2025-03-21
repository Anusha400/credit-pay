import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';

const AddBankAccount = () => {
    const [bankAccount, setBankAccount] = useState({
        accountHolderName: '',
        accountNumber: '',
        bankName: '',
        ifscCode: '',
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setBankAccount({ ...bankAccount, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        console.log('Bank Account Saved:', bankAccount);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            {/* Add Title */}
            <Typography variant="h4" component="h1" gutterBottom>
                Add Bank Account
            </Typography>
            
            <TextField
                label="Account Holder Name"
                name="accountHolderName"
                value={bankAccount.accountHolderName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Account Number"
                name="accountNumber"
                value={bankAccount.accountNumber}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="Bank Name"
                name="bankName"
                value={bankAccount.bankName}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <TextField
                label="IFSC Code"
                name="ifscCode"
                value={bankAccount.ifscCode}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
                Save Bank Account
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Bank account saved successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AddBankAccount;
