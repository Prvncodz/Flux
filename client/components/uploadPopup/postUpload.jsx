import PopUpComponent from "./popupComponent";

export default function PostUploadPopup({ setShowPopup }) {
  return (
    <>
      <PopUpComponent onCancel={() => setShowPopup(false)} >
        <h1>Create Post</h1>
      </PopUpComponent>
    </>
  );
} 
