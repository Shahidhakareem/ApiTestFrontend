import React from "react";

const KeyValueTable = ({ title, rows, setRows }) => {
  const updateRow = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { key: "", value: "" }]);
  };

  const deleteRow = (i) => {
    setRows(rows.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>

      {rows.map((row, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            className="border px-2 py-1 flex-1"
            placeholder="Key"
            value={row.key}
            onChange={(e) => updateRow(i, "key", e.target.value)}
          />
          <input
            className="border px-2 py-1 flex-1"
            placeholder="Value"
            value={row.value}
            onChange={(e) => updateRow(i, "value", e.target.value)}
          />
          <button
            onClick={() => deleteRow(i)}
            className="px-2 text-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <button onClick={addRow} className="mt-1 text-blue-600">+ Add Row</button>
    </div>
  );
};

export default KeyValueTable;
