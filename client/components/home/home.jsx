import { useState, useEffect, useContext } from "react";
import Nav from "./nav.jsx";
import Feed from "./videofeed/feed.jsx";
import TabContext from "../../contexts/TabContext.jsx";
import TweetFeed from "./tweetfeed/tweetFeed.jsx"

export default function Home() {
  const [isHomeSelected, setIsHomeSelected] = useState(true);
  const values = { isHomeSelected, setIsHomeSelected };

  return (
    <div className="relative z-0">
      <TabContext.Provider value={values}>
        <Nav wantTabs={true} />
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
