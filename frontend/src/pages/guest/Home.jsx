import React from 'react'
import Hero from '../../components/guest/Hero'
import Features from '../../components/guest/Features'
import About from '../../components/guest/About'
import Reviews from '../../components/guest/Reviews'
import Footer from '../../components/Footer'

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <Reviews />
            <Footer />
        </>
    )
}

export default Home