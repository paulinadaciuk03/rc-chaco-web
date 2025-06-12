import { ComentarioResponse } from "@/api/NoticiasService";
import { crearComentarioPublicacion, eliminarComentarioPublicacion, getComentariosByPublicacion } from "@/api/PublicacionesService";
import { useUserStore } from "@/store/userStore";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function ComentariosPublicacion({ publicacionId }: { publicacionId: number }) {
  const [comentariosData, setComentariosData] =
    useState<ComentarioResponse | null>(null);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const user = useUserStore((state) => state.user);

  const cargarComentarios = async (pagina: number) => {
    try {
      const data = await getComentariosByPublicacion(publicacionId, pagina);
      setComentariosData(data);
      setError("");
    } catch {
      setError("Aún no hay comentarios.");
    }
  };

  useEffect(() => {
    cargarComentarios(page);
  }, [publicacionId, page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || !user) return;

    try {
      await crearComentarioPublicacion({
        publicacion_id: publicacionId,
        usuario_id: user.id,
        texto,
      });
      setTexto("");
      setPage(1);
      cargarComentarios(1);
    } catch (err) {
      setError("No se pudo enviar el comentario.");
      console.error(err);
    }
  };

  const handleEliminarComentario = async (comentarioId: number) => {
    if (!confirm("¿Eliminar este comentario?")) return;
  
    try {
      await eliminarComentarioPublicacion(comentarioId);
      await cargarComentarios(page); 
    } catch (error) {
      setError("Error al eliminar el comentario.");
      console.error(error);
    }
  };

  const renderPagination = () => {
    if (!comentariosData) return null;

    const { currentPage, totalPages } = comentariosData;

    return (
      <div className="flex space-x-2 justify-center mb-6">
        <Button
          disabled={currentPage <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          variant="outline"
        >
          Anterior
        </Button>
        <span className="flex items-center px-3">{`${currentPage} / ${totalPages}`}</span>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          variant="outline"
        >
          Siguiente
        </Button>
      </div>
    );
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Comentarios</h2>

      {!comentariosData || comentariosData.comentarios.length === 0 ? (
        <p className="text-gray-500 mb-4">Aún no hay comentarios.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {comentariosData.comentarios.map((c) => (
              <div key={c.id} className="bg-gray-100 p-3 rounded-md">
                <p className="text-sm font-semibold">
                  {c.usuario?.nombre}{" "}
                  {c.usuario?.rol_id === 3 && <Badge>Administrador</Badge>}
                </p>
                <p className="text-gray-700">{c.texto}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.fecha_creacion).toLocaleString()}
                </p>
                {(user?.rol === "admin" || user?.id === c.usuario?.id) && (
                  <button
                    onClick={() => handleEliminarComentario(c.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar comentario
                  </button>
                )}
              </div>
            ))}
          </div>
          {renderPagination()}
        </>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Escribe tu comentario..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="min-h-[100px]"
          />
          <Button type="submit" disabled={!texto.trim()}>
            Comentar
          </Button>
        </form>
      ) : (
        <p className="text-gray-500 italic">Inicia sesión para comentar.</p>
      )}

      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}
