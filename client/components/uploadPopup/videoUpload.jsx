import { useState } from "react";
import PopUpComponent from "./popupComponent";

export default function VideoUploadPopup() {
  const [showVideoUploadPopup, setShowVideoUploadPopup] = useState(true);
  return (
    <>
      <PopUpComponent onCancel={() => setShowVideoUploadPopup(false)}>
        <h1>Upload Video</h1>
      </PopUpComponent>
    </>
  );
} 
