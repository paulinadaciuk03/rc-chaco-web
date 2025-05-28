import { Separator } from "@/components/ui/separator";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Book, Menu, Newspaper, Settings, UserRoundCog } from "lucide-react";
import { getUser, getUserRole, isLoggedIn } from "@/api/authUtils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [role, setRole] = useState(getUserRole());
  const [user, setUser] = useState(getUser());
  const location = useLocation();

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setRole(getUserRole());
    setUser(getUser());
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    setLoggedIn(false);
    setUser(null);
    setRole(null);
    window.location.href = "/";
  };

  const obtenerIniciales = (nombreCompleto: string): string => {
    if (!nombreCompleto) return "";
    return nombreCompleto
      .trim()
      .split(" ")
      .filter((palabra) => palabra.length > 0)
      .map((palabra) => palabra[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <header className="w-full mx-auto bg-white">
      <div className="container mx-auto px-4 mb-4 py-2 mt-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="ml-2">
            <h1 className="md:text-lg font-semibold">
              Chaco Radio Club{" "}
              <span className="text-red-700 font-mono">LU4GF</span>
            </h1>
          </div>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          {loggedIn && (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback>
                    {obtenerIniciales(user?.nombre ?? "")}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center my-3">
                  <Avatar>
                    <AvatarFallback>
                      {obtenerIniciales(user?.nombre ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="mx-4">{user?.nombre}</h1>
                </div>
                <div className="flex items-center">
                  <Settings />
                  <Link to="/configuracion" className="m-3 cursor-pointer">Configuración</Link>
                </div>
                {role === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <h1 className="m-3">Gestionar usuarios</h1>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <h1 className="m-3">Inscripciones</h1>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <h1 className="m-3">Publicar noticia</h1>
                    </div>
                  </>
                )}
                <Separator />
                <Button onClick={handleLogout} className="my-3">
                  Cerrar sesión
                </Button>
              </PopoverContent>
            </Popover>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700 focus:outline-none ml-3"
          >
            <Menu />
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 text-l font-sans items-center">
          <Link to="/quienes-somos" className="hover:text-stone-500">
            Quiénes Somos
          </Link>
          <Link to="/cursos" className="hover:text-stone-500">
            Cursos
          </Link>
          <span className="hover:text-stone-500 cursor-pointer">Novedades</span>
          <span className="hover:text-stone-500 cursor-pointer">Servicios</span>
          <span className="hover:text-stone-500 cursor-pointer">Foro</span>

          {loggedIn ? (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback>
                    {obtenerIniciales(user?.nombre ?? "")}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center my-3">
                  <Avatar>
                    <AvatarFallback>
                      {obtenerIniciales(user?.nombre ?? "")}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="mx-4">{user?.nombre}</h1>
                </div>
                <div className="flex items-center">
                  <Settings />
                  <Link to="/configuracion" className="m-3 cursor-pointer">Configuración</Link>
                </div>
                {role === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <h1 className="m-3">Gestionar usuarios</h1>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <h1 className="m-3">Inscripciones</h1>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <h1 className="m-3">Publicar noticia</h1>
                    </div>
                  </>
                )}
                <Separator />
                <Button onClick={handleLogout} className="my-3">
                  Cerrar sesión
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link to="/register" className="text-red-700 hover:text-red-500">
              ¡Asociate!
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base">
          <Link to="/quienes-somos" className="block hover:text-stone-500">
            Quiénes Somos
          </Link>
          <Link to="/cursos" className="block hover:text-stone-500">
            Cursos
          </Link>
          <span className="block hover:text-stone-500 cursor-pointer">
            Novedades
          </span>
          <span className="block hover:text-stone-500 cursor-pointer">
            Servicios
          </span>
          <span className="block hover:text-stone-500 cursor-pointer">
            Foro
          </span>
          {!loggedIn && (
            <Link to="/register" className="text-red-700 hover:text-red-500">
              ¡Asociate!
            </Link>
          )}
        </div>
      )}

      <Separator className="my-2" />
    </header>
  );
}

export default Header;
