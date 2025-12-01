import { useState } from "react";

function NoteItem({ note, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className="w-full flex flex-row py-4 px-2 justify-between border-b-2 border-gray-700 hover:bg-gray-200 active:bg-gray-50 cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
    >
      <h1 className="text-lg font-semibold">{note.title}</h1>
      <img
        src="/icons/right-arrow.svg"
        className={`w-8 h-8 ${isHovered ? "" : "invisible"}`}
      />
    </button>
  );
}

export default NoteItem;
