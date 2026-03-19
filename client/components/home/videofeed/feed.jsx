import { useState, useEffect, useContext, useRef } from "react";
import axios from "../../../api/axios.js";
import VideoComponent from "./VideoComponent.jsx";
import UserContext from "../../../contexts/UserContext.jsx";
import { Loader2 } from "lucide-react";

export default function Feed({ fetchType, userId, searchQuery, recommendations, playingVideoId }) {
	const [videos, setVideos] = useState([]);
	const [areVideosFetched, SetAreVideosFetched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1)
	const { user, isUserLogged } = useContext(UserContext);
	const [hasNoMore, setHasNoMore] = useState(false)
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		function handleScroll() {
			if (loading || hasNoMore) return;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
				setPage(prev => prev + 1);
			}
		}
		el.addEventListener("scroll", handleScroll);
		return (() => el.removeEventListener('scroll', handleScroll))
	})

	useEffect(() => {
		if (loading) return;
		setLoading(true)
		const controller = new AbortController();
		const signal = controller.signal;

		async function fetchAllVideos() {
			try {
				await axios.get(`/videos/all-videos?page=${page}${isUserLogged ? `&userId=${user?._id}` : ``}`, { signal })
					.then((res) => {
						setVideos(prev => [...prev, ...res.data.data]);
						SetAreVideosFetched(true);
						if (res.data.data.length == 0) {
							setHasNoMore(true);
						  setLoading(false)
						}
					});
			} catch (error) {
				console.log(error);
			}
		}
		async function fetchSearchedVideos(query) {
			try {
				await axios
					.get(
						`/videos/all-videos${isUserLogged ? `?userId=${user?._id}&` : `?`}query=${query}`, { signal }
					)
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
				await axios
					.get(`/videos/all-videos-by-user?userId=${Id}`, { signal })
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
		} else if (fetchType === "search") {
			fetchSearchedVideos(searchQuery);
		} else {
			fetchAllVideos();
		}
		return () => {
			controller.abort();
		}
	}, [fetchType, searchQuery, page]);

	if (areVideosFetched && videos.length === 0) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Videos available for this request
			</div>
		);
	}
	return (
		<>
			<div
				className={`${fetchType === "user" ? `h-[64vh]` : recommendations ? "h-[40vh]" : "h-[95vh]"} relative w-full overflow-y-auto overflow-x-hidden grid gird-cols-1 gap-6 mb-2 pb-5 md:grid-cols-2  md:gap-3 ${fetchType === "user" ? "md:p-5 md:pb-15 lg:pb-35 lg:grid-cols-3 xl:grid-cols-4" : recommendations ? "md:p-3 md:pb-10 lg:max-w-[30vw] lg:grid-cols-1 xl:grid-cols-1 lg:h-screen" : "md:pl-16 md:pr-5 lg:pl-18  lg:pr-4 lg:grid-cols-3 xl:grid-cols-4 "}  md:py-4  `} ref={ref}>
				{areVideosFetched &&
					videos.map((video, idx) => (
						playingVideoId ?
							video._id !== playingVideoId && <VideoComponent key={idx} video={video} idx={idx} /> :
							<VideoComponent key={idx} video={video} idx={idx} videosLength={videos.length} setLoading={setLoading} />
					))}
				{loading && (
					<div className="relative top-0   inset-0 flex items-center justify-center z-20 pointer-events-none">
						<Loader2
							className="w-12 h-12 animate-spin"
							style={{ color: "#0A98FC" }}
						/>
					</div>
				)}
			</div>
		</>
	);
}
