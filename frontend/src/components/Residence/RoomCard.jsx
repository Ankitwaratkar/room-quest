import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const RoomCard = ({ roomData }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
    const imagesCount = roomData.images.length;
    const swiperRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesCount);
        }, 3000); // Change image every 3000 ms (3 seconds)

        return () => clearInterval(interval);
    }, [imagesCount]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(currentIndex);
        }
    }, [currentIndex]);

    const handleRandomClick = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };

    const closeModal = () => {
        setShowModal(false); // Close the modal when clicking on the close button
    };

    return (
        <div className="flex bg-misty-rose shadow-lg rounded-lg overflow-hidden w-full mb-4 max-w-7xl mx-auto border-2 border-eggplant p-4 my-4">
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
                        <SwiperSlide key={index} className="flex items-center justify-center h-full">
                            <img
                                src={image.url}
                                alt={`Room Image ${index + 1}`}
                                className="w-72 h-72 object-cover"
                                style={{ width: '300px', height: '300px' }} // Set image size to 300x300
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Room Details on the Right */}
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <h2 className="text-md font-extralight mb-2 text-jet">"{roomData.roomDescription}"</h2>

                <div className="grid grid-cols-2 text-gray-700 gap-2">
                    <div><strong>Location:</strong>{roomData.location}</div>
                    <div><strong>Price:</strong>{roomData.price}</div>
                    <div><strong>Owner:</strong>{roomData.ownerName}</div>
                    <div><strong>Furnishing:</strong>{roomData.furnishing}</div>
                    <div><strong>Type:</strong>{roomData.accommodationType}</div>
                    <div><strong>Contact:</strong>{roomData.contactNumber}</div>
                    <div><strong>Amenities:</strong>{roomData.amenities}</div>
                    <div><strong>Property Age:</strong>{roomData.propertyAge} years</div>
                </div>

                {/* Discover Rooms Button */}
                <button
                    onClick={handleRandomClick}
                    className="mt-4 bg-orchid-pink hover:bg-thulian-pink text-white py-2 px-4 rounded"
                >
                    Discover Rooms
                </button>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Feature Coming Soon!</h3>
                        <p>This feature will be available in the near future.</p>
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-eggplant text-white py-2 px-4 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomCard;
