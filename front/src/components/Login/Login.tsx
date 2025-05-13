import { SubmitHandler, useForm } from "react-hook-form";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Alerta/Alerta";

interface ILoginInput{
    username : string,
    password : string
}
function Login() {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const {register, handleSubmit, reset} = useForm<ILoginInput>();

    const onSubmit: SubmitHandler<ILoginInput> = (data) =>{
        console.log(data);
        setMostrarAlerta(true);
        reset();


        setTimeout(() => {
            setMostrarAlerta(false);
        }, 3000);
    }   

  return (
    <>
      <div className="w-400 justify-self-center">
        <Header></Header>
        <div className="m-20">
          <h1 className="text-3xl font-bold text-sky-900 text-center">
           Iniciar Sesión
          </h1>
         
          <form className="w-100 justify-self-center p-5" onSubmit={handleSubmit(onSubmit)}>
            <Label className="m-2">Nombre de Usuario</Label>
            <Input {...register("username")} type="text"></Input>
            <Label className="m-2">Contraseña</Label>
            <Input {...register("password")} type="password"></Input>
            <Button className="w-full mt-5 mb-2">Ingresar</Button>
            {mostrarAlerta && (
            <Alerta titulo="Enviado" descripcion="El formulario ha sido enviado correctamente"></Alerta>
          )}
          </form>
          <p className="text-center mt-2">¿Todavía no te asociaste? <Link className="text-sky-900 underline" to={"/register"}>Asociáte</Link></p>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Login;
