import axios from "axios";
import { ITarea } from "../types/ITareas";
import { API_URL } from "../utils/constantes";

export const getAllTareas = async () => {
    try {
        const res = await axios.get<ITarea[]>(API_URL);
        return res.data;
    } catch (err) {
        console.error("Error al obtener tareas", err);
    }
};

export const postNuevaTarea = async (item: ITarea) => {
    try {
        const res = await axios.post<ITarea>(API_URL, { ...item });
        return res.data;
    } catch (err) {
        console.error("Error al crear tarea", err);
    }
};

export const editarTarea = async (tareaModificada: ITarea) => {
    try {
        const res = await axios.put<ITarea>(
            `${API_URL}/${tareaModificada.id}`,
            { ...tareaModificada }
        );
        return res.data;
    } catch (err) {
        console.error("Error al editar tarea", err);
    }
};

export const eliminarTareaPorID = async (id: string) => {
    try {
        const res = await axios.delete<ITarea>(`${API_URL}/${id}`);
        return res.data;
    } catch (err) {
        console.error("Error al eliminar tarea", err);
    }
};
