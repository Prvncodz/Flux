export default function CreateComponent({ handleUpload }) {
  return (
    <div className="absolute bg-gray-100 shadow-sm rounded-xl h-auto w-auto top-12 z-10 right-0 p-3 transition-all pop-in delay-75 flex gap-2">
      <div className="flex flex-col items-center gap-3 w-35 border-2 border-dotted p-3 rounded-lg border-gray-300" onClick={() => handleUpload("video")}>
        <svg
          width="30" height="30" viewBox="0 0 24 24"
          fill="none" stroke="#111" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <rect x="1" y="5" width="15" height="14" rx="2" />
          <polygon points="23 7 16 12 23 17 23 7" />
        </svg>
        <h3>Publish video</h3>
      </div>
      <div className="flex flex-col items-center gap-3 w-35 border-2 border-dotted p-3 rounded-lg border-gray-300" onClick={() => handleUpload("post")}>
        <svg
          width="30" height="30" viewBox="0 0 24 24"
          fill="none" stroke="#111" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
        <h3>Create post</h3>
      </div>
    </div>
  );
}
