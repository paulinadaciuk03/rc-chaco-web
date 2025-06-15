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

export default function ForoPublicaciones() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [publicacionesData, setPublicacionesData] =
    useState<PublicacionesPaginadas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPublicaciones(paginaActual)
      .then((data) => {
        setPublicacionesData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar publicaciones:", error);
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
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Foro de la Comunidad
        </h1>

        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <div className="flex space-x-4 pt-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
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
                className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12 border">
                    <AvatarFallback>
                      {obtenerIniciales(publicacion.usuario?.nombre ?? "")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
                        <Link to={`/publicaciones/${publicacion.id}`}>
                          {publicacion.titulo}
                        </Link>
                      </h2>
                      <span className="text-sm text-gray-500">
                        {new Date(
                          publicacion.fecha_publicacion
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">
                      Publicado por{" "}
                      <span className="font-medium">
                        {publicacion.usuario?.nombre}
                      </span>
                    </p>

                    <p className="text-gray-700 mt-3 mb-4 line-clamp-3">
                      {publicacion.descripcion}
                    </p>

                    {publicacion.imagen_portada && (
                      <div className="my-4">
                        <img
                          src={publicacion.imagen_portada}
                          alt="Imagen portada"
                          className="rounded-md max-h-60 object-cover w-full"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <Link to={`/publicaciones/${publicacion.id}`}>
                        <Button variant="outline" size="sm" className="text-sm">
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

        {publicacionesData && publicacionesData.totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => handleClick(e, paginaActual - 1)}
                    className="hover:bg-gray-100"
                  />
                </PaginationItem>

                {Array.from(
                  { length: publicacionesData.totalPages },
                  (_, i) => (
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
                  )
                )}

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
