import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './fpc.css';
import { AuthContext } from "../../context/AuthContext";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        phone: "",
        securityAnswer: "",
        newPassword: "" // New password field
    });
    const [verificationError, setVerificationError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [securityAnswerError, setSecurityAnswerError] = useState(null);
    const [newPasswordError, setNewPasswordError] = useState(null); // Error state for new password
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
    const { id, value } = e.target;
    // Clear error messages when the user starts typing in the respective fields
    if (id === 'securityAnswer') {
        setSecurityAnswerError(null);
    } else if (id === 'newPassword') {
        setNewPasswordError(null);
    }
    setFormData((prev) => ({ ...prev, [id]: value }));
};


    // Modify the handleResetPassword function to include securityAnswer
    const handleResetPassword = async (newPassword) => {
        try {
            const response = await axios.post('/auth/reset-password', {
                phone: formData.phone,
                securityAnswer: formData.securityAnswer,
                newPassword: newPassword,
            });
    
            if (response.data.success) {
                console.log('Password reset successfully');
                alert("Password reset successfully");
                // Redirect the user or handle the success scenario as needed
            } else {
                console.error('Password reset failed:', response.data.message);
                alert("Incorrect security answer. Please enter a valid answer.");
                // Display an alert for incorrect security answer
            }
        } catch (error) {
            console.error('Error resetting password:', error);
            alert("Incorrect security answer. Please enter a valid answer.");
           
            // Display an alert for any error occurred during password reset
        }
    };
    
    const handleVerifyPhone = async (e) => {
        e.preventDefault();
        // Reset previous error messages
        setVerificationError(null);
        setPhoneError(null);

        try {
            // Basic phone number validation
            if (!formData.phone.trim()) {
                setPhoneError("Phone number is required");
                return;
            }
            // Verify the phone number against registered users
            const res = await axios.post("/auth/forgot-password", { phone: formData.phone });
            if (res.data.securityQuestion) {
                // If phone number exists, set security question
                setFormData((prev) => ({ ...prev, securityQuestion: res.data.securityQuestion }));
            } else {
                setVerificationError("Phone number not found");
            }
        } catch (err) {
            console.error("Error verifying phone number:", err);
            setVerificationError("Phone number not found");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "FORGOT_PASSWORD_START" });
    
        try {
            // Basic security answer validation
            if (!formData.securityAnswer.trim()) {
                setSecurityAnswerError("Security answer is required");
                return;
            }
           // Basic new password validation
            if (!formData.newPassword.trim()) {
                setNewPasswordError("New password is required");
                return;
            }
            // Call handleResetPassword function to initiate password reset
            await handleResetPassword(formData.newPassword); // Pass the new password to the function
        } catch (err) {
            console.error("Error resetting password:", err);
            setVerificationError("Error resetting password");
        }
    };

    return (
        <div className="forgot-password">
            <div className="fp-container">
                <div className="fp-box">
                    <div className="fp-header">Forgot Password</div>
                    <div className="fp-content">
                        <form onSubmit={handleSubmit}>
                            <input type="tel" placeholder="Phone Number" id="phone" onChange={handleChange} className="fp-input" />
                            {phoneError && <span className="error">{phoneError}</span>}
                            <button disabled={loading} onClick={handleVerifyPhone} className="fp-button">Verify Phone</button>
                            {formData.securityQuestion && (
                                <>
                                    <p>{formData.securityQuestion}</p>
      <input type="text" placeholder="Security Answer" id="securityAnswer" onChange={handleChange} className="fp-input" />
                 {securityAnswerError && <span className="error">{securityAnswerError}</span>}
           New password  <input type="password" placeholder="New Password" id="newPassword" onChange={handleChange} className="fp-input" /> {/* New password input */}
          {newPasswordError && <span className="error">{newPasswordError}</span>} {/* Error message for new password */}
                                    <button disabled={loading} type="submit" className="fp-button">Submit</button>
                                </>
                            )}
                        </form>
                        {verificationError && <span className="error">{verificationError}</span>}
                        {error && <span className="error">{error.message}</span>}
                        <p>Remember your password? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
