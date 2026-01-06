import { useState, useEffect,useContext } from "react";
import axios from "../../api/axios.js";
import Cookies from "js-cookie";
import Nav from "./nav.jsx";
import Feed from "./videofeed/feed.jsx";
import TabContext  from "../../contexts/TabContext.jsx";
import TweetFeed from "./tweetfeed/tweetFeed.jsx"
import UserContext from "../../contexts/UserContext.jsx"

export default function Home() {
  const {user,isUserLogged}= useContext(UserContext);
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const values={isHomeSelected , setIsHomeSelected};
  
  return (
    <div className="relative z-0">
      <TabContext.Provider value={values}>
      <Nav user={user} isLogged={isUserLogged} /> 
      {
        isHomeSelected?(
          <Feed className="relative z-0"/>
        ):(
          <TweetFeed className="relative z-0"/>
        ) 
        }
      </TabContext.Provider>
      </div>
  );
}
