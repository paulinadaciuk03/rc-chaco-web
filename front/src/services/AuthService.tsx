// src/services/authService.ts
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface LoginCredentials {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: number;
  username: string;
  rol: string;
  exp: number;
}

export async function login(credentials: LoginCredentials): Promise<JwtPayload> {
  const res = await axios.post("http://localhost:5000/login", credentials);
  const { token } = res.data;

  localStorage.setItem("token", token);
  const decoded = jwtDecode<JwtPayload>(token);

  return decoded;
}
export function getToken(): string | null {
    return localStorage.getItem("token");
  }

export function isLoggedIn(): boolean {
    const token = getToken();
    if(!token) return false;
    try {
        const { exp } = jwtDecode<JwtPayload>(token);
        return exp * 1000 > Date.now(); // verifica expiración
      } catch {
        return false;
      }
}


export function logout() {
    localStorage.removeItem("token");
}

export function getUser(): JwtPayload | null {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}

export function getUserRole(): string | null {
  const user = getUser();
  return user ? user.rol : null;
}