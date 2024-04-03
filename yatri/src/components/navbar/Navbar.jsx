import "./navbar.css"
import myImg from './banner.png';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook, faInstagram, faWhatsapp, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";


const Navbar=()=>{
    const {user}=useContext(AuthContext);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        // Check if user is authenticated
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, [user]); 

   
  
    return(
        <div className="navbar">
            <img src={myImg} alt ="yatri"/>
             <div className="navContainer">
                
                <span className="logo">Yatri</span>
               

        <div className="contact">
      
      <FontAwesomeIcon icon={faPhone} />
      <span>  8793082326 / 9175334792 </span>
      <div className="socialLinks">
      <a href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL"><FontAwesomeIcon icon={faFacebook} /></a>
      <a href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D" class="instagram"><FontAwesomeIcon icon={faInstagram} /></a>
      <a href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..."><FontAwesomeIcon icon={faWhatsapp} /></a>
      <a href="https://yatritourismpune.com/"><FontAwesomeIcon icon={faGoogle} /></a>
    </div>
    </div>
                
    </div>
        </div>
    )}
export default Navbar;