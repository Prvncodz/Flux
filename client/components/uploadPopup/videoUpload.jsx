import { useState } from "react";
import PopUpComponent from "./popupComponent";

export default function VideoUploadPopup({ setShowPopup }) {
  return (
    <>
      <PopUpComponent onCancel={() => setShowPopup(false)}>
        <h1>Upload Video</h1>
      </PopUpComponent>
    </>
  );
} 
