import axios from "axios";
import { ITarea } from "../types/ITareas";
import { API_URL } from "../utils/constantes";

const BACKLOG_URL = `${API_URL}backlog`;

export const getAllTareas = async () => {
  try {
    const res = await axios.get(BACKLOG_URL);
    return res.data.tareas as ITarea[];
  } catch (err) {
    console.error("Error al obtener tareas", err);
  }
};

export const postNuevaTarea = async (item: ITarea) => {
  try {
    const res = await axios.get(BACKLOG_URL);
    const tareasActuales = res.data.tareas || [];
    const nuevasTareas = [...tareasActuales, item];

    const resultado = await axios.put(BACKLOG_URL, {
      tareas: nuevasTareas,
    });

    return resultado.data;
  } catch (err) {
    console.error("Error al crear tarea", err);
  }
};

export const editarTarea = async (tareaModificada: ITarea) => {
  try {
    const res = await axios.get(BACKLOG_URL);
    const tareasActuales: ITarea[] = res.data.tareas;

    const tareasActualizadas = tareasActuales.map((t) =>
      t.id === tareaModificada.id ? tareaModificada : t
    );

    const resultado = await axios.put(BACKLOG_URL, {
      tareas: tareasActualizadas,
    });

    return resultado.data;
  } catch (err) {
    console.error("Error al editar tarea", err);
  }
};

export const eliminarTareaPorID = async (id: string) => {
  try {
    const res = await axios.get(BACKLOG_URL);
    const tareasActuales: ITarea[] = res.data.tareas;

    const tareasFiltradas = tareasActuales.filter((t) => t.id !== id);

    const resultado = await axios.put(BACKLOG_URL, {
      tareas: tareasFiltradas,
    });

    return resultado.data;
  } catch (err) {
    console.error("Error al eliminar tarea", err);
  }
};
