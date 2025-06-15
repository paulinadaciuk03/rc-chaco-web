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
  const [popoverOpen, setPopoverOpen] = useState(false);
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

  const handleLinkClick = () => {
    setPopoverOpen(false);
    setMenuOpen(false);
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

        {/* Mobile menu button */}
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
                  <Link to="/configuracion" onClick={handleLinkClick} className="m-3 cursor-pointer">
                    Configuración
                  </Link>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Link to="/publicar" onClick={handleLinkClick} className="m-3 cursor-pointer">
                    Hacer una publicación
                  </Link>
                </div>
                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Link to="/gestionar-usuarios" onClick={handleLinkClick} className="m-3">
                        Gestionar usuarios
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Link to="/inscripciones" onClick={handleLinkClick} className="m-3">
                        Inscripciones
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Link to="/publicar-noticia" onClick={handleLinkClick} className="m-3 cursor-pointer">
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
          <Link to="/quienes-somos" className="hover:text-stone-500">
            Quiénes Somos
          </Link>
          <Link to="/cursos" className="hover:text-stone-500">
            Cursos
          </Link>
          <Link to="/novedades" className="hover:text-stone-500 cursor-pointer">
            Novedades
          </Link>
          <Link to="/servicios" className="hover:text-stone-500 cursor-pointer">
            Servicios
          </Link>
          <Link to="/publicaciones" className="hover:text-stone-500 cursor-pointer">
            Foro
          </Link>

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
                  <Link to="/configuracion" onClick={handleLinkClick} className="m-3 cursor-pointer">
                    Configuración
                  </Link>
                </div>
                <Separator />
                <div className="flex items-center">
                  <Newspaper />
                  <Link to="/publicar" onClick={handleLinkClick} className="m-3 cursor-pointer">
                    Hacer una publicación
                  </Link>
                </div>
                {rol === "admin" && (
                  <>
                    <Separator />
                    <div className="flex items-center">
                      <UserRoundCog />
                      <Link to="/gestionar-usuarios" onClick={handleLinkClick} className="m-3">
                        Gestionar usuarios
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Book />
                      <Link to="/inscripciones" onClick={handleLinkClick} className="m-3">
                        Inscripciones
                      </Link>
                    </div>
                    <Separator />
                    <div className="flex items-center">
                      <Newspaper />
                      <Link to="/publicar-noticia" onClick={handleLinkClick} className="m-3 cursor-pointer">
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
          <Link to="/quienes-somos" onClick={handleLinkClick} className="block hover:text-stone-500">
            Quiénes Somos
          </Link>
          <Link to="/cursos" onClick={handleLinkClick} className="block hover:text-stone-500">
            Cursos
          </Link>
          <Link to="/novedades" onClick={handleLinkClick} className="block hover:text-stone-500 cursor-pointer">
            Novedades
          </Link>
          <Link to="/servicios" onClick={handleLinkClick} className="block hover:text-stone-500 cursor-pointer">
            Servicios
          </Link>
          <Link to="/publicaciones" onClick={handleLinkClick} className="block hover:text-stone-500 cursor-pointer">
            Foro
          </Link>
          {!loggedIn && (
            <Link to="/register" onClick={handleLinkClick} className="text-red-700 hover:text-red-500">
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
