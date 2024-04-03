// Import mongoose
import mongoose from 'mongoose';

// Define the schema for contact
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: false // Adjust as per your requirements
    },
    dates: {
        type: String,
        required: false // Adjust as per your requirements
    },
    options: {
        type: String,
        required: false // Adjust as per your requirements
    }
}, { timestamps: true });

// Create a model based on the schema
const Contact = mongoose.model('Contact', ContactSchema);

// Export the model
export default Contact;
