import { useGetUserById } from "../../hooks/useGetUserById.jsx";
import Like from "../home/likeComponent/likeButton.jsx"
import dpfp from "../assets/dpfp.jpg"
import { useEffect } from "react";


export default function CommentComponent({ comment }) {
  const { avatarUrl, fullname } = useGetUserById(comment?.owner);
  useEffect(() => {
    console.log(comment);
  }, [])
  return (
    <>
      yohoooooroorrroro
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
          </span>

        </div>
        <div className="pt-4 pl-4 h-auto w-full wrap-break-word text-neutral-700 text-body font-medium text-left ">
          {comment?.content || ""}
        </div>
        <div className="flex justify-start gap-6 mt-4 ml-5">
          <span><Like fetchType={"comment"} commentId={comment?._id} /></span>
        </div>
      </div>
    </>
  );
}
