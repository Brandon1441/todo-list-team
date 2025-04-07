import React, { useState, useEffect } from "react";
import { ITarea } from "../types/ITareas";

interface Props {
  visible: boolean;
  onClose: () => void;
  onEditar: (tarea: ITarea) => Promise<void>;
  tarea: ITarea | null;
}

const EditarTareaModal: React.FC<Props> = ({ visible, onClose, onEditar, tarea }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    if (tarea) {
      setTitulo(tarea.titulo);
      setDescripcion(tarea.descripcion);
    }
  }, [tarea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tarea) return;

    const tareaActualizada: ITarea = {
      ...tarea,
      titulo,
      descripcion,
    };

    onEditar(tareaActualizada);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Guardar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarTareaModal;
