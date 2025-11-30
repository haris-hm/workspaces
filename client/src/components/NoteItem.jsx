import { useState } from "react";

function NoteItem({ title }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="w-full flex flex-row py-4 px-2 justify-between border-b-2 border-gray-700 hover:bg-gray-200 cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <h1 className="text-lg font-semibold">{title}</h1>
      <img
        src="/icons/right-arrow.svg"
        className={`w-8 h-8 ${isHovered ? "" : "invisible"}`}
      />
    </div>
  );
}

export default NoteItem;
