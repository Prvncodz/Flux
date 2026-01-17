import { useGetUserById } from "../../hooks/useGetUserById.jsx";
import Like from "../home/likeComponent/likeButton.jsx"
import dpfp from "../assets/dpfp.jpg"
import { useEffect, useState } from "react";
import axios from "../../api/axios.js";
import AddCommentsBox from "./AddCommentBox.jsx";
import ChatBubbleIcon from "../assets/chatIcon.jsx";
import { useNavigate } from "react-router-dom";



export default function CommentComponent({ comment, onlyContent, mainPost }) {
  const { avatarUrl, fullname } = useGetUserById(comment?.owner);
  const [showAddReplyBox, setShowAddReplyBox] = useState(false);
  const [commentsPost, setCommentPosts] = useState([{}]);
  const [areAnyComments, setAreAnyComments] = useState(false);
  const navigate = useNavigate();

  function HandleReplyToComment() {
    setShowAddReplyBox(true);
  }
  function handleShowPostPage() {
    navigate("/watch/post", {
      state: {
        post: comment,
        comments: commentsPost,
        postType: "comment"
      }
    })
  }

  useEffect(() => {
    async function getAllCommentPosts() {
      try {
        const res = await axios.get(`/comments/${comment?._id}/get-comment-comments`)
        if (res.status === 200) {
          setCommentPosts(res.data?.data);
          if (res.data.data.length !== 0) {
            setAreAnyComments(true);
          } else {
            setAreAnyComments(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllCommentPosts();
  }, [comment?._id])
  if (onlyContent) {
    return (
      <div className="flex p-3">
        <img src={avatarUrl || dpfp} className="rounded-full h-10 w-10" onError={(e => e.target.src = dpfp)} />
        <h1 className="text-neutral-700 text-lg font-normal text-left wrap ml-3 my-1 w-full">{comment?.content || ""}</h1>
      </div>
    );
  }
  return (
    <>
      <div className=" h-auto w-full  border-b border-gray-200 mt-0 mb-0 p-1">
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
          </span>

        </div>
        <div className="pt-4 pl-4 h-auto w-full wrap-break-word text-neutral-700 text-body font-medium text-left wrap">
          {comment?.content || ""}
        </div>
        <div className="flex justify-start gap-6 mt-4 ml-5 mb-2">
          <span><Like fetchType={"comment"} Id={comment._id} /></span>
          <span className="flex text-sm text-black cursor-pointer " onClick={HandleReplyToComment}>reply</span>
          <span onClick={handleShowPostPage} className="flex text-sm text-black cursor-pointer "><ChatBubbleIcon size={26} className="bg-gray-600" />{!areAnyComments || mainPost ? "" : <span className="ml-2"> View {commentsPost.length} replies</span>}</span>
        </div>
      </div>

      {showAddReplyBox && <AddCommentsBox fetchType={"comment"} Id={comment?._id} setShowAddReplyBox={setShowAddReplyBox} />}
    </>
  );
}
