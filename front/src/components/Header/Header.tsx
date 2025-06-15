import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Book, Menu, Newspaper, Settings, UserRoundCog } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const rol = user?.rol ?? null;
  const loggedIn = !!user;

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  const handleNavigate = (path: string) => {
    setUserMenuOpen(false);
    setMenuOpen(false);
    navigate(path);
  };

  const obtenerIniciales = (nombreCompleto: string): string => {
    return nombreCompleto
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((palabra) => palabra[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  const renderUserMenu = () => (
    <div className="absolute right-4 top-16 w-64 bg-white rounded-lg shadow-lg border z-50">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Avatar>
            <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
          </Avatar>
          <h1 className="ml-4 font-semibold">{user?.nombre}</h1>
        </div>
        <div className="space-y-2">
          <Button variant="ghost" onClick={() => handleNavigate("/configuracion")} className="w-full justify-start">
            <Settings className="mr-2" /> Configuración
          </Button>
          <Button variant="ghost" onClick={() => handleNavigate("/publicar")} className="w-full justify-start">
            <Newspaper className="mr-2" /> Hacer una publicación
          </Button>

          {rol === "admin" && (
            <>
              <Separator />
              <Button variant="ghost" onClick={() => handleNavigate("/gestionar-usuarios")} className="w-full justify-start">
                <UserRoundCog className="mr-2" /> Gestionar usuarios
              </Button>
              <Button variant="ghost" onClick={() => handleNavigate("/inscripciones")} className="w-full justify-start">
                <Book className="mr-2" /> Inscripciones
              </Button>
              <Button variant="ghost" onClick={() => handleNavigate("/publicar-noticia")} className="w-full justify-start">
                <Newspaper className="mr-2" /> Publicar noticia
              </Button>
            </>
          )}
          <Separator />
          <Button onClick={handleLogout} className="w-full">Cerrar sesión</Button>
        </div>
      </div>
    </div>
  );

  return (
    <header className="w-full mx-auto bg-white relative">
      <div className="container mx-auto px-4 mb-4 py-2 mt-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="ml-2 md:text-lg font-semibold">
            Chaco Radio Club <span className="text-red-700 font-mono">LU4GF</span>
          </h1>
        </Link>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          {loggedIn && (
            <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
              <Avatar>
                <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
              </Avatar>
            </button>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none ml-3"
          >
            <Menu />
          </button>
        </div>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6 text-l font-sans items-center">
          <Link to="/quienes-somos" className="hover:text-stone-500">Quiénes Somos</Link>
          <Link to="/cursos" className="hover:text-stone-500">Cursos</Link>
          <Link to="/novedades" className="hover:text-stone-500">Novedades</Link>
          <Link to="/servicios" className="hover:text-stone-500">Servicios</Link>
          <Link to="/publicaciones" className="hover:text-stone-500">Foro</Link>

          {loggedIn ? (
            <div className="relative">
              <button onClick={() => setUserMenuOpen(!userMenuOpen)}>
                <Avatar>
                  <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
                </Avatar>
              </button>
              {userMenuOpen && renderUserMenu()}
            </div>
          ) : (
            <Link to="/register" className="text-red-700 hover:text-red-500">¡Asociate!</Link>
          )}
        </nav>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base">
          <Link to="/quienes-somos" onClick={() => handleNavigate("/quienes-somos")} className="block hover:text-stone-500">Quiénes Somos</Link>
          <Link to="/cursos" onClick={() => handleNavigate("/cursos")} className="block hover:text-stone-500">Cursos</Link>
          <Link to="/novedades" onClick={() => handleNavigate("/novedades")} className="block hover:text-stone-500">Novedades</Link>
          <Link to="/servicios" onClick={() => handleNavigate("/servicios")} className="block hover:text-stone-500">Servicios</Link>
          <Link to="/publicaciones" onClick={() => handleNavigate("/publicaciones")} className="block hover:text-stone-500">Foro</Link>
          {!loggedIn && (
            <Link to="/register" onClick={() => handleNavigate("/register")} className="text-red-700 hover:text-red-500">¡Asociate!</Link>
          )}
        </div>
      )}

      {userMenuOpen && <div className="md:hidden absolute top-20 right-4 z-50">{renderUserMenu()}</div>}

      <Separator className="my-2" />
    </header>
  );
}

export default Header;
