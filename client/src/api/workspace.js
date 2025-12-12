const API_URL = `${import.meta.env.VITE_API_URL}/workspace`;

/**
 * Fetch workspace details by join code.
 * @param {String} joinCode - The 6-character join code of the workspace.
 * @returns {Promise<Object>} - The workspace details.
 */
async function getWorkspace(joinCode) {
  const response = await fetch(`${API_URL}/${joinCode}`);
  if (!response.ok) {
    throw new Error("Failed to fetch workspace");
  }
  return await response.json();
}

/**
 * Sends a POST request to create a new workspace.
 * @param {String} data - The data for the new workspace containing the workspace name.
 * @returns {Promise<Object>} - The created workspace details.
 */
async function createWorkspace(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create workspace");
  }
  return await response.json();
}

export { getWorkspace, createWorkspace };
