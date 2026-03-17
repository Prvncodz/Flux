import { useLocation } from "react-router-dom";
import Nav from "../home/nav.jsx";
import TweetComponent from "../home/tweetfeed/tweet.jsx";
import AddCommentsBox from "../commentFeed/AddCommentBox.jsx";
import CommentComponent from "../commentFeed/commentComponent.jsx";

export default function WatchPostPage() {
  const location = useLocation();
  const { post, comments, postType } = location.state || {};
  return (
    <div>
      {postType === "comment" ? ( //if posttype is comment we will show a main comment commentComponent comment box and its comments else we will show main tweet and comment box for tweet and its comments
        <>
          <Nav wantTabs={false} />
          <CommentComponent comment={post} mainPost={true} />
          <AddCommentsBox fetchType={"comment"} Id={post?._id} />
          <div className="h-screen overflow-y-auto overflow-x-hidden mt-5 flex flex-col border-t border-gray-300">
            {comments.length !== 0 &&
              comments.map((comment, idx) => (
                <CommentComponent key={idx} comment={comment} />
              ))}
          </div>
        </>
      ) : (
        <>
          <Nav wantTabs={false} />
          <TweetComponent tweet={post} mainPost={true} />
          <AddCommentsBox fetchType={"tweet"} Id={post?._id} />
          <div className="h-screen overflow-y-auto overflow-x-hidden mt-5 flex flex-col border-t border-gray-300">
            {comments.length !== 0 &&
              comments.map((comment, idx) => (
                <CommentComponent key={idx} comment={comment} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
