import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import "./home.css";
import MailList from "../../components/mailList/MailList";
import PropertyList from "../../components/propertyList/PropertyList";
import Footer from "../../components/footer/Footer";
import Information from "../../components/information/Information";

const Home=()=>{
    return(
        <div>
            <Navbar/>
            <Header/>
            <div className="homeContainer">
                <Featured/>
                <h1 className="homeTitle">Packages we offer</h1>
                <PropertyList/>
                <h1 className="homeInfo">Why choose us?</h1>
                <Information/>
                </div>
                <MailList/>
                <Footer/>
           
        </div>
    )}
export default Home;