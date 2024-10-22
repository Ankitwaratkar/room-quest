import React from 'react'
import MessDashboard from '../../components/Dashboard/MessDashboard'
import MessGallery from '../../components/Gallery/MessGallery'
import MessService from '../../components/Services/MessService'
import MessAbout from '../../components/About/MessAbout'

const MultiMessManagerHome = () => {
  return (
    <>
      <MessDashboard />
      <MessGallery />
      <MessService />
      <MessAbout />
    </>
  )
}

export default MultiMessManagerHome
