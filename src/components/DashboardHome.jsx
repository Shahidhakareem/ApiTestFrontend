// src/App.jsx (DashboardHome)
import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

import CollectionSidebar from "./CollectionSidebar";
import EnvironmentManager from "./EnvironmentManager";
import RequestBuilder from "./RequestBuilder";
import HistoryPanel from "./History";




function DashboardHome({ session }) {
  const [activeSection, setActiveSection] = useState("Collections"); // ← NEW
const [selectedRequest, setSelectedRequest] = useState(null);

  const [environments, setEnvironments] = useState([
    {
      name: "Localhost",
      vars: [{ key: "baseURL", value: "http://localhost:3000" }],
    },
  ]);

  const [activeEnv, setActiveEnv] = useState(0);

  const [collections, setCollections] = useState([
    { name: "My Collection", requests: [] },
  ]);

  const addCollection = (name) => {
    setCollections([...collections, { name, requests: [] }]);
  };

  const saveRequest = (colIndex, requestData) => {
    const updated = [...collections];
    updated[colIndex].requests.push(requestData);
    setCollections(updated);
  };
const handleLoadRequest = (req) => {
    setMethod(req.method);
    setURL(req.url);
    setBody(req.body || '{}');
    setHeaders(req.headers || []);
    setResponse(null); 
};
const handleRemoveRequest = async (id) => {
    if(window.confirm("Are you sure you want to delete this request?")) {
        await deleteRequest(id); 
        const updatedCollections = await getRequests();
        setCollections(updatedCollections);
    }
}
  const [loadedRequest, setLoadedRequest] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans">
      <Header />

      <div className="flex flex-1 overflow-hidden">

        {/* SIDEBAR */}
        <Sidebar onSelectSection={setActiveSection} />

        {/* MAIN CONTENT AREA */}
        <div className="flex h-screen w-full">

          {/* SHOW COLLECTION SIDEBAR ONLY IF SELECTED */}
          {activeSection === "Collections" && (
            <CollectionSidebar
              collections={collections}
              addCollection={addCollection}
              onSelectRequest={setLoadedRequest}
            />
          )}

          {/* SHOW ENVIRONMENT MANAGER ONLY IF SELECTED */}
          {activeSection === "Environments" && (
            <EnvironmentManager
              environments={environments}
              setEnvironments={setEnvironments}
              activeEnv={activeEnv}
              setActiveEnv={setActiveEnv}
            />
          )}
   {activeSection === "History" && (
               <HistoryPanel onSelect={(req) => setSelectedRequest(req)} />
          )}
          {/* MAIN REQUEST BUILDER */}
           <div className="flex-1">
            <RequestBuilder
              saveRequest={saveRequest}
              collections={collections}
              loadedRequest={loadedRequest}
            />
          </div> *




        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
