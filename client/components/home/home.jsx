import { useState, useEffect,useContext } from "react";
import axios from "../../api/axios.js";
import Cookies from "js-cookie";
import Nav from "./nav.jsx";
import Feed from "./videofeed/feed.jsx";
import TabContext  from "../../contexts/TabContext.jsx";
import TweetFeed from "./tweetfeed/tweetFeed.jsx"

export default function Home() {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const values={isHomeSelected , setIsHomeSelected};
  
  return (
    <div className="relative z-0">
      <TabContext.Provider value={values}>
      <Nav /> 
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
