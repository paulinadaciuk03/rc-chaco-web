import { KeyRound, Mail, RectangleEllipsis } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function Configuracion() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-center items-center my-5 flex-col items-center">
        <h1 className="font-bold md:text-3xl text-sky-950 text-2xl my-5">
          Mi cuenta
        </h1>
        <div className="grid grid-cols-1 gap-5">
          <Card>
            <CardContent className="flex">
                <Mail className="mr-2"/>
              <h1>Cambiar email</h1>
            </CardContent>
          </Card>
          <Card>
            <CardContent  className="flex">
            <KeyRound className="mr-2"/>
              <h1>Cambiar contraseña</h1>
            </CardContent>
          </Card>
          <Card>
            <CardContent  className="flex">
            <RectangleEllipsis className="mr-2"/>
              <h1>Editar mis datos</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
