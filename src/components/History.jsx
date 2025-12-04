import { useEffect, useState } from "react";
import { getHistory, deleteHistory, clearHistory } from "../store/requestsStore";

export default function HistoryPanel({ onSelect }) {
  const [items, setItems] = useState([]);

  const load = () => setItems(getHistory());

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-4 border-r w-80 h-screen overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg">History</h2>
        <button
          className="text-red-500 text-sm"
          onClick={() => {
            clearHistory();
            load();
          }}
        >
          Clear All
        </button>
      </div>

      {items.map((h) => (
        <div
          key={h.id}
          className="p-3 mb-2 border rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => onSelect(h)}
        >
          <div className="flex justify-between">
            <span className="font-semibold">{h.method}</span>
            <span className="text-xs text-gray-500">{h.duration} ms</span>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-300">
            {h.url}
          </div>

          <div className="flex justify-between mt-1 text-xs">
            <span>Status: {h.status}</span>
            <button
              className="text-red-400"
              onClick={(e) => {
                e.stopPropagation();
                deleteHistory(h.id);
                load();
              }}
            >
              ✖
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
