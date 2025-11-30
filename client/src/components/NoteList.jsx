import NoteItem from "./NoteItem";

function NoteList({ className }) {
  const notes = ["Test 1", "Test 2", "Test 3"];

  return (
    <div className={`flex flex-col border-r-3 border-gray-700 ${className}`}>
      {notes.map((note) => {
        return <NoteItem title={note} />;
      })}
    </div>
  );
}

export default NoteList;
