import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AddBankAccount from './components/AddBankAccount';
import ApplyLoan from './components/ApplyLoan';
import UploadKycDocs from './components/UploadKYC';
import LoanCalculator from './components/LoanCalculator';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ApproveDialog from './components/ApproveDialog';
import LoanApplicationsTable from './components/LoanApplicationsTable';
//import LoanApplicationForm from './components/LoanApplicationForm';
import NotFound from './components/NotFound';

const App = () => {
    const [applications, setApplications] = useState([]);

    // Define the function to handle loan approval
    const handleApproval = () => {
        console.log("Loan application approved!");
        // Additional logic for approval can be added here
    };

    // Fetch loan applications from Firestore
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'activeApplications'));
                const apps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setApplications(apps);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<SignUp />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/add-bank-account" element={<AddBankAccount />} />
                <Route path="/apply-loan" element={<ApplyLoan onApprove={handleApproval} />} />
                <Route path="/upload-kyc" element={<UploadKycDocs />} />
                <Route path="/loan-calculator" element={<LoanCalculator />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/approve-dialog" element={<ApproveDialog />} />
                <Route path="/loan-applications" element={<LoanApplicationsTable applications={applications} />} />
                <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 pages */}
            </Routes>
        </div>
    );
};

export default App;
