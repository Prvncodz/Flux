import { useState, useEffect } from "react";
import axios from "../../../api/axios.js";
import PlaylistComponent from "./playlistComponent.jsx";

export default function PlaylistFeed({ userId }) {
	const [playlists, setPlaylists] = useState([{}]);
	const [arePlaylistsFetched, SetArePlaylistsFetched] = useState(false);

	useEffect(() => {
		async function fetchAllPlaylists(Id) {
			if (!Id) return;
			try {
				await axios.get(`/playlists/user/${Id}`).then((res) => {
					setPlaylists(res.data?.data);
					SetArePlaylistsFetched(true);
				});
			} catch (error) {
				console.log(error);
			}
		}
		fetchAllPlaylists(userId);
	}, []);

	if (arePlaylistsFetched && playlists.length === 0) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Playlist has been published by this user
			</div>
		);
	}

	return (
		<div className={`md:flex md:justify-center `}>
			<div className={`h-[65vh] md:h-[60vh] w-full p-5  mt-4 overflow-y-auto overflow-x-hidden grid grid-cols-1 md:p-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-2`}>
				{arePlaylistsFetched &&
					playlists.map((playlist, idx) => (
						<PlaylistComponent key={idx} playlist={playlist} idx={idx} />
					))}
			</div>
		</div>
	);
}
