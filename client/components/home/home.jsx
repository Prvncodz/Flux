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
    if (tab === "posts") {
      setIsHomeSelected(false);
    } else {
      setIsHomeSelected(true);
    }
  }, [tab])
  return (
    <div className="relative z-0 flex items-center flex-col h-screen w-screen top-0 left-0 ">
      <TabContext.Provider value={values}>
        {
          isHomeSelected ? (
            <>
              <Nav searchType={"video"} />
              <Feed className="relative z-0" fetchType="all" />
            </>
          ) : (
            <>
              <Nav searchType={"post"} />
              <TweetFeed className="relative z-0" />
            </>
          )
        }
      </TabContext.Provider>
    </div>
  );
}
