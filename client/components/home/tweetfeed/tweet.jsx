import { useGetUserById } from "../../../hooks/useGetUserById.jsx";
import Like from "../likeComponent/likeButton.jsx"
import dpfp from "../../assets/dpfp.jpg"
import { useEffect, useState } from "react";
import axios from "../../../api/axios.js";
import ChatIcon from "../../assets/chatIcon.jsx";
import { useNavigate } from "react-router-dom";

export default function TweetComponent({ tweet }) {
  const { avatarUrl, fullname, username } = useGetUserById(tweet?.owner);
  const [commentsPost, setCommentPosts] = useState([{}]);
  const [areCommentPostFetched, setAreCommentPostFetched] = useState(false);
  const navigate = useNavigate();

  function handleShowTweetPage() {
    navigate("/watch/tweet", {
      state: {
        tweet: tweet,
        comments: commentsPost
      }
    })
  }
  useEffect(() => {
    async function getAllCommentPosts() {
      try {
        const res = await axios.get(`/comments/${tweet?._id}/get-tweet-comments`)
        if (res.status === 200) {
          setCommentPosts(res.data?.data);
          setAreCommentPostFetched(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllCommentPosts();
  }, [])
  return (
    <>
      <div className=" h-auto w-full p-3 border-b border-gray-300 mt-0 mb-0 ">
        <div className="flex mt-3">
          <div className="h-10 w-10 ml-4">
            <img
              src={avatarUrl || dpfp}
              className="rounded-full h-10 w-10"
              onError={(e) => e.target.src = dpfp}
            />
          </div>
          <span className="ml-4 h-7">
            <h3 className="text-left text-neutral-700 font-medium text-lg">{fullname}</h3>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{"@" + username}</h3>
          </span>

        </div>
        <div className="pt-4 pl-4 h-auto w-full wrap-break-word text-neutral-700 text-body font-medium text-left ">
          {tweet.content}
        </div>
        <div className="flex justify-start gap-6 mt-4 ml-5">
          <span><Like fetchType={"tweet"} Id={tweet._id} /></span>
          <span onClick={handleShowTweetPage} className="flex text-sm text-black cursor-pointer "><ChatIcon size={26} className="bg-gray-600" />{commentsPost.length !== 0 ? <span className="ml-2"> View {commentsPost.length} replies</span> : ""}</span>
        </div>
      </div>
    </>
  );
}
