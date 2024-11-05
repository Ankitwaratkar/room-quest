import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const AddRoomie = () => {
    const navigate = useNavigate();

    const facilitiesOptions = [
        "Wifi", "Air Conditioning", "Laundry", "Parking",
        "Gym", "Swimming Pool", "Food Facility", "Garden",
        "Balcony", "Playground", "Elevator", "Heating",
        "Fireplace", "CCTV Surveillance", "24/7 Security"
    ];

    const preferencesOptions = [
        "Vegetarian", "Vegan", "Non-Vegetarian", "Pet-Friendly",
        "No Pets", "No Smoking", "Quiet Environment", "Social Gatherings",
        "Party-Friendly", "Flexible Guests", "Late Night Access", "Early Risers",
        "Night Owls", "No Loud Music", "Cleanliness", "Shared Cooking",
        "Outdoor Activities", "Cultural Activities", "Budget Sharing",
        "Shared Chores", "Personal Space Respect", "Open to Visitors",
        "Family-Oriented", "Travel Enthusiasts", "Minimalist Lifestyle",
        "Hobbies (Art, Music, etc.)", "Tech-Savvy"
    ];

    const accommodationTypes = [
        "Studio", "1BHK", "2BHK", "3BHK",
        "4BHK", "5BHK", "Duplex", "Penthouse",
        "Villa", "Shared Room", "Private Room", "Townhouse"
    ];

    const furnishingOptions = [
        "Fully Furnished", "Partially Furnished", "Semi Furnished", "Unfurnished",
        "Furnishing Included", "Furnishing Negotiable", "Minimalist Furnished",
        "Luxury Furnished", "Vintage Furnished", "Modern Furnished",
        "Student Accommodation", "Family-Friendly Furnished",
        "Cozy Furnished", "Temporary Furnished", "Office Furnished"
    ];

    const [formData, setFormData] = useState({
        roommateName: '',
        roommateAge: '',
        roommateGender: '',
        roomType: '',
        furnishing: '',
        facilities: [],
        preferences: [],
        roomDesc: '',
        price: '',
        vacancy: '',
        address: '',
        profilePicture: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [showPreferencesDropdown, setShowPreferencesDropdown] = useState(false);
    const [showFacilitiesDropdown, setShowFacilitiesDropdown] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'file' ? files[0] : value,
        }));

        if (type === 'file' && files[0]) {
            setImagePreview(URL.createObjectURL(files[0]));
        }
    };

    const handleCheckboxChange = (event, field) => {
        const { value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [field]: prevFormData[field].includes(value)
                ? prevFormData[field].filter((item) => item !== value)
                : [...prevFormData[field], value],
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const dataToSubmit = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'facilities' || key === 'preferences') {
                value.forEach((item) => dataToSubmit.append(key, item));
            } else {
                dataToSubmit.append(key, value);
            }
        });

        try {
            const response = await axios.post(
                'http://localhost:5000/api/v1/residence/add-roommate',
                dataToSubmit,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                toast.success('Roommate added successfully');
                setFormData({
                    roommateName: '',
                    roommateAge: '',
                    roommateGender: '',
                    roomType: '',
                    furnishing: '',
                    facilities: [],
                    preferences: [],
                    roomDesc: '',
                    price: '',
                    vacancy: '',
                    address: '',
                    profilePicture: null,
                });
                setImagePreview(null);
                navigate('/'); // Redirect to home
            } else {
                toast.error(response.data.message || 'Failed to add roommate');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to add roommate');
        }
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md m-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Roommate</h2>

                {/* Name, Age, Gender */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold text-eggplant mb-2">Name</label>
                        <input
                            type="text"
                            name="roommateName"
                            value={formData.roommateName}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-eggplant mb-2">Age</label>
                        <input
                            type="number"
                            name="roommateAge"
                            value={formData.roommateAge}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-eggplant mb-2">Gender</label>
                        <select
                            name="roommateGender"
                            value={formData.roommateGender}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>

                {/* Vacancy, Price, Room Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Room Type</label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        >
                            <option value="">Select Room Type</option>
                            {accommodationTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Vacant Space For Room-mates</label>
                        <input
                            type="number"
                            name="vacancy"
                            value={formData.vacancy}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        />
                    </div>
                </div>

                {/* Furnishing Type, Preferences, Facilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Furnishing Type</label>
                        <select
                            name="furnishing"
                            value={formData.furnishing}
                            onChange={handleChange}
                            required
                            className="p-3 border border-gray-300 rounded-lg w-full"
                        >
                            <option value="">Select Furnishing Type</option>
                            {furnishingOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* Preferences Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Preferences</label>
                        <button
                            type="button"
                            onClick={() => setShowPreferencesDropdown(!showPreferencesDropdown)}
                            className="p-3 border border-gray-300 rounded-lg w-full text-left"
                        >
                            {formData.preferences.length > 0 ? formData.preferences.join(', ') : 'Select Preferences'}
                        </button>
                        {showPreferencesDropdown && (
                            <div className="absolute bg-white border border-gray-300 rounded-md mt-1">
                                {preferencesOptions.map((preference, index) => (
                                    <label key={index} className="block p-2">
                                        <input
                                            type="checkbox"
                                            value={preference}
                                            checked={formData.preferences.includes(preference)}
                                            onChange={(e) => handleCheckboxChange(e, 'preferences')}
                                        />
                                        {preference}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Facilities Dropdown */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-eggplant">Facilities</label>
                        <button
                            type="button"
                            onClick={() => setShowFacilitiesDropdown(!showFacilitiesDropdown)}
                            className="p-3 border border-gray-300 rounded-lg w-full text-left"
                        >
                            {formData.facilities.length > 0 ? formData.facilities.join(', ') : 'Select Facilities'}
                        </button>
                        {showFacilitiesDropdown && (
                            <div className="absolute bg-white border border-gray-300 rounded-md mt-1">
                                {facilitiesOptions.map((facility, index) => (
                                    <label key={index} className="block p-2">
                                        <input
                                            type="checkbox"
                                            value={facility}
                                            checked={formData.facilities.includes(facility)}
                                            onChange={(e) => handleCheckboxChange(e, 'facilities')}
                                        />
                                        {facility}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Address, Room Description */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-eggplant">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-300 rounded-lg w-full"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-eggplant">Room Description</label>
                    <textarea
                        name="roomDesc"
                        value={formData.roomDesc}
                        onChange={handleChange}
                        required
                        className="p-3 border border-gray-300 rounded-lg w-full"
                        rows="4"
                    />
                </div>

                {/* Profile Picture Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2 text-eggplant">Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleChange}
                        className="p-3 border border-gray-300 rounded-lg w-full"
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>

                <button type="submit" className="bg-eggplant hover:bg-[#ea86ac] text-white font-bold py-2 px-4 rounded">
                    Add Roommate
                </button>
            </form>
        </>
    );
};

export default AddRoomie;
