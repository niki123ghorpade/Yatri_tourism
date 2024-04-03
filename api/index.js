import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import packagesRoute from "./routes/packages.js";
import roomRoute from "./routes/rooms.js";
import userRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
import enquiriesRoute from "./routes/enquires.js";

const app=express();
dotenv.config();
const connect=async()=>{
try{
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
}
catch(error){
throw error
}};
mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb disconnected");

});

//Middleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/packages",packagesRoute);
app.use("/api/rooms",roomRoute);
app.use("/api/users",userRoute);
app.use("/api/enquiries",enquiriesRoute);


app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,

    })
})

app.listen(8800,()=>{
    connect()
    console.log("Connected to Backend.");
});