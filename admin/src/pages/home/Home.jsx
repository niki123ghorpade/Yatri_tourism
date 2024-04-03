import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Widget from "../../components/widget/Widget.jsx";
import { Link } from "react-router-dom";

// Home.jsx

const Home = () => {
  const [pendingEnquiries, setPendingEnquiries] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState(false);
  const [checkedEnquiries, setCheckedEnquiries] = useState([]);
  const [displayCheckedEnquiries, setDisplayCheckedEnquiries] = useState(false);
  const navigate = useNavigate();

  // Function to navigate to enquiry details page
  const handleView = (id) => {
    navigate(`/enquiries/${id}`);
  };

  // Function to handle deleting an enquiry
  const handleDeleteEnquiry = async (id) => {
    try {
      await axios.delete(`/enquiries/${id}`);
      // Update the list of pending or checked enquiries after deletion
      if (displayCheckedEnquiries) {
        setCheckedEnquiries(checkedEnquiries.filter(enquiry => enquiry._id !== id));
      } else {
        setPendingEnquiries(pendingEnquiries.filter(enquiry => enquiry._id !== id));
      }
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  useEffect(() => {
    const fetchPendingEnquiries = async () => {
      try {
        const response = await axios.get("/enquiries/pending");
        setPendingEnquiries(response.data);
      } catch (error) {
        console.error("Error fetching pending enquiries:", error);
      }
    };

    fetchPendingEnquiries();
  }, []);

  useEffect(() => {
    const fetchCheckedEnquiries = async () => {
      try {
        const response = await axios.get("/enquiries/checked");
        setCheckedEnquiries(response.data);
      } catch (error) {
        console.error("Error fetching checked enquiries:", error);
      }
    };
  
    fetchCheckedEnquiries();
  }, []);
  

  const handleMessageBoxClick = () => {
    setDisplayCheckedEnquiries(!displayCheckedEnquiries);
  };
  const handleNotificationClick = () => {
    setDisplayNotifications(!displayNotifications);
  };

  return (
    <div className="home">
      <Sidebar handleNotificationClick={handleNotificationClick} />
      <div className="homeContainer">
        <Navbar handleNotificationClick={handleNotificationClick} handleMessageBoxClick={handleMessageBoxClick} checkedCount={checkedEnquiries.length} />
        <div className="widgets" style={{ display: (displayNotifications || displayCheckedEnquiries) ? 'none' : 'flex' }}>
          <Widget type="users" />
          <Widget type="packages" />
          <Widget type="enquiries" />
        </div>

        <div className={`listContainer ${displayNotifications ? 'top' : 'bottom'}`}>
          <div className="listTitle">{displayCheckedEnquiries ? 'Checked Enquiries' : 'Pending Enquiries'}</div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fullname</th>
                <th>EmailId</th>
                <th>Destination</th>
                <th>Phone</th>
                <th>Startdate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(displayCheckedEnquiries
                ? checkedEnquiries.slice(0).reverse()
                : pendingEnquiries.slice(0).reverse()
              ).map(enquiry => (
                <tr key={enquiry._id}>
                  <td>{enquiry._id}</td>
                  <td>{enquiry.fullname}</td>
                  <td>{enquiry.emailId}</td>
                  <td>{enquiry.destinationName}</td>
                  <td>{enquiry.phoneNo}</td>
                  <td>{enquiry.startDate}</td>
                  <td>
                    <button className="actionButton" onClick={() => handleView(enquiry._id)}>View</button>
                    <button className="actionButton" onClick={() => handleDeleteEnquiry(enquiry._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
