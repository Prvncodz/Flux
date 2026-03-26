import { useEffect, useRef, useState } from "react";
import { ArrowLeft, PlayCircleIcon, PlusCircleIcon, VideoIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Description from "../watch/videoDescription.jsx";
import dpfp from "../assets/dpfp.jpg";
import dbanner from "../assets/dbanner.jpg"
export default function ShowPlaylistPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { playlist, avatarUrl, fullname, name } = location.state || {};
	const [videos] = useState(playlist?.videos);
	const playPlaylist = useRef(null);

	function handleShowWatchVideo(videoId) {
		if (videoId) {
			navigate("/watch/video", {
				state: {
					videoId: videoId,
					ownerAvatar: avatarUrl,
					fullname: fullname,
				},
			});
		}
	}

	return (
		<div className="max-w-md mx-auto h-screen overflow-y-auto p-6 space-y-6">
			{/* back button */}
			<button onClick={() => navigate("/")} className="flex flex-start">
				<ArrowLeft />
			</button>

			{/* playlist banner */}
			<div className="w-full h-65  rounded-xl overflow-hidden bg-yellow-400">
				<img
					src={playlist?.videos[0]?.thumbnail?.url || dbanner}
					alt=""
					className="object-fill h-full w-full"
				/>
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

				<div className="flex  gap-3 justify-end">
					<button
						className="flex items-center gap-2 bg-blue-700 text-white px-6 py-2 rounded-full p-3 font-semibold text-xs "
						onClick={() => playPlaylist.current.click()}
					>
						<PlayCircleIcon size={18} />
						PLAY
					</button>
					<button
						className="flex items-center gap-2 text-gray-700 px-6 py-2 rounded-full p-3 font-semibold text-xs ring ring-gray-700"
						
					>
						<VideoIcon size={18} />
						ADD VIDEO
					</button>
				</div>
			</div>

			{/* videos list */}
			<div className="space-y-4">
				{videos.length === 0 ?

					videos.map((video, idx) => (
						<VideoCardComponent
							key={idx}
							video={video}
							idx={idx}
							ref={idx === 0 ? playPlaylist : null}
							onClick={() => handleShowWatchVideo(video._id)}
							fullname={fullname}
						/>
					))
					:
					<h1>No videos are uploaded to this playlist yet</h1>
				}
			</div>
		</div>
	);
}
function VideoCardComponent({ video, ref, onClick, fullname }) {
	const [duration, setDuration] = useState("00:00");

	useEffect(() => {
		function calcDuration(dur) {
			if (!dur) return;
			hours = Math.trunc(dur / 3600);
			const minutes = Math.trunc((dur % 3600) / 60);
			const seconds = Math.trunc((dur % 3600) % 60);

			if (hours >= 1) {
				setDuration(
					`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
				);
			} else if (minutes >= 1) {
				setDuration(
					`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
				);
			} else {
				setDuration(`00:${String(seconds).padStart(2, "0")}`);
			}
		}
		calcDuration(video?.duration);
	}, [video]);

	return (
		<div key={video._id} className="flex gap-4" onClick={onClick} ref={ref}>
			<div className="relative">
				<img
					src={video.thumbnail?.url}
					alt=""
					className="w-50 h-[84px] rounded-lg object-cover"
				/>
				<div className="absolute bg-gray-800 rounded-xl bottom-1 right-1 w-10 h-4 text-xs text-gray-300">
					{duration}
				</div>
			</div>

			<div className="flex flex-col justify-start w-70">
				<h3 className="text-sm font-base line-clamp-3 wrap-break-word text-left">
					{video.title}
				</h3>

				<p className="text-xs text-gray-500 mt-1 wrap-break-word text-left">
					{fullname}
				</p>
			</div>
		</div>
	);
}
