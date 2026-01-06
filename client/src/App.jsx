import { useState,useEffect} from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import UserContext from "../contexts/UserContext.jsx"
import Home from "../components/home/home.jsx";
import SignUp from "../components/signup.jsx";
import SignIn from "../components/signin.jsx";
import Profile from "../components/userProfile//profile.jsx";
import axios from "../api/axios.js"



function App() {

  const [user, setUser] = useState({});
  const [isTokenReceived, setIsTokenReceived] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  useEffect(() => {
    async function loginUser() {
      try {
        const response = await axios.get("/user/current-user");
        if (response.status === 200) {
          setUser(response.data.data);
          setIsUserLogged(true);
        }
      } catch (error) {
        setUser({});
        setIsUserLogged(false);
        console.log(error);
        try {
          if (error.status === 500) {
            const res = await axios.post("/user/refresh-tokens");
            if (res.status == 200) {
              setIsTokenReceived(true);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    loginUser();


  }, [isTokenReceived]);

  return (
    <UserContext.Provider value={{user,isUserLogged}}>

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userchannel" element={<Profile />} />
      </Routes>
    </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
