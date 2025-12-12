import NoteItem from "./NoteItem";

/**
 * A list of notes.
 * @param {Object} props - The component props.
 * @param {Array} props.notes - The array of note objects to display.
 * @param {Function} props.onSelectNote - Callback function when a note is selected.
 * @param {boolean} props.blockOpen - Whether to block opening notes.
 * @param {boolean} props.loading - Whether the notes are currently loading.
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The NoteList component.
 */
function NoteList({ notes, onSelectNote, blockOpen, loading, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {notes.map((note) => {
        const noteId = note._id;
        return (
          <NoteItem
            note={note}
            key={noteId}
            onClick={() => {
              onSelectNote(noteId);

              // Scroll to top smoothly when a note is selected on mobile
              const smoothScroll = setInterval(() => {
                const pos =
                  document.documentElement.scrollTop || document.body.scrollTop;
                if (pos > 0) {
                  window.scrollBy(0, -40);
                } else {
                  clearInterval(smoothScroll);
                }
              }, 5);
            }}
            blockOpen={blockOpen}
          />
        );
      })}

      {notes.length === 0 && !loading && (
        <div className="p-4 text-center text-gray-500">
          There doesn't seem to be anything here. Let's change that!
        </div>
      )}

      {loading && (
        <img
          src="/icons/loading-dark.svg"
          alt="Loading Notes..."
          className="animate-spin h-8 w-8 mx-auto my-4"
        />
      )}
    </div>
  );
}

export default NoteList;
