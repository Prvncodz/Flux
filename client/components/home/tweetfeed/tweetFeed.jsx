import { useState, useEffect, useContext } from "react";
import axios from "../../../api/axios.js";
import TweetComponent from "./tweet.jsx";
import UserContext from "../../../contexts/UserContext.jsx";
import { Loader2 } from "lucide-react";

export default function Feed({ fetchType, userId, searchQuery }) {
	const [tweets, setTweets] = useState([]);
	const [areTweetsFetched, SetAreTweetsFetched] = useState(false);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1)
	const { user } = useContext(UserContext);

	useEffect(() => {
		async function fetchAllTweets() {
			try {
				await axios
					.get(`/tweets/get-all-tweets?${page > 1 ? `page=${page}&` : ``}limit=10${userId ? `&userId=${user?._id}` : ``}`)
					.then((res) => {
						setTweets(prev => [...prev, ...res.data.data]);
						SetAreTweetsFetched(true);
						setPage(prev => prev + 1);
					});
			} catch (error) {
				console.log(error);
			}
		}
		async function fetchSearchedTweets(query) {
			try {
				await axios
					.get(`/tweets/get-all-tweets?query=${query}${userId ? `&userId=${user?._id}` : ``}`)
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
	}, [user, fetchType, searchQuery]);

	if (tweets.length == 0 && areTweetsFetched) {
		return (
			<div className="flex h-100 w-full justify-center items-center text-base font-medium ">
				No Posts available for this request
			</div>
		);
	}
	return (
		<div className={`${fetchType === "user" ? "md:flex md:justify-center " : ""}`} >
			<div className={`${fetchType === "user" ? " h-[65vh] md:h-[60vh] lg:max-w-[70vw] " : "h-[95vh] md:w-[65vh] "} w-full overflow-y-auto pb-5 overflow-x-hidden flex flex-col md:block md:boder md:border-gray-200 `}>
				{areTweetsFetched &&
					tweets.map((tweet, idx) => (
						<TweetComponent key={idx} tweet={tweet} idx={idx} tweetsLength={tweets.length} setLoading={setLoading} />
					))}
			</div>
			{loading && (
				<div className="absolute bottom-0  inset-0 flex items-center justify-center z-20 pointer-events-none">
					<Loader2
						className="w-12 h-12 animate-spin"
						style={{ color: "#0A98FC" }}
					/>
				</div>
			)}
		</div>
	);
}
