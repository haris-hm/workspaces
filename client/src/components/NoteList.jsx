import NoteItem from "./NoteItem";

function NoteList({ notes, onSelectNote, className }) {
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
          />
        );
      })}
    </div>
  );
}

export default NoteList;
