import { useState, useEffect, useContext, useRef } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";
import UserContext from "../../../contexts/UserContext.jsx";
import { Flashlight, Loader2 } from "lucide-react";

export default function Feed({ fetchType, userId, searchQuery }) {
	const [tweets, setTweets] = useState([]);
	const [areTweetsFetched, SetAreTweetsFetched] = useState(false);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1)
	const { user, isUserLogged } = useContext(UserContext);
	const [hasNoMore,setHasNoMore]=useState(false)
	const ref = useRef(null);

	useEffect(() => {
		const el = ref.current;
		function handleScroll() {
		  if(loading||hasNoMore)return;
			if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
				setLoading(true)
				setPage(prev => prev + 1);
			}
		}
		el.addEventListener("scroll", handleScroll);
		return (() => el.removeEventListener('scroll', handleScroll))
	})
	useEffect(() => {
		async function fetchAllTweets() {
			try {
				console.log("trying to fetch page no:", page);
				await axios
					.get(`/tweets/get-all-tweets?${page > 1 ? `page=${page}` : ``}${isUserLogged ? `&userId=${user?._id}` : ``}`)
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
					.get(`/tweets/get-all-tweets?query=${query}${isUserLogged ? `&userId=${user?._id}` : ``}`)
					.then((res) => {
						setTweets(res.data.data);
						SetAreTweetsFetched(true);
					});
			} catch (error) {
				console.log(error);
			}
		}

		async function fetchAllTweetsByUser() {
			if (!userId) return;
			try {
				await axios.get(`/tweets/${userId}`).then((res) => {
					setTweets(res.data.data);
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

	}, [user, fetchType, searchQuery, page]);

	if (tweets.length == 0 && areTweetsFetched) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Posts available for this request
			</div>
		);
	}
	return (
		<div className={`${fetchType === "user" ? "md:flex md:justify-center " : ""}h-screen overflow-y-auto`} >
			<div className={`${fetchType === "user" ? " h-[65vh] md:h-[60vh] lg:max-w-[70vw] " : "h-[95vh] md:w-[65vh] "} ${loading ? "pb-12" : ""}relative w-full overflow-y-auto pb-5 overflow-x-hidden flex flex-col md:block `} ref={ref}>
				{areTweetsFetched &&
					tweets.map((tweet, idx) => (
						<TweetComponent key={idx} tweet={tweet} idx={idx} tweetsLength={tweets.length} setLoading={setLoading} />
					))}
			</div>
			{loading && (
				<div className="relative top-0 h-15 w-full  inset-0 flex items-center justify-center z-20 pointer-events-none">
					<Loader2
						className="w-12 h-12 animate-spin"
						style={{ color: "#0A98FC" }}
					/>
				</div>
			)}
		</div>
	);
}
