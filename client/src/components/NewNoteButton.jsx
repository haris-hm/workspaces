function NewNoteButton({ onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-row align-middle items-center justify-center mx-2 mb-2 py-2 px-4 gap-2 bg-blue-800 rounded-lg drop-shadow-md drop-shadow-gray-500 border-blue-700 shrink-0 ${
        disabled
          ? ""
          : "hover:brightness-110 active:brightness-90 cursor-pointer"
      } ${className}`}
      disabled={disabled}
    >
      <img src="icons/plus-circle.svg" className="size-5 max-md:size-10" />
      <p className="max-md:hidden text-xl text-center text-gray-100 font-semibold">
        New Note
      </p>
    </button>
  );
}

export default NewNoteButton;
