import facebook from "../../assets/contacto/facebook.svg";
import mail from "../../assets/contacto/mail.svg";
import pin from "../../assets/contacto/pin-white.svg";
import heart from "../../assets/heart.svg";

function Footer() {
  return (
    <div className="bg-sky-950 text-white py-10 px-6">
      <div className="flex flex-col md:flex-row flex-wrap gap-10">
        {/* Columna 1 */}
        <div className="flex flex-col">
          <h1 className="font-bold text-xl">Chaco Radio Club</h1>
          <h2 className="text-lg">1950 - {new Date().getFullYear()}</h2>
          <div className="flex items-center mt-2">
            <p className="text-sm">Hecho con</p>
            <img src={heart} alt="heart" className="w-5 h-5 mx-1" />
            <p className="text-sm">por Daciuk Paulina y Limberti Franco</p>
          </div>
        </div>

        {/* Columna 2 */}
        <div className="flex flex-col">
          <h1 className="font-bold text-xl mb-2">Contacto</h1>
          <p>secretaria.lu4gf@gmail.com</p>
          <p>lu4gf@yahoo.com.ar</p>
          <p>Saavedra 468; Resistencia, Chaco - Argentina</p>
          <div className="flex mt-2">
            <a
              href="https://www.facebook.com/LU4GF/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="Facebook" className="w-8 h-8 mx-2" />
            </a>
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwrwxCfLrBqDSPsnFccBMfchlKmzpPnDgLccwcsqcCfWHHrZmLZwnBdzzNQZktDJXcMGrV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mail} alt="Mail" className="w-8 h-8 mx-2" />
            </a>
            <a
              href="https://www.google.com.ar/maps/place/LU4GF+Chaco+Radio+Club/@-27.4502149,-58.9774203,21z"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pin} alt="Ubicación" className="w-8 h-8 mx-2" />
            </a>
          </div>
        </div>

        {/* Columna 3 */}
        <div className="flex flex-col">
          <h1 className="font-bold text-xl mb-2">Horarios de Atención</h1>
          <p>Martes a Jueves</p>
          <p className="text-green-400">9:30 - 11:30 a.m.</p>
          <br />
          <p>Viernes</p>
          <p className="text-green-400">9:30 - 11:30 a.m.</p>
          <p className="text-green-400">9 p.m. - 12 a.m.</p>
          <br />
          <p>Sábado, Domingo y Lunes</p>
          <p className="text-red-400">Cerrado</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
