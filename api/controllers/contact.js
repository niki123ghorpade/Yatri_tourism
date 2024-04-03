// contactController.js

import Contact from "../models/Contact.js";

export const saveContact = async (req, res, next) => {
    try {
        const { from_name, from_email, message, destination, dates, options } = req.body; // Extract data from request body

        // Create a new Contact instance using the Contact model
        const contact = new Contact({
            name: from_name,
            email: from_email,
            message,
            destination,
            dates,
            options,
        });

        // Save the contact to the database
        await contact.save();

        // Send a success response
        res.status(201).json({ message: 'Contact details saved successfully', contact });
    } catch (err) {
        // If an error occurs, send a 500 Internal Server Error response
        next(err);
    }
};
