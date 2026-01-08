import { useState, useEffect,useContext } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";
import UserContext from "../../../contexts/UserContext.jsx"

export default function Feed({fetchType}) {
  const [tweets, setTweets] = useState([{}]);
  const [areTweetsFetched, SetAreTweetsFetched] = useState(false);

  const {user}=useContext(UserContext);
  useEffect(() => {
    async function fetchAllTweets() {
      try {
       await axios.get("/tweets/get-all-tweets").then((res) => {
          setTweets(res.data.data);
          SetAreTweetsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllTweetsByUser() {
      if(!user?._id)return;
      try {
       await axios.get(`/tweets/${user?._id}`).then((res) => {
          setTweets(res.data.data);
          SetAreTweetsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (fetchType==="user") {
      fetchAllTweetsByUser();
    }else{
    fetchAllTweets();
    }
  }, [user]);

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
