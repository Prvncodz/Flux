import { useContext, useEffect, useState } from "react";
import MenuBtn from "../../assets/menubtn.jsx";
import CancelIconComponent from "../../userProfile/cancelIconComponent.jsx";
import SignoutIcon from "../../assets/signoutIcon.jsx";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext.jsx";
import { History, Home, LayoutDashboard, LayoutList, ThumbsUp } from "lucide-react";

function MenuBar({ setIsMenuOPen, onSignout, isUserLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation])
  function handleNavigation(dest) {
    if (!dest) return;
    setIsMenuOPen(prev => !prev);
    if (dest === "home" || dest === "posts") {
      navigate("/", {
        state: {
          tab: dest
        }
      })
    } else if (dest === "dashboard") {
      navigate("/dashboard")
    } else if (dest === "watchhistory") {
      navigate("/watch-history")
    } else if (dest === "likedvideos") {
      navigate("/liked-videos")
    }
  }
  return (
    <>
      <div className="absolute top-0 left-0 bg-neutral-100 opacity-85 z-22 h-screen w-screen overflow-hidden"></div>
      <menu className="absolute h-screen overflow-hidden w-[30vh] bg-neutral-100 left-0 top-0 z-23 transition-all text-left flex flex-col justify-between">
        <CancelIconComponent onClick={() => setIsMenuOPen(prev => !prev)} />
        <ul className=" flex flex-col justify-left items-center gap-3 w-full h-100 mt-30 p-4">
          <li className="h-auto w-full bg-neutral-100 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center" onClick={() => handleNavigation("home")}><span className="mx-2 "><Home size={18} className="" /></span><span className="text-[18px] font-medium">Home</span></li>
          {isUserLogged &&
            <>
              <li className="h-auto w-full bg-neutral-100 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center" onClick={() => handleNavigation("dashboard")}><span className="mx-2"><LayoutDashboard size={18} className="" /></span><span className="text-[18px] font-medium">Dashboard</span></li>

              <li className="h-auto w-full bg-neutral-100 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center" onClick={() => handleNavigation("likedvideos")}><span className="mx-2"><ThumbsUp size={18} className="" /></span><span className="text-[18px] font-medium">Liked videos</span></li>
              <li className="h-auto w-full bg-neutral-100 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center" onClick={() => handleNavigation("watchhistory")}><span className="mx-2"><History size={18} className="" /></span><span className="text-[18px] font-medium">Watch history</span></li>
            </>
          }
          <li className="h-auto w-full bg-neutral-100 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center" onClick={() => handleNavigation("posts")}><span className="mx-2"><LayoutList size={18} className="" /></span><span className="text-[18px] font-medium">Posts</span></li>
        </ul>

        <button onClick={onSignout} className="bg-blue-500 hover:bg-blue-600 focus:outline-offset-2 active:bg-blue-800  text-gray-100 p-5 w-38 h-11 ml-auto mr-auto flex justify-center items-center rounded-full font-semibold text-center text-md transition-bg ease cursor-pointer mb-20">
          <SignoutIcon />
          <span className="ml-2 text-medium font-medium">
            Logout
          </span>
        </button>
      </menu>
    </>
  );
}

export default function Menu({ handleSignout }) {
  const [isMenuOpen, setIsMenuOPen] = useState(false);
  const { isUserLogged } = useContext(UserContext);
  function handleToggleMenu() {
    setIsMenuOPen(prev => !prev)
  }
  if (!isMenuOpen) return (
    <div className="flex justify-center items-center ml-2 mt-2 cursor-pointer md:mx-4">
      <button type="button" className="border-none active:scale-95 transistion-all cursor-pointer" onClick={handleToggleMenu}><MenuBtn size={35} /></button>
    </div>
  )
  if (isMenuOpen) return (
    <MenuBar setIsMenuOPen={setIsMenuOPen} onSignout={handleSignout} isUserLogged={isUserLogged} />
  )
}


