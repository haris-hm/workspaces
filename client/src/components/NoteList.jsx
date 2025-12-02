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
            }}
            blockOpen={blockOpen}
          />
        );
      })}
    </div>
  );
}

export default NoteList;
