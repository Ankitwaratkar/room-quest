import React from 'react'
import UserDashboard from '../../components/client/UserDashboard'
import Gallery from '../../components/client/Gallery';
import Services from '../../components/client/Services';
import About from '../../components/client/About';

const UserHome = () => {
    return (
        <>
            <UserDashboard />
            <Gallery />
            <Services />
            <About />
        </>
    )
}

export default UserHome
