function InfoSidebar({ note, workspace, onDeleteNote, className = "" }) {
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
        <button
          onClick={() => {
            if (note) onDeleteNote(note._id);
          }}
          className={`flex flex-row align-middle items-center justify-center mx-2 mb-2 py-2 px-4 gap-2 bg-red-700 rounded-lg drop-shadow-md drop-shadow-gray-500shrink-0 hover:brightness-110 active:brightness-90 cursor-pointer ${
            note ? "" : "hidden"
          }`}
        >
          <img src="icons/trash.svg" className="size-5 max-md:size-10" />
          <p className="text-xl text-center text-gray-100 font-semibold">
            Delete Note
          </p>
        </button>

        <div className="flex flex-col items-center border-t-2 rounded-2xl pt-2 pb-2 border-gray-700">
          <h1 className="text-xl md:text-2xl font-semibold select-none">
            Current Workspace:
          </h1>
          <h1 className="text-lg md:hidden font-semibold select-none truncate w-2/3 text-center mt-1">
            {workspace?.name}
          </h1>
          <div className="flex flex-row items-center text-4xl font-bold max-md:mt-2">
            <h2 className="select-none mr-1">#</h2>
            <h2 className="select-all">{workspace?.code}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoSidebar;
