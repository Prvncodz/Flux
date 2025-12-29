import {useState,useEffect} from "react"
import axios from "../../api/axios.js";

export default function Feed(){
   const [videos,setVideos]=useState([{}])
   const [areVideosFetched, SetAreVideosFetched] = useState(false)
  const [user, setuser] = useState({})

  useEffect(()=>{
    function fetchAllVideos(){
    try{
      axios.get("/videos/all-videos")
      .then(data =>{
          setVideos(data.data.data)
          SetAreVideosFetched(true)
          })
      }catch(error){
      console.log(error)
    }
    }
       function UserAvatar(userId){
        try {
          const res = axios.get(`/c/:${userId}`)
          console.log(res.data)
       if(!res){
        console.error("unable to fetch user")
       }
       else if(res.status===200){
        console.log(res.data)
       return res?.data?.avatar?.url
}
      return ""
        
        } catch (error) {
           console.log(error)
           console.log("backend message :",error?.response?.data?.message)
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
            <img src={video.thumbnail.url} alt=""/>
          </div>
          <div>
            <img src={(video)=>UserAvatar(video.owner)} alt=""/>
          </div>
       </div>
       )
       ) 
       }  
    </div>
    </>
  );
} 
