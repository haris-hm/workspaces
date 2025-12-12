import NoteItem from "./NoteItem";

function NoteList({ notes, onSelectNote, blockOpen, className = "" }) {
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
    </div>
  );
}

export default NoteList;
