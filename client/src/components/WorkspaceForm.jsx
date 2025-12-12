import { useState } from "react";

import FormContinueButton from "./FormContinueButton.jsx";

function WorkspaceForm({
  onJoinWorkspace,
  onCreateWorkspace,
  onSuccess = () => {},
  className = "",
}) {
  const [workspaceCode, setWorkspaceCode] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  const [loadingCodeInput, setLoadingCodeInput] = useState(false);
  const [loadingNameInput, setLoadingNameInput] = useState(false);

  return (
    <div className={`${className}`}>
      <label
        htmlFor="workspaceCode"
        className="font-medium text-left text-lg mb-2"
      >
        Already have a workspace code?
      </label>
      <form className="flex flex-row w-full gap-1 mb-6">
        <div className="flex flex-row rounded-lg border-gray-700 border-2 w-full">
          <h2 className="mx-2 text-3xl font-bold">#</h2>
          <input
            name="workspaceCode"
            type="text"
            placeholder="ABC123"
            onChange={(e) => {
              e.target.value = e.target.value
                .toUpperCase()
                .replace(/[^A-Za-z0-9]/g, "");
              setWorkspaceCode(e.target.value);
            }}
            className="text-2xl font-semibold w-full outline-none rounded-r-lg"
            maxLength={6}
          />
        </div>

        <FormContinueButton
          loading={loadingCodeInput}
          disabled={loadingNameInput || workspaceCode.length !== 6}
          onClick={async (e) => {
            e.preventDefault();

            setLoadingCodeInput(true);
            const result = await onJoinWorkspace(workspaceCode);
            setLoadingCodeInput(false);

            if (!result?.error) {
              onSuccess(result);
              return;
            }

            alert(
              "Failed to join workspace. Please check the code and try again."
            );
          }}
          className="h-full w-2/5 md:w-1/5"
        />
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
            e.target.value = e.target.value.replace(
              /[^A-Za-z0-9_\-\s'"’]/g,
              ""
            );
            setWorkspaceName(e.target.value);
          }}
          className="text-2xl font-semibold outline-none rounded-lg border-gray-700 border-2 w-full"
          maxLength={25}
        />

        <FormContinueButton
          loading={loadingNameInput}
          disabled={loadingCodeInput || workspaceName.length === 0}
          onClick={async (e) => {
            e.preventDefault();

            setLoadingNameInput(true);
            const result = await onCreateWorkspace(workspaceName);
            setLoadingNameInput(false);

            if (!result?.error) {
              onSuccess(result);
              return;
            }

            alert("Failed to create workspace. Please try again.");
          }}
          className="h-full w-2/5 md:w-1/5"
        />
      </form>
    </div>
  );
}

export default WorkspaceForm;
