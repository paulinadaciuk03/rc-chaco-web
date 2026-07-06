import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Alerta from "../Alerta/Alerta";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { login, recuperarPassword } from "@/api/auth";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

interface ILoginInput {
  email: string;
  password: string;
}

function Login() {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const { register, handleSubmit, reset } = useForm<ILoginInput>();
  const navigate = useNavigate();
  const setUser = useUserStore(state => state.setUser);

  const [recuperarOpen, setRecuperarOpen] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [enviandoRecuperar, setEnviandoRecuperar] = useState(false);

  const handleRecuperar = async () => {
    if (!emailRecuperar.trim()) return;
    setEnviandoRecuperar(true);
    try {
      const mensaje = await recuperarPassword(emailRecuperar.trim());
      toast.success(mensaje);
      setRecuperarOpen(false);
      setEmailRecuperar("");
    } catch (err) {
      toast.error("No se pudo procesar la solicitud. Intentá nuevamente.");
      console.error(err);
    } finally {
      setEnviandoRecuperar(false);
    }
  };


  const onSubmit: SubmitHandler<ILoginInput> = async (data) => {
    try {
      const result = await login({
        email: data.email,
        password: data.password,
      });

      if (result.success) {
        setUser(result.data.user);
        navigate("/");
        setMostrarAlerta(true);
        reset();
        setTimeout(() => setMostrarAlerta(false), 3000);
      } else {
        toast.error("Error al iniciar sesión");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al iniciar sesión");
    }
  };

  return (
    <>
      <div className="max-w-6xl items-center my-20 px-4 justify-self-center">
        <div className="w-full max-w-md justify-self-center ">
          <h1 className="text-2xl font-bold my-5 text-sky-900 text-center md:text-3xl">
            Iniciar Sesión
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Label className="block m-2">Email</Label>
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
            <Dialog open={recuperarOpen} onOpenChange={setRecuperarOpen}>
              <DialogTrigger asChild>
                <button type="button" className="text-sky-900 underline text-sm">
                  ¿Olvidaste tu contraseña?
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Recuperar contraseña</DialogTitle>
                  <DialogDescription>
                    Ingresá tu email y te enviamos una contraseña temporal para que puedas volver a entrar.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                  <Label htmlFor="email-recuperar">Email</Label>
                  <Input
                    id="email-recuperar"
                    type="email"
                    value={emailRecuperar}
                    onChange={(e) => setEmailRecuperar(e.target.value)}
                    disabled={enviandoRecuperar}
                  />
                </div>
                <DialogFooter>
                  <Button onClick={handleRecuperar} disabled={enviandoRecuperar || !emailRecuperar.trim()}>
                    {enviandoRecuperar ? "Enviando..." : "Enviar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </p>

          <p className="text-center my-4">
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
