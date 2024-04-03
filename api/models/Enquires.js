import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
 userid:{
type:String,
required:true
 },
 packageId:{
type:String,
required:true
 },
  
  destinationName: {
    type: Array,
   required:true
  },
  fullname: {
    type: String,
    required: true
  },
  phoneNo: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  packageType: {
    type: String,
   required: true
  },
 
  startDate: {
    type: String,
    required: false // Adjust as needed
  },
  endDate: {
    type: String,
    required: false // Adjust as needed
  },
  options: {
    adult: {
      type: Number,
      required: false
    },
    children: {
      type: Number,
      required: false
    },
    infant: {
      type: Number,
      required: false
    }
  },
  message: {
    type: String,
    required: true// Change required to true if this field is required
  },
  status: {
    type: String,
    default: 'Pending'
  }
 
});

export default mongoose.model("Enquiry", EnquirySchema);
