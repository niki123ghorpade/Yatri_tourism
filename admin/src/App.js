import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Single from "./pages/singlepage/Single";
import SingleEnquiry from "./pages/singleenquiry/singleenquire.jsx"
import SinglePackage  from "./pages/singlepackage/Singlepack.jsx";
import Profile from "./pages/profile/profile.jsx"
import List from "./pages/list/List";
import NewPackage from "./pages/newPackage/NewPackage";
import { packageColumns, enquiriesColumns, userColumns } from "./datatablesource";
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { packageInputs, userInputs } from "./formsource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import {AuthContext} from "./context/AuthContext.js";
function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
       
        <Route path="users">
              <Route index element={  <ProtectedRoute>
                  <List columns={userColumns}/>
                </ProtectedRoute>} />
              <Route path=":userId" element={  <ProtectedRoute>
                  <Single/>
                </ProtectedRoute>} />
              <Route path="new" element={  <ProtectedRoute>
                <New inputs={userInputs} title="Add new User"/>
                </ProtectedRoute>}/>
          </Route>
          <Route path="packages">
              <Route index element={  <ProtectedRoute>
                  <List columns={packageColumns}/>
                </ProtectedRoute>} />
              <Route path=":packageId" element={ <ProtectedRoute>
                  <SinglePackage/>
                </ProtectedRoute>}/>
          <Route path="new" element={  <ProtectedRoute>
               <NewPackage/>
                </ProtectedRoute>}/>
        </Route>
        <Route path="enquiries">
              <Route index element={  <ProtectedRoute>
                  <List columns={enquiriesColumns}/>
                </ProtectedRoute>} />
                <Route path=":enquiryId" element={ <ProtectedRoute>
                  <SingleEnquiry/>
                </ProtectedRoute>}/>
        </Route>    
        </Route> 
        <Route>
          {/* Other routes */}
          <Route path="/profile" element={<Profile />} />
        </Route>     
            </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
