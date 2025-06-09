import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

export interface Inscripcion {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fecha_inscripcion: string;
  estado: string;
}

export interface InscripcionesPaginada {
  total: number;
  currentPage: number;
  totalPages: number;
  inscripciones: Inscripcion[];
}

export interface InscripcionCreate {
  nombre: string;
  email: string;
  telefono: string;
}



export const crearInscripcion = async (
  inscripcionData: InscripcionCreate
): Promise<Inscripcion> => {
  try {
    const { data } = await apiClient.post("/inscripciones", inscripcionData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error de Axios:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Error al crear la inscripción"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Ocurrió un error inesperado al crear la inscripción");
    }
  }
};

export const getInscripciones = async (
  page = 1
): Promise<InscripcionesPaginada> => {
  try {
    const { data } = await apiClient.get("/inscripciones", {
      params: { page },
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error al obtener noticias:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error || "Error al obtener las noticias"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Ocurrió un error inesperado al obtener las noticias");
    }
  }
};

export const actualizarEstadoInscripcion = async (
  id: number,
  estado: string
): Promise<Inscripcion> => {
  try {
    const { data } = await apiClient.patch(
      `/inscripciones/${id}/estado`,
      {estado}
    );
    return data.inscripcion;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error de Axios:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Error al actualizar el estado"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Ocurrió un error inesperado al actualizar el estado");
    }
  }
};

export const deleteInscripcion = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/inscripciones/${id}`);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Error al eliminar noticia:",
        error.response?.data || error.message
      );
      throw new Error(
        error.response?.data?.error || "Error al eliminar la noticia"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Ocurrió un error inesperado al eliminar la noticia");
    }
  }
};
