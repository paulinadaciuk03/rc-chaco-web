import { KeyRound, RectangleEllipsis } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Link } from "react-router-dom";

export default function Configuracion() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl text-sky-950">Mi cuenta</h1>
        <p className="text-gray-500 mt-2">Gestioná tu información personal</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/cambiar-pass">
          <Card className="hover:bg-sky-50 transition-colors duration-200 shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className="bg-sky-100 text-sky-700 p-2 rounded-full mr-4">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-medium">Cambiar contraseña</h2>
                <p className="text-sm text-gray-500">
                  Actualizá tu contraseña de acceso
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/editar-datos">
          <Card className="hover:bg-sky-50 transition-colors duration-200 shadow-sm">
            <CardContent className="flex items-center p-6">
              <div className="bg-sky-100 text-sky-700 p-2 rounded-full mr-4">
                <RectangleEllipsis className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-medium">Editar mis datos</h2>
                <p className="text-sm text-gray-500">
                  Cambiá tu nombre, correo o usuario
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
