import NoteItem from "./NoteItem";

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
