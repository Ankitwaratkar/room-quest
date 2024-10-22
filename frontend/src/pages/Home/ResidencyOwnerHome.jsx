import React from 'react'
import ResidencyDashboard from '../../components/Dashboard/ResidencyDashboard'
import ResidencyGallery from '../../components/Gallery/ResidencyGallery'
import ReasidencyService from '../../components/Services/ReasidencyService'
import ResidencyAbout from '../../components/About/ResidencyAbout'

const ResidencyOwnerHome = () => {
    return (
        <>
            <ResidencyDashboard />
            <ResidencyGallery />
            <ReasidencyService />
            <ResidencyAbout />
        </>
    )
}

export default ResidencyOwnerHome

