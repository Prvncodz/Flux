import {useState,useEffect} from "react"
import axios from "../../api/axios.js";
import VideoComponent from "./VideoComponent.jsx"

export default function Feed(){
   const [videos,setVideos]=useState([{}])
   const [areVideosFetched, SetAreVideosFetched] = useState(false)
   const [user, setuser] = useState({})
      async function UserAvatar(userId){
    }

  useEffect(()=>{
    function fetchAllVideos(){
    try{
      axios.get("/videos/all-videos")
      .then(res =>{
          setVideos(res.data.data)
          SetAreVideosFetched(true)
          })
      }catch(error){
       console.log(error)
    }
    }
      

    fetchAllVideos();
  },[])

  return(
    <>
    <div className="h-auto p-3 flex flex-col gap-6 ">

       {areVideosFetched && videos.map((video,idx)=>(
        <VideoComponent video={video} idx={idx}/>
       )
       ) 
       }  
    </div>
    </>
  );
} 
