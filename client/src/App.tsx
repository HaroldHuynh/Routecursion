import { useEffect, useState } from "react";

import "./App.css";

type HealthResponse = {
  status: string;
};

export default function App() {
  const [backendStatus, setBackendStatus] = useState(
    "Checking backend connection...",
  );

  useEffect(() => {
    const controller = new AbortController();

    async function checkBackend() {
      try {
        const response = await fetch("http://localhost:3000/api/health", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: HealthResponse = await response.json();

        setBackendStatus(`Backend status: ${data.status}`);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setBackendStatus("Unable to connect to the backend");
      }
    }

    void checkBackend();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <p className="mt-4 text-slate-700">{backendStatus}</p>
    </div>
  );
}
