import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";
import dpfp from "../assets/dpfp.jpg"
import Button from "../button.jsx";
import UserTick from "../assets/usertick.jsx";
import UserAddIcon from "../assets/useradd.jsx";
import { useContext, useEffect, useState } from "react";
import axios from "../../api/axios.js";
import CommentFeed from "../commentFeed/commentFeed.jsx";
import VideoDescription from "./videoDescription.jsx";
import VideoFeed from "../home/videofeed/feed.jsx";
import LikeButton from "../home/likeComponent/likeButton.jsx";
import UserContext from "../../contexts/UserContext.jsx";

export default function WatchVideoPage() {
  const location = useLocation();
  const { videoId, username, ownerAvatar } = location.state || {};
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
  const [video, setVideo] = useState({})
  const { user, IsUserLogged } = useContext(UserContext)
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
    async function getVideoById(Id) {
      if (!Id) return;
      try {

        const res = await axios.get(`/videos/c/${Id}${IsUserLogged ? `?userId=${user?._id}` : ``}`);
        if (res.status === 200) {
          setVideo(res.data?.data);
        }
      } catch (err) {
        console.log(err)
      }

    }
    getVideoById(videoId);
  }, [videoId])

  return (
    <div className="overflow-auto">
      <Nav wantTabs={false} />
      <div className="relative">
        <video width="640" height="360" controls loop>
          {video.videofile?.url &&
            <>
              <source src={video?.videofile?.url} type="video/mp4" />
              <source src={video?.videofile?.url} type="video/webm" />
            </>
          }
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative flex flex-col">
        <h1 className="text-xl text-gray-800 mx-2 text-left p-3  text-bold">{video?.title || ""}</h1>
        <VideoDescription content={video?.description} />
        <div className="flex mx-1 my-2 justify-between">
          <div className="flex">
            <img src={ownerAvatar || dpfp} className="rounded-full h-11 w-11 mx-3" />
            <div className="flex-col ml-1 justify-left">
              <h1 className=" text-lg font-normal text-gray-700 text-left">{username || ""}</h1>
              <h1 className="text-sm font-normal text-gray-500">119k subscribers</h1>
            </div>
          </div>
          <div className="flex items-center">
            <LikeButton size={20} fetchType={"video"} Id={video?._id} likeStatus={video?.isLiked} />
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
      <div className="overflow-auto my-2">
        <CommentFeed fetchType={"video"} Id={video?._id} isOpen={isCommentSectionOpen} setIsOpen={setIsCommentSectionOpen} />
      </div>
      <div>
        <VideoFeed />
      </div>
    </div>
  );
}
