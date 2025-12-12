import { useState } from "react";

function NewNoteButton({ onClick, disabled, className = "" }) {
  const [loading, setLoading] = useState(false);

  return (
    <button
      onClick={async () => {
        setLoading(true);
        await onClick();
        setLoading(false);
      }}
      className={`flex flex-row align-middle items-center justify-center mx-2 mb-2 py-2 px-4 gap-2 bg-blue-800 rounded-lg drop-shadow-md drop-shadow-gray-500 border-blue-700 shrink-0 ${
        disabled
          ? ""
          : "hover:brightness-110 active:brightness-90 cursor-pointer"
      } ${className}`}
      disabled={disabled || loading}
    >
      <img
        src={loading ? "icons/loading-light.svg" : "icons/paper-plus.svg"}
        className={`size-8 md:size-5 ${loading ? "animate-spin" : ""}`}
      />
      <p className="text-xl text-center text-gray-100 font-semibold">
        New Note
      </p>
    </button>
  );
}

export default NewNoteButton;
