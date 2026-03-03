import CancelIconComponent from "../userProfile/cancelIconComponent";

export default function PopUpComponent({ children, onCancel }) {
  return (
    <div
      className="h-full w-full flex flex-col justify-center
      items-center bg-none z-20 absolute top-0 left-0"
    >
      <div className="absolute top-0  h-full w-full opacity-90 overflow-hidden z-21 bg-gray-300"></div>
      <CancelIconComponent onClick={onCancel} />
      <div
        className="h-auto w-87 bg-gray-100 flex flex-col
        justify-center overflow-hidden rounded-lg absolute z-22"
      >
        {children}
      </div>
    </div>
  );
} 
