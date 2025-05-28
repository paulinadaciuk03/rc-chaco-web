import { AxiosError } from "axios";
import apiClient from "./axiosConfig";


export interface Credentials {
    email: string;
    password: string;

}

export interface User {
    id: number;
    username: string;
    rol: {
        rol: string
    };
  }

  export interface Registro {
    nombre: string,
    username: string,
    email: string
  }

interface LoginResponseSuccess {
    success: true;
    token: string;
    data: LoginSuccessData;
  }
  
  interface LoginResponseFailure {
    success: false;
    error: LoginErrorData;
  }

  // Define la estructura del data de una respuesta exitosa
export interface LoginSuccessData {
    token: string;
    user: User;
  }
  
  // Define la estructura del error que devuelve el backend
  export interface LoginErrorData {
    message: string;
    status?: number;
  }
  
  
  export type LoginResponse = LoginResponseSuccess | LoginResponseFailure;

export const login = async (credentials: Credentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post<LoginSuccessData>('/login', credentials);
  
      if (response.data && response.data.token) {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return { success: true, token, data: response.data };
      } else {
        console.error("Respuesta de login exitosa pero no se encontró el token:", response.data);
        throw new Error('Token no encontrado en la respuesta del login');
      }
  
    } catch (error: unknown) {
        let errData: LoginErrorData = {
          message: 'Error de red o del servidor',
        };
      
        if (error instanceof AxiosError && error.response) {
          // ✅ `error.response.data` ahora está tipado correctamente
          errData = error.response.data as LoginErrorData;
        } else if (error instanceof Error) {
          errData.message = error.message;
        }
      
        console.error('Error en el login:', errData.message);
      
        return {
          success: false,
          error: errData,
        };
      }
      
  };


  export const registro = async (userData : Registro) => {
    try {
        const response = apiClient.post("/register", userData);
        return response;
    } catch ( error) {
        console.error("No se pudo registrar el usuario", error);
    }

  }

