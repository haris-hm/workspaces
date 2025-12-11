import { useState } from "react";

function WorkspaceForm({
  onJoinWorkspace,
  onCreateWorkspace,
  onSuccess = () => {},
  className = "",
}) {
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <div className={`${className}`}>
      <label
        htmlFor="workspaceCode"
        className="font-medium text-left text-lg mb-2"
      >
        Already have a workspace code?
      </label>
      <form className="flex flex-row w-full gap-1 mb-6">
        <input
          name="workspaceCode"
          type="text"
          onChange={(e) => {
            e.target.value = e.target.value
              .toUpperCase()
              .replace(/[^A-Za-z0-9]/g, "");
            setWorkspaceCode(e.target.value);
          }}
          className="text-xl font-semibold rounded-lg border-gray-700 border-2 w-full"
          maxLength={6}
        />
        <button
          className="flex flex-row justify-center items-center py-2 bg-blue-800 rounded-2xl h-full w-1/5 hover:brightness-110 active:brightness-90 cursor-pointer"
          onClick={async (e) => {
            e.preventDefault();
            const result = await onJoinWorkspace(workspaceCode);
            if (!result?.error) {
              onSuccess(result);
              return;
            }
          }}
        >
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="invert size-6"
          />
        </button>
      </form>

      <label
        htmlFor="workspaceName"
        className="font-medium text-left text-lg mb-2"
      >
        If not, what should we call it?
      </label>
      <form className="flex flex-row w-full gap-1">
        <input
          name="workspaceName"
          type="text"
          onChange={(e) => {
            e.target.value = e.target.value.replace(/[^A-Za-z0-9_\-\s'"]/g, "");
            setWorkspaceName(e.target.value);
          }}
          className="text-xl font-semibold rounded-lg border-gray-700 border-2 w-full"
          maxLength={25}
        />
        <button
          className="flex flex-row justify-center items-center py-2 bg-blue-800 rounded-2xl h-full w-1/5 hover:brightness-110 active:brightness-90 cursor-pointer"
          onClick={async (e) => {
            e.preventDefault();
            const result = await onCreateWorkspace(workspaceName);
            if (!result?.error) {
              onSuccess(result);
              return;
            }
          }}
        >
          <img
            src="/icons/right-arrow.svg"
            alt="Next"
            className="invert size-6"
          />
        </button>
      </form>
    </div>
  );
}

export default WorkspaceForm;
