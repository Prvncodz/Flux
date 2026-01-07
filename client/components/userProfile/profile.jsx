
import { useState,useEffect,useContext,useCallback } from "react";
import UserContext from "../../contexts/UserContext.jsx";
import axios from "../../api/axios.js";
import ArrowLeft from "../assets/arrowLeft.jsx"

export default function Profile(){

  const {user,isUserLogged}=useContext(UserContext);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const getUserProfile= useCallback()
  useEffect(() => {
    if(!user?.userName)return;
    async function getUserProfile(username) {
      if(!username)return;
      try {
        const res= await axios.get(`/user/p/${username}`);
        if (res.status) {
          setCoverImageUrl(res.data?.data?.coverImage?.url);
          setAvatarUrl(res.data?.data?.avatar?.url);
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
        <img src={coverImageUrl || "../assets/dbanner.jpg" } className="h-full w-full relative" loading="lazy" />
        <img src={avatarUrl || "../assets/dpfp.jpg" } className="h-20 rounded-full absolute left-1 -bottom-10 w-20 border-2 border-white" loading="lazy" />
      </div>
    </>
  );
}
