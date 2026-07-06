import { FaFacebook } from "react-icons/fa";
import { Mail, MapPin } from "lucide-react";

function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-sky-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Columna 1: marca */}
        <div>
          <h2 className="font-bold text-2xl">Chaco Radio Club</h2>
          <p className="text-sky-300 font-medium mt-1">LU4GF · 1950 - {anioActual}</p>
          <p className="text-sky-200/70 text-sm mt-4 max-w-xs leading-relaxed">
            Uniendo a la comunidad de radioaficionados del Chaco desde hace más de 70 años.
          </p>
        </div>

        {/* Columna 2: contacto */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-sky-300 mb-4">
            Contacto
          </h3>
          <ul className="space-y-3 text-sky-100 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>secretaria.lu4gf@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>lu4gf@yahoo.com.ar</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Saavedra 468; Resistencia, Chaco - Argentina</span>
            </li>
          </ul>

          <div className="flex gap-3 mt-5">
            <a
              href="https://www.facebook.com/LU4GF/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-white/10 hover:bg-sky-400 hover:text-sky-950 transition-colors p-2.5 rounded-full"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwrwxCfLrBqDSPsnFccBMfchlKmzpPnDgLccwcsqcCfWHHrZmLZwnBdzzNQZktDJXcMGrV"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Mail"
              className="bg-white/10 hover:bg-sky-400 hover:text-sky-950 transition-colors p-2.5 rounded-full"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href="https://www.google.com.ar/maps/place/LU4GF+Chaco+Radio+Club/@-27.4502149,-58.9774203,21z"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ubicación"
              className="bg-white/10 hover:bg-sky-400 hover:text-sky-950 transition-colors p-2.5 rounded-full"
            >
              <MapPin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Columna 3: horarios */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-sky-300 mb-4">
            Horarios de Atención
          </h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-sky-100">Martes a Jueves</p>
              <p className="text-green-400 font-medium">9:30 - 11:30 hs</p>
            </div>
            <div>
              <p className="text-sky-100">Viernes</p>
              <p className="text-green-400 font-medium">9:30 - 11:30 hs · 21:00 - 00:00 hs</p>
            </div>
            <div>
              <p className="text-sky-100">Sábado, Domingo y Lunes</p>
              <p className="text-red-400 font-medium">Cerrado</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 px-6 text-center text-xs text-sky-300/60">
        © {anioActual} Chaco Radio Club LU4GF. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
