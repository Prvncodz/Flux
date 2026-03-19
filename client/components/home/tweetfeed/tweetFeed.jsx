import { useState, useEffect, useContext, useRef } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";
import UserContext from "../../../contexts/UserContext.jsx";
import { Flashlight, Frown, Loader2 } from "lucide-react";
import SignInBanner from "../../signinInstructPopup.jsx";

export default function Feed({ fetchType, userId, searchQuery }) {
	const [tweets, setTweets] = useState([]);
	const [areTweetsFetched, SetAreTweetsFetched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1)
	const { user, isUserLogged } = useContext(UserContext);
	const [hasNoMore, setHasNoMore] = useState(false)
	const [showSiginPopup, setShowSiginPopup] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		function handleScroll() {
			if (loading || hasNoMore) return;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
				setPage(prev => prev + 1);
			}
		}
		el?.addEventListener("scroll", handleScroll);
		return (() => el.removeEventListener('scroll', handleScroll))
	})
	useEffect(() => {
		if (loading) return;
		setLoading(true);

		const controller = new AbortController();
		const signal = controller.signal;
		async function fetchAllTweets() {
			try {
				await axios
					.get(`/tweets/get-all-tweets?${page > 1 ? `page=${page}` : ``}${isUserLogged ? `&userId=${user?._id}` : ``}`, { signal })
					.then((res) => {
						if (res.data.data.length == 0) {
							setHasNoMore(true);
							setLoading(false)
						}
						setTweets(prev => [...prev, ...res.data.data]);
						SetAreTweetsFetched(true);
					});
			} catch (error) {
				console.log(error);
			}
		}
		async function fetchSearchedTweets(query) {
			try {
				await axios
					.get(`/tweets/get-all-tweets?query=${query}${page > 1 ? `&page=${page}` : ``}${isUserLogged ? `&userId=${user?._id}` : ``}`, { signal })
					.then((res) => {
						if (res.data.data.length == 0) {
							setHasNoMore(true);
							setLoading(false)
						}

						if (page > 1) {
							setTweets(prev => [...prev, ...res.data?.data]);
						} else {
							setTweets(res.data.data);
						}
						SetAreTweetsFetched(true);
					});
			} catch (error) {
				console.log(error);
			}
		}

		async function fetchAllTweetsByUser() {
			if (!userId) return;
			try {
				await axios.get(`/tweets/${userId}${page > 1 ? `?page=${page}` : ``}`, { signal })
					.then((res) => {
						if (res.data.data.length == 0) {
							setHasNoMore(true);
							setLoading(false)
						}
						setTweets(prev => [...prev, ...res.data.data]);
						SetAreTweetsFetched(true);
					});
			} catch (error) {
				console.log(error);
			}
		}

		if (fetchType === "user") {
			fetchAllTweetsByUser();
		} else if (fetchType === "search") {
			fetchSearchedTweets(searchQuery);
		} else {
			fetchAllTweets();
		}
		return () => {
			controller.abort();
		}
	}, [user, fetchType, searchQuery, page]);

	if (tweets.length == 0 && areTweetsFetched) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Posts available for this request
			</div>
		);
	}
	return (
		<div className={`${fetchType === "user" ? "md:flex md:justify-center" : "md:flex md:justify-center md:mt-4 md:flex-col"} overflow-y-auto`} >
			{showSiginPopup && <SignInBanner setShowPopup={setShowSiginPopup} />}
			<div className={`${fetchType === "user" ? " h-[65vh] md:h-[60vh] lg:max-w-[70vw] " : "h-[95vh] md:w-[65vh] "} relative w-full overflow-y-auto pb-5 overflow-x-hidden flex flex-col md:block `} ref={ref}>
				{areTweetsFetched &&
					tweets.map((tweet, idx) => (
						<TweetComponent key={idx} tweet={tweet} idx={idx} tweetsLength={tweets.length} setLoading={setLoading} setShowSiginPopup={setShowSiginPopup} />
					))}
			</div>
			{loading && (
				<div className="h-15 w-full  inset-0 flex items-center justify-center z-20 pointer-events-none">
					<Loader2
						className="w-12 h-12 animate-spin"
						style={{ color: "#0A98FC" }}
					/>
				</div>
			)}
		</div>
	);
}
