import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MenuCard = ({ menuData }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const rating = menuData?.rating || 0;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < rating ? "text-yellow-400" : "text-gray-300"}
                />
            );
        }
        return stars;
    };

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    // Show only the first 3 lines of the description
    const description = menuData?.description || '';
    const shortDescription = description.slice(0, 150); // Adjust number of characters for the first "3 lines"

    // Show modal when button is clicked
    const handleButtonClick = () => {
        setShowModal(true); // Show the modal
        setTimeout(() => setShowModal(false), 3000); // Hide modal after 3 seconds (you can adjust timing)
    };

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-misty-rose rounded-lg overflow-hidden shadow-lg border-2 border-pink-100 mt-6">
            {/* Image on Top */}
            <img
                src={menuData?.image?.url || ""} // Add the image URL here
                alt="Tasty Tiffins"
                className="w-full h-40 md:h-48 lg:h-56 object-cover"
            />

            {/* Menu Details */}
            <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-eggplant">{menuData?.name}</h2>
                <p className="text-xs md:text-sm lg:text-base text-jet mt-2">
                    {isExpanded ? description : shortDescription}
                </p>
                {/* Toggle Read More / Show Less */}
                <button
                    onClick={toggleDescription}
                    className="text-thulian-pink mt-2 text-sm font-semibold hover:underline"
                >
                    {isExpanded ? 'Show Less' : 'Read More'}
                </button>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 text-gray-700 gap-y-2 gap-x-0 md:gap-y-3">
                    <div><strong>Price:</strong> ₹{menuData?.price}</div>
                    <div><strong>Delivery Time:</strong> {menuData?.deliveryTime}</div>
                    <div className="flex items-center">
                        <strong className="mr-1">Rating:</strong>
                        <div className="flex">{renderStars()}</div>
                    </div>
                    <div><strong>Contact:</strong> +1234567890</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-12 mb-6">
                <button
                    className="w-1/2 bg-jet text-white py-2 md:py-3 text-sm md:text-base rounded-r-lg hover:bg-eggplant"
                    onClick={handleButtonClick} // Show modal on click
                >
                    Contact Now
                </button>
                <button
                    className="w-1/2 bg-thulian-pink text-white py-2 md:py-3 text-sm md:text-base rounded-l-lg hover:bg-orchid-pink"
                    onClick={handleButtonClick} // Show modal on click
                >
                    Explore More
                </button>
            </div>

            {/* Modal Popup */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg text-center max-w-md w-full">
                        <h2 className="text-xl font-semibold text-thulian-pink mb-4">
                            This option will be available in the future!
                        </h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="bg-eggplant text-white py-2 px-4 rounded-lg hover:bg-thulian-pink"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuCard;
