import { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import VideoComponent from "./VideoComponent.jsx";

export default function Feed({ fetchType, userId }) {
  const [videos, setVideos] = useState([{}]);
  const [areVideosFetched, SetAreVideosFetched] = useState(false);

  useEffect(() => {
    async function fetchAllVideos() {
      try {
        await axios.get("/videos/all-videos")
          .then((res) => {
            setVideos(res.data.data);
            SetAreVideosFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchVideosByUser(Id) {
      if (!Id) return;
      try {
        await axios.get(`/videos/all-videos?userId=${Id}`)
          .then((res) => {
            setVideos(res.data.data);
            SetAreVideosFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }

    if (fetchType === "user") {
      fetchVideosByUser(userId);
    } else {
      fetchAllVideos();
    }
  }, []);
  if (areVideosFetched && videos.length === 0) {
    return (
      <div className="flex h-100 w-full justify-center items-center text-base font-medium ">
        No Videos has been published by this user
      </div>
    );
  }
  return (
    <>
      <div className="h-screen p-3 mt-4 overflow-y-auto overflow-x-hidden flex flex-col gap-6 mb-2">
        {areVideosFetched &&
          videos.map((video, idx) => (
            <VideoComponent key={idx} video={video} idx={idx} />
          ))}
      </div>
    </>
  );
}
