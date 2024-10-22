import React from 'react'
import messGallery1 from '../../assets/gallery/mess-gal/mess-gal1.png';
import messGallery2 from '../../assets/gallery/mess-gal/mess-gal2.png';
import messGallery3 from '../../assets/gallery/mess-gal/mess-gal3.png';
import messGallery4 from '../../assets/gallery/mess-gal/mess-gal4.png';
import messGallery5 from '../../assets/gallery/mess-gal/mess-gal5.png';
import messGallery6 from '../../assets/gallery/mess-gal/mess-gal6.png';
import messGallery7 from '../../assets/gallery/mess-gal/mess-gal7.png';
import messGallery8 from '../../assets/gallery/mess-gal/mess-gal8.png';
import messGallery9 from '../../assets/gallery/mess-gal/mess-gal9.png';

const MessGallery = () => {
    return (
        <div className="bg-pink-100 h-full flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-6xl">
                <h1 className="text-6xl font-bold text-[#6E4555] mb-8 text-center">
                    Mess Outlets Thalis
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Image 1 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery1}
                            alt="Spacious room for rent"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Delicious thalis daily</p>
                    </div>

                    {/* Image 2 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery2}
                            alt="Roommate-friendly apartment"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Tasty meals, always</p>
                    </div>

                    {/* Image 3 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery3}
                            alt="Modern living space"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Wholesome thali servings.</p>
                    </div>

                    {/* Image 4 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery4}
                            alt="Affordable rooms"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Fresh flavors, daily</p>
                    </div>

                    {/* Image 5 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery5}
                            alt="Luxury room rentals"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Thalis for every taste</p>
                    </div>

                    {/* Image 6 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery6}
                            alt="Student accommodation"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Comfort food thalis</p>
                    </div>

                    {/* Image 7 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery7}
                            alt="Shared living spaces"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Healthy thalis here</p>
                    </div>
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery8}
                            alt="Shared living spaces"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Affordable thali meals</p>
                    </div>
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={messGallery9}
                            alt="Shared living spaces"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Satisfying thali options</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessGallery