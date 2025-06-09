import { actualizarUsuario, getUserById } from "@/api/auth";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface EditarInputs {
  nombre: string;
  username: string;
  email: string;
}

export default function EditarDatos() {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const id = user?.id;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditarInputs>();

  useEffect(() => {
    if (id) {
      getUserById(id)
        .then((data) => {
          const usuario = data.body;
          reset({
            nombre: usuario.nombre,
            username: usuario.username,
            email: usuario.email,
          });
        })
        .catch((error) => {
          console.error("Error al cargar el usuario:", error);
          toast.error("Error al cargar el usuario para editar.");
        });
    }
  }, [id, reset]);

  const onSubmit = async (data: EditarInputs) => {
    try {
      if (!user || !id) throw new Error("Usuario no autenticado");
      await actualizarUsuario(id, data);
      setUser({ ...user, ...data });
      toast.success("Usuario actualizado con éxito.");
      navigate("/");
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      toast.error("Ocurrió un error al editar el usuario.");
    }
  };

  return (
    <div className="flex items-center justify-center my-5 px-4">
      <Card className="w-full max-w-lg shadow-none border-none">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-6 text-sky-950">
            Editar mis datos
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="nombre" className="mb-1 block">Nombre completo</Label>
              <Input id="nombre" {...register("nombre")} placeholder="Tu nombre completo" />
            </div>
            <div>
              <Label htmlFor="username" className="mb-1 block">Nombre de usuario</Label>
              <Input id="username" {...register("username")} placeholder="Tu usuario" />
            </div>
            <div>
              <Label htmlFor="email" className="mb-1 block">Correo electrónico</Label>
              <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" />
            </div>

            <div className="flex justify-end mt-6 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/configuracion")}
                className="flex items-center gap-2"
              >
                <CircleArrowLeft className="w-4 h-4" />
                Volver
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
