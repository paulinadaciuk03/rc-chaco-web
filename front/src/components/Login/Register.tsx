import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { registro } from "@/api/auth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface RegisterInput {
  nombre: string;
  apellido: string;
  username: string;
  email: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>();

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
              <div className="flex-1">
                <Label htmlFor="nombre" className="m-2">
                  Nombre
                </Label>
                <Input
                  id="nombre"
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                  className={errors.nombre ? "border-red-500" : ""}
                />
                {errors.nombre && (
                  <p className="text-sm text-red-600 mx-2 mt-1">{errors.nombre.message}</p>
                )}
              </div>
              <div className="flex-1 md:ml-4">
                <Label htmlFor="apellido" className="m-2">
                  Apellido
                </Label>
                <Input
                  id="apellido"
                  {...register("apellido", { required: "El apellido es obligatorio" })}
                  className={errors.apellido ? "border-red-500" : ""}
                />
                {errors.apellido && (
                  <p className="text-sm text-red-600 mx-2 mt-1">{errors.apellido.message}</p>
                )}
              </div>
            </div>
            <Label htmlFor="username" className="m-2">
              Nombre de Usuario
            </Label>
            <Input
              id="username"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
                pattern: {
                  value: /^\S+$/,
                  message: "El nombre de usuario no puede contener espacios",
                },
              })}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && (
              <p className="text-sm text-red-600 mx-2 mt-1">{errors.username.message}</p>
            )}
            <Label htmlFor="email" className="m-2">
              Mail
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "El email es obligatorio" })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mx-2 mt-1">{errors.email.message}</p>
            )}
            <Button className="w-full mt-5 mb-2" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
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
