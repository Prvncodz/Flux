import { useGetUserAvatar } from "../../../hooks/useGetUserAvatar.jsx";

export default function VideoComponent({ tweet, idx }) {
  const { avatarUrl } = useGetUserAvatar(tweet.owner);

  return (
    <div>
        tweetssssss
      </div>
    </div>
  );
}
