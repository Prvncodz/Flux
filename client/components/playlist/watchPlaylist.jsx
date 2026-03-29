import { memo, useContext, useEffect, useRef, useState } from "react";
import { ArrowLeft, Ellipsis, PlayCircleIcon, VideoIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import Description from "../watch/videoDescription.jsx";
import dpfp from "../assets/dpfp.jpg";
import dbanner from "../assets/dbanner.jpg"
import UserContext from "../../contexts/UserContext.jsx"
import PlaylistOptions from "./PlaylistOptions.jsx";
import axios from "../../api/axios.js";
import AddVideosModal from "./VideoOptionsPopup.jsx";

export default function ShowPlaylistPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const { user, isUserLogged } = useContext(UserContext);
	const { playlist, avatarUrl, fullname, name } = location.state || {};
	const [videos, setVideos] = useState(playlist?.videos);
	const playPlaylist = useRef(null);
	const [isUserPlaylistOwner, setIsUserPlaylistOwner] = useState(false);
	const [isOptionActive, setIsOptionsActive] = useState(false);
	const [isVideoOptionsActive, setIsVideoOptionsActive] = useState(false);
	const [allUserVideos, setAllUserVideos] = useState([]);
	const [set, setSet] = useState(() => new Set(playlist?.videos?.map(video => video._id) || []));
	console.log(playlist?.videos?.map((video) => {video._id}))

	async function handleAddVideosToPlaylist(videoIds) {
		try {
			await axios.patch(`/playlists/add/${playlist?._id}`, { videoIds: videoIds })
				.then((res) => {
					setVideos(res.data?.data?.videos)
					setSet(prev => {
						const newSet = new Set(prev);
						newSet.add(...videoIds);
						return newSet
					})
				});
		} catch (err) {
			console.log(err);
		}
	}
	async function handleOption(optType) {
		try {
			if (optType === "edit") {
				console.log("edit videooos")
			} else if (optType === "delete") {
				console.log("delete videooos")
			}
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		async function fetchAllVideos() {
			try {
				const res = await axios.get("/videos/all-videos-by-user")
				if (res.status === 200) {
					setAllUserVideos(res.data?.data);
				}
			} catch (err) {
				console.log(err)
			}
		}

		if ((playlist?.owner === user?._id) && isUserLogged) {
			setIsUserPlaylistOwner(true);
			fetchAllVideos();
		}
	}, [])


	return (
		<div className="max-w-md mx-auto h-screen overflow-y-auto p-6 space-y-6">
			{/* back button */}
			<div className="flex justify-between relative">
				<button onClick={() => navigate("/")} className="flex flex-start">
					<ArrowLeft />
				</button>
				{isUserPlaylistOwner &&
					<>
						<button onClick={() => setIsOptionsActive(prev => !prev)} className="flex">
							<Ellipsis size={28} />
						</button>
						{
							isOptionActive && <PlaylistOptions handleOption={handleOption} />
						}
					</>
				}
			</div>

			{/* playlist banner */}
			<div className="w-full h-55  rounded-xl overflow-hidden bg-yellow-400">
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
					{isUserPlaylistOwner &&
						<button
							className="flex items-center gap-2 text-gray-800 px-6 py-2 rounded-full p-3 font-semibold text-xs ring ring-gray-800 outline-none cursor-pointer"
							onClick={() => setIsVideoOptionsActive(prev => !prev)}
						>
							<VideoIcon size={18} />
							ADD VIDEO
						</button>
					}
					{isVideoOptionsActive && <AddVideosModal
						isOpen={isVideoOptionsActive}
						onClose={() => setIsVideoOptionsActive(false)}
						onAdd={handleAddVideosToPlaylist}
						videos={allUserVideos}
						alreadyAdded={set}
					/>}
				</div>
			</div>

			{/* videos list */}
			<VideoList
				videos={videos}
				playPlaylist={playPlaylist}
				fullname={fullname}
				avatarUrl={avatarUrl}
			/>
		</div>
	);
}

const VideoList = memo(({ videos, playPlaylist, fullname, avatarUrl }) => {

	const navigate = useNavigate();
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
	useEffect(() => {

	}, [videos])
	return (
		<div className="space-y-4 mt-10">
			{videos.length !== 0 ?

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
				<h1 className="text-center">No videos are uploaded to this playlist yet</h1>
			}
		</div>
	)
})

function VideoCardComponent({ video, ref, onClick, fullname }) {
	const [duration, setDuration] = useState("00:00");

	useEffect(() => {
		function calcDuration(dur) {
			if (!dur) return;
			const hours = Math.trunc(dur / 3600);
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
					src={video.thumbnail?.url || dbanner}
					alt=""
					className="w-50 h-21 rounded-lg object-cover"
				/>
				<div className="absolute bg-gray-800 rounded-xl bottom-1 right-1 w-10 h-4 text-xs text-gray-300 text-center">
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
