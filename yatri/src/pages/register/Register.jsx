import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { Link } from 'react-router-dom';
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Register=()=>{
    const [credentials,setCredentials]=useState({
        username: undefined,
        password: undefined,
        securityQuestion: undefined,
        securityAnswer: undefined,
        emailId: undefined, // Change this line to set emailId
        phone: undefined, // Assuming this is the field for phone
        fullname: undefined
    });
    const {loading,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate()
    const handleChange = (e) => {
        setCredentials((prev) => ({
          ...prev,
          [e.target.id]: e.target.value,
          fullname: e.target.id === "fullname" ? e.target.value : credentials.fullname, // Ensure fullname is set correctly
        }));
    };
    
    const handleClick= async e=>{
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try{
            const res=await axios.post("/auth/register",credentials);
            const { username, email, phone, fullname } = res.data;
            dispatch({type:"LOGIN_SUCCESS",payload:res.data});
            navigate("/login")

        }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err.response.data})
        }
    };
 
    return(
        <div className="register">
            <div className="lContainer">
            <div className="r-box">
                <div className="r-header">SignUp</div>
                <div className="r-content">
                <input type="text"placeholder="fullname" id="fullname" onChange={handleChange} className="lInput" />
                <input type="text"placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input
        type="email"
        placeholder="Email"
        id="email"
        onChange={handleChange}
        className="lInput"
    />
                <input type="password"placeholder="password" id="password" onChange={handleChange} className="lInput" />
               
                <input type="tel"placeholder="phone" id="phone" onChange={handleChange} className="lInput" />
                <select id="securityQuestion" onChange={handleChange} className="lInput">
                            <option value="">Select Security Question</option>
                            <option value="What is your pet's name?">Which is pet name?</option>
                            <option value="What is your mother's maiden name?">What is your mother's name?</option>
                            {/* Add more security questions here */}
                        </select>
                        <input type="text" placeholder="Security Answer" id="securityAnswer" onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Register</button>
                {error && <span>{error.message}</span>}
                <p>Already have an account? <Link to="/login">Login</Link></p>
         </div>
        </div>
        </div>
        </div>
    )
};
export default Register;