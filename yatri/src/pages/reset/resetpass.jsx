import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            // Send request to reset password
            const res = await axios.post("/auth/reset-password", {
                phone: "<PHONE_NUMBER>", // You may need to get this from the URL or another source
                securityAnswer: "<SECURITY_ANSWER>", // You may need to get this from the URL or another source
                password: formData.password
            });
            setSuccessMessage(res.data); // Assuming the server returns a success message upon password reset
        } catch (err) {
            setError(err.response.data.error || "An error occurred. Please try again later.");
        }
    };

    return (
        <div className="reset-password">
            <div className="rp-container">
                <div className="rp-box">
                    <div className="rp-header">Reset Password</div>
                    <div className="rp-content">
                        <form onSubmit={handleSubmit}>
                            <input type="password" placeholder="New Password" id="password" onChange={handleChange} className="rp-input" />
                            <input type="password" placeholder="Confirm Password" id="confirmPassword" onChange={handleChange} className="rp-input" />
                            <button type="submit" className="rp-button">Reset Password</button>
                        </form>
                        {error && <span className="error">{error}</span>}
                        {successMessage && <span className="success">{successMessage}</span>}
                        <p>Remember your password? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
