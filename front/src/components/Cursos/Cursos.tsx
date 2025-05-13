import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function Cursos() {
  return (
    <>
      <div className="w-400 justify-self-center">
        <Header></Header>
        <h1 className="text-3xl font-bold text-sky-950 text-center">
          Inscribite al curso
        </h1>
        <div className="w-100 justify-self-center mt-10">
          <div className="flex">
            <div className="flex flex-col m-2">
              <Label>Nombre</Label>
              <Input></Input>
            </div>
            <div className="flex flex-col m-2">
              <Label>Apellido</Label>
              <Input></Input>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
