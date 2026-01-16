import { useState, useEffect } from "react";
import axios from "../../api/axios.js";
import CommentComponent from "./commentComponent.jsx";

export default function CommentFeed({ fetchType, Id }) {
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
      <div className="flex h-100 w-full justify-center items-center text-base font-medium ">
        No Comments has been published on this yet
      </div>
    );
  }
  return (
    <>
      <div className="h-screen overflow-y-auto overflow-x-hidden mt-5 flex flex-col ">
        {areCommentsFetched &&
          comments.map((comment, idx) => (
            <CommentComponent key={idx} comment={comment} />
          ))}
      </div>
    </>
  );
}
