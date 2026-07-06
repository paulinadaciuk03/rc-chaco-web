import {
  eliminarPublicacion,
  getPublicacionById,
  PublicacionResponse,
} from "@/api/PublicacionesService";
import { useUserStore } from "@/store/userStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import ComentariosPublicacion from "./ComentariosPublicacion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ArrowLeft, CalendarDays, User } from "lucide-react";

export default function PublicacionDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publicacion, setPublicacion] = useState<PublicacionResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  const rol = user?.rol;
  const userId = user?.id;

  const obtenerIniciales = (nombreCompleto: string): string => {
    if (!nombreCompleto) return "";
    return nombreCompleto
      .trim()
      .split(" ")
      .filter((palabra) => palabra.length > 0)
      .map((palabra) => palabra[0].toUpperCase())
      .join("")
      .slice(0, 2);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getPublicacionById(parseInt(id))
        .then((data) => {
          setPublicacion(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener publicación", error);
          toast.error("No se pudo cargar la publicación");
          setLoading(false);
        });
    }
  }, [id]);

  const handleEliminar = async () => {
    if (!id) return;

    try {
      await eliminarPublicacion(parseInt(id));
      toast.success("Publicación eliminada correctamente.");
      navigate("/publicaciones");
    } catch (error) {
      toast.error("Error al eliminar la publicación.");
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-center my-10">Cargando publicación...</p>;
  if (!publicacion)
    return <p className="text-center my-10">Publicación no encontrada</p>;

  return (
    <div className="max-w-5xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/publicaciones")}
        className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-sky-900 transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al Foro
      </button>

      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
        {/* Encabezado de la publicación */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <Avatar className="h-12 w-12 border shrink-0">
            <AvatarFallback>
              {obtenerIniciales(publicacion.usuario?.nombre ?? "")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1 break-words">
              {publicacion.titulo}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {publicacion.usuario?.nombre || "Usuario desconocido"}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                {new Date(publicacion.fecha_publicacion).toLocaleDateString(
                  "es-ES",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Contenido de la publicación */}
        <div className="prose max-w-none text-gray-800 mb-8 whitespace-pre-line">
          {publicacion.descripcion}
        </div>

        {/* Galería de imágenes */}
        {publicacion.imagenes.length > 0 && (
          <div className="mb-10">
            <Carousel className="rounded-lg overflow-hidden border">
              <CarouselContent>
                {publicacion.imagenes.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="flex justify-center bg-gray-50 p-4">
                      <img
                        src={img.url_imagen}
                        alt={`Imagen ${index + 1}`}
                        className="rounded-md object-contain max-h-[28rem] w-full"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
            </Carousel>
          </div>
        )}

        {/* Acciones de usuario */}
        {(userId === publicacion.usuario_id || rol === "admin") && (
          <div className="flex flex-wrap gap-2 justify-end mb-10 border-t pt-6">
            {userId === publicacion.usuario_id && (
              <Button
                variant="outline"
                onClick={() =>
                  navigate(`/editar-publicacion/${publicacion.id}`)
                }
              >
                Editar Publicación
              </Button>
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Eliminar Publicación</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>¿Eliminar esta publicación?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleEliminar}>
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}

        {/* Comentarios */}
        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">💬 Discusión</h2>
          {publicacion.id && (
            <ComentariosPublicacion publicacionId={publicacion.id} />
          )}
        </div>
      </div>
    </div>
  );
}
