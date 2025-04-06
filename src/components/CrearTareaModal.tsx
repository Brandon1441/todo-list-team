import React, { useEffect } from "react";
import { ITarea } from "../types/ITareas";
import Swal from "sweetalert2";

type CrearTareaModalProps = {
  visible: boolean;
  onClose: () => void;
  onCrear: (tarea: ITarea) => void;
  tareaEditar?: ITarea | null;
};

const CrearTareaModal: React.FC<CrearTareaModalProps> = ({
  visible,
  onClose,
  onCrear,
  tareaEditar,
}) => {
  const [titulo, setTitulo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [estado, setEstado] = React.useState("pendiente");
  const [fechaLimite, setFechaLimite] = React.useState("");


  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.titulo);
      setDescripcion(tareaEditar.descripcion);
      setEstado(tareaEditar.estado);
      setFechaLimite(tareaEditar.fechaLimite?.slice(0, 10) || "");
    } else {
      setTitulo("");
      setDescripcion("");
      setEstado("pendiente");
      setFechaLimite("");
    }
  }, [tareaEditar, visible]);

  const handleGuardar = () => {
    if (!titulo || !descripcion || !fechaLimite)
      return Swal.fire("Atención", "No puede dejar campos vacios", "info");

    const tarea = {
      ...tareaEditar,
      titulo,
      descripcion,
      estado,
      fechaLimite,
    };

    onCrear(tarea);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {tareaEditar ? "Editar tarea" : "Crear nueva tarea"}
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            placeholder="Título"
            className="w-full border px-3 py-2 rounded"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <textarea
            placeholder="Descripción"
            className="w-full border px-3 py-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <select
            className="w-full border px-3 py-2 rounded"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En progreso</option>
            <option value="completado">Completado</option>
          </select>

          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            className="px-4 py-2 rounded bg-gray-400 text-white"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white"
            onClick={handleGuardar}
          >
            {tareaEditar ? "Guardar cambios" : "Crear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearTareaModal;
