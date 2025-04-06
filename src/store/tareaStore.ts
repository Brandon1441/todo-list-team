import { create } from "zustand";
import { ITarea } from "../types/ITareas";

interface EstadoTareas {
    tareas: ITarea[];
    seleccionada: ITarea | null;
    setSeleccionada: (tarea: ITarea | null) => void;
    setArrayTareas: (lista: ITarea[]) => void;
    agregarTarea: (nueva: ITarea) => void;
    editarTarea: (actualizada: ITarea) => void;
    eliminarTarea: (id: string) => void;
}

export const tareaStore = create<EstadoTareas>((set) => ({
    tareas: [],
    seleccionada: null,
    setArrayTareas: (lista) => set(() => ({ tareas: lista })),
    agregarTarea: (nueva) =>
        set((estado) => ({ tareas: [...estado.tareas, nueva] })),

    editarTarea: (actualizada) =>
        set((estado) => {
            const modificadas = estado.tareas.map((t) =>
                t.id === actualizada.id ? { ...t, ...actualizada } : t
            );
            return { tareas: modificadas };
        }),

    eliminarTarea: (id) =>
        set((estado) => {
            const restantes = estado.tareas.filter((t) => t.id !== id);
            return { tareas: restantes };
        }),

    setSeleccionada: (tarea) => set(() => ({ seleccionada: tarea })),
}));
