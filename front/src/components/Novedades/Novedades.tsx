import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const noticias = [
  {
    id: 1,
    titulo: "Noticia 1",
    contenido: "Esta es la vista previa de la noticia 1.",
  },
  {
    id: 2,
    titulo: "Noticia 2",
    contenido: "Esta es la vista previa de la noticia 2.",
  },
  {
    id: 3,
    titulo: "Noticia 3",
    contenido: "Esta es la vista previa de la noticia 3.",
  },
  {
    id: 4,
    titulo: "Noticia 4",
    contenido: "Esta es la vista previa de la noticia 4.",
  },
  {
    id: 5,
    titulo: "Noticia 5",
    contenido: "Esta es la vista previa de la noticia 5.",
  },
  {
    id: 6,
    titulo: "Noticia 6",
    contenido: "Esta es la vista previa de la noticia 6.",
  },

];

const noticiasPorPagina = 3;

function Novedades() {
  const [paginaActual, setPaginaActual] = useState(1);

  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

  const noticiasActuales = noticias.slice(
    (paginaActual - 1) * noticiasPorPagina,
    paginaActual * noticiasPorPagina
  );

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  const handleClick = (e: React.MouseEvent, nuevaPagina: number) => {
    e.preventDefault();
    cambiarPagina(nuevaPagina);
  };

  return (
    <>
      <div className="flex flex-col w-full">
        {noticiasActuales.map((noticia) => (
          <div key={noticia.id} className="border rounded-xl p-10 mt-5 mb-5 ">
            <h1 className="font-bold ">{noticia.titulo}</h1>
            <p className="text-stone-500">{noticia.contenido}</p>
          </div>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => handleClick(e, paginaActual - 1)}
            />
          </PaginationItem>

          {Array.from({ length: totalPaginas }, (_, i) => (
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
    </>
  );
}

export default Novedades;
