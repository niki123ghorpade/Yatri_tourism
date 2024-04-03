import "./package.css";
import Daydetails from "../../components/daydetails/Daydetails";
import { Link, useLocation } from 'react-router-dom';
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { faBed } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import useFetch from "../../hooks/useFetch";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EnquireNow from '../../components/enquirenow/EnquireNow';

const Package = () => {
  const location = useLocation();
  const {options}=location.state||{};
  const {dates}=location.state||{};
    const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/packages/find/${id}`);
 {/* const contextData = useContext(SearchContext);
  const defaultDates = [{ startDate: new Date(), endDate: new Date(), key: "selection" }];
const defaultOptions = { adult: 1, children: 0, infant: 1 };*/}
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24; // Moved declaration here

 
  const { user } = useAuth();
  const navigate = useNavigate();

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
{/* const [userDetails, setUserDetails] = useState(null);
const [openModal,setOpenModal]=useState(false);*/}
const [showEnquireForm,setshowEnquireForm]=useState(false);
  const startDate = dates?.[0]?.startDate;
  const endDate = dates?.[0]?.endDate;

  const calculatedDays = dayDifference(startDate, endDate);

  function dayDifference(date1, date2) {
    if (!date1 || !date2) {
      return 0; // Return 0 if either date is undefined
    }
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const handleEnquireClick = () => {
    if (user) {
      // If user is logged in, set user details in state
     setshowEnquireForm(true);
      
    } else {
      // If user is not logged in, navigate to the register page
      navigate('/login', { state: { fromPackage: location } });
    }
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };

  return (
    <div>
      <Link to="/"></Link>
      <Navbar />
      <Header type="list" />
      {loading ? ("loading") : (
        <div className="packageContainer">
          {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          <div className="packageWrapper">
          <div>
              {!showEnquireForm && !open && (
                <button className="bookNow" onClick={handleEnquireClick}>
                  Enquire Now 
                </button>
              )}
            
            </div>

            <h1 className="packageTitle">{data.destinationName}</h1>
            <div className="packagePrice">
              <span>Price-{data.price}</span>
            </div>
            <span className="packageDuration">
              7 Days Tour!
            </span>
            <div className="headerListItem">
              <FontAwesomeIcon icon={faCar} />
              <span>Transport</span><FontAwesomeIcon icon={faBed} />
              <span>Accomadation</span><FontAwesomeIcon icon={faHotel} />
              <span>Hotel</span><FontAwesomeIcon icon={faUtensils} />
              <span>Meal</span>
            </div>
            <div class="icon-bar">
              <a href="https://www.facebook.com/people/Yatri-Tourism-Pune/100089987626403/?mibextid=ZbWKwL" class="facebook"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://www.instagram.com/yatri_tourism_/?igsh=OGQ5ZDc2ODk2ZA%3D%3D" class="instagram"><FontAwesomeIcon icon={faInstagramSquare} /></a>
              <a href="https://yatritourismpune.com/" class="google"><FontAwesomeIcon icon={faGoogle} /></a>
              <a href="https://api.whatsapp.com/send?phone=918793082326&text=Greetings%20From%20Yatri%20Tourism%20Pune..." class="whatsapp"><FontAwesomeIcon icon={faWhatsappSquare} /></a>
            </div>

            <div className="packageImages">
              {data.photos?.map((photo, i) => (
                <div className="packageImgWrapper" key={i}>
                  <img onClick={() => handleOpen(i)} src={photo} alt="" className="packageImg" />
                </div>
              ))}
            </div>

            <Daydetails dayData={data && data.daytitle && data.daydesc ? data.daytitle.map((title, i) => ({ title, daydesc: data.daydesc[i] })) : []} />
            <div className="packageDetails">
              <div className="packageDetailsTexts">
                <h1 className="packageTitle">Dream destinations</h1>
                <p className="packageDesc">
                  {data.packagedesc}
                </p>
              </div>
              <div className="packageDetailsPrice">
                <h1>Perfect for {calculatedDays} - night stay!</h1>
                <span>Mahadev temple, Jaipuri tour</span>
                <h2>
                  <b>Prices may vary as per your requirements! Rs{calculatedDays * data.price ? data.price : '500'}</b> ({calculatedDays} nights)
                </h2>
                
                    <button onClick={handleEnquireClick}>Enquire Now!</button>
                    
                  </div>
                </div>
              </div>
              <MailList />
      <Footer />
      </div>
      )}
      {showEnquireForm && (
                 <EnquireNow
                 setOpen={setshowEnquireForm}
                 //userDetails={userDetails}
                 destination={data.destinationName}
                 startDate={startDate}
                 endDate={endDate}
                 options={options}
                 price={data.price}
                 packageId={data._id}
                 packageType={data.packageType}
                  // Assuming item has packageType property
               />
            
      )}
     

    {/*  {openModal && (
      <EnquireNow setOpen={setOpenModal}packageId={id}options={Array.isArray(
        location.state?.options)? location.state.options:["No options selected"]}
        dates={Array.isArray(
          location.state?.dates)? location.state.dates:["No dates selected"]}/>
        )}*/}
 </div>
  );
};

export default Package;