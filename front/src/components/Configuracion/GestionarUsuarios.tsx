import {
    getUsuarios,
    UsuariosGet,
    UsuariosPaginados,
  } from "@/api/UsuariosService";
  import { useEffect, useState } from "react";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
  import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "../ui/pagination";
  import { asignarPassword } from "@/api/auth";
  import { Card } from "../ui/card";
  import { Button } from "../ui/button";
  import { Badge } from "../ui/badge";
import { toast } from "sonner";
  
  export default function GestionarUsuarios() {
    const [paginaUsuario, setPaginaUsuario] = useState(1);
    const [paginaPendiente, setPaginaPendiente] = useState(1);
    const [paginaAdmin, setPaginaAdmin] = useState(1);
  
    const [usuariosUsuario, setUsuariosUsuario] = useState<UsuariosPaginados | null>(null);
    const [usuariosPendiente, setUsuariosPendiente] = useState<UsuariosPaginados | null>(null);
    const [usuariosAdmin, setUsuariosAdmin] = useState<UsuariosPaginados | null>(null);
  
    useEffect(() => {
      fetchUsuariosPorRol("usuario", paginaUsuario, setUsuariosUsuario);
    }, [paginaUsuario]);
  
    useEffect(() => {
      fetchUsuariosPorRol("pendiente", paginaPendiente, setUsuariosPendiente);
    }, [paginaPendiente]);
  
    useEffect(() => {
      fetchUsuariosPorRol("admin", paginaAdmin, setUsuariosAdmin);
    }, [paginaAdmin]);
  
    const fetchUsuariosPorRol = async (
      rol: string,
      pagina: number,
      setter: (data: UsuariosPaginados) => void
    ) => {
      try {
        const data = await getUsuarios(pagina, rol);
        setter(data);
      } catch (error) {
        console.error(`Error al cargar usuarios (${rol})`, error);
      }
    };
  
    const cambiarPagina = (nuevaPagina: number, setPagina: (p: number) => void) => {
      if (nuevaPagina >= 1) setPagina(nuevaPagina);
    };
  
    const asignarPass = async (id: number) => {
      try {
          await asignarPassword(id);
          toast.success("Contraseña enviada");
      } catch (error) {
          toast.error("Error al asignar la contraseña");
          console.log(error);
      }
    }
  
    return (
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 mx-3">Gestión de Usuarios</h1>
        
        <Card className="p-6 shadow-sm">
          <SeccionUsuarios
            titulo="Usuarios Activos"
            usuarios={usuariosUsuario?.usuarios ?? []}
            paginaActual={paginaUsuario}
            totalPaginas={usuariosUsuario?.totalPages ?? 1}
            cambiarPagina={(p) => cambiarPagina(p, setPaginaUsuario)}
            badgeVariant="default"
          />
        </Card>
  
        <Card className="p-6 shadow-sm">
          <SeccionUsuarios
            titulo="Usuarios Pendientes"
            usuarios={usuariosPendiente?.usuarios ?? []}
            paginaActual={paginaPendiente}
            totalPaginas={usuariosPendiente?.totalPages ?? 1}
            cambiarPagina={(p) => cambiarPagina(p, setPaginaPendiente)}
            onAsignarPass={asignarPass}
            badgeVariant="secondary"
          />
        </Card>
  
        <Card className="p-6 shadow-sm">
          <SeccionUsuarios
            titulo="Administradores"
            usuarios={usuariosAdmin?.usuarios ?? []}
            paginaActual={paginaAdmin}
            totalPaginas={usuariosAdmin?.totalPages ?? 1}
            cambiarPagina={(p) => cambiarPagina(p, setPaginaAdmin)}
            badgeVariant="destructive"
          />
        </Card>
      </div>
    );
  }
  
  function SeccionUsuarios({
    titulo,
    usuarios,
    paginaActual,
    totalPaginas,
    cambiarPagina,
    onAsignarPass,
    badgeVariant = "default",
  }: {
    titulo: string;
    usuarios: UsuariosGet[];
    paginaActual: number;
    totalPaginas: number;
    cambiarPagina: (nuevaPagina: number) => void;
    onAsignarPass?: (id: number) => void;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  }) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <Badge variant={badgeVariant} className="text-sm">
              {usuarios.length}
            </Badge>
            {titulo}
          </h2>
        </div>
  
        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium">Nombre</TableHead>
                <TableHead className="font-medium">Usuario</TableHead>
                <TableHead className="font-medium">Email</TableHead>
                {onAsignarPass && <TableHead className="font-medium text-right">Acciones</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.length > 0 ? (
                usuarios.map((usuario) => (
                  <TableRow key={usuario.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{usuario.nombre}</TableCell>
                    <TableCell className="text-gray-600">{usuario.username}</TableCell>
                    <TableCell className="text-gray-600">{usuario.email}</TableCell>
                    {onAsignarPass && (
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAsignarPass(usuario.id)}
                        >
                          Asignar contraseña
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={onAsignarPass ? 4 : 3} className="text-center text-gray-500 py-4">
                    No hay usuarios registrados
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
  
        {totalPaginas > 1 && (
          <Pagination className="mt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (paginaActual > 1) cambiarPagina(paginaActual - 1);
                  }}
                  className={paginaActual === 1 ? "opacity-50 cursor-not-allowed" : ""}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(totalPaginas, 5) }, (_, i) => {
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
                      onClick={(e) => {
                        e.preventDefault();
                        cambiarPagina(pageNum);
                      }}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (paginaActual < totalPaginas) cambiarPagina(paginaActual + 1);
                  }}
                  className={paginaActual === totalPaginas ? "opacity-50 cursor-not-allowed" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    );
  }