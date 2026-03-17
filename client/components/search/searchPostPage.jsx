import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TweetFeed from "../home/tweetfeed/tweetFeed.jsx";

const SearchPostPage = () => {
  const location = useLocation();
  const { searchQuery } = location.state || {};
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState(searchQuery || "");

  useEffect(() => {}, []);
  function handleSearchPosts() {
    navigate("/search/posts", {
      state: {
        searchQuery: searchInput,
      },
    });
  }
  return (
    <div>
      <div className="h-screen w-full overflow-auto">
        <div className="h-auto w-full transition-all flex gap-5 items-center sticky">
          <button
            onClick={() => navigate("/", { state: { tab: "posts" } })}
            className="flex flex-start ml-5"
          >
            <ArrowLeft />
          </button>
          <div className="w-80 h-10 rounded-full border border-gray-200 my-2 flex">
            <input
              type="text"
              name="query"
              placeholder="Search on flux"
              className="h-full w-full placeholder:text-gray-500 text-gray-700 pl-9 pr-5 flex flex-start focus:outline-none"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  handleSearchPosts();
                }
              }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div
              className="h-10 w-18 rounded-4xl bg-gray-100 flex items-center justify-center flex-end"
              onClick={() => handleSearchPosts()}
            >
              <Search size={20} />
            </div>
          </div>
        </div>
        <TweetFeed fetchType={"search"} searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default SearchPostPage;
