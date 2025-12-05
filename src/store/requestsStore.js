const API_BASE_URL_REQUESTS = "http://localhost:5000/api/requests";
const API_BASE_URL_HISTORY = "http://localhost:5000/api/history";
const API_BASE_URL_COLLECTIONS = "http://localhost:5000/api/collections";

/* -------------------------------------------------------
    HISTORY FUNCTIONS 
--------------------------------------------------------- */

// ⭐ ADD history entry → POST to backend
export const addHistory = async (entry) => {
    try {
        const response = await fetch(API_BASE_URL_HISTORY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(entry),
        });

        if (!response.ok)
            throw new Error(`Failed to save history. Status: ${response.status}`);

        const data = await response.json();
        return data.savedHistoryItem;
    } catch (err) {
        console.error("Error adding history:", err);
        return null;
    }
};

// ⭐ GET history → GET from backend
export const getHistory = async () => {
    try {
        const res = await fetch(API_BASE_URL_HISTORY);
        if (!res.ok) throw new Error(`GET history failed: ${res.status}`);

        return await res.json(); // array of history entries
    } catch (err) {
        console.error("Error fetching history:", err);
        return [];
    }
};

// ⭐ DELETE single history entry → DELETE /api/history/:id
export const deleteHistory = async (id) => {
    try {
        const res = await fetch(`${API_BASE_URL_HISTORY}/${id}`, {
            method: "DELETE",
        });
        if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    } catch (err) {
        // Log the error but don't re-throw, allowing the application to continue running
        console.error("Error deleting history:", err);
        // You might want to return false here if you check the success later
        return false;
    }
    return true;
};

// ⭐ CLEAR ALL history — DELETE /api/history
export const clearHistory = async () => {
    try {
        // Send a single DELETE request to the base history endpoint.
        // This requires your backend to handle a DELETE request at /api/history 
        // by clearing the entire history data structure (e.g., emptying the array/database table).
        const res = await fetch(API_BASE_URL_HISTORY, {
            method: "DELETE",
        });

        if (!res.ok) {
            // If the dedicated endpoint fails, fall back to the slower item-by-item deletion
            console.warn("Dedicated clearHistory endpoint failed. Falling back to sequential deletion.");
            const history = await getHistory();
            for (const item of history) {
                await deleteHistory(item.id);
            }
        }
        return true;
    } catch (err) {
        console.error("Fatal error during clearHistory:", err);
        return false;
    }
};

/* -------------------------------------------------------
    SAVED REQUESTS (Collections/Requests)
--------------------------------------------------------- */

// GET all saved requests (collections)
export const getRequests = async () => {
    try {
        const response = await fetch(API_BASE_URL_REQUESTS);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Error fetching collection from API:", e);
        return [];
    }
};

// ⭐ NEW: GET a single saved request by ID
export const getRequestById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_REQUESTS}/${id}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Request with ID ${id} not found.`);
                return null;
            }
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (e) {
        console.error(`Error fetching request with ID ${id}:`, e);
        return null;
    }
};

// SAVE request (POST)
export const saveRequest = async (req) => {
    try {
        const response = await fetch(API_BASE_URL_REQUESTS, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req),
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return { saved: data.saved };
    } catch (e) {
        console.error("Error saving request to API:", e);
        return { error: true, message: e.message };
    }
};

// UPDATE request (PUT)
export const updateRequest = async (id, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL_REQUESTS}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return await response.json();
    } catch (e) {
        console.error("Error updating request:", e);
    }
};

// DELETE request (DELETE)
export const deleteRequest = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_REQUESTS}/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return await response.json();
    } catch (e) {
        console.error("Error deleting request via API:", e);
    }
};