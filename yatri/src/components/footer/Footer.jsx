import React from 'react';
import './footer.css';
import myImg from './google.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faFacebook, faInstagram, faWhatsapp, faGoogle } from "@fortawesome/free-brands-svg-icons";

const Footer=()=>{
    const handleGoogleReviewClick = () => {
        // Construct the URL for the general review section
        const reviewUrl = 'https://www.google.com/search?q=Yatri+Tourism+Pune+reviews';
        
        // Open the review URL in a new tab
        window.open(reviewUrl, '_blank');
    };
    
    

    
    return(
        <div className='footer'>
            <div className="fLists">
           

                <ul className="fList">
                    <li className="fListItem">Yatri Tourism Pune</li>
                    <li className="fListItem">Group tour | Honemoon Tour | Customized Tour| Passport |</li>
                    <li className="fListItem"> | Domestic & International | SchoolTour</li>
                    <li className="fListItem">Corporate Tour | MICE Tour | Hotels| Visa |</li>
                    <li className="fListItem">| Bus | Flight | Cruise | Railway |Forex.</li>
                    <li className="fListItem">yatritourismpune@gmail.com</li>
                </ul>
            
                <ul className="fList">
                    <li className="fListItem">Destinations</li>
                    <li className="fListItem">Rajasthan Shimla</li>
                    <li className="fListItem">Kerala    Kashmir</li>
                    <li className="fListItem">TamilNadu Maharashtra</li>
                   
                </ul>
           
            <div className="review">
            <div style={{ marginTop: '50px' }}>
            <a href="https://www.google.com/search?q=YATRI%20TOURISM+reviews#ip=1&lrd=0x3bc2c11ffcc186df:0x308392223db0ed10,1,,,," target="_blank" rel="noopener noreferrer">
            <img src="https://www.gstatic.com/images/icons/material/system/2x/stars_black_36dp.png" alt="Google Icon" style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                Leave a Google Review
            </a>
           
            </div>
            
         
           
            </div>
                 
            </div>
        </div>
    )
}
export default Footer;