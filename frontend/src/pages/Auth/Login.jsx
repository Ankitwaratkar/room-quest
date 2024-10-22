import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify'; // Import toast for notifications

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        userType: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Get the location object

    // Extract the success message from the location state
    const { message } = location.state || {};

    useEffect(() => {
        // If a message exists, display it as a toast
        if (message) {
            toast.success(message);
        }
    }, [message]); // Only run when message changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUserTypeSelect = (type) => {
        setFormData((prevData) => ({
            ...prevData,
            userType: type,
        }));
    };

    const validateForm = () => {
        const { email, password, userType } = formData;
        if (!email || !password || !userType) {
            setError("Email, password, and user type are required.");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email format.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        try {
            const response = await axios.post("http://localhost:5000/api/login", formData);
            console.log(response.data);
            navigate("/home"); // Navigate to home or dashboard after successful login
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Login failed");
            } else {
                setError("An error occurred. Please try again.");
            }
            console.error("Error during login:", error);
        }
    };

    // Google Login success handler
    const handleGoogleSuccess = async (response) => {
        try {
            const res = await axios.post("http://localhost:5000/api/google-login", {
                token: response.credential,
            });

            toast.success("Google Sign-In Successful!");
            console.log("Google sign-in response:", res.data);

            navigate("/home"); // Redirect to the home page after successful login
        } catch (error) {
            toast.error("Google Sign-In failed!");
            console.error("Google Sign-In Error:", error);
        }
    };

    // Google Login failure handler
    const handleGoogleFailure = (error) => {
        toast.error("Google Sign-In was unsuccessful. Please try again.");
        console.error("Google Sign-In Failed:", error);
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-misty-rose">
            <div className="max-w-md w-full bg-orchid-pink p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-eggplant hover:text-jet transition-colors duration-300 mr-4"
                    >
                        <FaArrowLeft className="text-2xl" />
                    </button>
                    <h1 className="text-2xl font-bold flex-grow text-center text-jet">
                        {formData.userType ? `Login as ${formData.userType}` : "Login"}
                    </h1>
                </div>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* User Type Selection */}
                <div className="flex flex-col items-center mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        <button
                            onClick={() => handleUserTypeSelect("User")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${formData.userType === "User" ? "ring-2 ring-jet" : ""}`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => handleUserTypeSelect("Multi-Mess Manager")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${formData.userType === "Multi-Mess Manager" ? "ring-2 ring-jet" : ""}`}
                        >
                            Multi-Mess Manager
                        </button>
                        <button
                            onClick={() => handleUserTypeSelect("Residency Owner")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${formData.userType === "Residency Owner" ? "ring-2 ring-jet" : ""}`}
                        >
                            Residency Owner
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
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

                    {/* Password */}
                    <div className="relative">
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

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="w-full py-3 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 transform text-lg font-bold"
                        >
                            Login
                        </button>
                    </div>

                    {/* Google Sign-In Button */}
                    <div className="mt-4">
                        {/* <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleFailure}
                            buttonText="Sign In with Google"
                        /> */}
                    </div>
                </form>

                {/* Not a User? Sign Up */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-jet">
                        Not a user?{" "}
                        <button
                            onClick={() => navigate("/signup")}
                            className="text-eggplant hover:text-jet transition-colors duration-300"
                        >
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
