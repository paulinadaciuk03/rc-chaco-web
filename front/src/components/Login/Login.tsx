import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alerta from "../Alerta/Alerta";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Link } from "react-router-dom";
import { login } from "../../services/AuthService";

interface ILoginInput {
  email: string;
  password: string;
}

function Login() {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const { register, handleSubmit, reset } = useForm<ILoginInput>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const decoded = await login(data); //

      if (decoded.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }

      setMostrarAlerta(true);
      reset();

      setTimeout(() => {
        setMostrarAlerta(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Mail o contraseña incorrecta");
    }
  };

  return (
    <>
      <div className="w-400 justify-self-center">
        <div className="w-400 justify-self-center m-20">
          <h1 className="text-3xl font-bold text-sky-900 text-center">
            Iniciar Sesión
          </h1>

          <form
            className="w-100 justify-self-center p-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Label className="m-2">Email</Label>
            <Input {...register("email")} type="email" />

            <Label className="m-2">Contraseña</Label>
            <Input {...register("password")} type="password" />

            <Button className="w-full mt-5 mb-2">Ingresar</Button>

            {mostrarAlerta && (
              <Alerta
                titulo="Enviado"
                descripcion="El formulario ha sido enviado correctamente"
              />
            )}
          </form>

          <p className="text-center mt-2">
            ¿Todavía no te asociaste?{" "}
            <Link className="text-sky-900 underline" to="/register">
              Asociáte
            </Link>
          </p>
        </div>
      </div>

    </>
  );
}

export default Login;
