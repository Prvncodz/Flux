import {useState,useEffect} from "react"
import axios from "../../api/axios.js";

export default function Feed(){
   const [videos,setVideos]=useState([{}])
   const [areVideosFetched, SetAreVideosFetched] = useState(false)
   const [user, setuser] = useState({})
      async function UserAvatar(userId){
        try {
  
         const res = await axios.get(`user/c/${userId}`)
          if(res.status===200){  
          console.log("res data :",res.data.data.avatar.url)
          const url= res.data.data.avatar.url
          console.log("url :",url)
        return url
      }
        } catch (error) {
           console.log(error)
           console.log("backend message :",error?.response?.data?.message)
            return null
        }
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

       <div key={idx} className="card">
          <div>
            <img src={video.thumbnail.url} className=" w-full " alt=""/>
          </div>
          <div>
            <img src={UserAvatar(video.owner)} className="rounded-full h-10 w-10" alt=""/>
          </div>
          <span>
              <h3>{video.title}</h3>
              <h3>3 days ago . 199k views</h3>
            </span>
       </div>
       )
       ) 
       }  
    </div>
    </>
  );
} 
