import { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios.js";
import VideoComponent from "./VideoComponent.jsx";
import UserContext from "../../../contexts/UserContext.jsx";

export default function Feed({ fetchType, userId }) {
  const [videos, setVideos] = useState([{}]);
  const [areVideosFetched, SetAreVideosFetched] = useState(false);
  const { user, isUserLogged } = useContext(UserContext);

  useEffect(() => {
    async function fetchAllVideos() {
      try {
        await axios.get(`/videos/all-videos${isUserLogged ? `?userId=${user?._id}` : ``}`)
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
        await axios.get(`/videos/all-videos-by-user?userId=${Id}`)
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
      <div className={`${fetchType === "user" ? `h-[60vh]` : `h-[95vh]`}  overflow-y-auto overflow-x-hidden flex flex-col gap-6 mb-2 pb-5`}>
        {areVideosFetched &&
          videos.map((video, idx) => (
            <VideoComponent key={idx} video={video} idx={idx} />
          ))}
      </div>
    </>
  );
}
