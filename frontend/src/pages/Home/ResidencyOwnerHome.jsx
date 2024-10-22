import React from 'react'
import ResidencyDashboard from '../../components/recidencies/ResidencyDashboard'
import Gallery from '../../components/recidencies/Gallery'
import Services from '../../components/recidencies/Services'
import About from '../../components/recidencies/About'

const ResidencyOwnerHome = () => {
    return (
        <>
            <ResidencyDashboard />
            <Gallery />
            <Services />
            <About />
        </>
    )
}

export default ResidencyOwnerHome

