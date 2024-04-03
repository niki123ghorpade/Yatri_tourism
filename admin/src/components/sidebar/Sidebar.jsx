import "./sidebar.scss"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BookIcon from '@mui/icons-material/Book';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import {Link} from"react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useState,useEffect } from "react";
import {  useNavigate } from "react-router-dom";

const Sidebar=({ handleNotificationClick })=>{
  const {dispatch}=useContext(DarkModeContext);
  const {user}=useContext(AuthContext);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogout = () => {
    // Perform logout actions
    setIsAuthenticated(false);
    // Redirect to the home page
    navigate("/");
    // Force a page reload to reset the authentication state
    window.location.reload();
  };
    return(
        <div className='sidebar'>
            <div className="top">
              <Link to="/" style={{textDecoration:"none"}}>
              <span className="logo"></span>
              {user ? (
                    <div className="navItems">
                        <span> Welcome,  {user.username}  </span>
                      
                    </div>
                ) : ( <div className="navItems">
               <Link to="/register">
            <button className="btn">SignUp/Login </button>
        </Link>
                  
       
                </div>)}
              </Link>
              </div>
             
            <hr/>
            <div className="center">
                <ul>
                    <p className="title">Main</p>
                    <Link to="/" style={{textDecoration:"none"}}>
                <li>
                <SpaceDashboardIcon className="icon"/>
                    <span>Dashboard</span>
                  
                    </li>
                    </Link>
                    <p className="title">List</p>
                    <Link to="/users" style={{textDecoration:"none"}}>
                    <li>
                      <AccountCircleIcon className="icon"/>
                    <span>Users</span>
                    </li>
                    </Link>
                    <Link to="/packages" style={{textDecoration:"none"}}>
                    <li>
              <StoreIcon className="icon" />
              <span>Packages</span>
            </li>
            </Link>
            <Link to="/enquiries" style={{textDecoration:"none"}}>
                    <li>
              <StoreIcon className="icon" />
              <span>Enquires</span>
            </li>
    </Link>
        {/*  <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li>*/}
          
                    <p className="title">Useful</p>
                   {/* <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
        </li>*/}
                    <li onClick={handleNotificationClick}>
        <NotificationsActiveIcon className="icon"/>
        <span>Notification</span>
      </li>
                  {/* <p className="title">Services</p>
               <li>
                   <HealthAndSafetyIcon className="icon"/>
                    <span>System Health</span>
                    </li>

                    <li>
                    <BookIcon className="icon"/>
                    <span>Logs</span>
                    </li>*/}

                    <li>
                    < SettingsApplicationsIcon className="icon"/>
                    <span>Settings</span>
                    </li>
                    <p className="title">User</p>
                    
                    <Link to="/profile" style={{textDecoration:"none"}}>
                    <li>
                    <AccountBoxIcon className="icon"/>
                    <span>Profile</span>
                  
                    </li>
                    </Link>
                    <Link to="/login" style={{textDecoration:"none"}}>
                    <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
    </Link>
                    </ul>
                    </div>
            <div className="bottom">
                <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}> </div>
                <div className="colorOption"onClick={()=>dispatch({type:"DARK"})}></div>
            </div>
        </div>
    )
}
export default Sidebar;