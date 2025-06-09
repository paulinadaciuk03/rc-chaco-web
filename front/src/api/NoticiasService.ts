import apiClient from "./axiosConfig";
import { AxiosError } from "axios";


export interface ImagenInput{
  url_imagen: string;
}

export interface NoticiaData {
  titulo: string;
  descripcion: string;
  admin_id: number;
  imagenes: ImagenInput[];
}

export interface ImagenResponse {
  id: number;
  noticia_id: number;
  url_imagen: string;
}

export interface Admin {
  id:number;
  nombre:string;
  email?: string;
}


export interface NoticiaResponse {
  id: number;
  titulo: string;
  descripcion: string;
  admin_id: number;
  fecha_publicacion: string;
  imagenes: ImagenResponse[];
  admin?: Admin;
}

export interface NoticiaPreview {
    id: number;
    titulo: string;
    descripcion: string;
    fecha_publicacion: string;
    imagen_portada?:string;
    admin? : Admin;
}

export interface NoticiasPaginadas {
    total: number;
    currentPage: number;
    totalPages: number;
    noticias: NoticiaPreview[];
}

export interface ComentarioData {
  noticia_id: number;
  usuario_id: number;
  texto: string;
}

export interface Comentario {
  id: number;
  noticia_id: number;
  usuario_id: number;
  texto: string;
  fecha_creacion: string;
  usuario?: {
    id: number;
    nombre: string;
    rol_id: number;
  };
}

export interface ComentarioResponse {
  total: number;
  currentPage: number,
  totalPages: number,
  comentarios: Comentario[];

}

export const crearNoticia = async (
  noticiaData: NoticiaData
): Promise<NoticiaResponse> => {
  try {
    const { data } = await apiClient.post("/noticias", noticiaData);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error de Axios:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error || "Error al crear la noticia"
      );
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Ocurrió un error inesperado al crear la noticia");
    }
  }
};

export const getNoticias = async (page = 1): Promise<NoticiasPaginadas> => {
    try {
      const { data } = await apiClient.get("/noticias", {
        params: { page },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener noticias:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al obtener las noticias"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al obtener las noticias");
      }
    }
  };

  export const getNoticiaById = async (id: number ): Promise<NoticiaResponse> => {
    try {
      const { data } = await apiClient.get(`/noticias/${id}`);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al obtener noticia:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al obtener la noticia"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al obtener la noticia");
      }
    }
  }

  export const eliminarNoticia = async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/noticias/${id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al eliminar noticia:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al eliminar la noticia"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al eliminar la noticia");
      }
    }
  };

    export const updateNoticia = async (id: number, noticiaData: NoticiaData): Promise<void> => {
    try {
      await apiClient.put(`/noticias/${id}`, noticiaData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Error al editar noticia:", error.response?.data || error.message);
        throw new Error(
          error.response?.data?.error || "Error al editar la noticia"
        );
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ocurrió un error inesperado al editar la noticia");
      }
    }
  };


  export const getComentariosByNoticia = async (
    noticiaId: number,
    page: number,
  ): Promise<ComentarioResponse> => {
    try {
      const { data } = await apiClient.get(
        `/comentarios-noticias/noticia/${noticiaId}?page=${page}`
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
  
  // Crear un nuevo comentario
  export const crearComentario = async (comentario: ComentarioData): Promise<ComentarioResponse> => {
    try {
      const { data } = await apiClient.post("/comentarios-noticias", comentario);
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
  
  // Eliminar comentario por ID
  export const eliminarComentario = async (comentarioId: number): Promise<void> => {
    try {
      await apiClient.delete(`/comentarios-noticias/${comentarioId}`);
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



