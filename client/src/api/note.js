const API_URL = `${import.meta.env.VITE_API_URL}/note`;
export const getNotes = async (workspaceId) => {
  const response = await fetch(`${API_URL}?workspaceId=${workspaceId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return await response.json();
};

export const createNote = async (data) => {
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
};

export const changeNote = async (id, data) => {
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
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return await response.json();
};
