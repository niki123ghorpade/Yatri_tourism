import "./navbar.scss";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import axios from "axios";


const Navbar = ({ handleNotificationClick, handleMessageBoxClick}) => {
  const { dispatch } = useContext(DarkModeContext);
  const [pendingCount, setPendingCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  const [showPendingEnquiries, setShowPendingEnquiries] = useState(false);


  useEffect(() => {
    // Fetch pending enquiries count from the backend
    const fetchPendingEnquiriesCount = async () => {
      try {
        const response = await axios.get("/enquiries/pending-count"); // Adjust the endpoint URL as per your backend route
        setPendingCount(response.data.pendingCount);
      } catch (error) {
        console.error("Error fetching pending enquiries count: ", error);
      }
    };

    fetchPendingEnquiriesCount();
  }, []);
  useEffect(() => {
    const fetchCheckedEnquiriesCount = async () => {
      try {
        const response = await axios.get("/enquiries/checked-count");
        setCheckedCount(response.data.checkedCount);
      } catch (error) {
        console.error("Error fetching checked enquiries count: ", error);
      }
    };

    fetchCheckedEnquiriesCount();
  }, []);


  const handleFullscreen = () => {
    // Check if fullscreen is supported by the browser
    if (document.fullscreenEnabled) {
      // Request fullscreen mode
      document.documentElement.requestFullscreen();
    }
  };
  
  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search.." />
          <SearchOutlinedIcon className="icon" />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item" onClick={handleMessageBoxClick}>
        <ChatBubbleOutlineOutlinedIcon className="icon" />
        {checkedCount > 0 && <div className="counter">{checkedCount}</div>}
      </div>
          <div className="item" onClick={() => dispatch({ type: "TOGGLE" })}>
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item" onClick={handleFullscreen}>
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item"  onClick={ handleNotificationClick}>
            <NotificationsNoneOutlinedIcon className="icon" />
            {pendingCount > 0 && <div className="counter">{pendingCount}</div>}
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
