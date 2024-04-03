import React from 'react';
import './mailList.css';

const MailList = () => {
    const emailAddress = 'nikitaghorpade25@gmail.com'; // Replace with your actual email
    const subject = encodeURIComponent('Want to Enquire for ..');

    const handleEmailClick = () => {
        window.location.href = `mailto:${emailAddress}?subject=${subject}`;
    };

    return (
        <div className='mail'>
            <h1 className="mailTitle">Save Time, Save Money.</h1>
            <span className="mailDesc">Sign up to get the best offers.</span>
            <div className="mailInputContainer">
                <input type="text" placeholder="Your Email" value=" " readOnly />
                <button onClick={handleEmailClick}>Enquire</button>
            </div>
        </div>
    );
};

export default MailList;
