import { AxiosError } from "axios";
import apiClient from "./axiosConfig";
import { Usuario } from "@/store/userStore";

export interface UpdateUserData {
  username?: string;
  nombre?: string;
  email?: string;
}

export interface Credentials {
    email: string;
    password: string;
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


export interface LoginSuccessData {
    token: string;
    user: Usuario;
  }
  

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

 
export const cambiarContraseña = async (
  currentPass: string,
  newPass: string,
  userId: number
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.put("/change-password", {
      currentPassword: currentPass,
      newPassword: newPass,
      userId,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error: unknown) {
    console.error("Error al cambiar contraseña:", error);
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message
        : "Error al cambiar la contraseña";

    return {
      success: false,
      message,
    };
  }
};

export const actualizarUsuario = async (id: number, data: UpdateUserData) => {
  try{
    const response = await apiClient.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    throw error;
  }
}

export const getUserById = async (id: number) => {
  try {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  } catch( error) {
    console.error("Error al obtener el usuario", error);
    throw error;
  }
}

export const asignarPassword = async(id: number) => {
  try {
    const response = await apiClient.post('/asignar-password', {userId : id});
    return response;
  } catch ( error) {
    console.error("Error al asignar la contraseña");
    throw error;
  }
}
