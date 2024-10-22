import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();

// Custom hook to use the Auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null);
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/v1/user/get-user-by-email/${user.email}`);
                    if (response.status === 200) {
                        const data = response.data;
                        setCurrentUser(user);
                        setUserType(data.userType);
                    } else {
                        console.error("User document does not exist in MongoDB.");
                        setCurrentUser(null);
                        setUserType(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError("Failed to fetch user data.");
                    setCurrentUser(null);
                    setUserType(null);
                }
            } else {
                setCurrentUser(null);
                setUserType(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Fetch user details from MongoDB by email
            const response = await axios.get(`http://localhost:5000/api/v1/user/get-user-by-email/${email}`);
            if (response.status === 200) {
                const data = response.data;
                setCurrentUser(user);
                setUserType(data.userType);
                return data; // Return user data for additional use
            } else {
                console.error("User document does not exist after login.");
                throw new Error("User document does not exist.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Login failed. Please check your credentials."); // Set error state
            throw error; // Ensure the error can be caught in the component
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setCurrentUser(null);
            setUserType(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const value = {
        currentUser,
        userType,
        login,
        logout,
        error, // Include error in context
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children} {/* Render children only if not loading */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
