import { useGetUser } from "../../../hooks/useGetUser.jsx";

export default function VideoComponent({ tweet, idx }) {
  const { avatarUrl,fullname,username } = useGetUser(tweet.owner);

  return (
    <>
      <div className=" h-auto w-full p-3 border-b border-gray-300 mt-0 mb-0 ">
        <div className="flex mt-3">
          <div className="h-10 w-10 ml-4">
            <img
              src={avatarUrl || "../assets/dpfp.jpg"}
              className="rounded-full h-10 w-10" 
            />
          </div>
          <span className="ml-4 h-7">
            <h3 className="text-left text-neutral-700 font-medium text-lg">{fullname}</h3>
            <h3 className="text-left text-neutral-600 font-medium text-xs mt-0">{"@"+username}</h3>
          </span>

        </div>
        <div className="pt-4 pl-4 h-auto w-full wrap-break-word text-neutral-700 text-lg font-medium text-left ">
          {tweet.content}
        </div>
      </div>
    </>
);
}
