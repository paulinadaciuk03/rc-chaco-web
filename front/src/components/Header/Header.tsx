import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Book, Menu, Newspaper, Settings, UserRoundCog } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
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
    setPopoverOpen(false);
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

  return (
    <header className="w-full mx-auto bg-white">
      <div className="container mx-auto px-4 mb-4 py-2 mt-3 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="ml-2">
            <h1 className="md:text-lg font-semibold">
              Chaco Radio Club <span className="text-red-700 font-mono">LU4GF</span>
            </h1>
          </div>
        </Link>

        {/* Mobile */}
        <div className="md:hidden flex items-center">
          {loggedIn && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center my-3">
                  <Avatar>
                    <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
                  </Avatar>
                  <h1 className="mx-4">{user?.nombre}</h1>
                </div>

                <div className="flex items-center">
                  <Settings />
                  <Button variant="ghost" onClick={() => handleNavigate("/configuracion")} className="m-3">
                    Configuración
                  </Button>
                </div>

                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Button variant="ghost" onClick={() => handleNavigate("/publicar")} className="m-3">
                    Hacer una publicación
                  </Button>
                </div>

                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Button variant="ghost" onClick={() => handleNavigate("/gestionar-usuarios")} className="m-3">
                        Gestionar usuarios
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Button variant="ghost" onClick={() => handleNavigate("/inscripciones")} className="m-3">
                        Inscripciones
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Button variant="ghost" onClick={() => handleNavigate("/publicar-noticia")} className="m-3">
                        Publicar noticia
                      </Button>
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

        {/* Desktop */}
        <nav className="hidden md:flex space-x-6 text-l font-sans items-center">
          <Link to="/quienes-somos" className="hover:text-stone-500">Quiénes Somos</Link>
          <Link to="/cursos" className="hover:text-stone-500">Cursos</Link>
          <Link to="/novedades" className="hover:text-stone-500">Novedades</Link>
          <Link to="/servicios" className="hover:text-stone-500">Servicios</Link>
          <Link to="/publicaciones" className="hover:text-stone-500">Foro</Link>

          {loggedIn ? (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger>
                <Avatar>
                  <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex items-center my-3">
                  <Avatar>
                    <AvatarFallback>{obtenerIniciales(user?.nombre ?? "")}</AvatarFallback>
                  </Avatar>
                  <h1 className="mx-4">{user?.nombre}</h1>
                </div>

                <div className="flex items-center">
                  <Settings />
                  <Button variant="ghost" onClick={() => handleNavigate("/configuracion")} className="m-3">
                    Configuración
                  </Button>
                </div>

                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Button variant="ghost" onClick={() => handleNavigate("/publicar")} className="m-3">
                    Hacer una publicación
                  </Button>
                </div>

                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Button variant="ghost" onClick={() => handleNavigate("/gestionar-usuarios")} className="m-3">
                        Gestionar usuarios
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Button variant="ghost" onClick={() => handleNavigate("/inscripciones")} className="m-3">
                        Inscripciones
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Button variant="ghost" onClick={() => handleNavigate("/publicar-noticia")} className="m-3">
                        Publicar noticia
                      </Button>
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
      <Separator className="my-2" />
    </header>
  );
}

export default Header;
