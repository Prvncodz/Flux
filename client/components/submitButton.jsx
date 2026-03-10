export default function SubmitButton({ currentSubmitStatus, text, className }) {
  return (
    <button
      className={`bg-[#1E549D] hover:bg-blue-600 
		  focus:outline-offset-2 active:bg-blue-800
		  text-gray-100 p-5 w-38 h-11 ml-auto mr-auto
		 flex justify-center items-center rounded-full 
		  font-semibold text-center text-md transition-bg ease cursor-pointer ${className}`}
      type="submit"
    >
      {currentSubmitStatus == "normal"
        ? text
        : currentSubmitStatus == "loading"
          ? `${text}ing...`
          : `${text}ed ✓`}
    </button>
  );
}
