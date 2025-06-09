import { BlobProvider } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { InscripcionesPDF } from "./InscripcionesPDF";
import { Inscripcion } from "@/api/InscripcionesService";
import { Loader2 } from "lucide-react";

interface PDFExportButtonProps {
  inscripciones: Inscripcion[];
  titulo: string;
  fileName: string;
  disabled?: boolean;
}

export const PDFExportButton = ({
  inscripciones,
  titulo,
  fileName,
  disabled = false,
}: PDFExportButtonProps) => {
  return (
    <BlobProvider
      key={`pdf-${inscripciones.length}-${Date.now()}`}
      document={
        <InscripcionesPDF inscripciones={inscripciones} titulo={titulo} />
      }
    >
      {({ blob, loading, error }) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            if (blob && !loading) {
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${fileName}.pdf`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              URL.revokeObjectURL(url);
            }
          }}
          disabled={disabled || loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generando...
            </>
          ) : (
            `Exportar ${titulo.toLowerCase()} a PDF`
          )}
        </Button>
      )}
    </BlobProvider>
  );
};
