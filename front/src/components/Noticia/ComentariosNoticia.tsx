import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ComentarioResponse,
  crearComentario,
  eliminarComentario,
  getComentariosByNoticia,
} from "@/api/NoticiasService";
import { Badge } from "../ui/badge";
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

export default function ComentariosNoticia({ noticiaId }: { noticiaId: number }) {
  const [comentariosData, setComentariosData] = useState<ComentarioResponse | null>(null);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const user = useUserStore((state) => state.user);

  const cargarComentarios = async (pagina: number) => {
    try {
      const data = await getComentariosByNoticia(noticiaId, pagina);
      setComentariosData(data);
      if (data.currentPage !== pagina) setPage(data.currentPage);
      setError("");
    } catch {
      setError("Aún no hay comentarios.");
    }
  };

  useEffect(() => {
    cargarComentarios(page);
  }, [noticiaId, page]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!texto.trim() || !user) return;

    try {
      await crearComentario({
        noticia_id: noticiaId,
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
    try {
      await eliminarComentario(comentarioId);
      await cargarComentarios(page); 
    } catch (error) {
      setError("Error al eliminar el comentario.");
      console.error(error);
    }
  };
  // Botones de paginación simples
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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-600 hover:underline text-sm">
                        Eliminar comentario
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Eliminar este comentario?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleEliminarComentario(c.id)}>
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
