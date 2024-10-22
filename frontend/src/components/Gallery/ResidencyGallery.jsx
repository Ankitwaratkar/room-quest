import React from 'react'
import img1 from '../../assets/gallery/residence-gal/resi_gal1.png';
import img2 from '../../assets/gallery/residence-gal/resi_gal2.png';
import img3 from '../../assets/gallery/residence-gal/resi_gal3.png';
import img4 from '../../assets/gallery/residence-gal/resi_gal4.png';
import img5 from '../../assets/gallery/residence-gal/resi_gal5.png';
import img6 from '../../assets/gallery/residence-gal/resi_gal6.png';
import img7 from '../../assets/gallery/residence-gal/resi_gal7.png';
import img8 from '../../assets/gallery/residence-gal/resi_gal8.png';
import img9 from '../../assets/gallery/residence-gal/resi_gal9.png';

const ResidencyGallery = () => {
    return (
        <div className="bg-pink-100 h-full flex flex-col items-center justify-center py-12">
            <div className="w-full max-w-6xl">
                <h1 className="text-6xl font-bold text-[#6E4555] mb-8 text-center">
                    Gallery Of Room Residencies
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Image 1 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img1}
                            alt="Spacious room for rent"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Spacious room for rent</p>
                    </div>

                    {/* Image 2 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img2}
                            alt="Roommate-friendly apartment"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Roommate-friendly apartment</p>
                    </div>

                    {/* Image 3 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img3}
                            alt="Modern living space"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Modern living space</p>
                    </div>

                    {/* Image 4 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img4}
                            alt="Affordable rooms"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Affordable rooms</p>
                    </div>

                    {/* Image 5 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img5}
                            alt="Luxury room rentals"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Luxury room rentals</p>
                    </div>

                    {/* Image 6 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img6}
                            alt="Student accommodation"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Student accommodation</p>
                    </div>

                    {/* Image 7 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img7}
                            alt="Shared living spaces"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Shared living spaces</p>
                    </div>

                    {/* Image 8 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img8}
                            alt="Cozy rooms"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Cozy rooms</p>
                    </div>

                    {/* Image 9 */}
                    <div className="gallery-item bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-110">
                        <img
                            src={img9}
                            alt="Fully-furnished rooms"
                            className="w-full h-64 object-cover"
                            loading="lazy"
                        />
                        <p className="text-center text-black mt-2">Fully-furnished rooms</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidencyGallery