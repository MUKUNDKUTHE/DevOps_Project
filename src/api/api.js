const API_BASE_URL = "http://127.0.0.1:50000";

export const createProject = async (projectData) => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (!response.ok) {
    throw new Error("Failed to post project");
  }

  return response.json();
};
