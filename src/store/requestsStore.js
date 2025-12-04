// storage.js

const API_BASE_URL = 'http://localhost:5000/';

/**
 * Retrieves all saved requests from the backend API.
 */
export const addHistory = (entry) => {
  const items = JSON.parse(localStorage.getItem("history") || "[]");
  items.unshift({
    id: Date.now(),
    ...entry,
    time: new Date().toLocaleString(),
  });
  localStorage.setItem("history", JSON.stringify(items));
};

// Get all history entries
export const getHistory = () =>
  JSON.parse(localStorage.getItem("history") || "[]");

// Delete one history entry
export const deleteHistory = (id) => {
  const items = getHistory().filter((x) => x.id !== id);
  localStorage.setItem("history", JSON.stringify(items));
};

// Clear all
export const clearHistory = () => {
  localStorage.removeItem("history");
};


export const getRequests = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json(); 
  } catch (e) {
    console.error("Error fetching collection from API:", e);
    return []; // Return empty array on failure
  }
};

/**
 * Saves a new request to the backend API via POST.
 */
export const saveRequest = async (req) => {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json(); 
  } catch (e) {
    console.error("Error saving request to API:", e);
  }
};

/**
 * Removes a request by ID via the backend API using DELETE.
 */
export const deleteRequest = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (e) {
    console.error("Error deleting request via API:", e);
  }
};