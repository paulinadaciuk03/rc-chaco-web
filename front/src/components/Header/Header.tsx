import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, getUserRole, logout } from "@/services/AuthService";
import logoutIcon from "../../assets/logout.svg";
import { useState } from "react";
import { Menu } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAuth = isLoggedIn();
  const rol = getUserRole();
  const perfilPath = rol === "admin" ? "/admin" : "/perfil";

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
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <Menu />
        </button>

        {/* Menu (hidden on small screens) */}
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

          {isAuth ? (
            <>
              <Link to={perfilPath} className="hover:text-stone-500">
                Perfil
              </Link>
              <button onClick={handleLogout}>
                <img
                  src={logoutIcon}
                  alt="Cerrar sesión"
                  className="w-5 ml-2"
                />
              </button>
            </>
          ) : (
            <Link to="/register" className="text-red-700 hover:text-red-500">
              ¡Asociate!
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile menu (visible when menuOpen) */}
      {menuOpen && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen} ? px-4 pb-4 space-y-2 text-base`}
        >
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

          {isAuth ? (
            <>
              <Link to={perfilPath} className="block hover:text-stone-500">
                Perfil
              </Link>
              <button onClick={handleLogout} className="flex items-center">
                <img
                  src={logoutIcon}
                  alt="Cerrar sesión"
                  className="w-5 mr-2"
                />
                Cerrar sesión
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="block text-red-700 hover:text-red-500"
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
