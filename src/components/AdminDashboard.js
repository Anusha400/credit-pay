// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import LoanApplicationsTable from './LoanApplicationsTable';

const AdminDashboard = () => {
    const [activeApplications, setActiveApplications] = useState([]);
    const [historyApplications, setHistoryApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            const activeSnapshot = await getDocs(collection(db, 'activeApplications'));
            setActiveApplications(activeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

            const historySnapshot = await getDocs(collection(db, 'historyApplications'));
            setHistoryApplications(historySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };

        fetchApplications();
    }, []);

    const handleApprove = (id) => {
        console.log(`Approved application with ID: ${id}`);
        // Handle the approve logic here, e.g., update the Firestore
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <h2>Active Applications</h2>
            <LoanApplicationsTable applications={activeApplications} onApprove={handleApprove} />
            <h2>History Applications</h2>
            <LoanApplicationsTable applications={historyApplications} />
        </div>
    );
};

export default AdminDashboard;
