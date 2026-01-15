import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";
import dpfp from "../assets/dpfp.jpg"
import Button from "../button.jsx";
import UserTick from "../assets/usertick.jsx";
import UserAddIcon from "../assets/useradd.jsx";
import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import CommentFeed from "../commentFeed/commentFeed.jsx";

export default function WatchVideoPage() {
  const location = useLocation();
  const { video, username, ownerAvatar } = location.state || {};
  const [isSubscribed, setIsSubscribed] = useState(false);
  let timeoutId;
  async function handleSubscription() {
    clearTimeout(timeoutId);
    setIsSubscribed(!isSubscribed);
    timeoutId = setTimeout(async () => {

      try {
        await axios.post(`/subscriptions/c/${video?.owner}`)
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.message);
      }
    }, 800);
  }


  useEffect(() => {
  }, [])

  return (
    <>
      <Nav wantTabs={false} />
      <div className="relative">
        <video width="640" height="360" controls loop>

          <source src={video?.videofile?.url} type="video/mp4" />
          <source src={video?.videofile?.url} type="video/webm" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative flex flex-col">
        <h1 className="text-xl text-gray-800 mx-3 my-1 text-left  text-bold">{video?.title || ""}</h1>
        <div className="flex mx-1 mt-2 justify-between">
          <div className="flex">
            <img src={ownerAvatar || dpfp} className="rounded-full h-11 w-11 mx-3" />
            <div className="flex-col ml-1 justify-left">
              <h1 className=" text-lg font-normal text-gray-700 text-left">{username || ""}</h1>
              <h1 className="text-sm font-normal text-gray-500">119k subscribers</h1>
            </div>
          </div>
          <Button children={isSubscribed ?
            (
              <>
                <UserTick />
                <span>Subscribed</span>
              </>
            )
            :
            (
              <>
                <UserAddIcon />
                <span>Subscribe</span>
              </>
            )} classes="mt-2 ml-4" onClick={handleSubscription} />
        </div>
      </div>
      <div>
        <CommentFeed fetchType={"video"} Id={video?.Id} />
      </div>

    </>
  );
}
