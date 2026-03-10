import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../home/nav.jsx";
import axios from "../../api/axios.js";

export default function LikedVideos() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function getVideos() {
      try {
        const res = await axios.get("/likes/videos");
        if (res.status === 200) {
          setVideos(res.data?.data);
          console.log(res.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getVideos();
  }, [])
  return (
    <>
      <Nav />
      <div className="max-w-lg   p-5 h-screen overflow-y-auto rounded-xl">


        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 gap-4 text-center">
            <p className="text-gray-500">
              You haven't liked any video yet
            </p>

            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Explore Videos
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <h1 className="text-2xl text-left font-semibold mb-6 mt-5">Liked Videos</h1>
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex gap-3 border border-neutral-200 rounded-xl p-3"
              >
                {/* thumbnail */}
                <img
                  src={video.thumbnail}
                  alt=""
                  className="w-[142px] h-[84px] object-cover rounded-lg"
                />

                {/* video info */}
                <div className="flex flex-col justify-between flex-1">
                  <div className="text-left mt-3 ml-2">
                    <h3 className="text-sm font-semibold leading-tight line-clamp-2">
                      {video.title}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {video.views} · {video.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-1  ml-2">
                    <img
                      src={video.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />

                    <span className="text-xs text-gray-600">
                      {video.channel}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
