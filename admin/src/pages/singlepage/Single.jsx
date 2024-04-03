import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './single.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { useLocation } from 'react-router-dom';

const Single = () => {
  const location = useLocation();
  const { userId } = useParams(); // Get the userId from URL params
  const [userData, setUserData] = useState(null);
  const [enquiries, setUserEnquiries] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // State to track isAdmin status

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get(`/users/find/${userId}`);
        setUserData(userResponse.data); // Set user data in state

        // Fetch enquiries for the user
        const enquiriesResponse = await axios.get(`/enquiries/user/${userId}`);
        setUserEnquiries(enquiriesResponse.data);

        // Set isAdmin state
        setIsAdmin(userResponse.data.isAdmin);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUser(); // Fetch user data only if userId exists
    }
  }, [userId]); // Re-fetch data when userId changes

  const handleMakeAdmin = async () => {
    try {
      // Send a request to your backend API to update user's isAdmin status
      await axios.put(`/users/${userId}`, { isAdmin: true });
      setIsAdmin(true); // Update isAdmin state locally
      alert('User is now an admin.');
    } catch (error) {
      console.error('Error making user admin:', error);
      alert('Failed to make user admin.');
    }
  };

  const handleRevokeAdmin = async () => {
    try {
      // Send a request to your backend API to update user's isAdmin status
      await axios.put(`/users/${userId}`, { isAdmin: false });
      setIsAdmin(false); // Update isAdmin state locally
      alert('Admin privileges revoked.');
    } catch (error) {
      console.error('Error revoking admin privileges:', error);
      alert('Failed to revoke admin privileges.');
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="content">
          <h2>User Details</h2>
          <p>ID: {userData._id}</p>
          <p>Fullname: {userData.fullname}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>IsAdmin: {isAdmin ? 'Yes' : 'No'}</p>
          
          {/* Button to make user an admin */}
          {!isAdmin ? (
            <button onClick={handleMakeAdmin} style={{ backgroundColor: '#FFC0CB', color: 'black', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Make Admin</button>
          ) : (
            <button onClick={handleRevokeAdmin} style={{ backgroundColor: '#FFC0CB', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Revoke Admin</button>

          )}

          <h2>Enquiries</h2>
          {enquiries.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Destination Name</th>
                  <th>Fullname</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Price</th>
                  <th>Package Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Options</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td>{enquiry._id}</td>
                    <td>{enquiry.destinationName.join(', ')}</td>
                    <td>{enquiry.fullname}</td>
                    <td>{enquiry.phoneNo}</td>
                    <td>{enquiry.emailId}</td>
                    <td>{enquiry.price}</td>
                    <td>{enquiry.packageType}</td>
                    <td>{enquiry.startDate}</td>
                    <td>{enquiry.endDate}</td>
                    <td>
                      <ul>
                        <li>Adult: {enquiry.options.adult}</li>
                        <li>Children: {enquiry.options.children}</li>
                        <li>Infant: {enquiry.options.infant}</li>
                      </ul>
                    </td>
                    <td>{enquiry.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No enquiries found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Single;
