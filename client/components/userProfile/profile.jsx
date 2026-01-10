import { useState,useEffect,useContext,useCallback } from "react";
import UserContext from "../../contexts/UserContext.jsx";
import axios from "../../api/axios.js";
import ArrowLeft from "../assets/arrowLeft.jsx"
import UserTick from "../assets/usertick.jsx"
import UserAddIcon from "../assets/useradd.jsx"
import dbanner from "../assets/dbanner.jpg"
import dpfp from "../assets/dpfp.jpg"
import Button from "../button.jsx";
import VideoFeed from "../home/videofeed/feed.jsx";
import PostFeed from "../home/tweetfeed/tweetFeed.jsx";
import PlaylistFeed from "../home/playlistfeed/playlistFeed.jsx";



export default function Profile(){

  const {user,isUserLogged}=useContext(UserContext);
  const [UserProfile,setUserProfile]=useState({});
  const [tabOpened,setTabOpened]=useState("videos");
  const tabs={
    "videos":<VideoFeed fetchType="user"/>,
    "posts":<PostFeed fetchType="user"/>,
    "playlists":<PlaylistFeed/>
  }
  useEffect(() => {
    if(!user?.userName)return;
    async function getUserProfile(username) {
      if(!username)return;
      try {
        const res= await axios.get(`/user/p/${username}`);
        if (res.status) {
          setUserProfile(res.data?.data);
        }
      } catch (error) {
        console.log("Error while fetching user's profile. err message",error);
      }
    }
    getUserProfile(user?.userName);
  }, [user?.userName])

  return (
    <>
      <nav className="bg-neutral-100 h-12 w-full border-b-neutral-500 relative flex items-center justify-between ">
        <a href="/" className="relative left-8/100 text-gray-800 font flex items-center justify-left">
          <ArrowLeft/>
        </a>
      </nav> 
      <div className="relative h-45">
        <img src={UserProfile?.coverImage?.url || dbanner } onError={(e)=>e.target.src=dbanner} className="h-full w-full relative" loading="lazy" />
        <img src={UserProfile?.avatar?.url || dpfp } onError={(e)=>e.target.src=dpfp} className="h-20 rounded-full absolute left-1 -bottom-15 w-20 border-2 border-white" loading="lazy" />
      </div>
      <div className="flex justify-between h-auto w-full ">

        <span className="ml-24 h-6">
          <h3 className="text-left text-neutral-700 font-medium text-lg">{UserProfile?.fullName|| "Jhon doe"}</h3>
          <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">@{UserProfile?.userName||"jhondoe201"}</h3>
          <div className="flex">

            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{UserProfile?.subscriberCount||"0"} Subscribers</h3> 
            <span className="mx-1 align-middle text-gray-600">•</span>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{UserProfile?.channelsSubscribedCount||0} Subscribed</h3>
          </div>
        </span>

        <Button children={<><UserAddIcon/><span>Subscribe</span></>} classes="mt-2"/>
     </div>
      <div className="flex flex-row w-full mt-6">
          <span name="videos" className={`text-lg relative mt-3.5 font-semibold w-50 cursor-pointer ${tabOpened==="videos"? `text-blue-700`:`text-gray-800 `}`} onClick={()=> setTabOpened("videos")}>Videos<div className={`absolute -bottom-2 w-full h-1 ${tabOpened==="videos"?`bg-blue-800`:``}`}></div></span>
          <span name ="posts" className={`text-lg relative mt-3.5 font-semibold w-50 cursor-pointer ${tabOpened==="posts"? `text-blue-700`:`text-gray-800 `}`} onClick={()=>setTabOpened("posts")}>Posts<div className={`absolute -bottom-2 w-full h-1 ${tabOpened==="posts"?`bg-blue-800`:``}`}></div></span>
          <span name="playlists" className={`text-lg relative mt-3.5 font-semibold w-50 cursor-pointer ${tabOpened==="playlists"? `text-blue-700`:`text-gray-800 `}`} onClick={()=>setTabOpened("playlists")}>Playlists<div className={`absolute -bottom-2 w-full h-1 ${tabOpened==="playlists"?`bg-blue-800`:``}`}></div></span>
      </div>
      <div className="relative overflow-y-auto">
       {
         tabs[tabOpened] 
        } 
      </div>
    </>
  );
}
