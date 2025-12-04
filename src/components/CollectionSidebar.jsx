import React, { useState } from "react";

const CollectionSidebar = ({ collections, addCollection, onSelectRequest }) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="w-64 border-r h-full bg-gray-50 p-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-gray-800">Collections</h2>
        <button
          onClick={() => setShowInput(true)}
          className="text-blue-600 text-lg font-bold"
        >
          +
        </button>
      </div>

      {showInput && (
        <div className="mb-3">
          <input
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Collection name"
            className="border p-1 w-full mb-2"
          />
          <button
            onClick={() => {
              if (newCollectionName.trim()) {
                addCollection(newCollectionName);
                setNewCollectionName("");
                setShowInput(false);
              }
            }}
            className="bg-blue-600 text-indigo-500 px-3 py-1 rounded w-full"
          >
            Create
          </button>
        </div>
      )}

      {/* Collection List */}
      <div className="space-y-4">
        {collections.map((c, i) => (
          <div key={i}>
            <p className="font-semibold text-gray-700">{c.name}</p>
            <div className="ml-3 mt-1 space-y-1">
              {c.requests.map((r, j) => (
                <button
                  key={j}
                  onClick={() => onSelectRequest(r)}
                  className="block text-left w-full text-sm text-gray-600 hover:text-blue-600"
                >
                  {r.name} <span className="text-xs text-gray-400">({r.method})</span>
                </button>
              ))}

              {c.requests.length === 0 && (
                <p className="text-xs text-gray-400">No requests yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionSidebar;
