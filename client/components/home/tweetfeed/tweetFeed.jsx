import { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";

export default function Feed() {
  const [tweets, setTweets] = useState([{}]);
  const [areTweetsFetched, SetAreTweetsFetched] = useState(false);

  useEffect(() => {
    function fetchAllTweets() {
      try {
        axios.get("/tweets/get-all-tweets").then((res) => {
          setTweets(res.data.data);
          SetAreTweetsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }

    fetchAllTweets();
  }, []);

  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden mt-5 flex flex-col ">
        {areTweetsFetched &&
          tweets.map((tweet, idx) =>  (
            <TweetComponent key={idx} tweet={tweet} idx={idx} />
          ))}
      </div>
    </>
  );
}
