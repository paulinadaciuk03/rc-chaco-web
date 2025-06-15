import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { getNoticias, NoticiasPaginadas } from "../../api/NoticiasService";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import { CalendarDays, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function Novedades() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [noticiasData, setNoticiasData] = useState<NoticiasPaginadas | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNoticias(paginaActual)
      .then((data) => {
        setNoticiasData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
        setLoading(false);
      });
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina: number) => {
    if (
      nuevaPagina >= 1 &&
      nuevaPagina <= (noticiasData?.totalPages ?? 1) &&
      nuevaPagina !== paginaActual
    ) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleClick = (e: React.MouseEvent, nuevaPagina: number) => {
    e.preventDefault();
    cambiarPagina(nuevaPagina);
  };
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
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Últimas Novedades
        </h1>

        {loading ? (
          <div className="space-y-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <Skeleton className="h-8 w-3/4 mb-4" />
                  <div className="flex items-center space-x-4 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="h-10 w-32 mt-6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {noticiasData?.noticias.map((noticia) => (
              <article
                key={noticia.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarFallback>{obtenerIniciales(noticia.admin?.nombre ?? "")}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
                        <Link to={`/noticias/${noticia.id}`}>
                          {noticia.titulo}
                        </Link>
                      </h2>

                      <div className="flex items-center text-sm text-gray-500 space-x-4 mb-4">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {noticia.admin?.nombre || "Administrador"}
                        </span>
                        <span className="flex items-center">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {new Date(
                            noticia.fecha_publicacion
                          ).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-gray-700 line-clamp-3">
                      {noticia.descripcion}
                    </p>
                  </div>

                  {noticia.imagen_portada && (
                    <div className="mt-6">
                      <img
                        src={noticia.imagen_portada}
                        alt="Imagen portada"
                        className="rounded-lg w-full h-64 object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <Link to={`/noticias/${noticia.id}`}>
                      <Button
                        variant="outline"
                        className="text-sm sm:text-base"
                      >
                        Leer noticia completa
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {noticiasData && noticiasData.totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => handleClick(e, paginaActual - 1)}
                    className="hover:bg-gray-100"
                  />
                </PaginationItem>

                {Array.from({ length: noticiasData.totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={paginaActual === i + 1}
                      onClick={(e) => handleClick(e, i + 1)}
                      className="hover:bg-gray-100"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => handleClick(e, paginaActual + 1)}
                    className="hover:bg-gray-100"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

export default Novedades;
