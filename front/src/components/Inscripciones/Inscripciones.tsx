import {
  deleteInscripcion,
  getInscripciones,
  InscripcionesPaginada,
  Inscripcion,
  actualizarEstadoInscripcion,
} from "@/api/InscripcionesService";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";
import { PDFExportButton } from "./PDFExportButton";

function TablaInscripciones({
  titulo,
  inscripciones,
  onEliminar,
  onActualizar,
  mostrarConfirmar = false,
}: {
  titulo: string;
  inscripciones: Inscripcion[];
  onEliminar: (id: number) => void;
  onActualizar: (id: number, estado: string) => void;
  mostrarConfirmar?: boolean;
}) {
  return (
    <Table>
      <TableCaption>{titulo}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inscripciones.map((inscripcion) => (
          <TableRow key={inscripcion.id}>
            <TableCell>{inscripcion.nombre}</TableCell>
            <TableCell>{inscripcion.email}</TableCell>
            <TableCell>{inscripcion.telefono}</TableCell>
            <TableCell>{inscripcion.estado}</TableCell>
            <TableCell className="flex gap-2">
              {mostrarConfirmar && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Confirmar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>¿Estás seguro?</DialogTitle>
                      <DialogDescription>
                        <p>Vas a confimar la inscripción de: </p>
                        <p> {inscripcion.nombre}</p>
                        <p>Email: {inscripcion.email}</p>
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() =>
                          onActualizar(inscripcion.id, "Confirmada")
                        }
                      >
                        Confirmar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Eliminar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>¿Estás seguro?</DialogTitle>
                    <DialogDescription>
                      Esta acción no se puede deshacer.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button onClick={() => onEliminar(inscripcion.id)}>
                      Eliminar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function Inscripciones() {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState<"pendientes" | "confirmadas">(
    "pendientes"
  );
  const [inscripciones, setInscripciones] =
    useState<InscripcionesPaginada | null>(null);

  useEffect(() => {
    fetchInscripciones();
  }, [paginaActual]);

  const fetchInscripciones = async () => {
    await getInscripciones(paginaActual)
      .then((data) => setInscripciones(data))
      .catch((error) => console.error("Error al cargar inscripciones", error));
  };

  const actualizarEstado = async (id: number, estado: string) => {
    try {
       await actualizarEstadoInscripcion(id, estado);
      toast.success("Estado actualizado.");
      fetchInscripciones();
    } catch (error) {
      console.log(error);
      toast.error("No se pudo actualizar el estado");
    }
  };

  const cambiarPagina = (nuevaPagina: number) => {
    if (
      nuevaPagina >= 1 &&
      nuevaPagina <= (inscripciones?.totalPages ?? 1) &&
      nuevaPagina !== paginaActual
    ) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleClick = (e: React.MouseEvent, nuevaPagina: number) => {
    e.preventDefault();
    cambiarPagina(nuevaPagina);
  };

  const handleEliminar = async (id: number) => {
    try {
      await deleteInscripcion(id);
      toast.success("Inscripción eliminada");
      fetchInscripciones();
    } catch (error) {
      toast.error("No se pudo eliminar la inscripción.");
      console.error(error);
    }
  };

  const pendientes =
    inscripciones?.inscripciones.filter((i) => i.estado === "Pendiente") ?? [];
  const confirmadas =
    inscripciones?.inscripciones.filter((i) => i.estado === "Confirmada") ?? [];

  return (
    <div className="flex flex-col max-w-5xl mx-auto items-center justify-center gap-6 my-20">
      <div className="flex gap-4 mb-4">
        <Button
          variant={filtro === "pendientes" ? "default" : "outline"}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </Button>
        <Button
          variant={filtro === "confirmadas" ? "default" : "outline"}
          onClick={() => setFiltro("confirmadas")}
        >
          Confirmadas
        </Button>
      </div>

      {filtro === "pendientes" ? (
        <TablaInscripciones
          titulo="Inscripciones pendientes"
          inscripciones={pendientes}
          onEliminar={handleEliminar}
          onActualizar={actualizarEstado}
          mostrarConfirmar
        />
      ) : (
        <TablaInscripciones
          titulo="Inscripciones confirmadas"
          inscripciones={confirmadas}
          onActualizar={actualizarEstado}
          onEliminar={handleEliminar}
        />
      )}

      <div className="flex gap-4">
        <PDFExportButton
          inscripciones={pendientes}
          titulo="Pendientes"
          fileName="inscripciones_pendientes"
          disabled={filtro !== "pendientes" || pendientes.length === 0}
        />
        <PDFExportButton
          inscripciones={confirmadas}
          titulo="Confirmadas"
          fileName="inscripciones_confirmadas"
          disabled={filtro !== "confirmadas" || confirmadas.length === 0}
        />
      </div>

      {inscripciones && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => handleClick(e, paginaActual - 1)}
              />
            </PaginationItem>
            {Array.from({ length: inscripciones.totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={paginaActual === i + 1}
                  onClick={(e) => handleClick(e, i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => handleClick(e, paginaActual + 1)}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
