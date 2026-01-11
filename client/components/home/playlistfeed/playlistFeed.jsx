import { useState, useEffect,useContext } from "react";
import axios from "../../../api/axios.js";
import PlaylistComponent from "./playlistComponent.jsx"
import UserContext from "../../../contexts/UserContext.jsx"

export default function Feed() {
  const [playlists, setPlaylists] = useState([{}]);
  const [arePlaylistsFetched, SetArePlaylistsFetched] = useState(false);
  const {user}=useContext(UserContext);

  useEffect(() => {
    if(!user._id)return;
    async function fetchAllPlaylists(userId) {
      if(!userId)return;
      try {
        await axios.get(`/playlists/user/${userId}`)
        .then((res) => {
          setPlaylists(res.data.data);
          SetArePlaylistsFetched(true);
        });
      } catch (error) {
        console.log(error);
      }
    }
      fetchAllPlaylists(user._id);
  }, [user]);

  if(arePlaylistsFetched && playlists.length===0){
    return(
    <div className="flex h-100 w-full justify-center items-center text-base font-medium ">
      No Playlist has been published by this user
    </div>
    );
  }

    return (
    <>
      <div className="h-screen p-3 mt-4 overflow-y-auto overflow-x-hidden flex flex-col gap-6 mb-2">
        {arePlaylistsFetched &&
          playlists.map((playlist, idx) =>  (
            <PlaylistComponent key={idx} playlist={playlist} idx={idx} />
          ))}
      </div>
    </>
  );
}

