import { useShallow } from "zustand/shallow";
import { tareaStore } from "../store/tareaStore";
import { ITarea } from "../types/ITareas";
import {
    editarTarea,
    eliminarTareaPorID,
    getAllTareas,
    postNuevaTarea,
} from "../http/tareas";
import Swal from "sweetalert2";

export const useTareas = () => {
    const {
        listaTareas,
        actualizarTareas,
        insertarTarea,
        borrarTarea,
        actualizarTarea,
    } = tareaStore(
        useShallow((state) => ({
            listaTareas: state.tareas,
            actualizarTareas: state.setArrayTareas,
            insertarTarea: state.agregarTarea,
            borrarTarea: state.eliminarTarea,
            actualizarTarea: state.editarTarea,
        }))
    );

    const cargarTareas = async () => {
        const datos = await getAllTareas();
        if (datos) actualizarTareas(datos);
    };

    const agregarTarea = async (tarea: ITarea) => {
        insertarTarea(tarea);
        try {
            await postNuevaTarea(tarea);
            Swal.fire("Éxito", "Tarea creada correctamente", "success");
        } catch (err) {
            borrarTarea(tarea.id!);
            console.error("Error al crear tarea:", err);
        }
    };

    const modificarTarea = async (actualizada: ITarea) => {
        const copiaAnterior = listaTareas.find((t) => t.id === actualizada.id);
        actualizarTarea(actualizada);

        try {
            await editarTarea(actualizada);
            Swal.fire("Actualizado", "Tarea editada con éxito", "success");
        } catch (err) {
            if (copiaAnterior) actualizarTarea(copiaAnterior);
            console.error("Error al editar tarea:", err);
        }
    };

    const borrarTareaPorId = async (id: string) => {
        const tareaBackup = listaTareas.find((t) => t.id === id);

        const confirmacion = await Swal.fire({
            title: "¿Estás seguro?",
            text: "No vas a poder deshacer esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (!confirmacion.isConfirmed) return;

        borrarTarea(id);
        try {
            await eliminarTareaPorID(id);
            Swal.fire("Eliminado", "Tarea eliminada correctamente", "success");
        } catch (err) {
            if (tareaBackup) insertarTarea(tareaBackup);
            console.error("Error al eliminar tarea:", err);
        }
    };

    return {
        cargarTareas,
        agregarTarea,
        modificarTarea,
        borrarTareaPorId,
        tareas: listaTareas,
    };
};
