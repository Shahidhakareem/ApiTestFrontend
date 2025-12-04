import React from "react";

const RequestBodyEditor = ({ title, value, setValue }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2">{title}</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-48  border border-indigo-600 p-2 rounded font-mono text-sm"
      />
    </div>
  );
};

export default RequestBodyEditor;
