import useFetch from "../../hooks/useFetch";
import React, { useState } from 'react';
import './featured.css';

const Featured = () => {
  const { data, loading, error } = useFetch("/packages/countBypackageType");

 

  const [flippedIndex, setFlippedIndex] = useState(-1);

  const flipCard = (index) => {
    setFlippedIndex(index === flippedIndex ? -1 : index);
  };

  return (
    <div className="featuredList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
           <div className="featured-container">
           <div className="featuredItem">
         <div className="flip-card">
           <div className="flip-card-front">
             <div className="inner">
               
               <h3>Special Female Trips</h3>
               <h2>{data[2]?.count} {data[2]?.packageType} </h2>
               <p>
               Cholo chale
               </p>
             </div>
           </div>
           <div className="flip-card-back">
             <div className="inner">
               
               <h3>Special Female Trips</h3>
               <p>
               We Have 50 Plus amazing Trips specially organized only for Females
               </p>
             </div>
           </div>
         </div>
         </div>
   
         <div className="flip-card">
           <div className="flip-card-front">
             <div className="inner">
               
               <h3>Honeymoon Packages</h3>
               <h2>{data[0]?.count}  {data[0]?.packageType} </h2>
               <p>
               Honey ko le jaa Moon pe
               </p>
             </div>
           </div>
           <div className="flip-card-back">
             <div className="inner">
               
               <h3>Honeymoon Packages</h3>
               <p>
               We Have exclusive Honeymoon Packages specially designed for groups! Mummy papa akele nahi chod rahe no proble yatri tourism he na!!
               </p>
             </div>
           </div>
         </div>
   
         <div className="flip-card">
           <div className="flip-card-front">
             <div className="inner">
               
               <h3>Group Packages</h3>
               <h2>{data[1]?.count}  {data[1]?.packageType} </h2>
               <p>
               jindagi sawar du
               </p>
             </div>
           </div>
           <div className="flip-card-back">
             <div className="inner">
               
               <h3>Group Packages</h3>
               <p>
               Kya hua mummy papa ne honeymoon ke liye mana kar diya :( are Ham he to kya gam he specially customised trip for you Destination : bhad me jao!
               </p>
             </div>
           </div>
         </div>
       </div>
          }
        </>
      )}
    </div>
  );
};

export default Featured;
