import Enquire from "../models/Enquires.js"; 
import User from "../models/User.js";

export const createEnquire = async (req, res, next) => {
  try {
    // Extract userId from request body
    
    // Create enquiry associated with the user
    const enquire = await Enquire.create({...req.body, status: 'Pending' });
    const savedEnquire = await enquire.save();
    res.status(201).json(savedEnquire);
  } catch (err) {
    next(err);
  }
};


export const updateEnquire = async (req, res, next) => {
  try {
    const updatedEnquire = await Enquire.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!updatedEnquire) {
      return res.status(404).json({ message: "Enquire not found" });
    }
    res.status(200).json(updatedEnquire);
  } catch (err) {
    next(err);
  }
};

export const deleteEnquire = async (req, res, next) => {
  try {
    const {id}=req.params;
    const deletedEnquire = await Enquire.findByIdAndDelete(id);
    if (!deletedEnquire) {
      return res.status(404).json({ message: "Enquire not found" });
    }
  res.json({ message: "Enquire has been deleted" }); // Changed status code to 204 (No Content)
  } catch (err) {
   res.status(400).json({message:err.message});
  }
};

export const getEnquire = async (req, res, next) => {
  try {
    const enquire = await Enquire.findById(req.params.id);
    if (!enquire) {
      return res.status(404).json({ message: "Enquire not found" });
    }
    res.status(200).json(enquire);
  } catch (err) {
    next(err);
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquire.find();
    res.status(200).json(enquiries);
  } catch (err) {
    next(err);
  }
};
export const getEnquiryCount = async (req, res, next) => {
  try {
      const enquiriesCount = await Enquire.countDocuments();
      res.status(200).json({ enquiriesCount });
  } catch (err) {
      next(err);

  }
};
export const getEnquiriesForUser = async (req, res, next) => {
  try {
    const { userId} = req.params; // Assuming fullname is provided in the URL parameters
    const enquiries = await Enquire.find({  userid:userId }); // Querying based on the fullname field
    res.status(200).json(enquiries);
  } catch (err) {
    next(err);
  }
};


export const markEnquiryContacted = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEnquire = await Enquire.findByIdAndUpdate(id, { status: 'Contacted' }, { new: true });
    if (!updatedEnquire) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(updatedEnquire);
  } catch (err) {
    next(err);
  }
};

export const markEnquiryChecked = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedEnquire = await Enquire.findByIdAndUpdate(id, { status: 'Checked' }, { new: true });
    if (!updatedEnquire) {
      return res.status(404).json({ message: "Enquiry not found" });
    }
    res.status(200).json(updatedEnquire);
  } catch (err) {
    next(err);
  }
};
export const getPendingEnquiries = async (req, res, next) => {
  try {
    const pendingEnquiries = await Enquire.find({ status: 'Pending' });
    res.status(200).json(pendingEnquiries);
  } catch (err) {
    next(err);
  }
};
export const getCheckedEnquiries = async (req, res, next) => {
  try {
    const checkedEnquiries = await Enquire.find({ status: 'Checked' });
    res.status(200).json(checkedEnquiries);
  } catch (err) {
    next(err);
  }
};
export const getPendingEnquiriesCount = async (req, res, next) => {
  try {
    const pendingCount = await Enquire.countDocuments({ status: 'Pending' });
    res.status(200).json({ pendingCount });
  } catch (err) {
    next(err);
  }
};
// enquire.js

export const getCheckedEnquiriesCount = async (req, res, next) => {
  try {
    const checkedCount = await Enquire.countDocuments({ status: 'Checked' });
    res.status(200).json({ checkedCount });
  } catch (err) {
    next(err);
  }
};
