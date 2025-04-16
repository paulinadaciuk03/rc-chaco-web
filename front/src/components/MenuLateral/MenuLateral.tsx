import { Separator } from "@/components/ui/separator";
import { Input } from "../ui/input";
function MenuLateral() {
  return (
    <>
      <div className="flex flex-col items-center w-150">
        <h1 className="text-2xl font-bold mb-5 mt-10 underline underline-offset-10 decoration-neutral-300">BUSCAR</h1>
        <Input className="w-60"></Input>
        <Separator className="mt-10 mb-10"></Separator>
        <h1 className="text-2xl font-bold mb-5 mt-3">SERVICIOS</h1>
        <ul className="list-inside">
          <li className="mb-2">Trámites</li>
          <li className="mb-2">Servicios a los socios</li>
          <li className="mb-2">Cursos</li>
          <li className="mb-2">Contactos</li>
        </ul>
      </div>
    </>
  );
}

export default MenuLateral;
