// src/api/loanApi.js (or wherever you prefer)
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const addLoanApplication = async (applicationData) => {
    try {
        const docRef = await addDoc(collection(db, 'activeApplications'), applicationData);
        console.log("Loan application added with ID:", docRef.id);
        return docRef.id; // Return the document ID if needed
    } catch (error) {
        console.error("Error adding loan application:", error);
    }
};
