import {
  getPublicaciones,
  PublicacionesPaginadas,
} from "@/api/PublicacionesService";
import React, { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Plus } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

export default function ForoPublicaciones() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [publicacionesData, setPublicacionesData] =
    useState<PublicacionesPaginadas | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    setLoading(true);
    getPublicaciones(paginaActual)
      .then((data) => {
        setPublicacionesData(data);
        if (data.currentPage !== paginaActual) setPaginaActual(data.currentPage);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar publicaciones:", error);
        toast.error("No se pudieron cargar las publicaciones");
        setLoading(false);
      });
  }, [paginaActual]);

  const cambiarPagina = (nuevaPagina: number) => {
    if (
      nuevaPagina >= 1 &&
      nuevaPagina <= (publicacionesData?.totalPages ?? 1) &&
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
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center text-sky-900 mb-4">
          Foro de la Comunidad
        </h1>
        {user && (
          <div className="flex justify-end mb-6">
            <Link to="/publicar">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nueva publicación
              </Button>
            </Link>
          </div>
        )}

        {publicacionesData &&
        publicacionesData.publicaciones.length === 0 &&
        !loading ? (
          <>
            <p className="text-center text-gray-500">No hay publicaciones...</p>
          </>
        ) : (
          <>
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {publicacionesData?.publicaciones.map((publicacion) => (
                  <div
                    key={publicacion.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 mb-6 p-5 sm:p-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                      <Avatar className="h-12 w-12 border shrink-0">
                        <AvatarFallback>
                          {obtenerIniciales(publicacion.usuario?.nombre ?? "")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors break-words">
                            <Link to={`/publicaciones/${publicacion.id}`}>
                              {publicacion.titulo}
                            </Link>
                          </h2>
                          <span className="text-sm text-gray-500 mt-1 sm:mt-0">
                            {new Date(
                              publicacion.fecha_publicacion
                            ).toLocaleDateString("es-AR", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mt-1">
                          Publicado por{" "}
                          <span className="font-medium">
                            {publicacion.usuario?.nombre}
                          </span>
                        </p>

                        <p className="text-gray-700 mt-3 line-clamp-3 text-sm sm:text-base">
                          {publicacion.descripcion}
                        </p>

                        {publicacion.imagen_portada && (
                          <div className="mt-4">
                            <img
                              src={publicacion.imagen_portada}
                              alt="Imagen portada"
                              className="rounded-md max-h-60 w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        )}

                        <div className="mt-4 pt-3 border-t flex justify-end">
                          <Link to={`/publicaciones/${publicacion.id}`}>
                            <Button variant="outline" size="sm">
                              Participar en la discusión
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {publicacionesData && publicacionesData.totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => handleClick(e, paginaActual - 1)}
                  />
                </PaginationItem>
                {Array.from(
                  { length: Math.min(publicacionesData.totalPages, 5) },
                  (_, i) => {
                    const totalPaginas = publicacionesData.totalPages;
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
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => handleClick(e, paginaActual + 1)}
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
