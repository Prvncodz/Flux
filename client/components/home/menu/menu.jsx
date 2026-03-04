import { useState } from "react";
import HomeIcon from "../../assets/homeIcon.jsx"
import MenuBtn from "../../assets/menubtn.jsx";
import CancelIconComponent from "../../userProfile/cancelIconComponent.jsx";
import LikeIcon from "../../assets/LikedVideosIcon.jsx";
import DashboardIcon from "../../assets/dashboardIcon.jsx";
import HistoryIcon from "../../assets/historyIcon.jsx";
import PostIcon from "../../assets/PostIcon.jsx";
import SignoutIcon from "../../assets/signoutIcon.jsx";

function Menu({ handleSignout }) {
  const [isMenuOpen, setIsMenuOPen] = useState(false);

  function MenuBar({ onClick }) {
    return (
      <>
        <div className="absolute top-0 left-0 bg-neutral-300 opacity-85 z-22 h-screen w-screen overflow-hidden"></div>
        <menu className="absolute h-screen overflow-hidden w-[30vh] bg-neutral-200 ring left-0 top-0 z-23 transition-all text-left flex flex-col justify-between">
          <CancelIconComponent onClick={() => setIsMenuOPen(false)} />
          <ul className=" flex flex-col justify-left items-center gap-4 w-full h-100 mt-25 p-2">
            <li className="h-auto w-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center"><span className="mx-2 "><HomeIcon size={18} className="" /></span><span className="text-[18px] font-medium">Home</span></li>
            <li className="h-auto w-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center"><span className="mx-2"><DashboardIcon size={18} className="" /></span><span className="text-[18px] font-medium">Dashboard</span></li>
            <li className="h-auto w-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center"><span className="mx-2"><LikeIcon size={18} className="" /></span><span className="text-[18px] font-medium">Liked videos</span></li>
            <li className="h-auto w-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center"><span className="mx-2"><HistoryIcon size={18} className="" /></span><span className="text-[18px] font-medium">Watch history</span></li>
            <li className="h-auto w-full bg-neutral-200 hover:bg-neutral-300 cursor-pointer text-gray-800 flex items-center"><span className="mx-2"><PostIcon size={18} className="" /></span><span className="text-[18px] font-medium">Posts</span></li>
          </ul>

          <button onClick={onClick} className="bg-blue-500 hover:bg-blue-600 focus:outline-offset-2 active:bg-blue-800  text-gray-100 p-5 w-38 h-11 ml-auto mr-auto flex justify-center items-center rounded-full font-semibold text-center text-md transition-bg ease cursor-pointer my-10">
            <SignoutIcon />
            <span className="ml-2 text-medium font-medium">
              Logout
            </span>
          </button>
        </menu>
      </>
    );
  }
  function handleToggleMenu() {
    setTimeout(() => {
      setIsMenuOPen(prev => !prev);
    }, 100)
  }
  if (!isMenuOpen) return (
    <div className="flex justify-center items-center ml-2 mt-2">
      <button type="button" className="border-none active:scale-95 transistion-all" onClick={handleToggleMenu}><MenuBtn size={35} /></button>
    </div>
  )
  if (isMenuOpen) return (
    <MenuBar onClick={handleSignout} />
  )
}

export default Menu;
