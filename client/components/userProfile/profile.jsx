
import { useState,useEffect,useContext,useCallback } from "react";
import UserContext from "../../contexts/UserContext.jsx";
import axios from "../../api/axios.js";

export default function Profile(){

  const {user,isUserLogged}=useContext(UserContext);
  const getUserProfile= useCallback()
   useEffect(() => {

      async function getUserProfile(username) {
        try {
           const res= await axios.get(`/user/p/${username}`);
           if (res.status) {
             console.log(res.data);
           }
         } catch (error) {
            console.log("Error while fetching user's profile. err message",error);
         } 
      }
      getUserProfile(user?.userName);
   }, [user])
   
  return (
    <>
      hejejoee
    </>
  );
}
