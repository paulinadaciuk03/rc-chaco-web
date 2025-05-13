import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Alerta from "../Alerta/Alerta";

interface IRegisterInput {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

function Register() {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const { register, handleSubmit, reset } = useForm<IRegisterInput>();
 

  const onSubmit: SubmitHandler<IRegisterInput> = (data) => {
    console.log(data);
    setMostrarAlerta(true);
    reset();

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-400 justify-self-center">
        <Header></Header>
        <div className="m-10">
          <h1 className="text-4xl text-sky-900 font-bold text-center">
            ¿Querés ser parte de nuestra comunidad?
          </h1>
          <p className="mt-5 text-center">Ingresá tus datos y te contactamos</p>
          <form
            className="w-100 justify-self-center p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex">
              <div>
                <Label htmlFor="text" className="m-2">
                  Nombre
                </Label>
                <Input {...register("firstName")} required></Input>
              </div>
              <div className="ml-4">
                <Label htmlFor="text" className="m-2">
                  Apellido
                </Label>
                <Input {...register("lastName")} required></Input>
              </div>
            </div>
            <Label htmlFor="text" className="m-2">
              Nombre de Usuario
            </Label>
            <Input {...register("username")} required></Input>
            <Label htmlFor="email" className="m-2">
              Mail
            </Label>
            <Input {...register("email")} required></Input>
            <Button className="w-full mt-5 mb-2" type="submit">
              Enviar
            </Button>
            {mostrarAlerta && (
              <Alerta titulo="Enviado" descripcion="Tus datos fueron enviados correctamente."></Alerta>
            )}
          </form>
          <p className="text-center">¿Ya estás asociado? <Link className="text-sky-900 underline" to={"/login"}>Ingresá acá</Link></p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Register;
