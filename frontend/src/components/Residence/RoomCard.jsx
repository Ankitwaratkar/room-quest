import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const RoomCard = ({ roomData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const imagesCount = roomData.images.length;
    const swiperRef = useRef(null); // Reference to Swiper instance

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesCount);
        }, 3000); // Change image every 3000 ms (3 seconds)

        return () => clearInterval(interval); // Cleanup on unmount
    }, [imagesCount]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(currentIndex); // Use slideTo method
        }
    }, [currentIndex]);

    return (
        <div className="flex bg-white shadow-lg rounded-lg overflow-hidden w-full mb-4 max-w-5xl">
            {/* Image Carousel on the Left */}
            <div className="w-1/3 flex items-center justify-center">
                <Swiper
                    ref={swiperRef}
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {roomData.images.map((image, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center h-full"> {/* Center the image within the slide */}
                            <img
                                src={image.url}
                                alt={`Room Image ${index + 1}`}
                                className="w-52 h-52 object-cover" // Set width and height to 200px with Tailwind class
                                style={{ width: '200px', height: '200px' }} // Explicitly setting size
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Room Details on the Right */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <h2 className="text-md font-extralight mb-2">"{roomData.roomDescription}"</h2>

                <div className="grid grid-cols-2 text-gray-700 gap-0"> {/* Removed gap for no space */}
                    <div><strong>Location:</strong>{roomData.location}</div>
                    <div><strong>Price:</strong>{roomData.price}</div>
                    <div><strong>Owner:</strong>{roomData.ownerName}</div>
                    <div><strong>Furnishing:</strong>{roomData.furnishing}</div>
                    <div><strong>Type:</strong>{roomData.accommodationType}</div>
                    <div><strong>Contact:</strong>{roomData.contactNumber}</div>
                    <div><strong>Amenities:</strong>{roomData.amenities}</div>
                    <div><strong>Property Age:</strong>{roomData.propertyAge} years</div>
                    <div><strong>Available From:</strong>{new Date(roomData.availableFrom.$date).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    );
};

export default RoomCard;
