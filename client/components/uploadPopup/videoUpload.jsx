import { useState } from "react";
import PopUpComponent from "./popupComponent";
import SubmitButton from "../submitButton.jsx";

export default function VideoUploadPopup({ setShowPopup }) {
  const [loading, SetLoading] = useState(false);
  const [isSubmmited, setIsSubmmited] = useState(false);

  return (
    <>
      <PopUpComponent onCancel={() => setShowPopup(false)}>
        <h1 className="mt-5 mb-3 text-xl font-medium text-blue-400 relative">
          Upload Video
        </h1>
        <div className="flex items-center justify-center h-40 w-full px-4 py-0 my-2 ">
          <div className="border-2 border-dotted border-gray-400 h-full w-full rounded-2xl flex justify-center items-center flex-col">
            <svg
              width="50" height="50" viewBox="0 0 24 24"
              fill="none" stroke="#111" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <rect x="1" y="5" width="15" height="14" rx="2" />
              <polygon points="23 7 16 12 23 17 23 7" />
            </svg>
            <h3 className="text-sm text-gray-400 mt-2">Upload files here </h3>
          </div>
        </div>
        <div className="px-4 mt-4">
          <label className="text-md font-base text-gray-700 ">
            Title
            <input
              name="title"
              type="text"
              className="bg-gray-100
                w-full  mt-1 mb-4 rounded-md p-1 shadow-md border border-gray-300"
            />
          </label>

          <label className="text-md font-base text-gray-700">
            Description
            <textarea
              name="description"
              type="text"
              className="bg-gray-100
                h-30 w-full  mt-1 mb-4 rounded-md p-1 shadow-md"
            />
          </label>
        </div>
        <SubmitButton currentSubmitStatus={
          isSubmmited ? "submited" : loading ? "loading" : "normal"
        } text={"Upload"} className={"mt-2 mb-5"} />
      </PopUpComponent>
    </>
  );
} 
