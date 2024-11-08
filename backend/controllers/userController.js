import User from '../models/User.js';
import { uploadImage } from '../config/cloudinary.js';
import bcrypt from 'bcrypt';
import axios from 'axios';
import { Buffer } from 'buffer';
import dbConnection from '../database/dbConnection.js';
// import { getAuth } from 'firebase/auth'; // Import Firebase Auth

// Ensure MongoDB is connected before handling requests
dbConnection();

export const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const registerUser = async (req, res) => {
    try {
        console.log("Incoming registration request body:", req.body);
        console.log("Uploaded file:", req.file);

        const { name, email, password, phone, userType, address, organization, dob, isGoogleSignUp } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists." });
        }

        let profilePicture = {};

        const uploadProfilePicture = async (fileBuffer) => {
            try {
                const uploadResult = await uploadImage(fileBuffer, 'space-venture/users/profile_picture');
                return {
                    url: uploadResult.secure_url,
                    public_id: uploadResult.public_id,
                };
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                throw new Error("Error uploading profile picture.");
            }
        };

        if (isGoogleSignUp === 'true') {
            try {
                const googleProfilePictureUrl = req.body.profilePicture;
                const response = await axios.get(googleProfilePictureUrl, { responseType: 'arraybuffer' });
                const imageBuffer = Buffer.from(response.data, 'binary');
                profilePicture = await uploadProfilePicture(imageBuffer);
            } catch (error) {
                console.error("Error fetching or uploading Google profile picture:", error);
                return res.status(500).json({ success: false, message: "Error uploading Google profile picture." });
            }
        } else if (isGoogleSignUp === 'false' && req.file) {
            try {
                const imageBuffer = req.file.buffer;
                profilePicture = await uploadProfilePicture(imageBuffer);
            } catch (error) {
                console.error("Error uploading profile picture:", error);
                return res.status(500).json({ success: false, message: "Error uploading profile picture." });
            }
        }

        let hashedPassword = password;
        if (isGoogleSignUp === 'false') {
            if (!password) {
                return res.status(400).json({ success: false, message: "Password is required." });
            }
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            userType,
            address,
            organization,
            dob,
            profilePicture,
            isGoogleSignUp: isGoogleSignUp === 'true',
        });

        await newUser.save();

        return res.status(201).json({ success: true, message: "Registration successful!" });

    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ success: false, message: "An error occurred during registration." });
    }
};


// export const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const userDoc = await User.findOne({ email });

//         if (!userDoc) {
//             return res.status(404).json({ error: "User not found in database." });
//         }

//         const auth = getAuth();
//         const userCredential = await auth.signInWithEmailAndPassword(email, password);
//         const user = userCredential.user;

//         if (!user.emailVerified) {
//             return res.status(403).json({ error: "Email not verified." });
//         }

//         res.json({
//             message: "Login successful",
//             user: {
//                 uid: userDoc.uid,
//                 email: userDoc.email,
//                 userType: userDoc.userType,
//                 name: userDoc.name,
//             },
//         });
//     } catch (error) {
//         console.error("Error during login:", error);
//         return res.status(401).json({ error: "Login failed. Please check your credentials." });
//     }
// };
