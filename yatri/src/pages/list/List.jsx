import "./list.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";


const List = () => {
  const [destinationList, setDestinationList] = useState([]);
  const location = useLocation();
  const [destination, setDestination] = useState(
    location.state.destination || ""
  ); // Set default value for destination if not provided in state
  const [dates, setDates] = useState(location.state.dates || [
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]); // Set default value for dates if not provided in state
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);// Set default value for options if not provided in state
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const {
    data,
    loading,
    error,
    reFetch,
  } = useFetch(
    `/packages?destinationName=${destination}&min=${min || 0}&max=${max || 15000}`
  );

  const handleClick = () => {
    reFetch();
  };
  const handleAdultChange=(e)=>{
    setOptions(prevOptions=>({
      ...prevOptions,
      adult:parseInt(e.target.value)
        }));
  } 
  
  const handleChildrenChange=(e)=>{
    setOptions(prevOptions=>({
      ...prevOptions,
      children:parseInt(e.target.value)
        }));
  } 
  const handleInfantChange=(e)=>{
    setOptions(prevOptions=>({
      ...prevOptions,
      infant:parseInt(e.target.value)
        }));
  } 
  console.log(options)
   const handleEnquire = (price, packageType) => {
    setSelectedPackage({ price, packageType });
  };
   const handleDateChange = (newDates) => {
    setDates([newDates.selection]);
  };
  useEffect(() => {
    // Fetch destination options from backend
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("packages/destinations");
        setDestinationList(res.data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <select
                className="headerSearchInput"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Select Destination</option>
                {destinationList.map((destinationItem) => (
                  <option
                    key={destinationItem}
                    value={destinationItem}
                  >
                    {destinationItem}
                  </option>
                ))}
              </select>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span
                onClick={() => setOpenDate(!openDate)}
              >{`${format(
                dates[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                 <DateRange
                  onChange={handleDateChange} // Pass the handler for date change
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                    onChange={handleAdultChange}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                    onChange={handleChildrenChange}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Infant</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.infant}
                    onChange={handleInfantChange}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
  <SearchItem
    item={item}
    key={item._id}

    dates={dates}
    options={options}
  />
))}
</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
