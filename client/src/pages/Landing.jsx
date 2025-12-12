import { useState } from "react";

import WorkspaceForm from "../components/WorkspaceForm";

function Landing({ onSetName, onJoinWorkspace, onCreateWorkspace }) {
  const [page, setPage] = useState(0);

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center bg-stone-100 text-center">
      <h1 className="font-bold text-4xl">Welcome to Workspaces!</h1>
      <h2 className="font-semibold text-xl text-gray-700 mt-1.5">
        Your new collaborative notetaking tool.
      </h2>

      <form
        className={`flex flex-col items-center mt-6 h-2/5 ${
          page === 0 ? "" : "hidden"
        }`}
      >
        <label htmlFor="name" className="font-medium text-lg">
          What should we call you?
        </label>
        <input
          name="name"
          type="text"
          onChange={(e) => onSetName(e.target.value)}
          className="text-xl border-gray-700 border-2 rounded-lg mt-2"
        />
        <button
          className="bg-blue-800 px-6 py-2 rounded-2xl mt-6"
          onClick={(e) => {
            e.preventDefault();
            setPage(1);
          }}
        >
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="invert size-6"
          />
        </button>
      </form>

      <WorkspaceForm
        onJoinWorkspace={onJoinWorkspace}
        onCreateWorkspace={onCreateWorkspace}
        className={
          page === 1 ? "flex flex-col mt-6 h-2/5 w-5/6 max-w-md" : "hidden"
        }
      />
    </div>
  );
}

export default Landing;
