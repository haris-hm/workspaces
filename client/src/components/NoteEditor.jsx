/**
 * A note editor component that allows users to edit the title and content of a note.
 * @param {Object} props - The component props.
 * @param {Object} props.note - The note object containing title and content.
 * @param {Function} props.onChangeNote - Callback function to handle changes to the note.
 * @param {boolean} props.blockEdits - Flag to disable editing.
 * @param {string} [props.className] - Optional CSS classes for styling.
 * @returns {JSX.Element} The rendered NoteEditor component.
 */
function NoteEditor({ note, onChangeNote, blockEdits, className = "" }) {
  return (
    <div className={`flex flex-col ${className}`}>
      {note && (
        <>
          <div className="w-full pt-4 px-4">
            <input
              type="text"
              className="outline-0 mb-2 text-2xl font-bold w-full"
              placeholder="Title..."
              value={note.title}
              onChange={(e) => onChangeNote({ ...note, title: e.target.value })}
              disabled={blockEdits}
            />
            <hr className="border border-gray-600" />
          </div>

          <textarea
            className="h-full resize-none outline-0 p-4"
            value={note.content}
            onChange={(e) => onChangeNote({ ...note, content: e.target.value })}
            placeholder="What's on your mind?..."
            disabled={blockEdits}
          />
        </>
      )}
    </div>
  );
}

export default NoteEditor;
