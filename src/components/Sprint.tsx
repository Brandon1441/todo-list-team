import React, { useState, useEffect } from "react";
import EditarTareaModal from "../modals/EditarTareaModal";
import { useTareas } from "../hooks/useTareas";
import { ITarea } from "../types/ITareas";

const Sprint = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState<ITarea | null>(null);

  const {
    tareas,
    cargarTareas,
    agregarTarea,
    modificarTarea,
    borrarTareaPorId,
  } = useTareas();

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleGuardarTarea = async (tarea: ITarea) => {
    if (tareaEditando) {
      await modificarTarea(tarea);
    } else {
      await agregarTarea(tarea);
    }
    setMostrarModal(false);
    setTareaEditando(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Nombre de la sprint: Sprint 122
      </h2>

      <button
        className="bg-blue-700 text-white px-3 py-1 rounded mb-4"
        onClick={() => {
          setTareaEditando(null);
          setMostrarModal(true);
        }}
      >
        Crear tarea ➕
      </button>

      <EditarTareaModal
        visible={mostrarModal}
        onClose={() => {
          setMostrarModal(false);
          setTareaEditando(null);
        }}
        onEditar={handleGuardarTarea}
        tarea={tareaEditando}
      />

      <div className="grid grid-cols-3 gap-4">
        {/* Pendiente */}
        <div className="bg-blue-100 p-4 rounded min-h-[300px]">
          <h3 className="text-xl font-semibold mb-2">Pendiente</h3>
          {/* Acá irán las tareas con estado pendiente */}
        </div>

        {/* En progreso */}
        <div className="bg-blue-100 p-4 rounded min-h-[300px]">
          <h3 className="text-xl font-semibold mb-2">En progreso</h3>

          <div className="bg-gray-200 p-3 rounded space-y-1">
            <p>
              <strong>Titulo:</strong> Tarea 2
            </p>
            <p>
              <strong>Descripción:</strong> Estamos aca...
            </p>
            <p>
              <strong>Fecha límite:</strong> 2025-03-06
            </p>
            <div className="flex gap-1 flex-wrap">
              <span className="bg-green-500 text-white px-2 rounded text-xs">
                Enviar al backlog
              </span>
              <span className="bg-yellow-500 text-white px-2 rounded text-xs">
                en_progreso
              </span>
              <button className="bg-blue-600 p-1 rounded text-white">👁️</button>
              <button
                className="bg-blue-500 p-1 rounded text-white"
                onClick={() => {
                  // 🟡 cuando uses tareas reales, pasá la tarea del map
                  setTareaEditando({
                    id: "2",
                    titulo: "Tarea 2",
                    descripcion: "Estamos aca...",
                    estado: "en_progreso",
                    fechaLimite: "2025-03-06",
                  });
                  setMostrarModal(true);
                }}
              >
                ✏️
              </button>
              <button className="bg-red-600 p-1 rounded text-white">🗑️</button>
            </div>
          </div>
        </div>

        {/* Completado */}
        <div className="bg-blue-100 p-4 rounded min-h-[300px]">
          <h3 className="text-xl font-semibold mb-2">Completado</h3>

          <div className="bg-gray-200 p-3 rounded space-y-1">
            <p>
              <strong>Titulo:</strong> Tarea backlog
            </p>
            <p>
              <strong>Descripción:</strong> Descripción tarea back...
            </p>
            <p>
              <strong>Fecha límite:</strong> 2025-03-05
            </p>
            <div className="flex gap-1 flex-wrap">
              <span className="bg-green-500 text-white px-2 rounded text-xs">
                Enviar al backlog
              </span>
              <span className="bg-green-700 text-white px-2 rounded text-xs">
                completado
              </span>
              <button className="bg-blue-600 p-1 rounded text-white">👁️</button>
              <button
                className="bg-blue-500 p-1 rounded text-white"
                onClick={() => {
                  setTareaEditando({
                    id: "3",
                    titulo: "Tarea backlog",
                    descripcion: "Descripción tarea back...",
                    estado: "completado",
                    fechaLimite: "2025-03-05",
                  });
                  setMostrarModal(true);
                }}
              >
                ✏️
              </button>
              <button className="bg-red-600 p-1 rounded text-white">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sprint;
