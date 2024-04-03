import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from 'react-router-dom';
import axios from "axios";
import  { useContext, useState } from "react";
import { useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { useAuth } from '../../context/AuthContext';

const Login=()=>{
    const { user } = useAuth();
    const [credentials,setCredentials]=useState({
        username:undefined,
        password:undefined,
    });
    const {loading,error,dispatch}=useContext(AuthContext);
    const navigate=useNavigate()
    const location = useLocation();
    const handleChange=(e)=>{
        setCredentials((prev)=>({...prev,[e.target.id]:e.target.value}));
    }
    
   
    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post("/auth/login", credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

            const state = location.state;

            if (state && state.fromPackage) {
                // If redirected from the package page, navigate back to the package page
                navigate(state.fromPackage);
            } else {
                // If not redirected from the package page, navigate to the default page
                navigate("/");
            }
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

 
    return(
            <div className="lContainer">
                 <div className="login-box">
                <div className="login-header">Login</div>
                <div className="login-content">
                <input type="text"placeholder="username" id="username" onChange={handleChange} className="lInput" />
                <input type="password"placeholder="password" id="password" onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
                <p>
    Don't have an account? <Link to="/register">Sign Up</Link> | <Link to="/fp">Forgot Password?</Link>
</p>

</div>
         </div>
        </div>
    )
};
export default Login;
