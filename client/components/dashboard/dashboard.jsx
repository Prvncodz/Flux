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
	function handleEditProfile() {
		setIsEditPopUpActive(true);
	}
	useEffect(() => {
		async function getStats() {
			try {
				const res = await axios.get("/dashboard/stats");
				if (res.status === 200) {
					setUserChannelStats(res.data?.data[0]);
				}
			} catch (error) {
				console.log(error);
			}
		}
		async function getVideos() {
			try {
				const res = await axios.get("/dashboard/videos");
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
		<div className="h-screen overflow-y-auto space-x-3 overflow-x-hidden ">
			<Nav />
			<div className="h-[96vh] w-full p-5 space-y-6 overflow-auto md:h-full md:pl-16">

				{isEditPopUpActive && <EditProfilePopUp setIsEditPopUpActive={setIsEditPopUpActive} />}
				<div className="hidden md:flex flex-col items-center mb-6 md:mt-5">
					<h1 className="text-2xl font-semibold text-gray-800">
						Welcome back, {userChannelStats?.fullName} 👋
					</h1>

					<p className="text-sm text-gray-500 mt-1">
						Here’s what’s happening on your channel today.
					</p>
					
				</div>
				<div className="relative h-55.25 w-full overflow-hidden rounded-xl border border-neutral-200  md:w-120 md:h-70 md:mx-auto">
				<div className="relative z-0 ">
					<img src={userChannelStats?.coverImage?.url || dbanner} onError={(e) => e.target.src = dbanner} className="h-35.5 w-full relative md:h-45 " loading="lazy" />
					<img src={userChannelStats?.avatar?.url || dpfp} onError={(e) => e.target.src = dpfp} className="h-21 rounded-full absolute left-3 -bottom-12 w-22.5 border-2 border-white md:h-25 md:w-25 md:-bottom-15" loading="lazy" />
					<Edit2 size={20} className="absolute right-5 -bottom-8 cursor-pointer" onClick={handleEditProfile} />
				</div>
				<div className="h-15 ml-30 w-full mt-1 md:ml-32 md:mt-1 ">
					<h3 className="text-left text-neutral-600 font-medium text-xl ">{userChannelStats?.fullName || "Jhon doe"}</h3>
					<h3 className="text-left text-neutral-500 font-medium text-sm mt-0 ">@{userChannelStats?.userName || "jhondoe201"}</h3>
				</div>
			</div>

			<div className="md:mt-1">
				<h2 className="text-lg font-bold mb-3 text-gray-900 text-left md:pl-5 md:mt-3 md:text-base">
					CHANNEL STATS
				</h2>

				<div className="space-y-3  md:flex md:flex-col md:justify-center md:p-5 md:items-center lg:flex lg:flex-row lg:space-x-3 ">
					<StatCard icon={<Eye size={16} />} label="Total views" value={userChannelStats?.totalViews} />
					<StatCard icon={<ThumbsUp size={16} />} label="Total likes" value={userChannelStats?.totalLikes} />
					<StatCard icon={<Users size={16} />} label="Total subscribers" value={userChannelStats?.totalSubscribers} />
				</div>
			</div>

			<div className="h-auto">
				<h2 className="text-lg font-bold mb-3 text-gray-900 text-left md:pl-5">
					All Videos
				</h2>

				<div className="border border-neutral-200 rounded-xl p-3 space-y-3 mx-auto h-auto">

					<div className="flex justify-between text-xs text-gray-500 px-2">
						<span>Total {userChannelStats?.totalVideoCount || videos.length} videos</span>
						<span className="mr-23">Visibility</span>
					</div>

					{videos.map((video) => (
						<VideoCard video={video} key={video._id} />
					))}
				</div>
			</div>
		</div>
		</div >
	);
}

function VideoCard({ video }) {
	const [isPublished, setIsPublished] = useState(video.isPublished);

	let timeoutId;
	async function handleTogglePublish(videoId) {
		clearTimeout(timeoutId);
		setTimeout(async () => {
			try {
				const res = await axios.post(`/videos/c/${videoId}/toggle-publish-status`);
				if (res.status === 200) {
					console.log(res.data)
					setIsPublished(prev => !prev);
				}
			} catch (error) {
				console.log(error);
			}

		}, 800);

	}
	return (
		<div
			key={video._id}
			className="flex items-center justify-between border border-neutral-300 rounded-lg px-3 py-2 h-auto"
		>
			<div className="flex items-center gap-3 text-sm">
				<Video size={16} />
				<div className="w-35 min-w-40 max-w-[240x] text-left text-nowwrap" >
					{video.title}
				</div>
			</div>

			{isPublished ? (
				<Eye size={16} className="text-green-500" />
			) : (
				<EyeOff size={16} className="text-red-500" />
			)}
			<div className="flex items-center gap-2">

				<button
					className={`text-xs px-3 py-1 w-20 rounded-md text-white active:scale-95 transition-all ${isPublished
						? "bg-gray-800"
						: "bg-gray-600"
						}`}
					onClick={() => handleTogglePublish(video._id)}
				>
					{isPublished ? "Unpublish" : "Publish"}
				</button>
			</div>
		</div>

	);
}

function StatCard({ icon, label, value }) {
	return (
		<div className="flex items-start gap-3 border border-neutral-200 rounded-xl p-5 flex-col md:h-40 md:w-full md:p-5 lg:h-50  ">
			<div className="bg-[#1E549D] text-[#ffffff] p-1.5  rounded-full">
				{icon}
			</div>

			<div>
				<p className="text-xs text-gray-500 md:text-base lg:text-lg ">{label}</p>
				<p className="font-semibold text-xl text-left md:text-2xl md:mt-1 lg:text-3xl lg:mt-2 lg:font-normal">{value}</p>
			</div>
		</div>
	);
}
