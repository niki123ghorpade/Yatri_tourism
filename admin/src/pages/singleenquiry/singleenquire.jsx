// SingleEnquiry.js
import './singleenq.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const SingleEnquiry = () => {
  const { enquiryId } = useParams(); // Get the enquiryId from URL params
  const [enquiryData, setEnquiryData] = useState(null);

  useEffect(() => {
    const fetchEnquiry = async () => {
      try {
        const response = await axios.get(`/enquiries/find/${enquiryId}`);
        setEnquiryData(response.data); // Set enquiry data in state
      } catch (error) {
        console.error('Error fetching enquiry data:', error);
      }
    };

    if (enquiryId) {
      fetchEnquiry(); // Fetch enquiry data only if enquiryId exists
    }
  }, [enquiryId]);
   // Re-fetch data when enquiryId changes
   const handleContacted = async () => {
    try {
      await axios.put(`/enquiries/contacted/${enquiryId}`);
      window.alert('Enquiry marked as Contacted');
      // Optionally, you can update the local state to reflect the change
    } catch (error) {
      console.error('Error updating enquiry status to Contacted:', error);
      window.alert('Failed to mark enquiry as Contacted');
    }
  };

  const handleChecked = async () => {
    try {
      await axios.put(`/enquiries/checked/${enquiryId}`);
      window.alert('Enquiry marked as Checked');
      // Optionally, you can update the local state to reflect the change
    } catch (error) {
      console.error('Error updating enquiry status to Checked:', error);
      window.alert('Failed to mark enquiry as Checked'); 
    }
  };

  if (!enquiryData) {
    return <div>Loading...</div>; // Render loading indicator while data is being fetched
  }

  return (
    <div className="singleEnquiry">
      <Sidebar />
      <div className="singleEnquiryContainer">
        <Navbar />
        <div className="content">
          <h2>Enquiry Details</h2>
          <p>ID: {enquiryData._id}</p>
          <p>Destination Name: {enquiryData.destinationName.join(', ')}</p>
          <p>Fullname: {enquiryData.fullname}</p>
          <p>Phone Number: {enquiryData.phoneNo}</p>
          <p>Email: {enquiryData.emailId}</p>
          <p>Price: {enquiryData.price}</p>
          <p>Package Type: {enquiryData.packageType}</p>
          <p>Start Date: {enquiryData.startDate}</p>
          <p>End Date: {enquiryData.endDate}</p>
          <p>Options:</p>
          <ul>
            <li>Adult: {enquiryData.options.adult}</li>
            <li>Children: {enquiryData.options.children}</li>
            <li>Infant: {enquiryData.options.infant}</li>
          </ul>
          <p>Message: {enquiryData.message}</p>
         
             <button onClick={handleContacted} className="blueButton">Mark as Contacted</button>
          <button onClick={handleChecked} className="blueButton">Mark as Checked</button>
        </div>
      </div>
    </div>
  );
};

export default SingleEnquiry;
