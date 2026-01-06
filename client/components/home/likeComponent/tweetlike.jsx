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
        padding: "10px 16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        backgroundColor: liked ? "#ff4d4d" : "#e0e0e0",
        color: liked ? "white" : "black",
        fontSize: "16px",
      }}
    >
      {liked ? "❤️ Liked" : "🤍"} ({count}) 
    </button>
  );
}

export default LikeButton;
