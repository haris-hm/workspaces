import { useState } from "react";

import WorkspaceForm from "../components/WorkspaceForm";
import FormContinueButton from "../components/FormContinueButton";

/**
 * Landing page component.
 *
 * @param {Object} props - Component props.
 * @param {Function} props.onSetName - Callback to set the user's name.
 * @param {Function} props.onJoinWorkspace - Callback to join an existing workspace.
 * @param {Function} props.onCreateWorkspace - Callback when creating a workspace.
 * @returns {JSX.Element} The Landing page component.
 */
function Landing({ onSetName, onJoinWorkspace, onCreateWorkspace }) {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");

  return (
    <div className="w-screen h-screen relative flex flex-col justify-center items-center bg-stone-100 text-center">
      <h1 className="w-4/5 font-bold text-4xl">Welcome to Workspaces!</h1>
      <h2 className="font-semibold text-xl max-md:w-4/5 text-gray-700 mt-1.5">
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
          onChange={(e) => {
            const inputName = e.target.value.trim();
            setName(inputName);
            onSetName(inputName);
          }}
          className="text-xl border-gray-700 border-2 rounded-lg mt-2"
        />
        <FormContinueButton
          onClick={(e) => {
            e.preventDefault();
            setPage(1);
          }}
          className="mt-6 px-6 py-2"
          disabled={name === ""}
        />
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
