import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";


export default function WatchVideoPage() {
  const location = useLocation();
  const { video } = location.state || {};
  return (
    <>
      <Nav wantTabs={false} />
      <div className="">
        <video width="640" height="360" controls>
          <source src={video?.videofile?.url} type="video/mp4" />
          <source src={video?.videofile?.url} type="video/webm" />
        </video>
      </div>

    </>
  );
}
