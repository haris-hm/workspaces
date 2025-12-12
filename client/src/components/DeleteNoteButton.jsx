import { useState } from "react";

function DeleteNoteButton({ noteId, onDelete, className = "" }) {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <button
      onClick={async () => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this note? This action cannot be undone."
        );
        if (!confirmDelete) return;

        setIsDeleting(true);
        if (noteId) await onDelete(noteId);
        setIsDeleting(false);
      }}
      className={`flex flex-row align-middle items-center justify-center mx-2 mb-2 py-2 px-4 gap-2 bg-red-700 rounded-lg drop-shadow-md drop-shadow-gray-500shrink-0 hover:brightness-110 active:brightness-90 cursor-pointer ${className}`}
      disabled={isDeleting}
    >
      <img
        src={isDeleting ? "icons/loading-light.svg" : "icons/trash.svg"}
        className={`size-5 max-md:size-10 ${isDeleting ? "animate-spin" : ""}`}
      />
      <p className="text-xl text-center text-gray-100 font-semibold">
        Delete Note
      </p>
    </button>
  );
}

export default DeleteNoteButton;
