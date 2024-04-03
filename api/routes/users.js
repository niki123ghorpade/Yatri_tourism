import express from "express";
import { deleteUsers, getUser, getUsers, updateUsers, getUserCount,getAdminProfile} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "./utils/verifyToken.js";
const router=express.Router();

//router.get("/checkauthentication",verifyToken,(req,res,next)=>{
  //  res.send("Hello User,You r logged in");
//})
//router.get("/checkuser/:id",verifyUser,(req,res,next)=>{
  //  res.send("Hello User,You r logged in and you can delete your account");
//})
//router.get("/checkAdmin/:id",verifyAdmin,(req,res,next)=>{
  //  res.send("Hello Admin,You r logged in and you can delete all account");
//})
//update
router.put("/:id",verifyUser,updateUsers);
// Update password


//delete

router.delete("/:id",verifyUser,deleteUsers);
//get
router.get("/find/:id",verifyUser,getUser);
//getall
    router.get("/",verifyAdmin,getUsers);

  
    router.get("/count",getUserCount);
    // Fetch user profile with isAdmin property
router.get('/profilewithadmin',getAdminProfile);

   
export default router;