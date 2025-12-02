function InfoSidebar({ note, workspace, className = "" }) {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const updatedAt = new Date(note.updatedAt).toLocaleString(
    "en-US",
    dateOptions
  );
  const createdAt = new Date(note.createdAt).toLocaleString(
    "en-US",
    dateOptions
  );

  return (
    <div className={`flex flex-col border-l-3 border-gray-700 ${className}`}>
      <div className="flex flex-col px-4 py-2">
        <div className="flex flex-col md:flex-row justify-between text-md font-semibold md:gap-2">
          <h2>Updated:</h2>
          <h2>{updatedAt}</h2>
        </div>

        <div className="flex flex-col md:flex-row mt-3 justify-between text-md font-semibold md:gap-2">
          <h2>Created:</h2>
          <h2>{createdAt}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoSidebar;
