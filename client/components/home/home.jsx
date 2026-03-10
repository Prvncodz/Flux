import { useState, useEffect, useContext } from "react";
import Nav from "./nav.jsx";
import Feed from "./videofeed/feed.jsx";
import TabContext from "../../contexts/TabContext.jsx";
import TweetFeed from "./tweetfeed/tweetFeed.jsx"
import { useLocation } from "react-router-dom";

export default function Home() {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const values = { isHomeSelected, setIsHomeSelected };
  const location = useLocation();
  const { tab } = location.state || {}
  useEffect(() => {
    if (tab === "home") {
      setIsHomeSelected(true);
    } else {
      setIsHomeSelected(false);
    }
  }, [tab])
  return (
    <div className="relative z-0">
      <TabContext.Provider value={values}>
        <Nav />
        {
          isHomeSelected ? (
            <Feed className="relative z-0" fetchType="all" />
          ) : (
            <TweetFeed className="relative z-0" />
          )
        }
      </TabContext.Provider>
    </div>
  );
}
