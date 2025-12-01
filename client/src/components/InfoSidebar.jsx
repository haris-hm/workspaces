function InfoSidebar({ note, className }) {
  return (
    <div className={`flex flex-col border-l-3 border-gray-700 ${className}`}>
      <div className="flex flex-col px-4 py-2">
        <h2>Last Updated: {note.updatedAt}</h2>
      </div>
    </div>
  );
}

export default InfoSidebar;
