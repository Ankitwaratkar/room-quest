import express from 'express';
import upload from '../config/multer.js';
import { addMess, getMessById, messOutlets } from '../controllers/messController.js';

const router = express.Router();

router.post('/add-mess', upload.single('image'), addMess); // Ensure the name matches the form input
router.get('/outlet/:id', getMessById);
router.get('/mess-outlets', messOutlets);

export default router;
