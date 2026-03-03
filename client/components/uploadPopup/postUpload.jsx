import PopUpComponent from "./popupComponent";

export default function PostUploadPopup({ setShowPopup }) {
  return (
    <>
      <PopUpComponent onCancel={() => setShowPopup(false)} >
        <h1 className="mt-5 text-xl font-medium text-blue-400 relative">
          Create Post
        </h1>
      </PopUpComponent>
    </>
  );
} 
