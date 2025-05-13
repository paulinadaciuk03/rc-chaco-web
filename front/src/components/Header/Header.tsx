import { Separator } from "@/components/ui/separator";
import logo from "../../assets/logo-rc.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to={"/"} className="flex justify-self-center">
        <img src={logo} alt="" className="w-30 mt-5" />
      </Link>
      <Separator className="my-4" />
      <div className="flex justify-between ml-15 mr-15 font-sans">
        <div className="text-lg">
          <Link to={"/"} className="text-lg">
            Chaco Radio Club
            <span className="text-red-700 font-semibold font-mono ">
              {" "}
              LU4GF
            </span>
          </Link>
        </div>
        <div className="flex flex-row">
          <Link to={"/quienes-somos"} className="ml-8 text-lg hover:text-stone-500">Quiénes Somos</Link>
          <h1 className="ml-8 text-lg hover:text-stone-500">Novedades</h1>
          <Link to={'/cursos'} className="ml-8 text-lg hover:text-stone-500">Cursos</Link>
          <h1 className="ml-8 text-lg hover:text-stone-500">Servicios</h1>
          <h1 className="ml-8 text-lg hover:text-stone-500">Foro</h1>
          <Link to={"/register"} className="ml-8 text-lg text-red-700 hover:text-red-600">
            Asociáte!
          </Link>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}

export default Header;
