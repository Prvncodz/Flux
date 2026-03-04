import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "../../api/axios.js";
import TabContext from "../../contexts/TabContext.jsx";
import UserContext from "../../contexts/UserContext.jsx";
import dpfp from "../assets/dpfp.jpg";
import SignoutIcon from "../assets/signoutIcon.jsx";
import VideoUploadPopup from "../uploadPopup/videoUpload.jsx";
import PostUploadPopup from "../uploadPopup/postUpload.jsx";
import CreateComponent from "./Upload_CreateComponent.jsx";
import Menu from "./menu/menu.jsx";

export default function Nav({ wantTabs }) {
  const navigate = new useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [notLoggedOut, setNotLoggedOut] = useState(true);
  const { isHomeSelected, setIsHomeSelected } = useContext(TabContext) || {};
  const { user, isUserLogged } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("Jhon Doe");
  const [username, setUsername] = useState("jdoejr");
  const [isCrtBtnActive, setIsCrtBtnActive] = useState(false);
  const [popupType, setPopupType] = useState("video");
  const [showPopup, setShowPopup] = useState(false);

  const popup = {
    "video": <VideoUploadPopup setShowPopup={setShowPopup} />,
    "post": <PostUploadPopup setShowPopup={setShowPopup} />,
  }

  useEffect(() => {
    if (isUserLogged) {
      setFullname(user?.fullName);
      setUsername(user?.userName);
      setAvatar(user?.avatar?.url);
    } else {
      return
    }
  }, [user, user?.fullName, user?.userName, user?.avatar?.url]);

  async function handleSignout() {
    try {
      const res = await axios.post("/user/logout");

      if (res.status == 200) {
        setIsActive(false);
        setNotLoggedOut(false);
      }
    } catch (error) {
      console.log(error);
      setIsActive(false);
    }
  }

  function handleUpload(fetchtype) {
    setIsCrtBtnActive(false);
    setShowPopup(true);
    if (fetchtype === "video") {
      setPopupType("video")
    } else {
      setPopupType("post");
    }
  }


  return (
    <nav className="h-auto w-full ring-b shadow-sm pb-1.5 transition-all">
      <div className="flex flex-row w-full justify-between items-center p-1">
        <Menu />
        <div className="mx-2">{/*logo*/}
          <img src={logo} className="h-8 w-auto" loading="lazy" onClick={() => navigate("/")} />
        </div>
        <div className="w-45 h-9 rounded-2xl bg-gray-500 ">

        </div>
        <div className="relative">
          <button onClick={() => setIsCrtBtnActive(prev => !prev)}
            className="w-10 h-10 mx-2 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center shadow-sm shadow-blue-200 text-white"
            title="Create post"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2.6" viewBox="0 0 24 24" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          {isCrtBtnActive &&
            <CreateComponent handleUpload={handleUpload} />
          }
        </div>
        {
          showPopup && popup[popupType] /*if show popup is true show the popup with popupType which is defined when one of the options to create is clicked*/
        }
        {isUserLogged && notLoggedOut /*if user is logged in do this else show empty profileIcon*/
          ? (
            <>
              <div
                className="m-2 w-12 h-9 flex justify-center relative items-center active:scale-95"
                onClick={() => {
                  isActive ? setIsActive(false) : setIsActive(true);
                }}
              >
                <img
                  src={avatar || dpfp}
                  onError={(e) => e.target.src = dpfp}
                  className="h-10 w-10 rounded-full shadow-sm"
                  loading="lazy"
                />
              </div>
              {isActive && (
                <>
                  <div className="absolute z-10 top-15 right-3 bg-gray-50  border border-gray-200 h-auto w-55 rounded flex flex-col overflow-hidden">
                    <div className="p-3 h-auto">
                      <div className=" relative flex justify-left items-center w-full mb-2">
                        <img
                          src={avatar || dpfp}
                          onError={(e) => e.target.src = dpfp}
                          className="h-11 w-11 rounded-full relative mr-3 ml-2 left-0"
                          loading="lazy"
                        />
                        <span>
                          <div className=" font-normal text-lg text-gray-700 w-auto text-left">
                            {fullname}
                          </div>
                          <div className="text-gray-600 font-normal text-lg  w-auto -mt-1 text-left">
                            {"@" + username}
                          </div>
                        </span>
                      </div>

                      <a
                        href="/userchannel"
                        className="text-lg font-normal  text-blue-600 text-left "
                      >View your channel </a>
                    </div>

                    <hr className="h-0.07  bg-gray-200" />

                    <div className="p-2.5">
                      <div onClick={handleSignout} className=" flex justify-center">
                        <SignoutIcon />
                        <span className="ml-2 text-medium font-medium flex">
                          SignOut
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <div
                className="m-2 w-auto h-9 flex justify-center items-center rounded-3xl border-2 border-gray-200 pt-5 pb-5 pl-2 pr-2 cursor-pointer"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <img src={profileIcon} className="h-9 rounded-full" />
                <span className="text-l pl-1 font-medium">Sign in</span>
              </div>
            </>
          )}
      </div>
      {wantTabs &&
        <div className="flex flex-row w-full mt-6">
          <span className={`text-xl relative mt-3.5 font-semibold w-50 cursor-pointer ${isHomeSelected ? `text-blue-700` : `text-gray-800 `}`} onClick={() => setIsHomeSelected(true)}>Home<div className={`absolute -bottom-2 w-full h-1 ${isHomeSelected ? `bg-blue-800` : ``}`}></div></span>
          <span className={`text-xl relative mt-3.5 font-semibold w-50 cursor-pointer ${isHomeSelected ? `text-gray-800` : `text-blue-700 `}`} onClick={() => setIsHomeSelected(false)}>Posts<div className={`absolute -bottom-2 w-full h-1 ${isHomeSelected ? `` : `bg-blue-800`}`}></div></span>

        </div>
      }
    </nav>
  );
}
