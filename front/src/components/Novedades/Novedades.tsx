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
import { CalendarDays, Plus } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

function Novedades() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [noticiasData, setNoticiasData] = useState<NoticiasPaginadas | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setLoading(true);
    getNoticias(paginaActual)
      .then((data) => {
        setNoticiasData(data);
        if (data.currentPage !== paginaActual) setPaginaActual(data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
        toast.error("No se pudieron cargar las novedades");
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
  return (
    <div className="px-4 sm:px-4 lg:px-8">
      <div className="max-w-4xl mx-auto my-8">
        <h1 className="text-3xl font-bold text-sky-900 mb-4 text-center">
          Últimas Novedades
        </h1>
        {user?.rol === "admin" && (
          <div className="flex justify-end mb-6">
            <Link to="/publicar-noticia">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Publicar noticia
              </Button>
            </Link>
          </div>
        )}
        {noticiasData && noticiasData.noticias.length === 0 && !loading ? (
          <>
          <p className="text-gray-500 text-center">No hay novedades...</p>
          </>
        ) : (
          <>
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
                    <div className="flex flex-col sm:flex-row p-4 sm:p-6 gap-4 sm:gap-6">
                      {/* Imagen a la izquierda en desktop */}
                      {noticia.imagen_portada && (
                        <div className="flex-shrink-0 w-full sm:w-1/3">
                          <img
                            src={noticia.imagen_portada}
                            alt="Imagen portada"
                            className="rounded-lg w-full h-48 sm:h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="flex flex-col flex-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                          <CalendarDays className="h-4 w-4 mr-1" />
                          {new Date(
                            noticia.fecha_publicacion
                          ).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors mb-2 break-words">
                          <Link to={`/noticias/${noticia.id}`}>
                            {noticia.titulo}
                          </Link>
                        </h2>

                        <p className="text-gray-700 text-sm sm:text-base line-clamp-3 sm:line-clamp-4 mb-4">
                          {noticia.descripcion}
                        </p>

                        <div>
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
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
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

                {Array.from({ length: Math.min(noticiasData.totalPages, 5) }, (_, i) => {
                  const totalPaginas = noticiasData.totalPages;
                  let pageNum;
                  if (totalPaginas <= 5) {
                    pageNum = i + 1;
                  } else if (paginaActual <= 3) {
                    pageNum = i + 1;
                  } else if (paginaActual >= totalPaginas - 2) {
                    pageNum = totalPaginas - 4 + i;
                  } else {
                    pageNum = paginaActual - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={paginaActual === pageNum}
                        onClick={(e) => handleClick(e, pageNum)}
                        className="hover:bg-gray-100"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

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
