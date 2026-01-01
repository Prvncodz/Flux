import {useGetUserAvatar} from "../../hooks/useGetUserAvatar.jsx";

export default function VideoComponent({video,idx}) {
      const {avatarUrl} = useGetUserAvatar(video.owner)
  
      return(
       <div key={idx}>
          <div>
            <img src={video.thumbnail.url} className=" w-full " alt=""/>
          </div>
          <div>
            <img src={avatarUrl || "../assets/dpfp.jpg"} className="rounded-full h-10 w-10" alt=""/>
          </div>
          <span>
              <h3>{video.title}</h3>
              <h3>3 days ago . 199k views</h3>
            </span>
       </div>
      );
}
