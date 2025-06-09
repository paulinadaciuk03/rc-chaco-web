// components/InscripcionesPDF.tsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Inscripcion } from "@/api/InscripcionesService";

// Registrar fuentes profesionales (opcional)
Font.register({
  family: "Helvetica-Bold",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
});

Font.register({
  family: "Helvetica",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

// Definición de estilos
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    textAlign: "center",
    color: "#555",
    marginBottom: 10,
  },
  reportInfo: {
    fontSize: 8,
    textAlign: "right",
    color: "#777",
  },
  table: {
    display: "flex",
    width: "100%",
    marginTop: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    width: "33.33%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    textTransform: "uppercase",
  },
  tableCol: {
    width: "33.33%",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    borderLeftWidth: 0,
    borderTopWidth: 0,
    fontSize: 9,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 8,
    color: "#555",
    borderTopWidth: 1,
    borderTopColor: "#000",
    borderTopStyle: "solid",
    paddingTop: 5,
  },
  pageNumbers: {
    position: "absolute",
    bottom: 20,
    right: 30,
    fontSize: 8,
    color: "#555",
  },
});

interface InscripcionesPDFProps {
  inscripciones: Inscripcion[];
  titulo: string;
  organization?: string;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const InscripcionesPDF = ({
  inscripciones,
  titulo,
  organization = "Inscripciones",
}: InscripcionesPDFProps) => {
  const downloadDate = new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Encabezado */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{organization}</Text>
          <Text style={styles.subtitle}>Reporte de {titulo.toLowerCase()}</Text>
          <Text style={styles.reportInfo}>
            Generado el {formatDate(downloadDate)} | Página{" "}
            <Text
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} de ${totalPages}`
              }
            />
          </Text>
        </View>

        {/* Tabla */}
        <View style={styles.table}>
          {/* Encabezados */}
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>Nombre</Text>
            <Text style={styles.tableColHeader}>Email</Text>
            <Text style={styles.tableColHeader}>Teléfono</Text>
          </View>

          {/* Datos */}
          {inscripciones.map((inscripcion, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{inscripcion.nombre}</Text>
              <Text style={styles.tableCol}>{inscripcion.email}</Text>
              <Text style={styles.tableCol}>{inscripcion.telefono}</Text>
            </View>
          ))}
        </View>

        {/* Pie de página */}
        <Text style={styles.footer}>
          {organization} | {downloadDate.getFullYear()} | Total registros:{" "}
          {inscripciones.length}
        </Text>
      </Page>
    </Document>
  );
};
