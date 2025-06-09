import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { cambiarContraseña } from "@/api/auth";
import { CircleArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function CambiarPass() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    const { currentPassword, newPassword } = data;

    const result = await cambiarContraseña(
      currentPassword,
      newPassword,
      userId
    );

    if (result.success) {
      toast.success("Contraseña actualizada");
      reset();
    } else {
      toast.error(result.message || "Error al cambiar la contraseña");
    }
  };

  const newPassword = watch("newPassword");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-6xl mx-auto my-10 flex flex-col gap-5 items-center md:mt-20"
    >
      <h1 className="text-2xl text-sky-950 font-bold">Cambiar contraseña</h1>

      <div className="flex flex-col gap-1 max-w-[250px] w-full">
        <Input
          type="password"
          placeholder="Contraseña actual"
          {...register("currentPassword", { required: "Campo obligatorio" })}
        />
        {errors.currentPassword && (
          <span className="text-sm text-red-500">
            {errors.currentPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[250px] w-full">
        <Input
          type="password"
          placeholder="Contraseña nueva"
          {...register("newPassword", {
            required: "Campo obligatorio",
            minLength: { value: 6, message: "Mínimo 6 caracteres" },
          })}
        />
        {errors.newPassword && (
          <span className="text-sm text-red-500">
            {errors.newPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 max-w-[250px] w-full">
        <Input
          type="password"
          placeholder="Repita la nueva contraseña"
          {...register("confirmPassword", {
            required: "Campo obligatorio",
            validate: (value) =>
              value === newPassword || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
      <div className="flex gap-2">
        <Button
          className="flex items-center gap-2 border p-2 rounded-md"
          type="button"
          variant={"outline"}
          onClick={() => navigate("/configuracion")}
        >
          <CircleArrowLeft />
          <p>Volver</p>
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cambiando..." : "Cambiar contraseña"}
        </Button>
      </div>
    </form>
  );
}
