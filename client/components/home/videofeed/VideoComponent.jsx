import { useGetUser } from "../../../hooks/useGetUser.jsx";
import {useState,useEffect} from 'react';

export default function VideoComponent({ video, idx }) {
  const { avatarUrl } = useGetUser(video.owner);
  const [duration,setDuration] =useState("00:00")

  useEffect(() => {
    function calcDuration(dur) {
      const hours=Math.trunc(dur/3600);
      const minutes=Math.trunc((dur%3600)/60);
      const seconds=Math.trunc((dur%3600)%60);

      if(hours>=1){
        setDuration(`${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`);
      } else if(minutes>=1){
        setDuration(`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`);
      }else{
        setDuration(`00:${String(seconds).padStart(2,"0")}`);
      }
    }

    calcDuration(Math.trunc(video.duration));
  }, [])

  return (
    <div className="mb-3">
      <div className="relative ">
        <img src={video.thumbnail.url} className=" w-full " />
        <div className="absolute right-2 bottom-2 p-2  rounded-xl text-center text-neutral-300 bg-gray-900 text-sm font-medium">{duration}</div>
      </div>
      <div className="flex mt-3">
         <div className="h-10 w-10">
        <img
          src={avatarUrl || "../assets/dpfp.jpg"}
          className="rounded-full h-10 w-10" 
            loading="lazy"
        />
      </div>
      <span className="ml-4">
        <h3 className="text-left text-neutral-700 font-medium text-sm">{video.title}</h3>
        <h3 className="text-left text-neutral-600 font-medium text-xs">3 days ago . 199k views</h3>
      </span>

      </div>
    </div>
  );
}
