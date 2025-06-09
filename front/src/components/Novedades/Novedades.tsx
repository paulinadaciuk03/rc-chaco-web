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


function Novedades() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [noticiasData, setNoticiasData] = useState<NoticiasPaginadas | null>(null);
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

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto my-6 sm:my-10">
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-xl p-6 sm:p-10">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-grow space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                  <Skeleton className="w-full sm:w-[200px] h-[150px] sm:h-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {noticiasData?.noticias.map((noticia) => (
              <div
                key={noticia.id}
                className="border rounded-xl p-6 sm:p-10 mb-6 last:mb-0"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-grow min-w-0">
                    <h1 className="font-bold text-2xl sm:text-3xl mb-3">
                      {noticia.titulo}
                    </h1>
                    <p className="text-stone-500 mb-4">Por: {noticia.admin?.nombre}</p>
                    <p className="text-stone-600 break-words line-clamp-3">
                      {noticia.descripcion}
                    </p>
                  </div>
                  {noticia.imagen_portada && (
                    <div className="sm:flex-shrink-0 w-full sm:w-[200px]">
                      <img
                        src={noticia.imagen_portada}
                        alt="Imagen portada"
                        className="rounded-md max-h-60 object-cover w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <Link to={`/noticias/${noticia.id}`}>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Seguir leyendo...
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}

        {noticiasData && noticiasData.totalPages > 1 && (
          <Pagination className="my-6 sm:my-10">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => handleClick(e, paginaActual - 1)}
                  className="text-sm sm:text-base"
                />
              </PaginationItem>

              {Array.from({ length: noticiasData.totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    href="#"
                    isActive={paginaActual === i + 1}
                    onClick={(e) => handleClick(e, i + 1)}
                    className="text-sm sm:text-base"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => handleClick(e, paginaActual + 1)}
                  className="text-sm sm:text-base"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default Novedades;