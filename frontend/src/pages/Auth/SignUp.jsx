import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig'; // Import your firebase configuration
import { useNavigate } from 'react-router-dom';
import axios from "axios";;

const SignUp = () => {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        userType: '',
        address: '',
        organization: '',
        dob: '',
        profilePicture: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, profilePicture: file }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePicturePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUserTypeSelect = (type) => {
        setFormData((prevData) => ({ ...prevData, userType: type }));
    };

    const validateForm = () => {
        const { name, email, password, phone, userType, address, organization, dob, profilePicture } = formData;
        if (!name || !email || !password || !phone || !userType || !address || !organization || !dob || !profilePicture) {
            toast.error('All fields are required.');
            return false;
        }
        return true;
    };

    const validateGoogleSignup = () => {
        if (!formData.userType) {
            toast.error('Please select a user type.');
            return false;
        }
        return true;
    };


    const handleGoogleSignUp = async () => {
        if (!validateGoogleSignup()) return; // Ensure userType is selected

        const provider = new GoogleAuthProvider();
        setIsLoading(true); // Set loading state

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userData = new FormData();
            userData.append('name', user.displayName || '');
            userData.append('email', user.email || '');
            userData.append('phone', formData.phone || '');
            userData.append('userType', formData.userType);
            userData.append('address', formData.address || '');
            userData.append('organization', formData.organization || '');
            userData.append('dob', formData.dob || '');
            userData.append('isGoogleSignUp', true);
            userData.append('profilePicture', user.photoURL); // Add the profile picture URL

            // Submit the form data
            const response = await handleSubmit(userData);

            // If registration was successful, show success message and set isRegistered
            if (response.success) {
                setIsRegistered(true); // Set registration status
                toast.success("Registration successful!"); // Display success message
                navigate("/login", { state: { message: "Registration successful! You can now log in." } });
            }
        } catch (error) {
            setError(error.message || "An error occurred during Google Sign Up.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Log form data to see if password is being captured correctly
        // console.log("Form data before submission:", formData);

        if (!validateForm()) return; // Validate the form

        setIsLoading(true); // Set loading state
        setError(null); // Clear previous errors

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user; // Get the user from email/password sign-up

            // Populate userData
            const userData = new FormData();
            userData.append('name', formData.name);
            userData.append('email', formData.email);
            userData.append('phone', formData.phone);
            // Since Firebase Auth handles password, you may not need to send it to the backend
            userData.append('password', formData.password); // Optionally omit this
            userData.append('userType', formData.userType); // User type
            userData.append('address', formData.address);
            userData.append('organization', formData.organization);
            userData.append('dob', formData.dob);

            if (formData.profilePicture) {
                userData.append('profilePicture', formData.profilePicture); // Profile picture
            }
            userData.append('isGoogleSignUp', false); // Indicate it's not a Google sign-up

            // Call the sign-up handler
            const response = await handleSubmit(userData);

            // If registration was successful, set isRegistered and show success message
            if (response.success) {
                setIsRegistered(true); // Set registration status
                // toast.success("Registration successful!"); // Display success message
                navigate("/login", { state: { message: "Registration successful! You can now log in." } });
            }
        } catch (error) {
            setError(error.message || "An error occurred during registration.");
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };


    const handleSubmit = async (userData) => {
        console.log("User data being sent to the server:", userData);

        try {
            const response = await axios.post("http://localhost:5000/api/v1/user/register", userData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                // Navigate to the Login page with a success message
                navigate("/login", { state: { message: "Registration successful! You can now log in." } });
                resetForm(); // Reset form fields after successful registration
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response ? error.response.data.message : "An error occurred during registration.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-misty-rose overflow-hidden">
            <div className="flex-grow max-w-4xl w-full bg-orchid-pink p-8 rounded-lg shadow-lg mx-auto my-10 flex flex-col">
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="text-eggplant hover:text-jet transition-colors duration-300 mr-4"
                    >
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <h1 className="text-3xl font-bold flex-grow text-center text-jet">
                        {formData.userType
                            ? `Register As ${formData.userType}`
                            : "Register"}
                    </h1>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* User Type Selection Buttons */}
                {!isRegistered && (
                    <div className="flex flex-col items-center mb-6">
                        <div className="flex space-x-4 justify-between w-full">
                            <button
                                onClick={() => handleUserTypeSelect("User")}
                                className="py-3 px-6 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold w-60 h-20 flex items-center justify-center"
                            >
                                User
                            </button>
                            <button
                                onClick={() => handleUserTypeSelect("Multi-Mess Manager")}
                                className="py-3 px-6 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold w-60 h-20 flex items-center justify-center"
                            >
                                Multi-Mess Manager
                            </button>
                            <button
                                onClick={() => handleUserTypeSelect("Residency Owner")}
                                className="py-3 px-6 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold w-60 h-20 flex items-center justify-center"
                            >
                                Residency Owner
                            </button>
                        </div>
                    </div>
                )}


                <form onSubmit={handleEmailSignUp} className="space-y-6 flex-grow overflow-auto">
                    {/* User Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Full Name */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="name" className="block text-sm font-medium text-jet">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                    required
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="dob" className="block text-sm font-medium text-jet">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    id="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="password" className="block text-sm font-medium text-jet">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Email Address */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="email" className="block text-sm font-medium text-jet">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                    required
                                />
                            </div>

                            {/* Phone Number */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="phone" className="block text-sm font-medium text-jet">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                    required
                                />
                            </div>

                            {/* Organization Name */}
                            <div className="relative transition-transform duration-300">
                                <label htmlFor="organization" className="block text-sm font-medium text-jet">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    name="organization"
                                    id="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Input */}
                    <div className="relative transition-transform duration-300">
                        <label htmlFor="address" className="block text-sm font-medium text-jet">
                            Address
                        </label>
                        <textarea
                            name="address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="mt-1 block w-full max-w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-eggplant transition-all duration-300 ease-in-out h-24 resize-none"
                            required
                        />
                    </div>


                    {/* Profile Picture Upload */}
                    <div className="relative transition-transform duration-300">
                        <label htmlFor="profilePicture" className="block text-sm font-medium text-jet mb-2">
                            Profile Picture
                        </label>

                        {/* Container for upload box and image preview */}
                        <div className={`flex items-center space-x-6 ${profilePicturePreview ? "w-full" : "w-full"}`}>
                            {/* Upload box with dashed border */}
                            <div className={`flex justify-center items-center ${profilePicturePreview ? "w-1/2" : "w-full"} h-48 px-6 py-0 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-eggplant transition-colors`}
                                onClick={() => document.getElementById('profilePicture').click()}>
                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H20V16H12V28H20V36H28V28H36V16H28V8Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    <div className="mt-2 text-sm text-gray-600">
                                        <span className="font-medium text-eggplant hover:text-jet">Click to upload</span>
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">PNG, JPEG up to 5MB</p>
                                </div>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    id="profilePicture"
                                    className="hidden"
                                    accept="image/png, image/jpeg"
                                    onChange={handleFileChange}
                                />
                            </div>

                            {/* Centered Image Preview */}
                            {profilePicturePreview && (
                                <div className={`flex justify-center items-center ${profilePicturePreview ? "w-1/2" : "w-full"}`}>
                                    <img
                                        src={profilePicturePreview}
                                        alt="Profile Preview"
                                        className="w-48 h-48 object-cover rounded-full border-2 border-gray-300 transition-transform duration-300 transform hover:scale-110"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="flex-1 py-2 w-full bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold"
                        disabled={isLoading} // Disable the button if loading
                    >
                        {isLoading ? 'Registering...' : 'Register'} {/* Change text based on loading state */}
                    </button>

                    {/* Google Sign-Up Button */}
                    <div className=" flex flex-col bg-misty-rose overflow-hidden">
                        {/* Your existing UI code... */}
                        <button onClick={handleGoogleSignUp} className="flex-1 py-2 w-full bg-white text-black rounded-md transition-colors duration-300 text-lg">
                            Sign up with Google
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="text-eggplant hover:text-jet underline"
                            >
                                Login here
                            </a>
                        </p>
                    </div>

                </form>
            </div >
        </div >
    );
};

export default SignUp;