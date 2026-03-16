import { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios.js";
import VideoComponent from "./VideoComponent.jsx";
import UserContext from "../../../contexts/UserContext.jsx";

export default function Feed({ fetchType, userId, searchQuery }) {
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
		async function fetchSearchedVideos(query) {
			try {
				await axios.get(`/videos/all-videos${isUserLogged ? `?userId=${user?._id}&` : `?`}query=${query}`)
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
		} else if (fetchType === "search") {
			fetchSearchedVideos(searchQuery);
		}
		else {
			fetchAllVideos();
		}
	}, [fetchType, searchQuery]);

	if (areVideosFetched && videos.length === 0) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Videos available for this request
			</div>
		);
	}
	return (
		<>
			<div className={`${fetchType === "user" ? `h-[64vh]` : `h-[95vh]`} w-auto overflow-y-auto overflow-x-hidden grid gird-cols-1 gap-6 mb-2 pb-5 scrollbar scrollbar-track-transparent md:grid-cols-2  md:gap-3 md:pl-16 md:pr-5 md:py-4 md-relative md:z-1  lg:pl-18 lg:grid-cols-3 lg:pr-4 xl:grid-cols-4 `}>
				{areVideosFetched &&
					videos.map((video, idx) => (
						<VideoComponent key={idx} video={video} idx={idx} />
					))}
			</div>
		</>
	);
}
