import { useRef, useState } from "react";
import axios from "../../api/axios";
import PlusIcon from "../assets/plusIcon"

export default function AddCommentsBox({ Id, fetchType }) {
  const [content, setContent] = useState("");
  let addCommentRef = useRef(null);

  async function handleAddComment() {
    if (content === "" || !content) return;
    if (fetchType === "video") {
      try {
        const res = await axios.post(`/comments/v/${Id}/add-comment`, { content: content });
        if (res.status == 200) {
          setContent("");
        }

      } catch (err) {
        console.log("error occured while adding a new comment", err);
      }
    } else if (fetchType === "tweet") {
      try {
        const res = await axios.post(`/comments/t/${Id}/add-comment`, { content: content });
        if (res.status == 200) {
          setContent("");
        }

      } catch (err) {
        console.log("error occured while adding a new comment", err);
      }
    }
    else {
      try {
        const res = await axios.post(`/comments/c/${Id}/add-comment`, { content: content });
        if (res.status == 200) {
          setContent("");
        }

      } catch (err) {
        console.log("error occured while adding a new comment", err);
      }
    }
    setContent("");
  }
  return (
    <div className="w-full rounded-3xl bg-gray-300 h-14 my-4 relative">
      <input type="text" name="comment input" placeholder="Add a comment here" className="w-4/5 h-full rounded-3xl text-gray-600 relative z-0 focus:outline-none pr-4 wrap-anywhere" value={content} onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => {
        if (e.key === "Enter") {
          addCommentRef.current.click();
          setContent("");
        }
      }} />
      <button type="button" className="absolute rounded-full top-2 right-2 z-1" onClick={handleAddComment} ref={addCommentRef} ><PlusIcon size={40} color={"#000"} /></button>
    </div >
  );
}
