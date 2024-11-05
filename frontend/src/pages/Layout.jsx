import React from 'react'
import { useAuth } from '../contexts/AuthContext';
import UserNav from '../components/Navbar/UserNav';
import RecidencyNav from '../components/Navbar/ResidencyNav';
import MessNav from '../components/Navbar/MessNav';
import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const Layout = () => {
    const { currentUser, userType } = useAuth(); // Get the current user and user type from the AuthContext

    // If there is no logged-in user, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            {/* Conditionally render navigation components based on userType */}
            {userType === "User" && <UserNav />}
            {userType === "Residency Owner" && <RecidencyNav />}
            {userType === "Multi-Mess Manager" && <MessNav />}

            {/* This is where the child routes will be rendered */}
            <main>
                <Outlet />
                <Footer />
            </main>
        </>
    );
};

export default Layout