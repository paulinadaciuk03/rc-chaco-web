interface Usuario {
    id: number;
    nombre: string;
    email: string;
    rol: string;
  }


export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('jwtToken');
  };
  
  export const getUserRole = (): string | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
  
    try {
      const user = JSON.parse(userStr);
      return user.rol?.rol || null; // accede a user.rol.rol (ej: "admin")
    } catch (err) {
      console.error("Error al parsear el usuario:", err);
      return null;
    }
  };

  export const getUser = (): Usuario | null => {
    const userData = localStorage.getItem('user');
    if (!userData) return null;
    try {
        const user = JSON.parse(userData);
        return user
      } catch (err) {
        console.error("Error al parsear el usuario:", err);
        return null;
      }
  }