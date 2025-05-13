import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface IAlertaProps{
  titulo: string,
  descripcion: string
}

const Alerta = (props: IAlertaProps) => {
  return (
    <>
      <Alert>
        <Terminal className="h-4 w-4"></Terminal>
        <AlertTitle>{props.titulo}</AlertTitle>
        <AlertDescription>{props.descripcion}</AlertDescription>
      </Alert>
    </>
  );
}

export default Alerta;
