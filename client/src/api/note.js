const API_URL = `${import.meta.env.VITE_API_URL}/note`;

/**
 * Fetch notes for a specific workspace
 * @param {String} workspaceId - ID of the workspace
 * @returns {Promise<Array>} - List of notes
 */
async function getWorkspaceNotes(workspaceId) {
  const response = await fetch(`${API_URL}?workspaceId=${workspaceId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return await response.json();
}

/**
 * Create a new note in the workspace
 * @param {Object} data - Note data
 * @returns {Promise<Object>} - Created note
 */
async function createWorkspaceNote(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return await response.json();
}

/**
 * Update an existing note
 * @param {String} id - Note ID
 * @param {Object} data - Updated note data
 * @returns {Promise<Object>} - Updated note
 */
async function updateWorkspaceNote(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return await response.json();
}

/**
 * Deletes a note by ID
 * @param {String} id - Note ID
 * @returns {Promise<Object>} - Deletion result
 */
async function deleteWorkspaceNote(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return await response.json();
}

export {
  getWorkspaceNotes,
  createWorkspaceNote,
  updateWorkspaceNote,
  deleteWorkspaceNote,
};
