import { AxiosError } from "axios";
import apiClient from "./axiosConfig";

export const subirImagenes = async (files: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    files.forEach((file) => formData.append("imagenes", file));

    const { data } = await apiClient.post<{ urls: string[] }>(
      "/uploads/upload",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data.urls;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error al subir imágenes:", error.response?.data || error.message);
    } else {
      console.error("Error desconocido al subir imágenes:", error);
    }
    throw new Error("Error al subir las imágenes. Intente nuevamente.");
  }
};
