import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";
import TweetComponent from "../home/tweetfeed/tweet.jsx";
import AddCommentsBox from "../commentFeed/AddCommentBox.jsx";

export default function WatchTweetPage() {
  const location = useLocation();
  const { tweet, comments } = location.state || {};
  return (
    <div>
      <Nav wantTabs={false} />
      <TweetComponent tweet={tweet} />
      <AddCommentsBox fetchType={"tweet"} Id={tweet?._id} />
      <div className="h-screen overflow-y-auto overflow-x-hidden mt-5 flex flex-col border-t border-gray-300">
        {comments.length !== 0 &&
          comments.map((tweet, idx) => (
            <TweetComponent key={idx} tweet={tweet} idx={idx} />
          ))}
      </div>

    </div>
  );
}
