// import mongoose from 'mongoose';
import { uploadImage } from '../config/cloudinary.js';
import { Outlet, validateOutlet } from '../models/Outlet.js';

export const addMess = async (req, res) => {
    console.log('Incoming request body:', req.body);
    console.log('Incoming file:', req.file); // Log the incoming file for debugging

    // Validate the request body
    const { error } = validateOutlet(req.body);
    if (error) {
        console.error('Validation error:', error.details);
        return res.status(400).send(error.details.map(err => err.message));
    }

    const { outletName, location, phone, email, openingHours, userType, description, coordinates } = req.body;

    // Extract coordinates directly from the coordinates object
    const lat = parseFloat(coordinates.lat); // Access lat from coordinates
    const lng = parseFloat(coordinates.lng); // Access lng from coordinates

    // Check if lat or lng is NaN
    if (isNaN(lat) || isNaN(lng)) {
        console.error('Invalid coordinates provided:', { lat, lng });
        return res.status(400).send('Invalid coordinates provided.'); // Return error response
    }

    const coordinateValues = { lat, lng };

    try {
        const outletType = userType === 'Multi-Mess Manager' ? 'Mess' : 'Residence';

        // Upload the image to Cloudinary
        const folderPath = 'space-venture/mess/outlets'; // Folder path for storage
        const imageResult = await uploadImage(req.file.buffer, folderPath);

        const outlet = new Outlet({
            outletName,
            location,
            phone,
            email,
            openingHours,
            coordinates: coordinateValues, // Use the new coordinateValues
            userType,
            outletType,
            description,
            image: {
                url: imageResult.secure_url,
                public_id: imageResult.public_id,
            },
        });

        await outlet.save();
        res.status(201).send(outlet);
    } catch (err) {
        console.error('Error adding outlet:', err);
        res.status(500).send('Server error');
    }
};

export const messOutlets = async (req, res) => {
    try {
        const outlets = await Outlet.find(); // Fetch all outlets from the database
        res.status(200).json(outlets); // Send the outlets data as a response
    } catch (error) {
        console.error('Error fetching outlets:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

export const getMessById = async (req, res) => {
    try {
        const { id } = req.params; // Get the outlet ID from the request parameters

        // Validate the ID
        if (!id || !mongoose.isValidObjectId(id)) { // Check if the ID is a valid ObjectId
            return res.status(400).json({ message: 'Invalid outlet ID provided.' });
        }

        const outlet = await Outlet.findById(id).select('outletName location phone email openingHours coordinates image'); // Select only relevant fields

        if (!outlet) {
            return res.status(404).json({ message: 'Outlet not found.' }); // Handle case where outlet is not found
        }

        res.status(200).json(outlet); // Send the found outlet data as a response
    } catch (error) {
        console.error('Error fetching outlet:', error);
        res.status(500).json({ message: 'Server error.' }); // Handle server errors
    }
};
