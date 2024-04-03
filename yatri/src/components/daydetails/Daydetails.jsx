import { useState,useEffect } from 'react';
import './daydetails.css';

const Collapsible = ({ title, children, isOpen, toggleCollapse }) => {
  return (
    <div className="collapsible">
      <div className="collapsibleHeader" onClick={toggleCollapse}>
        {title}
        <span className={isOpen ? 'arrowIcon open' : 'arrowIcon'}>▼</span>
      </div>
      {isOpen && <div className="collapsibleContent">{children}</div>}
    </div>
  );
};

const DayDetails = ({dayData}) => {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleCollapse = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };
useEffect(()=>{
  setOpenIndex(-1);
},[dayData]);
if(!dayData || dayData.length===0){
  return <div>No data available</div>
}
  return (
    
    <div className="dayDetails">
     {dayData.map((day,i)=>(
      <Collapsible key={`collapsible-${i}`}
      title={`Day ${i+1}-${day.title}`}
      isOpen={openIndex===i}
      toggleCollapse={()=>toggleCollapse(i)}>
        <div className="dayDesc">
          <ul>
            {
              Array.isArray(day.daydesc)?(day.daydesc.map((desc,ind)=>(
                <li key={`daydesc-${i}-${ind}`}>{desc}</li>
              ))):(<li>{day.daydesc}</li>)
            }
          </ul>
          </div>
      </Collapsible>
     ))}
    </div>
  );
};

export default DayDetails;