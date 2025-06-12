import { eliminarPublicacion, getPublicacionById, PublicacionResponse } from '@/api/PublicacionesService';
import { useUserStore } from '@/store/userStore';
import  { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Button } from '../ui/button';
import ComentariosPublicacion from './ComentariosPublicacion';

export default function PublicacionDetalle() {
    const { id } = useParams();
  const navigate = useNavigate();
  const [publicacion, setPublicacion] = useState<PublicacionResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  const rol = user?.rol;

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
          setLoading(false);
        });
    }
  }, [id]);

  const handleEliminar = async () => {
    if (!id) return;
    const confirmacion = confirm(
      "¿Estás seguro de que deseas eliminar esta publicación?"
    );
    if (!confirmacion) return;

    try {
      await eliminarPublicacion(parseInt(id));
      toast.success("Publicación eliminada correctamente.");
      navigate("/novedades");
    } catch (error) {
      toast.error("Error al eliminar la publicación.");
      console.error(error);
    }
  };

  if (loading) return <p className="text-center my-10">Cargando publicación...</p>;
  if (!publicacion)
    return <p className="text-center my-10">Publicación no encontrada</p>;


  return (
    <div className="max-w-6xl mx-5 md:mx-auto my-10 p-6 border rounded-xl flex flex-col">
    <h1 className="text-4xl font-bold mb-4">{publicacion.titulo}</h1>
    <p className="text-gray-600 mb-6">
      {publicacion.fecha_publicacion}
    </p>
    <p className="text-gray-600 mb-2">
      Publicado por: {publicacion.usuario?.nombre}
    </p>
    <p className="mb-6 whitespace-pre-line break-words">
      {publicacion.descripcion}
    </p>

    {publicacion.imagenes.length > 0 && (
      <div>
        <Carousel>
          <CarouselContent>
            {publicacion.imagenes.map((img, index) => (
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

    {rol === "admin" && (
      <div className="mt-8 self-end">
        <Button variant="destructive" onClick={handleEliminar}>
          Eliminar Publicación
        </Button>
        <Button
          variant="outline"
          className="ml-2"
          onClick={() => navigate(`/editar-publicacion/${publicacion.id}`)}
        >
          Editar
        </Button>
      </div>
    )}
     {publicacion.id && <ComentariosPublicacion publicacionId={publicacion.id}/>}
  </div>
  )
}
