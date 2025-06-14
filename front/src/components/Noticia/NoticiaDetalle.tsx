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
    <div className="max-w-6xl mx-5 md:mx-auto my-10 p-6 border rounded-xl flex flex-col">
      <h1 className="text-4xl font-bold mb-4">{noticia.titulo}</h1>
      <p className="text-gray-600 mb-6">
        {new Date(noticia.fecha_publicacion).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-2">
        Publicado por: {noticia.admin?.nombre}
      </p>
      <p className="mb-6 whitespace-pre-line break-words">
        {noticia.descripcion}
      </p>

      {noticia.imagenes.length > 0 && (
        <div>
          <Carousel>
            <CarouselContent>
              {noticia.imagenes.map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    src={img.url_imagen}
                    alt={`Imagen ${index + 1}`}
                    className="rounded-md object-cover w-[500px] mx-auto"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      )}

      {(rol === "admin") && (
        <div className="mt-8 self-end">
          <Button variant="destructive" onClick={handleEliminar}>
            Eliminar Noticia
          </Button>
          <Button
            variant="outline"
            className="ml-2"
            onClick={() => navigate(`/editar-noticia/${noticia.id}`)}
          >
            Editar
          </Button>
        </div>
      )}
       {noticia.id && <ComentariosNoticia noticiaId={noticia.id}/>}
    </div>
  );
}
