import { useState } from "react";

import Workspace from "./pages/Workspace";
import Landing from "./pages/Landing";

import { createWorkspace, getWorkspace } from "./api/workspace";

function App() {
  const [currentWorkspace, setCurrentWorkspace] = useState(null);
  const [name, setName] = useState("");

  async function handleJoinWorkspace(code) {
    const result = await getWorkspace(code)
      .then((workspace) => {
        setCurrentWorkspace(workspace);
      })
      .catch((error) => {
        return { error: error.message };
      });

    return result;
  }

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
