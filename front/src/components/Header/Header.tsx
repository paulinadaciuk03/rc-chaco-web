import { Separator } from "@/components/ui/separator";
import logo from "../../assets/logo-rc.png";

function Header() {
  return (
    <>
      <div className="flex justify-self-center">
        <img src={logo} alt="" className="w-30 mt-5"/>
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between ml-15 mr-15 font-sans">
        <div className="text-lg">
          <h1 className="text-sky-950 text-lg">
            Chaco Radio Club <span className="text-red-700 ">LU4GF</span>
          </h1>
        </div>
        <div className="flex flex-row">
          <h1 className="text-sky-950 ml-8 text-lg">Quiénes Somos</h1>
          <h1 className="text-sky-950 ml-8 text-lg">Novedades</h1>
          <h1 className="text-sky-950 ml-8 text-lg">Cursos</h1>
          <h1 className="text-sky-950 ml-8 text-lg">Servicios</h1>
          <h1 className="text-sky-950 ml-8 text-lg">Contacto</h1>
          <h1 className="text-red-700 ml-8 text-lg">Asociáte!</h1>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}

export default Header;
