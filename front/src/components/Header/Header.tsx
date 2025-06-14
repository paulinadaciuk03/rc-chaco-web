import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Book, Menu, Newspaper, Settings, UserRoundCog } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false); // Nuevo estado para controlar el Popover
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);

  const rol = user?.rol ?? null;
  const loggedIn = !!user;

  const handleLogout = () => {
    logout();
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

  // Función para cerrar el menú móvil y el popover
  const closeAllMenus = () => {
    setMenuOpen(false);
    setPopoverOpen(false);
  };

  return (
    <header className="w-full mx-auto bg-white">
      <div className="container mx-auto px-4 mb-4 py-2 mt-3 flex justify-between items-center">
        <Link to="/" className="flex items-center" onClick={closeAllMenus}>
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
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
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
                  <Link 
                    to="/configuracion" 
                    className="m-3 cursor-pointer"
                    onClick={closeAllMenus}
                  >
                    Configuración
                  </Link>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Link 
                    to="/publicar" 
                    className="m-3 cursor-pointer"
                    onClick={closeAllMenus}
                  >
                    Hacer una publicación
                  </Link>
                </div>
                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Link 
                        to="gestionar-usuarios" 
                        className="m-3"
                        onClick={closeAllMenus}
                      >
                        Gestionar usuarios
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Link 
                        to="/inscripciones" 
                        className="m-3"
                        onClick={closeAllMenus}
                      >
                        Inscripciones
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Link
                        to="/publicar-noticia"
                        className="m-3 cursor-pointer"
                        onClick={closeAllMenus}
                      >
                        Publicar noticia
                      </Link>
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
          <Link 
            to="/quienes-somos" 
            className="hover:text-stone-500"
            onClick={closeAllMenus}
          >
            Quiénes Somos
          </Link>
          <Link 
            to="/cursos" 
            className="hover:text-stone-500"
            onClick={closeAllMenus}
          >
            Cursos
          </Link>
          <Link 
            to="/novedades" 
            className="hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Novedades
          </Link>
          <Link 
            to="/servicios" 
            className="hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Servicios
          </Link>
          <Link
            to="/publicaciones"
            className="hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Foro
          </Link>

          {loggedIn ? (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
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
                  <Link 
                    to="/configuracion" 
                    className="m-3 cursor-pointer"
                    onClick={closeAllMenus}
                  >
                    Configuración
                  </Link>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Link 
                    to="/publicar" 
                    className="m-3 cursor-pointer"
                    onClick={closeAllMenus}
                  >
                    Hacer una publicación
                  </Link>
                </div>
                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Link 
                        to="/gestionar-usuarios" 
                        className="m-3"
                        onClick={closeAllMenus}
                      >
                        Gestionar usuarios
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Link 
                        to="/inscripciones" 
                        className="m-3"
                        onClick={closeAllMenus}
                      >
                        Inscripciones
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Link
                        to="/publicar-noticia"
                        className="m-3 cursor-pointer"
                        onClick={closeAllMenus}
                      >
                        Publicar noticia
                      </Link>
                    </div>
                    <Separator />
                  </>
                )}
                <Separator />
                <Button onClick={handleLogout} className="my-3">
                  Cerrar sesión
                </Button>
              </PopoverContent>
            </Popover>
          ) : (
            <Link 
              to="/register" 
              className="text-red-700 hover:text-red-500"
              onClick={closeAllMenus}
            >
              ¡Asociate!
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-base">
          <Link 
            to="/quienes-somos" 
            className="block hover:text-stone-500"
            onClick={closeAllMenus}
          >
            Quiénes Somos
          </Link>
          <Link 
            to="/cursos" 
            className="block hover:text-stone-500"
            onClick={closeAllMenus}
          >
            Cursos
          </Link>
          <Link
            to="/novedades"
            className="block hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Novedades
          </Link>
          <Link
            to="/servicios"
            className="block hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Servicios
          </Link>
          <Link
            to="/publicaciones"
            className="block hover:text-stone-500 cursor-pointer"
            onClick={closeAllMenus}
          >
            Foro
          </Link>
          {!loggedIn && (
            <Link 
              to="/register" 
              className="text-red-700 hover:text-red-500"
              onClick={closeAllMenus}
            >
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