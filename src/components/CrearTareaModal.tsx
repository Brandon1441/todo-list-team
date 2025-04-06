import React from "react";

type CrearTareaModalProps = {
  visible: boolean;
  onClose: () => void;
  onCrear: (tarea: {
    titulo: string;
    descripcion: string;
    estado: string;
    fechaLimite: string;
  }) => void;
};

const CrearTareaModal: React.FC<CrearTareaModalProps> = ({
  visible,
  onClose,
  onCrear,
}) => {
  const [titulo, setTitulo] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [estado, setEstado] = React.useState("pendiente");
  const [fechaLimite, setFechaLimite] = React.useState("");

  const handleCrear = () => {
    if (!titulo || !descripcion || !fechaLimite) return alert("Faltan campos");
    onCrear({ titulo, descripcion, estado, fechaLimite });
    setTitulo("");
    setDescripcion("");
    setEstado("pendiente");
    setFechaLimite("");
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Crear nueva tarea</h2>

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
            onClick={handleCrear}
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearTareaModal;
