import { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";
import UserContext from "../../../contexts/UserContext.jsx"

export default function Feed({ fetchType, userId }) {
  const [tweets, setTweets] = useState([{}]);
  const [areTweetsFetched, SetAreTweetsFetched] = useState(false);

  const { user } = useContext(UserContext);
  useEffect(() => {
    async function fetchAllTweets() {
      try {
        await axios.get(`/tweets/get-all-tweets?userId=${user?._id}`).then((res) => {
          setTweets(res.data.data);
          SetAreTweetsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllTweetsByUser() {
      if (!userId) return;
      try {
        await axios.get(`/tweets/${userId}`).then((res) => {
          setTweets(res.data.data);
          SetAreTweetsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (fetchType === "user") {
      fetchAllTweetsByUser();
    } else {
      fetchAllTweets();
    }
  }, [user]);

  if (areTweetsFetched && tweets.length === 0) {
    return (
      <div className="flex h-100 w-full justify-center items-center text-base font-medium ">
        No Tweets has been published by this user
      </div>
    );
  }
  return (
    <>
      <div className="h-[95vh] overflow-y-auto overflow-x-hidden pb-5 flex flex-col ">
        {areTweetsFetched &&
          tweets.map((tweet, idx) => (
            <TweetComponent key={idx} tweet={tweet} idx={idx} />
          ))}
      </div>
    </>
  );
}
