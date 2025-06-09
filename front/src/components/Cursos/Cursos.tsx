import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { crearInscripcion } from "@/api/InscripcionesService";
import { useState } from "react";
import { toast } from "sonner";

export interface InscripcionInput {
  nombre: string;
  email: string;
  telefono: string;
}

export default function Cursos() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InscripcionInput>();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: InscripcionInput) => {
    setLoading(true);
    try {
      await crearInscripcion(data);
      toast.success("Datos enviados");
      reset();
    } catch (error) {
      toast.error("Ocurrió un error");
      console.error("Ocurrió un error", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-sky-950 text-center mb-6">
        Curso de Aspirantes a Radioaficionados
      </h1>

      {/* Descripción del curso */}
      <div className="bg-sky-50 rounded-xl p-6 mb-10 shadow">
        <p className="text-lg text-gray-700 mb-4">
          Este curso está orientado a todas las personas interesadas en convertirse en radioaficionados certificados. 
          Se brindarán los conocimientos necesarios para rendir el examen ante la ENACOM y obtener la licencia correspondiente.
        </p>
        <ul className="list-disc list-inside text-gray-600 text-base space-y-1">
          <li>No se requieren conocimientos previos.</li>
          <li>Curso presencial con prácticas reales de transmisión.</li>
          <li>Preparación para el examen teórico y práctico.</li>

        </ul>
      </div>

      {/* Formulario de inscripción */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Completá el siguiente formulario y te contactamos:
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="nombre" className="m-2">Nombre completo</Label>
            <Input
              id="nombre"
              {...register("nombre", { required: "Este campo es obligatorio" })}
            />
            {errors.nombre && (
              <p className="text-sm text-red-600">{errors.nombre.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="m-2">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: "Ingresá un email válido" })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="telefono" className="m-2">Teléfono</Label>
            <Input
              id="telefono"
              type="tel"
              {...register("telefono", {
                required: "Ingresá un número de contacto",
              })}
            />
            {errors.telefono && (
              <p className="text-sm text-red-600">
                {errors.telefono.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar datos"}
          </Button>
        </form>
      </div>
    </div>
  );
}