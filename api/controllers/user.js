import User from "../models/User.js";
import Users from "../models/User.js"; 

export const updateUsers=async(req,res,next)=>{
        try{
            const updatedUsers=await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUsers);
        
        }catch(err){

next(err);
}
}
export const deleteUsers=async(req,res,next)=>{
        try{
            await Users.findByIdAndDelete(req.params.id);
            res.status(200).json("Users has been deleted");
        
        }catch(err){
            next(err);
}
}



export const getUser=async(req,res,next)=>{
        try{
            const users=await Users.findById(req.params.id);
            res.status(200).json(users);
        
        }catch(err){

next(err);
}
}
export const getUsers=async(req,res,next)=>{
       
        try{
           const users= await Users.find();
            res.status(200).json(users);
}catch(err){

next(err);
}
}
export const getUserCount = async (req, res, next) => {
    try {
        const usersCount = await Users.countDocuments();
        res.status(200).json({ usersCount });
    } catch (err) {
        next(err);
    }
};

// Controller function for fetching user profile with isAdmin property
// Controller function for fetching user profile with isAdmin property
// Controller function for fetching admin profile
export const getAdminProfile = async (req, res, next) => {
    try {
        // Fetch admin data from the database based on the isAdmin property
        const admin = await Users.find({ isAdmin: true }).select('-password');
        if (!admin|| admin.length === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (err) {
        console.error('Error fetching admin profile:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};




// New controller function for handling forgot password
export const forgotPassword = async (req, res, next) => {
    // Implement the logic for forgot password here
    // Extract required information from request body (phone, securityQuestion, securityAnswer, newPassword)
    const { phone, securityQuestion, securityAnswer, newPassword } = req.body;

    try {
        // Find user by phone number
        const user = await Users.findOne({ phone });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify security question and answer
        if (user.securityQuestion !== securityQuestion || user.securityAnswer !== securityAnswer) {
            return res.status(400).json({ message: 'Incorrect security question or answer' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        // Send response
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        next(error);
    }
}
export const resetPassword=async(req,res)=>{
    try{
        const {phone,newPassword}=req.body;
    
    const salt=bcrypt.genSaltSync(10);
    const hashedPassword=bcrypt.hashSync(newPassword,salt);
    const updatedUsers=await User.findByIdAndUpdate(phone,{password:hashedPassword},{new:true});

}catch(error){
    console.error('Error resetting password:',error);
    res.status(500).json({success:false,message:'Password reset failed'});
}
};