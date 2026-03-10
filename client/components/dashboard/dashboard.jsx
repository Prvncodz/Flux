import { useEffect, useState } from "react";
import {
  Eye,
  ThumbsUp,
  Users,
  Video,
  EyeOff,
  Edit2,
} from "lucide-react";
import Nav from "../home/nav";
import axios from "../../api/axios";
import dbanner from "../assets/dbanner.jpg"
import dpfp from "../assets/dpfp.jpg"
import EditProfilePopUp from "../userProfile/editProfilePopup.jsx";

export default function Dashboard() {

  const [userChannelStats, setUserChannelStats] = useState({});
  const [videos, setVideos] = useState([]);
  const [isEditPopUpActive, setIsEditPopUpActive] = useState(false);
  async function handleTogglePublish(videoId) {
    try {
      const res = await axios.post(`/videos/c/${videoId}/toggle-publish-status`);
      if (res.status === 200) {
        console.log(res.data)
      }
    } catch (error) {
      console.log(error);
    }

  }
  function handleEditProfile() {
    setIsEditPopUpActive(true);
  }
  useEffect(() => {
    async function getStats() {
      try {
        const res = await axios.get("dashboard/stats");
        if (res.status === 200) {
          setUserChannelStats(res.data?.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
    async function getVideos() {
      try {
        const res = await axios.get("dashboard/videos");
        if (res.status === 200) {
          setVideos(res.data?.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getStats();
    getVideos();
  }, [])

  return (
    <div className="h-screen overflow-y-auto space-x-3 overflow-x-hidden">
      <Nav />
      <div className="w-full p-5 space-y-6 overflow-auto">

        {isEditPopUpActive && <EditProfilePopUp setIsEditPopUpActive={setIsEditPopUpActive} />}
        <div className="relative h-55.25 w-full overflow-hidden rounded-xl border border-neutral-200 ">
          <div className="relative z-0 ">
            <img src={userChannelStats?.coverImage?.url || dbanner} onError={(e) => e.target.src = dbanner} className="h-35.5 w-full relative" loading="lazy" />
            <img src={userChannelStats?.avatar?.url || dpfp} onError={(e) => e.target.src = dpfp} className="h-21 rounded-full absolute left-3 -bottom-10 w-22.5 border-2 border-white" loading="lazy" />
            <Edit2 size={20} className="absolute right-5 -bottom-8" onClick={handleEditProfile} />
          </div>
          <div className="h-6 ml-30">
            <h3 className="text-left text-neutral-700 font-medium text-lg">{userChannelStats?.fullName || "Jhon doe"}</h3>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">@{userChannelStats?.userName || "jhondoe201"}</h3>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-900 text-left">
            CHANNEL STATS
          </h2>

          <div className="space-y-3">
            <StatCard icon={<Eye size={16} />} label="Total views" value={userChannelStats?.totalViews} />
            <StatCard icon={<ThumbsUp size={16} />} label="Total likes" value={userChannelStats?.totalLikes} />
            <StatCard icon={<Users size={16} />} label="Total subscribers" value={userChannelStats?.totalSubscribers} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-900 text-left">
            All Videos
          </h2>

          <div className="border border-neutral-200 rounded-xl p-3 space-y-3 mx-auto">

            <div className="flex justify-between text-xs text-gray-500 px-2">
              <span>Total {userChannelStats?.totalVideoCount || videos.length} videos</span>
              <span>Visibility</span>
            </div>

            {videos.map((video) => (
              <div
                key={video._id}
                className="flex items-center justify-between border border-neutral-300 rounded-lg px-3 py-2"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Video size={16} />
                  <span className="truncate max-w-[140px]">
                    {video.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {video.isPublished ? (
                    <Eye size={16} className="text-green-500" />
                  ) : (
                    <EyeOff size={16} className="text-red-500" />
                  )}

                  <button
                    className={`text-xs px-3 py-1 rounded-md text-white ${video.isPublished
                      ? "bg-gray-800"
                      : "bg-gray-600"
                      }`}
                    onClick={() => handleTogglePublish(video._id)}
                  >
                    {video.isPublished ? "Unpublish" : "Publish"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border border-neutral-200 rounded-xl p-5 flex-col">
      <div className="bg-[#1E549D] text-white p-1.5  rounded-full">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="font-semibold text-xl text-left">{value}</p>
      </div>
    </div>
  );
}
