import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "../../api/axios.js";
import TabContext from "../../contexts/TabContext.jsx";
import UserContext from "../../contexts/UserContext.jsx";
import dpfp from "../assets/dpfp.jpg";
import SignoutIcon from "../assets/signoutIcon.jsx";

export default function Nav({ wantTabs }) {
  const navigate = new useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [notLoggedOut, setNotLoggedOut] = useState(true);
  const { isHomeSelected, setIsHomeSelected } = useContext(TabContext) || {};
  const { user, isUserLogged } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [fullname, setFullname] = useState("Jhon Doe");
  const [username, setUsername] = useState("jdoejr");

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


  return (
    <nav className="h-auto w-full ring-b shadow-sm pb-1.5">
      <div className="flex flex-row w-full justify-between items-center p-1">
        <div className="ml-5">
          <img src={logo} className="h-8 w-auto" loading="lazy" onClick={() => navigate("/")} />
        </div>
        {isUserLogged && notLoggedOut ? (
          <>
            <div
              className="m-2 w-12 h-9 flex justify-center relative items-center"
              onClick={() => {
                isActive ? setIsActive(false) : setIsActive(true);
              }}
            >
              <img
                src={avatar || dpfp}
                onError={(e) => e.target.src = dpfp}
                className="h-10 w-10 rounded-full"
                loading="lazy"
              />
            </div>
            {isActive && (
              <>
                <div className="absolute z-10 top-15 right-3 bg-gray-50  border border-gray-200 h-auto w-55 rounded-sm flex flex-col overflow-hidden">
                  <div className="p-3 h-auto">
                    <div className=" relative flex justify-left items-center w-full mb-3">
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

                  <hr className="h-0.07  bg-gray-300" />

                  <div className="p-3">
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
