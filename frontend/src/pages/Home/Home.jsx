import React from 'react'
import Hero from '../../components/Hero'
import Features from '../../components/Features'
import Footer from '../../components/Footer'
import Reviews from '../../components/Reviews'
import About from '../../components/About/About'


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