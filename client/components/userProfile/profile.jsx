import { useState,useEffect,useContext,useCallback } from "react";
import UserContext from "../../contexts/UserContext.jsx";
import axios from "../../api/axios.js";
import ArrowLeft from "../assets/arrowLeft.jsx"
import UserTick from "../assets/usertick.jsx"
import UserAddIcon from "../assets/useradd.jsx"
import dbanner from "../assets/dbanner.jpg"
import dpfp from "../assets/dpfp.jpg"

export default function Profile(){

  const {user,isUserLogged}=useContext(UserContext);
  const [UserProfile,setUserProfile]=useState({})

  const getUserProfile= useCallback()
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
        <img src={UserProfile?.avatar?.url || dpfp } className="h-20 rounded-full absolute left-1 -bottom-15 w-20 border-2 border-white" loading="lazy" />
      </div>
        <div className="flex justify-between ">

         <span className="ml-24 h-6">
            <h3 className="text-left text-neutral-700 font-medium text-lg">{UserProfile?.fullName}</h3>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{"@"+UserProfile?.userName}</h3>
            <div className="flex">
              
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{UserProfile?.subscriberCount+" Subscribers"}</h3>
 
            <span className="mx-1 align-middle text-gray-600">•</span>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{UserProfile?.channelsSubscribedCount+" Subscribed"}</h3>
            </div>
          </span>


          <button className="w-35 h-8 bg-blue-900  text-neutral-200 text-lg flex items-center justify-between fixed right-0 p-4"><UserAddIcon/><span>Subscribe</span></button>
        </div>
    </>
  );
}
