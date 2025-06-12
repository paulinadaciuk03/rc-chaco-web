import { AxiosError } from "axios";
import apiClient from "./axiosConfig";
import { ComentarioResponse, ImagenInput, ImagenResponse } from "./NoticiasService";

export interface PublicacionData {
    titulo: string;
    descripcion: string;
    usuario_id: number;
    imagenes: ImagenInput[];
  }

  export interface UsuarioPublicacion {
    id:number;
    nombre:string;
    email?: string;
  }

  export interface PublicacionResponse {
    id: number;
    titulo: string;
    descripcion: string;
    usuario_id: number;
    fecha_publicacion: string;
    imagenes: ImagenResponse[];
    usuario?: UsuarioPublicacion;
  }

  export interface PublicacionPreview {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion: string;
    imagen_portada?:string;
    usuario? : UsuarioPublicacion;
}


export interface PublicacionesPaginadas {
    total: number;
    currentPage: number;
    totalPages: number;
    publicaciones: PublicacionPreview[];
}

export interface ComentarioDataPublicacion {
    publicacion_id: number;
    usuario_id: number;
    texto: string;
  }

export const crearPublicacion = async (
    publicacionData: PublicacionData
  ): Promise<PublicacionResponse> => {
    try {
      const { data } = await apiClient.post("/publicaciones", publicacionData);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error de Axios:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al crear la publicacion"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al crear la publicacion");
      }
    }
  };

  export const getPublicaciones = async (page = 1): Promise<PublicacionesPaginadas> => {
    try {
      const { data } = await apiClient.get("/publicaciones", {
        params: { page },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener publicaciones:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al obtener las publicaciones"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al obtener las publicaciones");
      }
    }
  };

  export const getPublicacionById = async (id: number ): Promise<PublicacionResponse> => {
    try {
      const { data } = await apiClient.get(`/publicaciones/${id}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener publicación:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al obtener la publicación"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al obtener la publicación");
      }
    }
  }

  export const eliminarPublicacion = async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/publicaciones/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al eliminar publicacion:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al eliminar la publicacion"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al eliminar la publicacion");
      }
    }
  };

  export const updatePublicacion = async (id: number, publicacionData: PublicacionData): Promise<void> => {
    try {
      await apiClient.put(`/publicaciones/${id}`, publicacionData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al editar publicacion:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al editar la publicacion"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al editar la publicacion");
      }
    }
  };

  export const getComentariosByPublicacion = async (
    publicacionId: number,
    page: number,
  ): Promise<ComentarioResponse> => {
    try {
      const { data } = await apiClient.get(
        `/comentarios-publicaciones/publicacion/${publicacionId}?page=${page}`
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener comentarios:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al obtener comentarios"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al obtener comentarios");
      }
    }
  };
  
  export const crearComentarioPublicacion = async (comentario: ComentarioDataPublicacion): Promise<ComentarioResponse> => {
    try {
      const { data } = await apiClient.post("/comentarios-publicaciones", comentario);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al crear comentario:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al crear comentario"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al crear el comentario");
      }
    }
  };

  export const eliminarComentarioPublicacion = async (comentarioId: number): Promise<void> => {
    try {
      await apiClient.delete(`/comentarios-publicaciones/${comentarioId}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al eliminar comentario:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al eliminar el comentario"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al eliminar el comentario");
      }
    }
  };
