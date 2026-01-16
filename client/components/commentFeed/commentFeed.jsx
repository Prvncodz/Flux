import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import CommentComponent from "./commentComponent.jsx";
import dpfp from "../assets/dpfp.jpg";
import { useGetUserById } from "../../hooks/useGetUserById.jsx";
import AddCommentsBox from "./AddCommentBox.jsx";

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

  if (areCommentsFetched && comments.length === 0) {
    return (
      <div className="my-3 h-20 flex p-3 rounded-2xl bg-gray-200 mx-2">
        No comments on this content yet
      </div>
    );
  }
  return (
    <>
      <div className="my-2 h-auto overflow-auto flex flex-col p-3 rounded-2xl bg-gray-200 mx-2 ease-in-out" onClick={() => !isOpen && setIsOpen(true)}>
        <h1 className="text-gray-900 text-left text-lg text-medium">Comments {areCommentsFetched && comments.length}</h1>
        {areCommentsFetched && isOpen ?

          (
            <div>
              <AddCommentsBox Id={Id} fetchType={fetchType} />
              {comments.map((comment, idx) => (
                <CommentComponent key={idx} comment={comment} />
              ))}
            </div>
          ) : (
            areCommentsFetched && <CommentComponent comment={comments[0]} onlyContent={true} />
          )}
      </div>
    </>
  );
}
