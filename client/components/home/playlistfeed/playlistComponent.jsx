import { useGetUserById } from "../../../hooks/useGetUserById.jsx";
import {useState,useEffect} from 'react';
import dpfp from "../../assets/dpfp.jpg";
import dbanner from "../../assets/dbanner.jpg";

export default function PlaylistComponents({ playlist, idx }) {
  const { avatarUrl } = useGetUserById(playlist.owner);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    setVideos(playlist.videos);
  }, [playlist]);

  return (
    <div className="mb-3">
      <div className="relative ">
        <img src={videos[0].thumbnail.url || dbanner } className=" w-full " />
        <div className=""></div>
      </div>
      <div className="flex mt-3">
        <div className="h-10 w-10">
          <img
            src={avatarUrl || dpfp}
            className="rounded-full h-10 w-10" 
            loading="lazy"
            onError={(e)=>e.target.src=dpfp}
          />
        </div>
        <span className="ml-4">
          <h3 className="text-left text-neutral-700 font-medium text-sm">{playlist.name}</h3>
          <h3 className="text-left text-neutral-600 font-medium text-xs">3 days ago . 199k views</h3>
        </span>

      </div>
    </div>
  );
}
