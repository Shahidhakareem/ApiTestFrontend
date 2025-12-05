import React, { useEffect, useState } from "react";
import KeyValueTable from "./KeyValueTable";
import RequestBodyEditor from "./RequestBodyEditor";
import { addHistory } from "../store/requestsStore";

const backendService = {
  sendRequest: async (method, fullUrl, headers, body) => {
    const start = performance.now();
    const res = await fetch(fullUrl, {
      method,
      headers,
      body,
    });
    const end = performance.now();

    const contentType = res.headers.get("content-type");
    let bodyData;
    try {
      bodyData = contentType?.includes("application/json")
        ? await res.json()
        : await res.text();
    } catch (e) {
      bodyData = await res.text();
      s;
    }

    return {
      status: res.status,
      statusText: res.statusText,
      time: (end - start).toFixed(2),
      body: bodyData,
    };
  },
};

const sendRequest = async () => {
  // ... setup and requestDetails capture ...

  let finalStatus = 0;
  try {
    // ... API fetching logic ...
    const responseData = await backendService.sendRequest();
    finalStatus = responseData.status;
    setResponse(responseData);
  } catch (error) {
    setResponse({ error: true, message: error.message });
    finalStatus = 0;
  }

  setLoading(false);

  // 2. Call the history function.
  // Since 'addRequestToHistory' is now async, we await it or just let it run.
  if (onSendComplete) {
    // Await is generally better practice for async props
    await onSendComplete(requestDetails, finalStatus);
  }
};

const RequestBuilder = ({
  saveRequest,
  loadedRequest,
  activeEnvironmentVars = [],
 onHistoryChange,
}) => {
  const [activeTab, setActiveTab] = useState("Body");
  const tabs = [
    "Docs",
    "Params",
    "Authorization",
    "Headers",
    "Body",
    "Scripts",
  ];

  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("{{base_url}}/api/requests"); // Updated default URL
  const [params, setParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Apply environment variables to a string (URL, header key/value, param key/value, etc.)
  const applyEnvironment = (value) => {
    let result = value;
    activeEnvironmentVars.forEach((v) => {
      const pattern = new RegExp(`{{\\s*${v.key}\\s*}}`, "g");
      result = result.replace(pattern, v.value);
    });
    return result;
  };

  const buildURL = () => {
    const parsedURL = applyEnvironment(url);
    const query = params
      .filter((p) => p.key)
      .map(
        (p) =>
          `${encodeURIComponent(applyEnvironment(p.key))}=${encodeURIComponent(
            applyEnvironment(p.value)
          )}`
      )
      .join("&");

    // Ensure only one question mark is used if params exist and URL already contains one
    const separator = parsedURL.includes("?") ? "&" : "?";

    return query ? `${parsedURL}${separator}${query}` : parsedURL;
  };

const sendRequest = async () => {
  setLoading(true);
  setResponse(null);

  try {
    // Build headers
    const finalHeaders = {};
    headers.forEach((h) => {
      if (h.key) {
        finalHeaders[applyEnvironment(h.key)] = applyEnvironment(h.value);
      }
    });

    let requestBody = undefined;

    // If method allows body
    if (!["GET", "HEAD"].includes(method)) {
      try {
        // Validate JSON body
        const parsed = JSON.parse(body);
        requestBody = JSON.stringify(parsed);

        if (!finalHeaders["Content-Type"]) {
          finalHeaders["Content-Type"] = "application/json";
        }
      } catch {
        // Raw body
        requestBody = applyEnvironment(body);
      }
    }

    // 🔥 Call backend service
    const responseData = await backendService.sendRequest(
      method,
      buildURL(),
      finalHeaders,
      requestBody
    );

    // Update UI
    setResponse(responseData);

    // 🔥 Save to history (corrected)
   await addHistory({ // Await addHistory to ensure save is complete
        method,
        url,
        status: responseData.status,
        duration: responseData.time,
      });

  } catch (error) {
    setResponse({ error: true, message: error.message });

 await addHistory({ // Await addHistory to ensure save is complete
        method,
        url,
        status: "Error",
        duration: 0,
      });
  }

  setLoading(false);

  if (onHistoryChange) {
      onHistoryChange();
    }
};


  // ---------------- BACKEND CONNECTION END ----------------

  useEffect(() => {
    if (loadedRequest) {
      setMethod(loadedRequest.method || "GET");
      setUrl(loadedRequest.url || "{{base_url}}/");
      // Assuming params/headers on loadedRequest are flat arrays now
      setParams(loadedRequest.params || []);
      setHeaders(loadedRequest.headers || []);
      setBody(loadedRequest.body || "{}");
      setResponse(null); // Clear previous response when new request is loaded
    }
  }, [loadedRequest]);


  useEffect(() => {
    if (!loadedRequest) return;

    setMethod(loadedRequest.method);
    setURL(loadedRequest.url);
    setBody(loadedRequest.body || "{}");
    setHeaders(loadedRequest.headers || []);
    setParams(loadedRequest.params || []);
  }, [loadedRequest]);

  // Removed the hardcoded Environment dropdown and logic

  return (
    <div className="flex flex-col h-full">
      {/* METHOD & URL BAR */}
      <div className="flex items-center p-4 border-b bg-white gap-2">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="px-3 py-3 border rounded bg-indigo-100 font-bold text-sm"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>

        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 px-3 py-2 border rounded text-sm focus:ring focus:ring-indigo-300"
          placeholder={applyEnvironment(url)}
        />
        <div className="border border-indigo-500 rounded hover:bg-indigo-700">
          <button
            onClick={sendRequest}
            className="px-4 py-2 bg-indigo-600 text-indigo-500 border border-indigo-600 rounded hover:bg-indigo-700 shadow font-semibold"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>

      {/* SAVE REQUEST */}
      {/* This is where you'd call your backend API to save the request 
        to a database, passing the relevant collection ID.
        The saveRequest prop would likely be an async function provided from above.
      */}
      <div className="flex justify-center p-4">
        <div className="border border-indigo-600 rounded hover:bg-indigo-50">
          <button
            onClick={() => {
              const requestName = prompt("Request Name:", "New Request");
              if (!requestName) return;

              const requestData = {
                name: requestName,
                method,
                url,
                params, // Use the state directly for saving
                headers,
                body,
              };

              // This part needs adjustment to connect to your backend
              // for collection management.
              const collectionId = prompt("Collection ID to save to:");
              if (collectionId && saveRequest) {
                saveRequest(collectionId, requestData);
              }
            }}
            className="px-4 py-2 text-indigo-600 rounded hover:bg-indigo-50 font-semibold"
          >
            Save Request
          </button>
        </div>
      </div>

      {/* TABS (Params, Headers, Body, etc.) */}
      <div className="border-b p-3 bg-indigo-100">
        <nav className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm ${
                activeTab === tab
                  ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* TAB CONTENT */}
      <div className="p-4 overflow-y-auto h-[25vh] bg-white">
        {activeTab === "Body" && (
          <RequestBodyEditor value={body} setValue={setBody} />
        )}

        {activeTab === "Headers" && (
          <KeyValueTable title="Headers" rows={headers} setRows={setHeaders} />
        )}

        {activeTab === "Params" && (
          <KeyValueTable title="Params" rows={params} setRows={setParams} />
        )}

        {/* Placeholder for other tabs like Authorization or Docs */}
        {activeTab === "Authorization" && (
          <div className="text-gray-500">
            Authorization options would go here.
          </div>
        )}
        {activeTab === "Docs" && (
          <div className="text-gray-500">
            Documentation editor would go here.
          </div>
        )}
      </div>

      {/* RESPONSE PANEL */}
      <div className="border-t bg-white flex flex-col flex-1 h-[200px]">
        <div className="p-3 border-b bg-gray-100 text-sm font-semibold flex items-center justify-between">
          Response
          {response && !response.error && (
            <div className="flex gap-4 text-xs font-normal">
              <span
                className={`px-2 py-1 rounded ${
                  response.status >= 200 && response.status < 300
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Status: {response.status} ({response.statusText})
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Time: {response.time} ms
              </span>
            </div>
          )}
        </div>

        <div className="p-4 overflow-y-auto text-sm flex-1">
          {!response && !loading && (
            <p className="text-center text-gray-400 mt-6">
              Click <b>Send</b> to get a response
            </p>
          )}

          {loading && (
            <p className="text-center text-indigo-500 mt-6">Loading...</p>
          )}

          {response?.error && (
            <div className="text-red-600 font-medium">
              ❌ Error: {response.message}
            </div>
          )}

          {response && !response.error && (
            <div className="space-y-4">
              <pre className="bg-indigo-200 text-black p-4 rounded-md overflow-auto max-h-[32vh] whitespace-pre-wrap break-words shadow-inner">
                {typeof response.body === "object"
                  ? JSON.stringify(response.body, null, 2)
                  : response.body}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestBuilder;
