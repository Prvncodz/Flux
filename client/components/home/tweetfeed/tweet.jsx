import { useGetUserById } from "../../../hooks/useGetUserById.jsx";
import Like from "../likeComponent/likeButton.jsx";
import dpfp from "../../assets/dpfp.jpg";
import { useContext, useEffect, useState } from "react";
import axios from "../../../api/axios.js";
import ChatIcon from "../../assets/chatIcon.jsx";
import { useNavigate } from "react-router-dom";
import AddCommentsBox from "../../commentFeed/AddCommentBox.jsx";
import ReplyIcon from "../../assets/replyIcon.jsx";
import UserContext from "../../../contexts/UserContext.jsx";
import TweetCardOptions from "./tweetCardOptions.jsx";
import { EllipsisVertical } from "lucide-react";
import { DeletePost, EditPost } from "./tweetOptions.jsx";

export default function TweetComponent({
	tweet,
	mainPost,
	idx,
	tweetsLength,
	setLoading,
	setShowSigninPopup,
}) {
	const { avatarUrl, fullname, username } = useGetUserById(tweet?.owner) || {};
	const [commentsPost, setCommentPosts] = useState([{}]);
	const [showAddTweetBox, setShowAddTweetBox] = useState(false);
	const [areAnyComments, setAreAnyComments] = useState(false);
	const { user, isUserLogged } = useContext(UserContext);
	const [isOptionActive, setIsOptionsActive] = useState(false)
	const [isUserTweet, setIsUserTweet] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [popupType, setPopupType] = useState(false);
	const popup = {
		"edit": <EditPost setShowPopup={setShowPopup} tweet={tweet} avatarUrl={avatarUrl} fullname={fullname} username={username}/>,
		"delete": <DeletePost />
	}
	const navigate = useNavigate();

	function handleShowTweetPage() {
		if (!isUserLogged) {
			setShowSigninPopup(true);
			return;
		}

		if (!mainPost) {
			navigate("/watch/post", {
				state: {
					post: tweet,
					comments: commentsPost,
				},
			});
		} else {
			return;
		}
	}

	async function handleOption(optType) {
		try {
			if (optType === "edit") {
				setShowPopup(true);
				setPopupType("edit");
				setIsOptionsActive(false);
			} else if (optType === "delete") {
				setShowPopup(true);
				setPopupType("delete");
				setIsOptionsActive(false);
			}
		} catch (err) {
			console.log(err);
		}
	}
	function HandleReplyToTweet() {
		if (!isUserLogged) {
			setShowSigninPopup(true);
			return;
		}
		if (!mainPost) {
			setShowAddTweetBox((prev) => !prev);
		}
	}

	
	useEffect(() => {
		async function getAllCommentPosts() {
			try {
				const res = await axios.get(
					`/comments/${tweet?._id}/get-tweet-comments${user?._id ? `?userId=${user._id}` : ``}`,
				); //if userid is there it will be sent as query else no query will be sent
				if (res.status === 200) {
					setCommentPosts([...res.data?.data]);
					if (res.data.data?.length !== 0) {
						setAreAnyComments(true);
					} else {
						setAreAnyComments(false);
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
		if (idx === tweetsLength - 1) {
			setLoading(false);
		}
		getAllCommentPosts();
		if (tweet?.owner === user?._id) {
			setIsUserTweet(true);
		}
	}, [tweet?._id, user?._id]);
	return (
		<>
			<div
				className=" h-auto w-full p-3 border-b border-gray-300 mt-0 mb-0 "
				onError={() => setShowSigninPopup(true)}
			>
				<div className="flex mt-3">
					<div className="h-10 w-10 ml-4">
						<img
							src={avatarUrl || dpfp}
							className="rounded-full h-10 w-10"
							onError={(e) => (e.target.src = dpfp)}
						/>
					</div>
					<span className="ml-4 h-7">
						<h3 className="text-left text-neutral-700 font-medium text-lg">
							{fullname}
						</h3>
						<h3 className="text-left text-neutral-600 font-medium text-xs mt-0">
							{"@" + username}
						</h3>
					</span>
				</div>
				{isUserTweet &&
					<>
						<button onClick={() => setIsOptionsActive(prev => !prev)} className="absolute top-8 right-5">
							<EllipsisVertical size={20} className="text-neutral-700" />
						</button>
						{
							isOptionActive && <TweetCardOptions handleOption={handleOption} />
						}
						{
							showPopup && popup[popupType]
						}
					</>
				}

				<div className="pt-4 pl-4 h-auto w-full wrap-break-word text-neutral-700 text-body font-medium text-left ">
					{tweet.content}
				</div>
				<div className="flex justify-start gap-8 mt-4 ml-5">
					<span>
						<Like
							fetchType={"tweet"}
							Id={tweet._id}
							likeStatus={tweet?.isLiked}
							isUserLogged={isUserLogged}
							setShowSignInPopup={setShowSigninPopup}
						/>
					</span>
					<span
						className="flex text-sm text-black cursor-pointer "
						onClick={HandleReplyToTweet}
					>
						<span className="mr-1">
							<ReplyIcon />
						</span>
						reply
					</span>
					<span
						onClick={handleShowTweetPage}
						className="flex text-sm text-black cursor-pointer "
					>
						<ChatIcon size={26} className="bg-gray-600" />
						{!areAnyComments || mainPost ? (
							""
						) : (
							<span className="ml-2"> View {commentsPost.length} replies</span>
						)}
					</span>
				</div>
			</div>
			{showAddTweetBox && (
				<AddCommentsBox
					fetchType={"tweet"}
					Id={tweet?._id}
					setShowAddTweetBox={setShowAddTweetBox}
				/>
			)}
		</>
	);
}
