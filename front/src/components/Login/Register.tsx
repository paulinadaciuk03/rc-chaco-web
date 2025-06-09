import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { registro } from "@/api/auth";
import { toast } from "sonner";

interface RegisterInput {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
}

function Register() {
  const { register, handleSubmit, reset } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = async (data) => {
    const nuevoUser = {
      nombre: data.nombre + " " + data.apellido,
      username: data.username,
      email: data.email,
    };
    try {
      await registro(nuevoUser);
      toast.success(
        "Hemos enviado tus datos, espera la respuesta del administrador."
      );
      reset();
    } catch (error) {
      toast.error("Hubo un error al enviar tus datos :/");
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-6xl justify-self-center">
        <div className="my-10 mx-2">
          <h1 className="text-2xl text-sky-900 font-bold text-center md:text-4xl">
            ¿Querés ser parte de nuestra comunidad?
          </h1>
          <p className="mt-5 text-center">Ingresá tus datos y te contactamos</p>
          <form
            className=" justify-self-center p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="md:flex">
              <div>
                <Label htmlFor="text" className="m-2">
                  Nombre
                </Label>
                <Input {...register("nombre")} required></Input>
              </div>
              <div className=" md:ml-4 ">
                <Label htmlFor="text" className="m-2">
                  Apellido
                </Label>
                <Input {...register("apellido")} required></Input>
              </div>
            </div>
            <Label htmlFor="text" className="m-2">
              Nombre de Usuario
            </Label>
            <Input
              {...register("username", {
                required: true,
                pattern: {
                  value: /^\S+$/, 
                  message: "El nombre de usuario no puede contener espacios",
                },
              })}
            />
            <Label htmlFor="email" className="m-2">
              Mail
            </Label>
            <Input {...register("email")} required></Input>
            <Button className="w-full mt-5 mb-2" type="submit">
              Enviar
            </Button>
          </form>
          <p className="text-center">
            ¿Ya estás asociado?{" "}
            <Link className="text-sky-900 underline" to={"/login"}>
              Ingresá acá
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
