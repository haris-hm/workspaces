const API_URL = `${import.meta.env.VITE_API_URL}/workspace`;

export const getWorkspace = async (joinCode) => {
  const response = await fetch(`${API_URL}/${joinCode}`);
  if (!response.ok) {
    throw new Error("Failed to fetch workspace");
  }
  return await response.json();
};

export const createWorkspace = async (data) => {
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
};
