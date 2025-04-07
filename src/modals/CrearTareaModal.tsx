import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (tarea: any) => void;
}

const CrearTareaModal = ({ isOpen, onClose, onCreate }: Props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [estado, setEstado] = useState("Pendiente");
  const [sprint, setSprint] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    const nuevaTarea = {
      titulo,
      descripcion,
      fechaLimite: fecha,
      estado,
      sprintAsignado: sprint,
    };

    onCreate(nuevaTarea);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Crear nueva tarea</h2>

        <label className="block mb-1">Título</label>
        <input
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <label className="block mb-1">Descripción</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <label className="block mb-1">Fecha límite</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        <label className="block mb-1">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        >
          <option>Pendiente</option>
          <option>En progreso</option>
          <option>Completado</option>
        </select>

        <label className="block mb-1">Sprint</label>
        <select
          value={sprint}
          onChange={(e) => setSprint(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Seleccionar sprint</option>
          <option value="Sprint 233">Sprint 233</option>
          <option value="Sprint 122">Sprint 122</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearTareaModal;
