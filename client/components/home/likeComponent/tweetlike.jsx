import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);

  const handleLike = () => {
    if (liked) {
      setCount(count - 1);
    } else {
      setCount(count + 1);
    }
    setLiked(!liked);
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
      {liked ? `❤️ ${count}`: `🤍 ${count}`} 
    </button>
  );
}

export default LikeButton;
