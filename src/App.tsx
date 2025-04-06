import  React, { useState } from "react";
import "./index.css";
import Backlog from "./components/Backlog";
import Sprint from "./components/Sprint";

const App = () => {
  const [vista, setVista] = useState<"backlog" | "sprint">("backlog");

  const handleVerSprint = () => {
    setVista("sprint");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-slate-900 text-white px-6 py-3 text-lg font-semibold">
        Administrador de tareas
      </header>

      <div className="flex">
        
        <aside className="w-64 bg-white border-r p-4 space-y-4">
          <button
            className={`w-full bg-blue-700 text-white px-4 py-2 rounded font-semibold`}
            onClick={() => setVista("backlog")}
          >
            Backlog
          </button>

          <h2 className="text-center font-semibold text-lg">Lista de Sprints</h2>

          <div className="bg-gray-100 rounded p-3 space-y-2 shadow">
            <p className="font-bold">Sprint 233</p>
            <p><strong>Inicio:</strong> 2025-03-04</p>
            <p><strong>Cierre:</strong> 2025-03-11</p>
            <div className="flex gap-2 mt-2">
              <button onClick={handleVerSprint} className="bg-blue-600 p-1 rounded text-white">👁️</button>
              <button className="bg-blue-500 p-1 rounded text-white">✏️</button>
              <button className="bg-red-600 p-1 rounded text-white">🗑️</button>
            </div>
          </div>
        </aside>

        
        <main className="flex-1 p-6">
          {vista === "backlog" ? <Backlog /> : <Sprint />}
        </main>
      </div>
    </div>
  );
};

export default App;
