import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {createError} from "../routes/utils/error.js";
import jwt from "jsonwebtoken";

import Users from "../models/User.js"; 

export const register =async(req,res,next)=>{
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser=new User({
            ...req.body,
            password:hash,
        })
        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err)
    }
}
export const login =async(req,res,next)=>{
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found"))
        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong password or username"));
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT);
        const {password,isAdmin,...otherDetails}=user._doc;
        res.cookie("access_token",token,{httpOnly:true,}).status(200).json({ details: { ...otherDetails }, isAdmin });

    }catch(err){
        next(err)

    }
}


export const updateUsers=async(req,res,next)=>{
        try{
            const updatedUsers=await Users.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
            res.status(200).json(updatedUsers);
        
        }catch(err){

next(err);
}
}
export const forgotPassword = async (req, res, next) => {
    try {
        // Verify if phone number exists in database
        const user = await User.findOne({ phone: req.body.phone });
        if (!user) {
            return next(createError(404, "User with provided phone number not found"));
        }

        // If phone number exists, return security question
        res.status(200).json({ securityQuestion: user.securityQuestion });
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { phone, newPassword, securityAnswer } = req.body;

        // Find the user by phone number
        const user = await User.findOne({ phone });

        // Check if the user exists
        if (!user) {
            return next(createError(404, "User with provided phone number not found"));
        }

        // Check if security answer matches
        if (user.securityAnswer !== securityAnswer) {
            return next(createError(400, "Incorrect security answer"));
        }

        // Update the user's password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(newPassword, salt);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ success: false, message: 'Password reset failed' });
    }
};
