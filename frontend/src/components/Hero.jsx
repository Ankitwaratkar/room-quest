import React from 'react';
import logo from '../assets/logo.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import carousel1 from "../assets/carousels/carousel1.png";
import carousel2 from "../assets/carousels/carousel2.avif";
import carousel3 from "../assets/carousels/carousel3.jpg";
import carousel4 from "../assets/carousels/carousel4.avif";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';  // Import the autoplay CSS

// Import required modules
import { Pagination, Autoplay } from 'swiper/modules';

const Hero = () => {
    return (
        <>
            <div className="flex h-screen bg-[#361a25]">
                {/* Left div with information and login button */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
                    <h1 className="text-5xl font-extrabold text-pink-300 mb-4">Welcome to,
                        <br />
                        <img src={logo} alt="Room Quest" />
                    </h1>
                    <p className="text-[#d282a6] text-xl mb-6 font-bold">
                        Discover the perfect room, flat, or roommate for your needs. <br />We also offer mess services for students.<br /> Book your space with us now! click to know...
                        <a href='/about-us' className="text-[#d282a6] px-3 py-3 rounded-2xl text-xl hover:text-[#f5e3e0] transition">
                            About Us
                        </a></p>
                    <div className="flex space-x-4">
                        <a href='/login' className="bg-pink-400 text-[#f5e3e0] border-spacing-3 px-6 py-3 rounded-2xl text-xl hover:bg-[#f5e3e0] hover:text-[#361a25] transition">
                            Login
                        </a>
                    </div>
                </div>
                {/* Right div with room image */}
                <div className="w-full md:w-1/2 relative">
                    <Swiper
                        className="swiper-container"
                        spaceBetween={50}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2000, // Adjust the delay as needed
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
                    >
                        <SwiperSlide>
                            <img
                                src={carousel1}
                                alt="Room1"
                                className="w-full h-screen object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={carousel2}
                                alt="Room2"
                                className="w-full h-screen object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={carousel3}
                                alt="Room3"
                                className="w-full h-screen object-cover"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={carousel4}
                                alt="Room4"
                                className="w-full h-screen object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Hero;
