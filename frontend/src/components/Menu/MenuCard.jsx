import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const MenuCard = ({ menuData }) => {
    // Default to 0 rating if rating is undefined
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

    return (
        <div className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto bg-misty-rose rounded-lg overflow-hidden shadow-lg border-2 border-pink-100 mt-6">
            {/* Image on Top */}
            <img
                src="" // Single image source
                alt="Tasty Tiffins"
                className="w-full h-40 md:h-48 lg:h-56 object-cover"
            />

            {/* Menu Details */}
            <div className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-eggplant">Tasty Tiffins</h2>
                <p className="text-xs md:text-sm lg:text-base text-jet mt-2">
                    Delicious and hygienic tiffins delivered to your doorstep. Freshly prepared daily with a rotating menu to keep your meals exciting.
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 text-gray-700 gap-y-2 gap-x-0 md:gap-y-3">
                    <div><strong>Price:</strong> ₹150/meal</div>
                    <div><strong>Delivery Time:</strong> 30-40 min</div>
                    <div className="flex items-center">
                        <strong className="mr-1">Rating:</strong>
                        <div className="flex">{renderStars()}</div>
                    </div>
                    <div><strong>Contact:</strong> +1234567890</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full gap-12 mb-6">
                <button className="w-1/2 bg-jet text-white py-2 md:py-3 text-sm md:text-base rounded-r-lg hover:bg-eggplant">
                    Contact Now
                </button>
                <button className="w-1/2 bg-thulian-pink text-white py-2 md:py-3 text-sm md:text-base rounded-l-lg hover:bg-orchid-pink">
                    Explore More
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
