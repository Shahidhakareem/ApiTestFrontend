import { useState } from "react";
import axios from "axios";

export default function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("{}");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const sendRequest = async () => {
    setError("");
    setResponse(null);

    try {
      const parsedBody = body ? JSON.parse(body) : {};

      const axiosConfig = {
        url,
        method,
        data: parsedBody,
      };

      const res = await axios(axiosConfig);
      setResponse(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h1>Mini API Testing Tool</h1>

      <input
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        style={{ marginTop: 10 }}
      >
        <option>GET</option>
        <option>POST</option>
        <option>PUT</option>
        <option>DELETE</option>
      </select>

      <h3>Body (JSON)</h3>
      <textarea
        rows={5}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ width: "100%" }}
      />

      <button onClick={sendRequest} style={{ marginTop: 10 }}>
        Send Request
      </button>

      {error && <pre style={{ color: "red" }}>{error}</pre>}

      {response && (
        <div style={{ marginTop: 20 }}>
          <h2>Response</h2>
          <pre>Status: {response.status}</pre>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
