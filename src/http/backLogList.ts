import axios from "axios";
import { IBackLogList } from "../types/IBackLogList";
import { ITarea } from "../types/ITarea";
import { API_URL } from "../utils/constantes";

// Esta función actualiza la lista completa de sprints
export const putBackLogList = async (tareas: ITarea[]): Promise<IBackLogList | undefined> => {
  try {
    const response = await axios.put<IBackLogList>(`${API_URL}/backlog`, {
      tareas: tareas,
    });
    return response.data;
  } catch (error) {
    console.error("Error al modificar base de datos:", error);
    return undefined;
  }
};