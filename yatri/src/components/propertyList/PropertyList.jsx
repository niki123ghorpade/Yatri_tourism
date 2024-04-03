import "./propertyList.css";
import useFetch from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
const PropertyList=()=>{
    const { data, loading, error } = useFetch("/packages?mainPackage=true&min=5&max=15000");
    console.log("Data:", data); // Add this line for debugging

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return(
            <div className="List">
            {loading?"loading":<>
            {data.map(item=>(

           
            <div className="ListItem"key={item._id}>
            <Link to={`/packages/${item._id}`}>
           <img src={item.photos[0]}alt="" className="pListImg"/>
           </Link>
                <div className="pName">{item.title} </div>
                <div className="pListDestination">{item.destinationName} </div>
                {item.endDate && <div className="fpEndDate">End Date: {item.endDate}</div>}

                 <div className="fpPrice">{item.price} </div>

                  
                   </div>
                    ))} </>}
           </div>
    )
}
export default PropertyList;