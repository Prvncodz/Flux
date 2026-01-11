import { useState, useRef ,useContext} from "react";
import SubmitButton from "../submitButton.jsx";
import axios from "../../api/axios.js";

export default function ChangePassPopup({setIsPassPopupActive}) {

  const [loading, SetLoading] = useState(false);
  const [error, SetError] = useState(false);
  const [isSubmmited, setIsSubmmited] = useState(false);

  async function handleFormSubmission(e) {
    SetLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
     for(let [k,v] of formData){
      console.log(k,v);
    }
      try {
        const res = await axios.post("/user/change-password",{
        "oldPassword":formData.get("oldPassword"),
        "newPassword":formData.get("newPassword")
      });
      } catch (error) {
        SetError(true);
        console.log(error);
        console.log(`Error name: ${error.name}`);
        console.log(`Backend message: ${error.response?.data?.message}`);
        e.target.reset();
      } finally {
        SetError(false);
        SetLoading(false);
      }

    setIsSubmmited(true);
    e.target.reset();
    setTimeout(() => {
      setIsSubmmited(false);
      setIsPassPopupActive(false)
    }, 1000);
  }

  return (
    <div
      className="h-full w-full flex flex-col justify-center
      items-center bg-none top-0 z-20 absolute"
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full blur-xs opacity-90  z-21 bg-gray-300"></div>
      <div className="text-gray-800 rotate-45 bg-neutral-50  rounded-full text-3xl h-10 w-10 absolute z-22 top-3 right-3" onClick={()=>setIsPassPopupActive(false)}>
        +
      </div>
      <div
        className="h-auto w-87 bg-gray-100 flex flex-col
        justify-center overflow-hidden rounded-lg absolute z-22"
      >
        <h1 className="mt-5 text-xl font-medium text-blue-400 relative">
          Change Password
        </h1>

        <form className="p-7" onSubmit={handleFormSubmission}>
          <div
            className="form-inputs mt-10 mb-5  h-auto w-full relative
            text-left"
          >
            <label className="text-md font-medium text-gray-700">
              Old Password
              <input
                name="oldPassword"
                type="text"
                className="bg-gray-100
                w-full  mt-1 mb-4 rounded-md p-1 border border-gray-200 shadow-xs"
              />
            </label>

            <label className="text-md font-medium text-gray-700">
              New Password
              <input
                name="newPassword"
                type="text"
                className="bg-gray-100
                w-full  mt-1 mb-4 rounded-md p-1 border border-gray-200 shadow-xs"
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
