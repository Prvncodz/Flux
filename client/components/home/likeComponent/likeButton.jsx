import { useState, useEffect } from "react";
import axios from "../../../api/axios.js";

function LikeButton({ tweetId }) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function getVideoLikeCount(Id) {
      try {
        const res = await axios.get(`/likes/${Id}`);
        if (res.status == 200) {
          setCount(res.data.data);
        }
      } catch (err) {
        console.log(`Error while fetching tweet likes with id ${tweetId} `, err);
      }
    }
    getLikeCount(tweetId)
  }, [])

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
      {liked ? `❤️ ${count ? count : ""}` : `🤍 ${count ? count : ""}`}
    </button>
  );
}

export default LikeButton;
