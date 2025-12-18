import { useState, useEffect } from "react"
import axios from "../../api/axios.js"
import Cookies from "js-cookie"
import Nav from "./nav.jsx"

export default  function Home(){
      const [user,setUser]=useState({});
        
        useEffect( ()=>{
            async function loginUser() {
            try {
                 console.log("trying to req for current user with tokens")
                const UserRes=await axios.get("/user/current-user");
                console.log("done extracting current user")
                 if(UserRes.status==401){
                     const res=await axios.post("/user/refresh-tokens")
                     if(res.status==200){
                        console.log(res.cookies)
                        console.log("refreshed access tokens successfully")
                     }
                 }
                if(UserRes.status==200){
                     setUser(UserRes.data.data)
                }
            } catch (error) {
                console.error("error :",error.message)
            }   
            
        }
        loginUser();
          },[]);

    return(
    <>
      <Nav user={user}/>
    </>
    );
}