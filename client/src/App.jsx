import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../contexts/UserContext.jsx";
import Home from "../components/home/home.jsx";
import SignUp from "../components/signup.jsx";
import SignIn from "../components/signin.jsx";
import Profile from "../components/userProfile/profile.jsx";
import axios from "../api/axios.js";
import WatchVideoPage from "../components/watch/watchVideoPage.jsx";
import WatchPostPage from "../components/watch/watchPostPage.jsx";
import Dashboard from "../components/dashboard/dashboard.jsx";
import LikedVideos from "../components/likedVideosPage/likedVideos.jsx";
import HistoryPage from "../components/historyPage/historyPage.jsx";
import WatchPlaylist from "../components/playlist/watchPlaylist.jsx";
import SearchVideoPage from "../components/search/searchVideoPage.jsx";
import SearchPostPage from "../components/search/searchPostPage.jsx";
import TabContext from "../contexts/TabContext.jsx";

function App() {
	const [user, setUser] = useState({});
	const [isTokenReceived, setIsTokenReceived] = useState(false);
	const [isUserLogged, setIsUserLogged] = useState(false);
	const [currentPage, setCurrentPage] = useState("home")

	useEffect(() => {
		async function loginUser() {
			try {
				const response = await axios.get("/user/current-user");
				if (response.status === 200) {
					setUser(response.data.data);
					setIsUserLogged(true);
				}
			} catch (error) {
				setUser({});
				setIsUserLogged(false);
				console.log(error);
				try {
					if (error.status === 500) {
						const res = await axios.post("/user/refresh-tokens");
						if (res.status == 200) {
							setIsTokenReceived(true);
						}
					}
				} catch (error) {
					console.log(error);
				}
			}
		}
		loginUser();
	}, [isTokenReceived]);

	return (
		<UserContext.Provider
			value={{ user, isUserLogged, setUser, setIsUserLogged }}
		>
			<TabContext.Provider value={{currentPage,setCurrentPage}}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/userchannel/:username" element={<Profile />} />
						<Route path="/watch/video/:videoId" element={<WatchVideoPage />} />
						<Route path="/watch/post" element={<WatchPostPage />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/liked-videos" element={<LikedVideos />} />
						<Route path="/watch-history" element={<HistoryPage />} />
						<Route path="/watch/playlist/:playlistId" element={<WatchPlaylist />} />
						<Route path="/search/videos" element={<SearchVideoPage />} />
						<Route path="/search/posts" element={<SearchPostPage />} />
					</Routes>
				</BrowserRouter>
			</TabContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
