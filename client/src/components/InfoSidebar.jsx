function InfoSidebar({ note, workspace, className = "" }) {
  const dateOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const updatedAt = note
    ? new Date(note.updatedAt).toLocaleString("en-US", dateOptions)
    : null;
  const createdAt = note
    ? new Date(note?.createdAt).toLocaleString("en-US", dateOptions)
    : null;

  return (
    <div
      className={`flex flex-col justify-between border-l-3 border-gray-700 ${className}`}
    >
      <div className="flex flex-col px-4 py-2">
        {updatedAt && (
          <>
            <div className="flex flex-col md:flex-row justify-between text-md font-semibold md:gap-2">
              <h2 className="select-none">Updated:</h2>
              <h2>{updatedAt}</h2>
            </div>
          </>
        )}

        {createdAt && (
          <>
            <div className="flex flex-col md:flex-row mt-3 justify-between text-md font-semibold md:gap-2">
              <h2 className="select-none">Created:</h2>
              <h2>{createdAt}</h2>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center border-t-2 rounded-2xl pt-2 pb-2 border-gray-700">
        <h1 className="text-2xl font-semibold select-none">
          Current Workspace:
        </h1>
        <h2 className="text-4xl font-bold select-all">{workspace?.code}</h2>
      </div>
    </div>
  );
}

export default InfoSidebar;
