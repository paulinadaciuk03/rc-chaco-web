import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { crearNoticia, NoticiaData } from "../../api/NoticiasService";
import apiClient from "@/api/axiosConfig";
import { useUserStore } from "@/store/userStore";
import { Loader2, Image, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

type FormInputs = {
  titulo: string;
  descripcion: string;
};

export default function Noticia() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormInputs>();

  const [uploading, setUploading] = useState(false);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const user = useUserStore(state => state.user);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("imagenes", file);
      });

      const response = await apiClient.post("/uploads/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImagenes(prev => [...prev, ...response.data.urls]);
    } catch (err) {
      setError("Error al subir las imágenes. Intente nuevamente.");
      console.error("Error al subir imágenes:", err);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImagenes(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormInputs) => {
    if (!user) {
      setError("Debe iniciar sesión para publicar noticias");
      return;
    }

    try {
      const payload: NoticiaData = {
        ...data,
        admin_id: user.id,
        imagenes: imagenes.map(url => ({ url_imagen: url })),
      };

      await crearNoticia(payload);
      setSuccess(true);
      reset();
      setImagenes([]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Error al crear la noticia. Por favor intente más tarde.");
      console.error("Error al crear la noticia:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="space-y-2 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-900">Publicar una noticia</h1>
        <p className="text-gray-600">Comparta información relevante con la comunidad</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Mensajes de estado */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert>
            <AlertDescription className="text-green-600">
              Noticia publicada con éxito!
            </AlertDescription>
          </Alert>
        )}

        {/* Campo Título */}
        <div className="space-y-2">
          <Label htmlFor="titulo">Título *</Label>
          <Input
            id="titulo"
            {...register("titulo", { 
              required: "El título es obligatorio",
              minLength: {
                value: 5,
                message: "El título debe tener al menos 5 caracteres"
              }
            })}
            placeholder="Escriba el título de la noticia"
            className={errors.titulo ? "border-red-500" : ""}
          />
          {errors.titulo && (
            <p className="text-sm text-red-600">{errors.titulo.message}</p>
          )}
        </div>

        {/* Campo Contenido */}
        <div className="space-y-2">
          <Label htmlFor="descripcion">Contenido *</Label>
          <Textarea
            id="descripcion"
            {...register("descripcion", {
              required: "El contenido es obligatorio",
              minLength: {
                value: 20,
                message: "El contenido debe tener al menos 20 caracteres"
              }
            })}
            className={`min-h-[150px] ${errors.descripcion ? "border-red-500" : ""}`}
            placeholder="Desarrolle el contenido de la noticia..."
          />
          {errors.descripcion && (
            <p className="text-sm text-red-600">{errors.descripcion.message}</p>
          )}
        </div>

        {/* Campo Imágenes */}
        <div className="space-y-2">
          <Label htmlFor="imagenes">Imágenes (opcional)</Label>
          <div className="flex items-center gap-4">
            <Label
              htmlFor="imagenes"
              className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Image className="w-5 h-5 text-gray-500" />
              <span>{uploading ? "Subiendo..." : "Seleccionar imágenes"}</span>
            </Label>
            <Input
              id="imagenes"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              disabled={uploading}
              className="hidden"
            />
            {uploading && <Loader2 className="animate-spin text-gray-500" />}
          </div>
          <p className="text-sm text-gray-500">Máx. 5 imágenes (JPEG, PNG)</p>
          
          {/* Vista previa de imágenes */}
          {imagenes.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {imagenes.map((imgUrl, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={imgUrl}
                    alt={`Imagen ${idx + 1}`}
                    className="w-full h-32 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botón de envío */}
        <div className="pt-4">
          <Button 
            type="submit" 
            disabled={isSubmitting || uploading}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Publicando...
              </>
            ) : (
              "Publicar noticia"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}