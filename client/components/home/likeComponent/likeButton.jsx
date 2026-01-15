import { useState, useEffect } from "react";
import axios from "../../../api/axios.js";

function LikeButton({ fetchType, Id }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function getVideoLikeCount(videoId) {
      try {
        const res = await axios.get(`/likes/v/${videoId}`);
        if (res.status == 200) {
          setCount(res.data.data);
        }
      } catch (err) {
        console.log(`Error while fetching video likes with id ${videoId} `, err);
      }
    }
    async function getTweetLikeCount(tweetId) {
      try {
        const res = await axios.get(`/likes/t/${tweetId}`);
        if (res.status == 200) {
          setCount(res.data.data);
        }
      } catch (err) {
        console.log(`Error while fetching tweet likes with id ${tweetId} `, err);
      }
    }
    async function getCommentLikeCount(commentId) {
      try {
        const res = await axios.get(`/likes/c/${commentId}`);
        if (res.status == 200) {
          setCount(res.data.data);
        }
      } catch (err) {
        console.log(`Error while fetching comment likes with id ${commentId} `, err);
      }
    }
    if (fetchType === "video") {
      getVideoLikeCount(Id);
    }
    else if (fetchType === "comment") {
      getCommentLikeCount(Id);
    }
    else {
      getTweetLikeCount(Id);
    }
  }, [fetchType, Id]);

  let timeoutId;
  const handleLike = () => {
    clearTimeout(timeoutId);
    if (liked) {
      setCount(count - 1);

    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
    timeoutId = setTimeout(async () => {
      try {
        const res = await axios.post(`/likes/toggle/t/${tweetId}`);
        if (res.status == 200) {
          console.log(res.data)
        }
      } catch (err) {
        console.log(`Error while toggling tweet likes with id ${tweetId}`, err);
      }

    }, 800);
  };

  return (
    <button
      onClick={handleLike}
      style={{
        cursor: "pointer",
        color: "black",
        fontSize: "14px",
      }}
    >
      {liked ? `❤️ ${count}` : `🤍 ${count}`}
    </button>
  );
}

export default LikeButton;
