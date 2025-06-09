
import { create } from "zustand";

export interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  }

export interface UserState {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    clearUser: () => void;
    logout: () => void;
    isLoggedIn: boolean;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user, isLoggedIn: !!user }),
    clearUser: () => set({ user: null, isLoggedIn:false }),
    logout: () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        set({ user: null, isLoggedIn: false });
      },
      isLoggedIn: false,
  }));