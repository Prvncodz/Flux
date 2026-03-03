import { useState } from "react";
import PopUpComponent from "./popupComponent";
import SubmitButton from "../submitButton.jsx";

export default function VideoUploadPopup({ setShowPopup }) {
  const [loading, SetLoading] = useState(false);
  const [isSubmmited, setIsSubmmited] = useState(false);
  const [fileName, setFileName] = useState(("Select video file"))
  function handleVideoFile(fname) {
    setFileName(fname);
  }

  return (
    <>
      <PopUpComponent onCancel={() => setShowPopup(false)}>
        <h1 className="mt-5 mb-3 text-xl font-medium text-blue-400 relative">
          Upload Video
        </h1>
        <div className="flex items-center justify-center h-50 w-full px-4 py-0 my-2 ">
          <label htmlFor="for-upload" className="border-2 border-dotted border-gray-400 h-full w-full flex justify-center items-center flex-col">
            <svg
              width="50" height="50" viewBox="0 0 24 24"
              fill="none" stroke="#111" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            >
              <rect x="1" y="5" width="15" height="14" rx="2" />
              <polygon points="23 7 16 12 23 17 23 7" />
            </svg>
            <h3 className="text-sm text-gray-400 mt-2">{fileName}</h3>
            <input type="file" name="videofile" onChange={(e) => handleVideoFile(e.target?.files[0]?.name)} className="hidden" id="for-upload" />
          </label>
        </div>

        <div className="px-4 mt-4 text-left flex flex-col gap-6">
          <label className="text-md font-base text-gray-700">
            Thumbnail*
            <input
              name="thumbnail"
              type="file"
              className="bg-gray-100
                w-full  p-1  text-base file:mx-2 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-600 dark:file:text-blue-100 dark:hover:file:bg-blue-500 "
            />
          </label>

          <label className="text-md font-base text-gray-700">
            Title
            <input
              name="title"
              type="text"
              placeholder="Title of the video goes here..."
              className="bg-gray-100
                w-full py-2 px-2 shadow-md placeholder:text-sm"
            />
          </label>

          <label className="text-md font-base text-gray-700">
            Description
            <textarea
              name="description"
              type="text"
              placeholder="description of the video goes here.."
              className="bg-gray-100
                h-30 w-full p-2 shadow-md text-sm"
            />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button type="button" onClick={() => setShowPopup(false)} className="bg-gray-300 text-base font-semibold text-gray-800 p-4 flex items-center justify-center text-center rounded-full w-38 h-11 mt-2 mb-5 mx-auto" >Cancel</button>
          <SubmitButton currentSubmitStatus={
            isSubmmited ? "submited" : loading ? "loading" : "normal"
          } text={"Upload"} className={"mt-2 mb-5"} />
        </div>
      </PopUpComponent>
    </>
  );
} 
