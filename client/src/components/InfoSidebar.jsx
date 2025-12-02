function InfoSidebar({ note, className }) {
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
        <h2>Last Updated: {updatedAt}</h2>
      </div>
    </div>
  );
}

export default InfoSidebar;
