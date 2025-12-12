import { useState } from "react";

/**
 * A single note item component. Used in the NotesList component.
 * @param {Object} props - The component props.
 * @param {Object} props.note - The note object.
 * @param {Function} props.onClick - The function to call when the note is clicked.
 * @param {boolean} props.blockOpen - Whether to block opening the note (disables hover effects and click).
 * @returns {JSX.Element} The NoteItem component.
 */
function NoteItem({ note, onClick, blockOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className={`w-full flex flex-row py-4 px-2 justify-between border-b-2 border-gray-700 ${
        blockOpen ? "" : "hover:bg-gray-200 active:bg-gray-50 cursor-pointer"
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
      disabled={blockOpen}
    >
      <h1 className="text-lg font-semibold text-left truncate">{note.title}</h1>
      <img
        src="/icons/right-arrow.svg"
        className={`w-8 h-8 ${isHovered ? "" : "invisible"}`}
      />
    </button>
  );
}

export default NoteItem;
