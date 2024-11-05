import React, { useState, useEffect } from 'react';
import OutletMenuItem from '../../../../backend/models/Residence';
const MenuItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        deliveryTime: '',
        rating: '',
        images: [] // Store image files for form submission
    });
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]); // State for image previews

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 4) {
            alert('You can only upload a maximum of 4 images.');
            return;
        }

        const imageUrls = files.map(file => URL.createObjectURL(file));
        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...files]
        }));

        setImagePreviews(prev => [...prev, ...imageUrls]);
        e.target.value = '';
    };

    const removeImage = (index) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        const { error } = OutletMenuItem.validate(formData, { abortEarly: false });
        if (error) {
            const newErrors = {};
            error.details.forEach(err => {
                newErrors[err.path[0]] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        console.log('Form data submitted:', formData);
        // Handle form submission, e.g., send data to API
    };

    return (
        <div className="bg-misty-rose min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className={`bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg transform transition-transform duration-[1.5s] ease-in-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-50'}`}
                style={{ boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)' }}
            >
                <h2 className="text-eggplant font-bold text-2xl mb-6 text-center">Add New Menu Item</h2>

                {/* Menu Name */}
                <label className="text-jet font-semibold">Item Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 mb-4 border ${errors.name ? 'border-red-500' : 'border-thulian-pink'} rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                {/* Description */}
                <label className="text-jet font-semibold">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`w-full p-3 mb-4 border ${errors.description ? 'border-red-500' : 'border-thulian-pink'} rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200`}
                    rows="3"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                {/* Price */}
                <label className="text-jet font-semibold">Price:</label>
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={`w-full p-3 mb-4 border ${errors.price ? 'border-red-500' : 'border-thulian-pink'} rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200`}
                />
                {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

                {/* Delivery Time */}
                <label className="text-jet font-semibold">Delivery Time:</label>
                <input
                    type="text"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleChange}
                    className={`w-full p-3 mb-4 border ${errors.deliveryTime ? 'border-red-500' : 'border-thulian-pink'} rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200`}
                />
                {errors.deliveryTime && <p className="text-red-500 text-sm">{errors.deliveryTime}</p>}

                {/* Rating */}
                <label className="text-jet font-semibold">Rating:</label>
                <input
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className={`w-full p-3 mb-6 border ${errors.rating ? 'border-red-500' : 'border-thulian-pink'} rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200`}
                />
                {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}

                {/* Image Upload */}
                <label className="text-jet font-semibold">Upload Images (1-4 images):</label>
                <div className="relative mb-4">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                        style={{ display: 'none' }} // Hide original file input
                    />
                    <button
                        type="button"
                        onClick={() => document.querySelector('input[type=file]').click()} // Trigger the hidden file input
                        className="w-full p-3 border border-thulian-pink rounded-lg bg-orchid-pink text-left focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-200"
                    >
                        {formData.images.length > 0
                            ? `${formData.images.length} image(s) selected` // Display image count
                            : 'No images chosen'}
                    </button>
                </div>

                {/* Image Previews */}
                <div className="flex flex-wrap mb-4">
                    {imagePreviews.map((image, index) => (
                        <div key={index} className="relative w-24 h-24 mr-2">
                            <img
                                src={image}
                                alt={`preview ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)} // Remove image on click
                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                {/* Add Item Button */}
                <button
                    type="submit"
                    className="bg-thulian-pink text-white font-semibold px-6 py-3 rounded-lg w-full transition-transform transform hover:scale-105 hover:bg-eggplant focus:outline-none focus:ring-4 focus:ring-thulian-pink"
                >
                    Add Item
                </button>
            </form>
        </div>
    );
};

export default MenuItem;
