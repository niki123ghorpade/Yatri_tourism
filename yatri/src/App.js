import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Package from "./pages/package/Package";
import AboutUs from "./pages/about/AboutUs";
import Login from "./pages/login/Login";

import Register from "./pages/register/Register";
import MainPackagePage from "./pages/main/mainPakage";
import ForgotPassword from "./pages/forgot/fp";
import ResetPassword from "./pages/reset/resetpass";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/packages" element={<List/>}/>
      <Route path="/packages/:id" element={<Package/>}/>
      <Route path="/aboutUs" element={<AboutUs/>}/>
      <Route path="/mainPakage" element={<MainPackagePage/>}/>

      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/fp" element={<ForgotPassword/>}/>
      <Route path="/resetpass" element={<ResetPassword/>}/>
      </Routes>
      </BrowserRouter>
  );
}
export default App;