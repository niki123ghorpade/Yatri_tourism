import {faHome,faCalendarDays,faPlaneDeparture,faPerson, faSquarePhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState,useEffect } from "react";
import "react-date-range/dist/styles.css"; 
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Select from 'react-select';
import axios from "axios";

const Header = ({ type }) => {
  const [destinationList, setDestinationList] = useState([]);
  const [destination, setDestination] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    infant: 1,
  });

  const navigate = useNavigate();
  const {user}=useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const  {dispatch}=useContext(SearchContext);
  useEffect(() => {
    // Fetch destination options from backend
    const fetchDestinations = async () => {
        try {
            const res = await axios.get("/packages/destinations");
            setDestinationList(res.data);
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    fetchDestinations();
}, []); 
  

  const handleSearch = () => {
    dispatch({type:"NEW_SEARCH",payload:{destination, dates, options}});
    navigate("/packages", { state: { destination, dates, options } });
  };
 
const handleLogout = () => {
  // Perform logout actions
  setIsAuthenticated(false);
  // Redirect to the home page
  navigate("/");
  // Force a page reload to reset the authentication state
  window.location.reload();
};

  return (
    <div className="header">
      {/*<Header type="list" destinationName={destination} startDate={dates[0].startDate} endDate={dates[0].endDate} />*/}
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem">
            <FontAwesomeIcon icon={faHome} />
            <span><Link to={{pathname:'/'}}>
            Home</Link></span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlaneDeparture } />
            <span><Link to={{pathname:'/mainPakage'}}>Packages</Link></span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faSquarePhone} />
            <span><Link to={{ pathname: '/aboutUs'}}>AboutUs</Link></span>
          </div>
          {user ? (
                    <div className="navItems">
                        <span> Welcome,  {user.username}  </span>
                        <button className="btn" onClick={handleLogout}>Logout</button>
                    </div>
                ) : ( <div className="navItems">
               <Link to="/register">
            <button className="btn">SignUp/Login </button>
        </Link>
                  
       
                </div>)}
        </div>
        
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
             Get Best Offers on your first Booking..</h1>
            <p className="headerDesc"> Enjoy with your family and friends to your dream destination</p>
           
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faHome} className="headerIcon" />
               <select className="headerSearchInput"
            value={destination}onChange={(e)=>setDestination(e.target.value)}
            >
               <option value="">Select Destination</option>  
                {destinationList.map((destinationItem) => (
    <option key={destinationItem} value={destinationItem}>{destinationItem}</option>
  ))}
                </select>          
                 </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span onClick={() => setOpenDate(!openDate)}className="headerSearchText" >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate,"MM/dd/yyyy"
                )}`}</span>
               {openDate && (
                                  <DateRange
                                      editableDateInputs={true}
                                      onChange={(item) => {
                                          setDates([item.selection]);
                                          setOpenDate(false); // Close the date picker after selecting a date
                                      }}
                                      moveRangeOnFirstSelection={false}
                                      ranges={dates}
                                      className="date"
                                      minDate={new Date()}
                                  />
                              )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.infant} infant`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        > +</button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Infant</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.infant <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("infant", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.infant}
                        </span>
                        <button className="optionCounterButton"
                          onClick={() => handleOption("infant", "i")}>+ </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;