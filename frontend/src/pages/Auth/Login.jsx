import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from 'react-toastify'; // Import toast for notifications
import { auth } from "../../../firebase/firebaseConfig"; // Make sure you have the right path
import { useAuth } from "../../contexts/AuthContext"; // Ensure this path is correct
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import for Google sign-in

const Login = () => {
    const { currentUser, login } = useAuth();
    const [userType, setUserTypeSelection] = useState("");
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        if (currentUser) {
            // Redirect based on userType
            switch (currentUser.userType) {
                case "User":
                    navigate("/user-home");
                    break;
                case "Residency Owner":
                    navigate("/residence-owner-home");
                    break;
                case "Multi-Mess Manager":
                    navigate("/multi-mess-manager-home");
                    break;
                default:
                    navigate("/login");
            }
        }
    }, [currentUser, navigate]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!userType) {
            toast.error("Please select a user type before logging in.");
            return;
        }

        try {
            const userDoc = await login(email, password); // Get user data directly
            toast.success("Login successful!");

            // Navigate based on userType
            switch (userDoc.userType) {
                case "User":
                    navigate("/user-home");
                    break;
                case "Residency Owner":
                    navigate("/residence-owner-home");
                    break;
                case "Multi-Mess Manager":
                    navigate("/multi-mess-manager-home");
                    break;
                default:
                    navigate("/login");
            }
        } catch (error) {
            console.error("Login error caught in handleSignIn:", error);
            toast.error("Login failed. Please check your credentials."); // Generic error message
        }
    };


    const handleGoogleSignIn = async () => {
        if (!userType) {
            toast.error("Please select a user type before logging in with Google.");
            return;
        }

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const response = await axios.get(`http://localhost:5000/api/v1/user/get-user-by-email/${user.email}`);
            const userDoc = response.data;

            if (userDoc) {
                // No need to setCurrentUser as it's handled in AuthProvider
                setUserTypeSelection(userDoc.userType); // Update the user type state
                toast.success("Login successful!");

                // Navigate based on userType
                switch (userDoc.userType) {
                    case "User":
                        navigate("/user-home");
                        break;
                    case "Residency Owner":
                        navigate("/residence-owner-home");
                        break;
                    case "Multi-Mess Manager":
                        navigate("/multi-mess-manager-home");
                        break;
                    default:
                        navigate("/login");
                }
            } else {
                toast.error("User document does not exist.");
            }
        } catch (error) {
            toast.error("Login failed. Please try again.");
        }
    };

    const handleUserTypeSelect = (type) => {
        setUserTypeSelection(type);
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
                        {userType ? `Login as ${userType}` : "Login"}
                    </h1>
                </div>

                {/* User Type Selection */}
                <div className="flex flex-col items-center mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                        <button
                            onClick={() => handleUserTypeSelect("User")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${userType === "User" ? "ring-2 ring-jet" : ""}`}
                        >
                            User
                        </button>
                        <button
                            onClick={() => handleUserTypeSelect("Multi-Mess Manager")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${userType === "Multi-Mess Manager" ? "ring-2 ring-jet" : ""}`}
                        >
                            Multi-Mess Manager
                        </button>
                        <button
                            onClick={() => handleUserTypeSelect("Residency Owner")}
                            className={`py-4 bg-eggplant text-white rounded-md hover:bg-jet transition-colors duration-300 text-lg font-bold ${userType === "Residency Owner" ? "ring-2 ring-jet" : ""}`}
                        >
                            Residency Owner
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSignIn} className="space-y-4">
                    {/* Email */}
                    <div className="relative">
                        <label htmlFor="email" className="block text-sm font-medium text-jet">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
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
                    <div className="flex flex-col bg-misty-rose overflow-hidden">
                        <button onClick={handleGoogleSignIn} className="flex-1 py-2 w-full bg-white text-black rounded-md transition-colors duration-300 text-lg">
                            Sign in with Google
                        </button>
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
