import React, { useState } from "react";

const EnvironmentManager = ({ environments, setEnvironments, activeEnv, setActiveEnv }) => {
  const [showNewEnv, setShowNewEnv] = useState(false);
  const [newEnvName, setNewEnvName] = useState("");

  const addEnvironment = () => {
    if (!newEnvName.trim()) return;
    setEnvironments([...environments, { name: newEnvName, vars: [] }]);
    setNewEnvName("");
    setShowNewEnv(false);
  };

  const updateVariable = (envIndex, varIndex, field, value) => {
    const updated = [...environments];
    updated[envIndex].vars[varIndex][field] = value;
    setEnvironments(updated);
  };

  const addVariable = (envIndex) => {
    const updated = [...environments];
    updated[envIndex].vars.push({ key: "", value: "" });
    setEnvironments(updated);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Environments</h2>
        <button
          onClick={() => setShowNewEnv(true)}
          className="text-blue-600 text-lg font-semibold"
        >
          + Add
        </button>
      </div>

      {/* Create new environment */}
      {showNewEnv && (
        <div className="mb-4">
          <input
            value={newEnvName}
            onChange={(e) => setNewEnvName(e.target.value)}
            placeholder="Environment Name"
            className="border px-2 py-1 w-full"
          />
          <button
            onClick={addEnvironment}
            className="bg-blue-600 text-white px-3 py-1 w-full mt-2 rounded"
          >
            Create Environment
          </button>
        </div>
      )}

      {/* Environment List */}
      <div className="space-y-4">
        {environments.map((env, envIndex) => (
          <div key={envIndex} className="border rounded p-3 bg-gray-50">
            <div className="flex justify-between">
              <p
                className={`font-semibold cursor-pointer ${
                  activeEnv === envIndex ? "text-blue-600" : ""
                }`}
                onClick={() => setActiveEnv(envIndex)}
              >
                {env.name}
              </p>
            </div>

            <div className="mt-3">
              {env.vars.map((v, varIndex) => (
                <div key={varIndex} className="flex gap-2 mb-2">
                  <input
                    className="border px-2 py-1 flex-1"
                    placeholder="Key (e.g. baseURL)"
                    value={v.key}
                    onChange={(e) =>
                      updateVariable(envIndex, varIndex, "key", e.target.value)
                    }
                  />
                  <input
                    className="border px-2 py-1 flex-1"
                    placeholder="Value"
                    value={v.value}
                    onChange={(e) =>
                      updateVariable(envIndex, varIndex, "value", e.target.value)
                    }
                  />
                </div>
              ))}

              <button
                onClick={() => addVariable(envIndex)}
                className="text-blue-600 text-sm"
              >
                + Add Variable
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentManager;
