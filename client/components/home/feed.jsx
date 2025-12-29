import {useState,useEffect} from "react"
import axios from "../../api/axios.js";

export default function Feed(){
   const [videos,setVideos]=useState([{}])
  useEffect(()=>{
    async function fetchAllVideos(){
  
    try{
      axios.get("/videos/all-videos")
      .then(data => console.log(data.data.data))
      

      }catch(error){
      console.log(error)
    }

    }

    fetchAllVideos();
  },[])

  return(
    <></>
  );
} 
