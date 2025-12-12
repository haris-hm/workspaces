import { useLocalStorage } from "@uidotdev/usehooks";

import Workspace from "./pages/Workspace";
import Landing from "./pages/Landing";

import { createWorkspace, getWorkspace } from "./api/workspace";

/**
 * Main application component.
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  const [currentWorkspace, setCurrentWorkspace] = useLocalStorage(
    "workspace",
    null
  );
  const [name, setName] = useLocalStorage("name", "");

  /**
   * Tries to join a workspace using the provided code.
   * @param {String} code
   * @returns
   */
  async function handleJoinWorkspace(code) {
    let result;

    await getWorkspace(code)
      .then((workspace) => {
        setCurrentWorkspace(workspace);
      })
      .catch((error) => {
        result = { error: error.message };
      });

    return result;
  }

  /**
   * Handles requesting the creation of a new workspace with the given name.
   * @param {String} name - The name of the new workspace.
   * @returns {Object} Result of the workspace creation request.
   */
  async function handleCreateWorkspace(name) {
    const result = await createWorkspace({ name: name })
      .then((workspace) => {
        setCurrentWorkspace(workspace);
      })
      .catch((error) => {
        return { error: error.message };
      });

    return result;
  }

  return (
    <>
      {currentWorkspace ? (
        <Workspace
          name={name}
          currentWorkspace={currentWorkspace}
          onJoinWorkspace={handleJoinWorkspace}
          onCreateWorkspace={handleCreateWorkspace}
          onFailedConnection={() => {
            setCurrentWorkspace(null);
            alert("Failed to connect to workspace. It may have been deleted.");
          }}
        />
      ) : (
        <Landing
          onSetName={setName}
          onJoinWorkspace={handleJoinWorkspace}
          onCreateWorkspace={handleCreateWorkspace}
        />
      )}
    </>
  );
}

export default App;
