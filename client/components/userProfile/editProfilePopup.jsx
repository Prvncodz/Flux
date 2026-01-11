import defaultPfp from "../assets/dpfp.jpg";
import defaultBanner from "../assets/dbanner.jpg";
import editIcon from "../assets/editimage.png";
import { useState, useRef ,useContext} from "react";
import SubmitButton from "../submitButton.jsx";
import axios from "../../api/axios.js";
import UserContext from "../../contexts/UserContext.jsx";

export default function editProfilePopup() {

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [DisplayAvatarRequired, setDisplayAvatarRequired] = useState(false);
  const fileRefci = useRef(null);
  const fileRefav = useRef(null);
  const {user}=useContext(UserContext);
  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState(false);
  const [isSubmmited, setIsSubmmited] = useState(false);

  async function handleFormSubmission(e) {
    SetLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const avatar = formData.get("avatar");
    if (!avatar || avatar.size == 0) {
      setDisplayAvatarRequired(true);
      return;
    }
    try {
      const res = await axios.patch("/user/update-user-info", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      SetError(true);
      console.log(`Error name: ${error.name}`);
      console.log(`Backend message: ${error.response?.data?.message}`);

      e.target.reset();
    } finally {
      SetError(false);
      SetLoading(false);
    }
    setCoverImagePreview(null);
    setAvatarPreview(null);
    e.target.reset();
    setTimeout(() => {
      setIsSubmmited(false);
    }, 2000);
  }

  function handleCoverImage(e) {
    const file = e.target.files[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    }
  }

  function handleAvatar(e) {
    const file = e.target.files[0];
    if (file) {
      setDisplayAvatarRequired(false);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  return (
    <div
      className="h-full w-full flex flex-col justify-center
      items-center bg-none top-0 z-20 absolute"
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full blur-xs opacity-90  z-21 bg-gray-300">
      </div>
      <div
        className="h-auto w-87 bg-gray-100 flex flex-col
        justify-center overflow-hidden rounded-lg absolute z-22"
      >
        <h1 className="mt-5 text-xl font-medium text-blue-400 relative">
          Update Profile
        </h1>

        <form className="p-7" onSubmit={handleFormSubmission}>
          <div className="wrapper relative transition-all ease">
            <div className="relative z-1">
              <img
                src={coverImagePreview ? coverImagePreview : user.coverImage? user.coverImage.url: defaultBanner}
                onClick={() => {
                  fileRefci.current.click();
                }}
                onError={(e)=>e.target.src=dbanner}
                className="h-33
                w-full rounded-lg relative cursor-pointer"
                loading="lazy"
              />

              <div
                onClick={() => {
                  fileRefci.current.click();
                }}
              >
                <div
                  className="absolute z-2 bg-black/50 h-33 w-full rounded-lg
                  cursor-pointer top-0 "
                ></div>
                <img
                  src={editIcon}
                  className="absolute h-15 w-15 z-3 -top-2 right-0 cursor-pointer"
                  loading="lazy"
                />
              </div>
              <input
                type="file"
                ref={fileRefci}
                className="hidden"
                name="coverImage"
                accept="image/*"
                onChange={handleCoverImage}
              />
            </div>

            <div className="relative">
              <img
                src={avatarPreview ? avatarPreview : user.avatar? user.avatar.url :defaultPfp}
                onError={(e)=>e.target.src=dbanner}
                onClick={() => {
                  fileRefav.current.click();
                }}
                className="h-15
                w-15 rounded-full absolute -left-1 -bottom-3 cursor-pointer
                z-1"
              />
              <div
                onClick={() => {
                  fileRefav.current.click();
                }}
              >
                
                <img
                  src={editIcon}
                  className="absolute h-12 w-13 -bottom-1 left-0 z-3 cursor-pointer"
                />
              </div>

              <input
                type="file"
                ref={fileRefav}
                className="hidden"
                name="avatar"
                accept="image/*"
                onChange={handleAvatar}
              />
            </div>
          </div>

          <div
            className="form-inputs mt-10 mb-5  h-auto w-full relative
            text-left"
          >
            <label className="text-md font-medium text-gray-700">
              Fullname
              <input
                name="fullName"
                type="text"
                className="bg-gray-100
                w-full  mt-1 mb-4 rounded-md p-1 border border-gray-200 shadow-xs"
                value={user.fullName?user.fullName : ""}
                onError={(e)=>e.target.value=""}
              />
            </label>
            <label className="text-md font-medium text-gray-700">
              Username
              <input
                name="userName"
                type="text"
                className="bg-gray-100 w-full  mb-4 rounded-md p-1 border
                border-gray-200 shadow-xs mt-1"
                value={user.userName?user.userName : ""}
                onError={(e)=>e.target.value=""}
              />
            </label>
            <label className="text-md font-medium text-gray-700">
              Email
              <input
                name="email"
                type="email"
                className="bg-gray-100 w-full mb-4 rounded-md p-1 border border-gray-200
                shadow-xs mt-1"
                value={user.email?user.email: ""}
                onError={(e)=>e.target.value=""}

              />
            </label>
          </div>
          <SubmitButton
            currentSubmitStatus={
              isSubmmited ? "submited" : loading ? "loading" : "normal"
            }
          />
        </form>
      </div>
    </div>
  );
}
