import { useState } from "react";

function WorkspaceCreatorModal({ display, onCloseModal }) {
  const [hoveringCloseButton, setHoveringCloseButton] = useState(false);

  return (
    <div
      className={`absolute top-1/2 left-1/2 w-3/5 h-1/2 z-100 rounded-2xl bg-slate-300 transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex flex-col items-center justify-center ${
        display ? "" : "hidden"
      }`}
    >
      <button
        className="absolute top-4 right-4 cursor-pointer"
        onClick={onCloseModal}
        onMouseEnter={() => setHoveringCloseButton(true)}
        onMouseLeave={() => setHoveringCloseButton(false)}
      >
        <img
          src={
            hoveringCloseButton
              ? "/icons/close-highlighted.svg"
              : "/icons/close.svg"
          }
          alt="Close"
          className="size-6"
        />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Create a New Workspace</h2>
    </div>
  );
}

export default WorkspaceCreatorModal;
