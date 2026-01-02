import { useGetUserAvatar } from "../../../hooks/useGetUserAvatar.jsx";

export default function VideoComponent({ video, idx }) {
  const { avatarUrl } = useGetUserAvatar(video.owner);

  return (
    <div className="mb-3">
      <div>
        <img src={video.thumbnail.url} className=" w-full " />
      </div>
      <div className="flex mt-3">
         <div className="h-10 w-10">
        <img
          src={avatarUrl || "../assets/dpfp.jpg"}
          className="rounded-full h-10 w-10" 
        />
      </div>
      <span className="ml-4">
        <h3 className="text-left text-neutral-700 font-medium text-sm">{video.title}</h3>
        <h3 className="text-left text-neutral-600 font-medium text-xs">3 days ago . 199k views</h3>
      </span>

      </div>
    </div>
  );
}
