function NoteEditor({ note, onChangeNote, className }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="w-full pt-4 px-4">
        <input
          type="text"
          className="outline-0 mb-2 text-2xl font-bold"
          placeholder="Title..."
          value={note.title}
          onChange={(e) => onChangeNote({ ...note, title: e.target.value })}
        />
        <hr className="border border-gray-600" />
      </div>

      <textarea
        className="h-full resize-none outline-0 p-4"
        value={note.content}
        onChange={(e) => onChangeNote({ ...note, content: e.target.value })}
      />
    </div>
  );
}

export default NoteEditor;
