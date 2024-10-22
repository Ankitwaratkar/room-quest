import React from 'react'
import UserDashboard from '../../components/Dashboard/UserDashboard';
import UserGallery from '../../components/Gallery/UserGallery';
import UserService from '../../components/Services/UserService';
import UserAbout from '../../components/About/UserAbout';

const UserHome = () => {
    return (
        <>
            <UserDashboard />
            <UserGallery />
            <UserService />
            <UserAbout />
        </>
    )
}

export default UserHome
