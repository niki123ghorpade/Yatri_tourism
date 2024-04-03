import React from "react";
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item, destination, dates, options, onEnquire }) => {

  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siDistance">{item.duration} </span>
        <span className="siTaxiOp">{item.packagedesc}</span>
        <span className="siSubtitle">{item.catchphrase}</span>
        <span className="siFeatures">{item.packageType} Package</span>
        <span className="siCancelOp">Free cancellation </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>4.4</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">{item.price}</span>
          <span className="siTaxOp">Includes tax </span>
          <Link
            to={ `/packages/${item._id}`}
              state={{item,destination,dates,options}}>
             
            <button  className="siCheckButton">See Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
