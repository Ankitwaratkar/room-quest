import express from 'express';
import { getUserByEmail, loginUser, registerUser } from '../controllers/userController.js';
import upload from '../config/multer.js'; // Import multer config

const router = express.Router();

router.get('/get-user-by-email/:email', getUserByEmail);

// Route for user registration with file upload
router.post('/register', upload.single('profilePicture'), registerUser);

export default router;