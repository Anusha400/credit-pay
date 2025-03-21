import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

const UserDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user); // Set the user data if logged in
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Welcome to your Dashboard!</h1>
            {user && (
                <>
                    <h2>Your Profile</h2>
                    <p>Email: {user.email}</p>
                    {/* Add more user details as needed */}
                </>
            )}

            <button onClick={async () => await firebase.auth().signOut()}>
                Logout
            </button>
        </div>
    );
};

export default UserDashboard;
