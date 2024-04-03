import useFetch from "../../hooks/useFetch";
import { Link } from 'react-router-dom';
import Information from "../../components/information/Information";
import Header from "../../components/header/Header";
import "./main.css";

const MainPackagePage = () => {
    const { data, loading, error } = useFetch("/packages");

    // Ensure data is defined before accessing its properties
    if (!data) {
        return <div>Loading...</div>;
    }

    return (  
        <div>
            <Header type="list" />
            <h1 className="title">Packages we offer</h1>
            <div className="container">
                <div className="pList">
                    {data.map(item => (
                        <div className="pListItem" key={item._id}>
                            <Link to={`/packages/${item._id}`}>
                             <img src={item.photos[0]} alt="" className="pListImg" />
                            </Link>
                            <div className="fpName">{item.title}</div>
                            <div className="pListDestination">{item.destinationName}</div>
                            {item.endDate && <div className="fpEndDate">End Date: {item.endDate}</div>}
                            <div className="fpPrice">{item.price}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="centered">
                <h1 className="homeInfo">Why choose us?</h1>
                <Information />
            </div>
        </div>
    );
};

export default MainPackagePage;
