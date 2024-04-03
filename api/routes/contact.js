// routes/contactRoutes.js

import express from 'express';
import { saveContact } from '../controllers/contact.js';

const router = express.Router();

// Define route for saving contact details
router.post('/contact', saveContact);

export default router;
