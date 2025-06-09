import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

export interface UsuariosGet {
    id: number,
    username: string,
    nombre: string,
    email: string,
    rol: string
}

export interface UsuariosPaginados{
    total: number,
    currentPage:number,
    totalPages: number,
    usuarios:  UsuariosGet[];
}

export const getUsuarios = async ( page : number, rol? : string): Promise<UsuariosPaginados> => {
    try {
        const {data} = await apiClient.get("/users", {
            params: {page, ...(rol ? {rol} : {})},
        });
        return data;
    } catch( error) {
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
}


