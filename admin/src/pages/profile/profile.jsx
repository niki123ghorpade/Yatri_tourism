import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './profile.scss';

const Profile = () => {
    const [adminData, setAdminData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await axios.get('/users/profilewithadmin');
                const responseData = Array.isArray(response.data) ? response.data : [response.data]; // Ensure responseData is always an array
                setAdminData(responseData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching admin profile:', error);
                setLoading(false);
            }
        };

        fetchAdminProfile();
    }, []);

    // Function to handle editing an admin profile
    const handleEdit = (index) => {
        const updatedAdminData = [...adminData];
        updatedAdminData[index].isEditing = true; // Set isEditing flag for the selected admin profile
        setAdminData(updatedAdminData);
    };

    // Function to handle saving changes to an admin profile
    const handleSave = async (index) => {
        const adminToUpdate = adminData[index];
        try {
            // Perform API call to update the admin profile
            await axios.put(`/users/${adminToUpdate._id}`, adminToUpdate);
            const updatedAdminData = [...adminData];
            updatedAdminData[index].isEditing = false; // Reset isEditing flag after saving changes
            setAdminData(updatedAdminData);
        } catch (error) {
            console.error('Error saving admin profile:', error);
        }
    };

    // Function to handle input changes during editing
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const updatedAdminData = [...adminData];
        updatedAdminData[index][name] = value;
        setAdminData(updatedAdminData);
    };

    return (
        <div className='profile'>
            <Sidebar />
            <div className="profilecontainer">
                <Navbar />
                <h1>Admin Profile</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : adminData.length > 0 ? (
                    adminData.map((admin, index) => (
                        <div key={admin._id}>
                            {admin.isEditing ? (
                                <div>
                                    <p>
                                        <label>Fullname:</label>
                                        <input type="text" name="fullname" value={admin.fullname} onChange={(e) => handleInputChange(e, index)} />
                                    </p>
                                    <p>
                                        <label>Username:</label>
                                        <input type="text" name="username" value={admin.username} onChange={(e) => handleInputChange(e, index)} />
                                    </p>
                                    <p>
                                        <label>Email:</label>
                                        <input type="email" name="email" value={admin.email} onChange={(e) => handleInputChange(e, index)} />
                                    </p>
                                    <p>
                                        <label>Phone:</label>
                                        <input type="text" name="phone" value={admin.phone} onChange={(e) => handleInputChange(e, index)} />
                                    </p>
                                    <p>
                                        <label>Admin:</label>
                                        <input type="checkbox" name="isAdmin" checked={admin.isAdmin} onChange={(e) => handleInputChange(e, index)} />
                                    </p>
                                    <button onClick={() => handleSave(index)}>Save</button>
                                </div>
                            ) : (
                                <div>
                                    <p>Fullname: {admin.fullname}</p>
                                    <p>Username: {admin.username}</p>
                                    <p>Email: {admin.email}</p>
                                    <p>Phone: {admin.phone}</p>
                                    <p>Admin: {admin.isAdmin ? 'Yes' : 'No'}</p>
                                    <button onClick={() => handleEdit(index)}>Edit</button>
                                </div>
                            )}
                            {index !== adminData.length - 1 && <hr />} {/* Add horizontal line if not the last admin */}
                        </div>
                    ))
                ) : (
                    <p>No admin profile found</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
