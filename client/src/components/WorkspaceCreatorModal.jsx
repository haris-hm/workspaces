import { useState } from "react";

import WorkspaceForm from "./WorkspaceForm.jsx";

function WorkspaceCreatorModal({
  display,
  onJoinWorkspace,
  onCreateWorkspace,
  showCloseButton,
  onCloseModal,
}) {
  const [hoveringCloseButton, setHoveringCloseButton] = useState(false);

  return (
    <div
      className={`absolute top-1/2 left-1/2 w-7/8 md:w-3/5 h-1/2 z-100 rounded-2xl bg-slate-300 transform -translate-x-1/2 -translate-y-1/2 shadow-lg flex flex-col items-center justify-center ${
        display ? "" : "hidden"
      }`}
    >
      <button
        className={`absolute top-4 right-4 cursor-pointer ${
          showCloseButton ? "" : "hidden"
        }`}
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
      <h1 className="text-3xl text-center font-semibold mb-6">
        Join or create a workspace
      </h1>
      <WorkspaceForm
        onCreateWorkspace={onCreateWorkspace}
        onJoinWorkspace={onJoinWorkspace}
        onSuccess={onCloseModal}
        className="w-3/4"
      />
    </div>
  );
}

export default WorkspaceCreatorModal;
