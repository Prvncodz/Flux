import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import Cookies from "js-cookie";
import Nav from "./nav.jsx";

export default function Home() {
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
    <>
      <Nav user={user} isLogged={isUserLogged} />
    </>
  );
}
