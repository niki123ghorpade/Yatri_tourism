import express from 'express';
import {getEnquiries, createEnquire, getCheckedEnquiries,deleteEnquire,getCheckedEnquiriesCount,getEnquiriesForUser,getEnquiryCount,getPendingEnquiriesCount,getEnquire,updateEnquire, getPendingEnquiries,markEnquiryContacted, markEnquiryChecked} from '../controllers/enquire.js';
import { verifyAdmin, verifyToken, verifyUser } from "./utils/verifyToken.js";
const router = express.Router();

// Define the route path for fetching all enquiries
router.get("/",getEnquiries);
router.get("/find/:id",getEnquire);
// Define the route path for creating a new enquiry
router.post("/",createEnquire);
router.get('/user/:userId', getEnquiriesForUser);
router.put("/:id", updateEnquire);
router.delete('/:id',deleteEnquire);
router.get("/count", getEnquiryCount);
router.put("/contacted/:id",markEnquiryContacted); // Mark an enquiry as Contacted
router.put("/checked/:id",markEnquiryChecked);
router.get('/pending', getPendingEnquiries);
router.get('/checked', getCheckedEnquiries);
router.get('/pending-count', getPendingEnquiriesCount);
router.get('/checked-count', getCheckedEnquiriesCount);

export default router;
