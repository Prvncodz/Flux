import logo from "../assets/logo.png";
import profileIcon from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import axios from "../../api/axios.js";
import { TabContext } from "../../contexts/TabContext.js";
export default function Nav({ user, isLogged }) {
  const navigate = new useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [notLoggedOut, setNotLoggedOut] = useState(true);
  const {setIsHomeSelected}=useContext(TabContext);

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
    <nav className="h-13 flex flex-col justify-between items-center bg-gray-50 w-full">
      <div className="flex-row ">
      <div className=" ml-5">
        <img src={logo} className="h-8 w-full" loading="lazy" />
      </div>
      {isLogged && notLoggedOut ? (
        <>
          <div
            className="m-2 w-12 h-9 flex justify-center relative items-center"
            onClick={() => {
              isActive ? setIsActive(false) : setIsActive(true);
            }}
          >
            <img
              src={user?.avatar?.url}
              className="h-10 w-10 rounded-full"
              loading="lazy"
            />
          </div>
          {isActive && (
            <>
              <div className="absolute top-15 right-3 bg-gray-50  border border-gray-200 h-auto w-50 rounded-xl flex flex-col overflow-hidden">
                <div className="p-3 h-auto">
                  <div className=" relative flex justify-left items-center w-full mb-3">
                    <img
                      src={user?.avatar?.url}
                      className="h-11 w-11 rounded-full relative mr-3 ml-2 left-0"
                      loading="lazy"
                    />
                    <span>
                      <div className=" font-normal text-lg text-gray-700 w-auto text-left">
                        {user?.fullName}
                      </div>
                      <div className="text-gray-600 font-normal text-lg  w-auto -mt-1 text-left">
                        {"@" + user?.userName}
                      </div>
                    </span>
                  </div>

                  <a
                    href="#"
                    className="text-lg font-normal  text-blue-600 text-left "
                  >View your channel </a>
                </div>

                <hr className="h-0.07  bg-gray-300" />

                <div className="p-3">
                  <div onClick={handleSignout} className=" flex justify-center">
                    <svg
                      className=" h-6 w-5 "
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M8.90002 7.55999C9.21002 3.95999 11.06 2.48999 15.11 2.48999H15.24C19.71 2.48999 21.5 4.27999 21.5 8.74999V15.27C21.5 19.74 19.71 21.53 15.24 21.53H15.11C11.09 21.53 9.24002 20.08 8.91002 16.54"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 12H3.62"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5.85 8.64999L2.5 12L5.85 15.35"
                        stroke="#171717"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="ml-2 text-medium font-medium">
                      Sign Out
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
      <div className="flex-row">
        <span className="text-xl text-gray-800 font-semibold ">Home</span>
        <span className="text-xl text-gray-800 font-semibold ">Posts</span>
      </div>
    </nav>
  );
}
