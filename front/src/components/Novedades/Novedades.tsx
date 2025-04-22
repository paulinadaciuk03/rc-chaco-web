import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function Novedades() {
  return (
    <>
      <Card className="w-200 mt-20 mb-20">
        <CardHeader>
          <CardTitle className="text-center">Noticia</CardTitle>
          <CardDescription>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo tempore excepturi consectetur ex ullam fugit eligendi iusto aliquid provident incidunt?...</CardDescription>
          <CardFooter className="flex flex-col justify-content-center">
            <Button>Leer más...</Button>
          </CardFooter>
        </CardHeader>
      </Card>
    </>
  );
}

export default Novedades;
