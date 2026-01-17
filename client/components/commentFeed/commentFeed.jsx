import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import CommentComponent from "./commentComponent.jsx";
import AddCommentsBox from "./AddCommentBox.jsx";
import CrossIcon from "../assets/crossIcon.jsx";

export default function CommentFeed({ fetchType, Id, isOpen, setIsOpen }) {
  const [comments, setComments] = useState([{}]);
  const [areCommentsFetched, SetAreCommentsFetched] = useState(false);
  useEffect(() => {
    if (!Id) return;
    async function fetchAllCommentsOnVideo(id) {
      if (!id) return;
      try {
        await axios.get(`/comments/${id}/get-video-comments`)
          .then((res) => {
            setComments(res.data?.data);
            SetAreCommentsFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllCommentsOnTweet(id) {
      if (!id) return;
      try {
        await axios.get(`/comments/${id}/get-tweet-comments`)
          .then((res) => {
            setComments(res.data?.data);
            SetAreCommentsFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchAllCommentsOnComment(id) {
      if (!id) return;
      try {
        await axios.get(`/comments/${id}/get-comment-comments`)
          .then((res) => {
            setComments(res.data?.data);
            SetAreCommentsFetched(true);
          });
      } catch (error) {
        console.log(error);
      }
    }

    if (fetchType === "tweet") {
      fetchAllCommentsOnTweet(Id);
    } else if (fetchType === "comment") {
      fetchAllCommentsOnComment(Id);
    } else {
      fetchAllCommentsOnVideo(Id);
    }
  }, [fetchType, Id]);

  return (
    <>
      <div className="my-2 h-auto overflow-auto p-3 flex flex-col  rounded-2xl bg-gray-100 mx-2 ease-in-out relative z-0" onClick={() => !isOpen && setIsOpen(true)}>
        <h1 className="text-gray-900 text-left text-lg text-medium">{areCommentsFetched && comments.length} Comments</h1>
        {areCommentsFetched && isOpen ?
          (
            <div>
              <CrossIcon size={26} color={"#000000"} className={"absolute top-4 right-4 z-1"} onClick={() => isOpen && setIsOpen(false)} />
              <AddCommentsBox Id={Id} fetchType={fetchType} className={"mb-8"} />
              {comments.map((comment, idx) => (
                <CommentComponent key={idx} comment={comment} />
              ))}
            </div>
          ) : (
            areCommentsFetched && comments.length !== 0 ?
              <CommentComponent comment={comments[0]} onlyContent={true} /> :
              <div className="my-3 h-20 flex p-3 rounded-2xl bg-gray-100 mx-2" onClick={() => !isOpen && setIsOpen(true)}>
                No comments on this content yet
              </div>
          )}
      </div>
    </>
  );
}
