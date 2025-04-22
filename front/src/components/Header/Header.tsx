import { Separator } from "@/components/ui/separator";
import logo from "../../assets/logo-rc.png";

function Header() {
  const items = ["Quiénes Somos", "Novedades", "Cursos", "Servicios"];

  return (
    <>
      <div className="flex justify-self-center">
        <img src={logo} alt="" className="w-30 mt-5" />
      </div>
      <Separator className="my-4" />
      <div className="flex justify-between ml-15 mr-15 font-sans">
        <div className="text-lg">
          <h1 className="text-lg">
            Chaco Radio Club
            <span className="text-red-700 font-semibold font-mono ">
              {" "}
              LU4GF
            </span>
          </h1>
        </div>
        <div className="flex flex-row">
          {items.map((item) => (
            <h1 className="ml-8 text-lg hover:text-stone-500">{item}</h1>
          ))}
          <h1 className="ml-8 text-lg text-red-700 hover:text-red-600">
            Asociáte!
          </h1>
        </div>
      </div>
      <Separator className="my-4" />
    </>
  );
}

export default Header;
