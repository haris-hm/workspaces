import MembersDisplay from "./MembersDisplay.jsx";
import DeleteNoteButton from "./DeleteNoteButton.jsx";

function InfoSidebar({
  note,
  workspace,
  onDeleteNote,
  members,
  className = "",
}) {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  function getDate(date) {
    return new Date(date).toLocaleString("en-US", dateOptions);
  }

  return (
    <div className={`flex flex-col justify-between max-md:gap-4 ${className}`}>
      <div className="flex flex-col px-4 py-2">
        {note?.updatedAt && (
          <>
            <div className="flex flex-col md:flex-row justify-between text-md font-semibold md:gap-2">
              <h2 className="select-none">Updated:</h2>
              <h2>{getDate(note.updatedAt)}</h2>
            </div>
          </>
        )}

        {note?.createdAt && (
          <>
            <div className="flex flex-col md:flex-row mt-3 justify-between text-md font-semibold md:gap-2">
              <h2 className="select-none">Created:</h2>
              <h2>{getDate(note.createdAt)}</h2>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col">
        {note && <DeleteNoteButton onDelete={onDeleteNote} noteId={note._id} />}

        <div className="flex flex-col items-center border-t-2 rounded-2xl pt-2 pb-2 border-gray-700">
          <h2 className="text-xl md:text-2xl font-semibold select-none text-center">
            Current Workspace:
          </h2>
          <h3 className="text-lg md:hidden font-semibold select-none truncate w-2/3 text-center mt-1">
            {workspace?.name}
          </h3>

          <div className="flex flex-row items-center text-4xl font-bold max-md:mt-2">
            <h2 className="select-none mr-1">#</h2>
            <h2 className="select-all">{workspace?.code}</h2>
          </div>

          <h2 className="md:hidden mt-2 text-xl md:text-2xl font-semibold select-none text-center">
            Members:
          </h2>
          <MembersDisplay
            members={members}
            limit={5}
            className="my-2 md:hidden"
          />
        </div>
      </div>
    </div>
  );
}

export default InfoSidebar;
