import {
  getNoticiaById,
  NoticiaResponse,
  eliminarNoticia,
} from "@/api/NoticiasService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/userStore";
import ComentariosNoticia from "./ComentariosNoticia";
import { toast } from "sonner";
import { Calendar, User } from "lucide-react";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noticia, setNoticia] = useState<NoticiaResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);
  const rol = user?.rol;

  useEffect(() => {
    if (id) {
      setLoading(true);
      getNoticiaById(parseInt(id))
        .then((data) => {
          setNoticia(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error al obtener noticia", error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleEliminar = async () => {
    if (!id) return;
    const confirmacion = confirm(
      "¿Estás seguro de que deseas eliminar esta noticia?"
    );
    if (!confirmacion) return;

    try {
      await eliminarNoticia(parseInt(id));
      toast.success("Noticia eliminada correctamente.");
      navigate("/novedades");
    } catch (error) {
      toast.error("Error al eliminar la noticia.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center my-10">Cargando noticia...</p>;
  if (!noticia)
    return <p className="text-center my-10">Noticia no encontrada</p>;

  return (
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 break-words">
        {noticia.titulo}
      </h1>

      <div className="text-sm text-gray-600 flex flex-wrap items-center gap-6 mb-6 border-b pb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>
            {new Date(noticia.fecha_publicacion).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <User className="w-4 h-4 text-gray-500" />
          <span>{noticia.admin?.nombre || "Administrador"}</span>
        </div>
      </div>

      <div className="prose prose-sm sm:prose-base max-w-none text-gray-800 mb-6 whitespace-pre-line">
        {noticia.descripcion}
      </div>

      {noticia.imagenes.length > 0 && (
        <div className="my-6">
          <Carousel>
            <CarouselContent>
              {noticia.imagenes.map((img, index) => (
                <CarouselItem key={index} className="flex justify-center">
                  <img
                    src={img.url_imagen}
                    alt={`Imagen ${index + 1}`}
                    className="rounded-md w-full max-w-[600px] h-auto object-cover"
                    loading="lazy"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      )}

      {rol === "admin" && (
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="destructive" onClick={handleEliminar}>
            Eliminar Noticia
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
          >
            Editar
          </Button>
        </div>
      )}

      {noticia.id && (
        <div className="mt-10">
          <ComentariosNoticia noticiaId={noticia.id} />
        </div>
      )}
    </div>
  );
}
