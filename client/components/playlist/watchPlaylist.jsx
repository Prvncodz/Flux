import { useEffect, useState } from "react";
import { ArrowLeft, Play } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Description from "../watch/videoDescription.jsx";
import dpfp from "../assets/dpfp.jpg"

export default function ShowPlaylistPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playlist, avatarUrl, fullname, name } = location.state || {};
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    console.log(playlist)
    if (playlist) {
      setVideos(playlist?.videos)
    }
  }, [playlist])


  return (
    <div className="max-w-md mx-auto h-screen overflow-y-auto p-6 space-y-6">

      {/* back button */}
      <button onClick={() => navigate("/")} className="flex flex-start">
        <ArrowLeft />
      </button>

      {/* playlist banner */}
      <div className="w-full h-65 rounded-xl overflow-hidden">
        <img src={playlist?.videos[0]?.thumbnail?.url} alt="" className="object-cover h-auto w-auto " />
      </div>

      {/* playlist info */}
      <div className="space-y-3">

        <h1 className="text-xl font-semibold wrap-break-word text-left">
          {name}
        </h1>

        <div className="flex items-center gap-2">
          <img
            src={avatarUrl || dpfp}
            className="w-8 h-8 rounded-full"
            alt=""
          />

          <span className="text-sm text-gray-600 wrap-break-word">
            {fullname}
          </span>
        </div>

        {/* description component */}
        <Description content={playlist?.description} showVideoDetails={false} />

        {/* play button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-full">
            <Play size={16} />
            Play
          </button>
        </div>

      </div>

      {/* videos list */}
      <div className="space-y-4 border border-gray-200 rounded-2xl p-3">

        {videos.map((video) => (
          <div key={video.id} className="flex gap-4">

            <img
              src={video.thumbnail?.url}
              alt=""
              className="w-50 h-[84px] rounded-lg object-cover"
            />

            <div className="flex flex-col justify-start w-70">

              <h3 className="text-sm font-base line-clamp-3 wrap-break-word text-left">
                {video.title}
              </h3>

              <p className="text-xs text-gray-500 mt-1 wrap-break-word text-left">
                {fullname}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}
