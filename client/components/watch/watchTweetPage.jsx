import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";
import TweetComponent from "../home/tweetfeed/tweet.jsx";
import AddCommentsBox from "../commentFeed/AddCommentBox.jsx";
import CommentFeed from "../commentFeed/commentFeed.jsx";

export default function WatchTweetPage() {
  const location = useLocation();
  const { tweet, comments } = location.state || {};
  console.log(tweet)
  return (
    <div>
      <Nav wantTabs={false} />
      <TweetComponent tweet={tweet} />
      <AddCommentsBox fetchType={"tweet"} Id={tweet?._id} />
      <CommentFeed fetchType={"tweet"} Id={tweet?._id} />
    </div>
  );
}
