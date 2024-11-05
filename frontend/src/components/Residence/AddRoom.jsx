import React, { useState } from 'react';
import axios from 'axios';

function AddRoom() {
    const [images, setImages] = useState([]); // Store actual file objects
    const [imagePreviews, setImagePreviews] = useState([]); // Store preview URLs
    const [formData, setFormData] = useState({
        price: '',
        location: '',
        ownerName: '',
        furnishing: '',
        accommodationType: '',
        contactNumber: '',
        roomDescription: '',
        facilities: [],
        amenities: '',
        propertyAge: '',
        availableFrom: ''
    });
    const [errorMessages, setErrorMessages] = useState([]); // For storing error messages

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // Get the actual file objects
        setImages(files); // Store the actual file objects for submission
        // Create preview URLs for rendering
        const imagePreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(imagePreviews); // Store preview URLs
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setFormData(prevData => {
            const facilities = checked
                ? [...prevData.facilities, value] // Add the facility if checked
                : prevData.facilities.filter(facility => facility !== value); // Remove if unchecked
            return { ...prevData, facilities }; // Update the facilities state
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]); // Clear previous error messages
        const formPayload = new FormData();

        // Append actual file objects to FormData
        images.forEach((image) => {
            formPayload.append('images', image); // Append file objects directly
        });

        // Append the rest of the form data
        Object.keys(formData).forEach(key => {
            if (Array.isArray(formData[key])) {
                formData[key].forEach(item => {
                    formPayload.append(key, item); // Append each item in the array
                });
            } else {
                formPayload.append(key, formData[key]); // Append other types directly
            }
        });

        // Log form data before sending
        console.log('Form Data Before Submission:', Array.from(formPayload.entries())); // Inspect the payload

        try {
            const response = await axios.post('http://localhost:5000/api/v1/residence/register-room', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Reset form and states
            setImages([]);
            setImagePreviews([]);
            setFormData({
                price: '',
                location: '',
                ownerName: '',
                furnishing: '',
                accommodationType: '',
                contactNumber: '',
                roomDescription: '',
                facilities: [],
                amenities: '',
                propertyAge: '',
                availableFrom: ''
            });
        } catch (error) {
            console.error("Error submitting the form:", error);
            if (error.response) {
                setErrorMessages(error.response.data.errors || ["An error occurred while submitting the form."]);
            }
        }
    };

    const facilitiesOptions = [
        "Wifi",
        "Parking",
        "Gym",
        "Swimming Pool",
        "Air Conditioning",
        "Laundry",
        "Food Facility",
        "Pet Friendly",
        "24/7 Security",
        "Garden",
        "Playground",
        "Balcony",
        "Elevator",
        "Furnished Kitchen",
        "Heating",
        "Fireplace",
        "CCTV Surveillance"
    ];

    const accommodationTypes = [
        "Studio",
        "1BHK",
        "2BHK",
        "3BHK",
        "4BHK",
        "5BHK",
        "Duplex",
        "Penthouse",
        "Villa",
        "Shared Room",
        "Private Room",
        "Townhouse"
    ];

    const furnishingOptions = [
        "Fully Furnished",
        "Partially Furnished",
        "Semi Furnished",
        "Unfurnished",
        "Furnishing Included",
        "Furnishing Negotiable",
        "Minimalist Furnished",
        "Luxury Furnished",
        "Vintage Furnished",
        "Modern Furnished",
        "Student Accommodation",
        "Family-Friendly Furnished",
        "Cozy Furnished",
        "Temporary Furnished",
        "Office Furnished"
    ];

    return (
        <div className="min-h-screen bg-[#F7D7DC] flex items-center justify-center py-10">
            <form onSubmit={handleSubmit} className="bg-[#E8B4BC] p-8 rounded-lg shadow-lg max-w-4xl w-full flex">
                {/* Left Side */}
                <div className="w-1/2 pr-4">
                    <h2 className="text-2xl font-bold mb-6 text-center text-[#3a3238]">Register Your Residence</h2>

                    {/* Image Upload Fields with Previews */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Image Upload (Required)</label>
                        <input
                            type="file"
                            className="w-full p-2 border rounded bg-[#f5e3e0]"
                            onChange={handleImageChange}
                            multiple
                            accept="image/*"
                            required
                        />
                        <div className="mt-2 grid grid-cols-4 gap-2">
                            {imagePreviews.map((image, index) => (
                                <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-20 h-20 rounded-lg" />
                            ))}
                        </div>
                    </div>

                    {/* Facilities Options */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Facilities</label>
                        <div className="flex flex-wrap gap-2">
                            {facilitiesOptions.map((facility, index) => (
                                <label key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={facility}
                                        onChange={handleCheckboxChange}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">{facility}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Amenities Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Amenities</label>
                        <input
                            type="text"
                            name="amenities"
                            value={formData.amenities}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter amenities (e.g., WiFi, Air Conditioning)"
                            required
                        />
                    </div>

                    {/* Error Messages */}
                    {errorMessages.length > 0 && (
                        <div className="mb-4 text-red-600">
                            {errorMessages.map((msg, index) => (
                                <p key={index}>{msg}</p>
                            ))}
                        </div>
                    )}

                    {/* Property Age Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Property Age (in years)</label>
                        <input
                            type="number"
                            name="propertyAge"
                            value={formData.propertyAge}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter property age"
                            required
                        />
                    </div>

                    {/* Available From Field */}
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Available From</label>
                        <input
                            type="date"
                            name="availableFrom"
                            value={formData.availableFrom}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            required
                        />
                    </div>
                </div>

                {/* Vertical Divider */}
                <div className="border-l border-gray-300 mx-4"></div>

                {/* Right Side */}
                <div className="w-1/2 pl-4">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Price</label>
                        <input
                            type="text"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter price"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter location"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Owner Name</label>
                        <input
                            type="text"
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter owner name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Furnishing Type</label>
                        <select
                            name="furnishing"
                            value={formData.furnishing}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            required
                        >
                            <option value="">Select Furnishing Type</option>
                            {furnishingOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Accommodation Type</label>
                        <select
                            name="accommodationType"
                            value={formData.accommodationType}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            required
                        >
                            <option value="">Select Accommodation Type</option>
                            {accommodationTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter contact number"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2 text-[#3a3238]">Room Description</label>
                        <textarea
                            name="roomDescription"
                            value={formData.roomDescription}
                            onChange={handleInputChange}
                            className="block w-full px-4 py-2 border rounded-lg text-gray-700 bg-white"
                            placeholder="Enter room description"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#3a3238] text-white font-bold py-2 px-4 rounded hover:bg-[#5a4448] transition duration-300"
                    >
                        Register Room
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRoom;
