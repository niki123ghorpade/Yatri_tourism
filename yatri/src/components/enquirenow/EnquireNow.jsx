import React, { useState, useEffect, useContext } from "react";
import './enquirenow.css';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

  import { AuthContext } from "../../context/AuthContext";

const EnquireNow = ({ setOpen,packageId, destination, startDate, endDate, options, price, packageType }) => {
  const formatDates=(dates)=>{
    if(!dates||Array.isArray(dates)||dates.length===0) return dates.map(dateObj=>{
      const startDate=new Date(dateObj.startDate).toLocaleDateString();
      const endDate=new Date(dateObj.endDate).toLocaleDateString();
      return `${startDate}-${endDate}`;

    }).join(",");
  };
  const startDateString = startDate ? startDate.toLocaleDateString() : "Not Selected";
  const endDateString = endDate ? endDate.toLocaleDateString() : "Not Selected";
  const {user}=useContext(AuthContext);
  const [formData, setFormData] = useState({

   userid:user._id,
   packageId:packageId,
    fullname: user.fullname,
    emailId: user.email,
    phoneNo: user.phone,
    price: price,
    destinationName:destination,
    startDate: startDateString,
    endDate: endDateString,
    options: options?JSON.stringify(options):"Not Selected",
    packageType: packageType,
    message: ""
  });

  const [showForm, setShowForm] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      centerModal();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    centerModal();
  }, [showForm]);

  const centerModal = () => {
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const topPosition = window.innerHeight / 2 - modalContent.offsetHeight / 2;
    const leftPosition = window.innerWidth / 2 - modalContent.offsetWidth / 2;

    modal.style.top = `${Math.max(0, topPosition)}px`;
    modal.style.left = `${Math.max(0, leftPosition)}px`;
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
      // Update dates and options when relevant fields change
      startDate: name === "startDate" ? new Date(value) : formData.startDate,
      endDate: name === "endDate" ? new Date(value) : formData.endDate,
      options: {
        ...formData.options,
        [name]: name === "adult" || name === "children" || name === "infant" ? parseInt(value) : value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/enquiries",formData)
      console.log("Enquiry submitted:",response.data);
      setShowForm(false);
      setOpen(false);
      alert("Query submitted successfully. We will contact you shortly.");
       
    } catch (error) {
      console.error("Error occurred while submitting form:", error);
    }
  };
  

  useEffect(() => {
    setFormData({
      ...formData,
      startDate: startDate,
      endDate: endDate,
      options: options
    });
  }, [startDate, endDate, options]);
  const handleClose = () => {
    setShowForm(false);
    setOpen(false);
  };


  return (
    <div className="modal" style={{ display: showForm ? 'block' : 'none' }}>
      <div className="modal-content">
        <div className="enquire-form">
        <div className="close-icon" onClick={handleClose}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <h2>Enquire Now</h2>
        {/* <p>Destination: {destination}</p>
          <p>Start Date: {startDate?startDate.toLocaleDateString():"Not Selected"}</p>
          <p>End Date: {endDate?endDate.toLocaleDateString():"Not Selected"}</p>
          <p>Options:</p>
          <ul>
  <li>Adults: {options && options.adult ? options.adult : "Not Selected"}</li>
  <li>Children: {options && options.children ? options.children : "Not Selected"}</li>
  <li>Infants: {options && options.infant ? options.infant : "Not Selected"}</li>
</ul>*/}

          <form onSubmit={handleSubmit}>
          <label htmlFor="userid">UserID:</label>
<input
  type="text"
  id="userid"
  name="userid"  
  value={formData.userid}
  onChange={handleChange}
/>

            {/* Your form inputs */}
            <label htmlFor="fullname">Fullname:</label>
<input
  type="text"
  id="fullname"
  name="fullname"  
  value={formData.fullname}
  onChange={handleChange}
/>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.emailId}
          onChange={handleChange}
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phoneNo}
          onChange={handleChange}
        />
          
      
      
      
          <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
          {/* <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="packageId">PackageID:</label>
<input
  type="text"
  id="packageId"
  name="packageId"  
  value={formData.packageId}
  onChange={handleChange}
/>
<label htmlFor="packageType">Package Type:</label>
        <input
          type="text"
          id="packageType"
          name="packageType"
          value={formData.packageType}
          onChange={handleChange}
  />*/}
            <button type="submit">Submit</button>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default EnquireNow;