import { useState } from "react";

export default function VideoDescription({ content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {
        isOpen ?
          (
            <div className="h-auto bg-gray-100 rounded-2xl p-4 text-wrap text-left text-body mx-2 relative" >
              <p>
                {content || ""}
              </p>
              <p className="text-gray-800 font-base text-body absolute bottom-1 right-4 bg-gray-100 bg-blend-color-burn z-1" onClick={() => setIsOpen(false)}>Show less..</p>
            </div>
          ) :
          (
            <div className="h-15 bg-gray-100 rounded-2xl p-4 text-wrap text-left text-body mx-2 relative z-0 " onClick={() => !isOpen && setIsOpen(true)}>

              <p>
                {content || ""}
              </p>
              <p className="text-gray-800 font-base text-body absolute bottom-1 right-4 bg-gray-100 bg-blend-color-burn z-1">..Show more</p>
            </div>
          )
      }
    </>
  );
}
