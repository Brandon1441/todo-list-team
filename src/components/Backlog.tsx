import React, { useEffect, useState } from "react";
import CrearTareaModal from "./CrearTareaModal";
import { useTareas } from "../hooks/useTareas";
import { ITarea } from "../types/ITareas";

const Backlog = () => {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState<ITarea | null>(null);

  const {
    tareas,
    cargarTareas,
    agregarTarea,
    borrarTareaPorId,
    modificarTarea,
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
      <h2 className="text-2xl font-semibold mb-4">Tareas en el backlog</h2>

      <button
        className="bg-blue-700 text-white px-3 py-1 rounded mb-4"
        onClick={() => {
          setTareaEditando(null);
          setMostrarModal(true);
        }}
      >
        Crear tarea ➕
      </button>

      <CrearTareaModal
        visible={mostrarModal}
        onClose={() => {
          setMostrarModal(false);
          setTareaEditando(null);
        }}
        onCrear={handleGuardarTarea}
        tareaEditar={tareaEditando}
      />

      {tareas.map((tarea) => (
        <div
          key={tarea.id}
          className="bg-gray-200 p-4 mb-3 rounded flex items-center justify-between"
        >
          <p className="truncate">
            <strong>Título:</strong> {tarea.titulo}{" "}
            <strong>Descripción:</strong> {tarea.descripcion}
          </p>
          <div className="flex gap-2 items-center">
            <button className="bg-gray-600 text-white px-2 py-1 rounded">
              Enviar a
            </button>
            <select className="border px-2 py-1 rounded">
              <option>Seleccione un sprint</option>
              <option>Sprint 233</option>
            </select>
            <button className="bg-blue-600 p-1 rounded text-white">👁️</button>
            <button
              className="bg-blue-500 p-1 rounded text-white"
              onClick={() => {
                setTareaEditando(tarea);
                setMostrarModal(true);
              }}
            >
              ✏️
            </button>
            <button
              className="bg-red-600 p-1 rounded text-white"
              onClick={() => borrarTareaPorId(tarea.id!)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Backlog;
