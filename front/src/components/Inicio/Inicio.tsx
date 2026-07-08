import Novedades from "../Novedades/Novedades";
import logo from "../../assets/logo-rc.png";
import equipo1 from "../../assets/inicio/equipo-1.jpg";
import equipo2 from "../../assets/inicio/equipo-2.jpg";
import equipo3 from "../../assets/inicio/equipo-3.jpg";
import torreAntena from "../../assets/inicio/torre-antena.jpg";

function Inicio() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-10 py-10" data-aos="fade-up">
      {/* Sección de bienvenida */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-8 max-w-7xl mx-auto">
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-950 leading-tight">
            Bienvenidos
            <br />
            Chaco Radio Club
            <span className="text-red-700 font-bold"> LU4GF</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mt-6 text-neutral-600">
            Donde la pasión por comunicar se transforma en comunidad, conocimiento,
            aprendizaje e innovación. Desde 1950, conectamos personas, tecnología y
            amistad a través de la radioafición.
          </p>
        </div>

        {/* Imagen */}
        <div>
          <img src={logo} alt="Chaco Radio Club LU4GF" className="max-w-50 md:max-w-70" />
        </div>
      </div>

      {/* Banner + Galería */}
      <div className="flex flex-col sm:flex-row gap-4 mb-16 sm:h-72">
        <div className="flex flex-col gap-4 flex-1">
          <div className="bg-sky-900 text-white text-center font-semibold text-lg sm:text-xl rounded-xl py-4 px-6 flex items-center justify-center">
            Viví la experiencia de comunicar sin fronteras.
          </div>
          <div className="grid grid-cols-3 gap-4 flex-1">
            <img
              src={equipo1}
              alt="Radio Yaesu FT-991A del club"
              className="w-full h-32 sm:h-full object-cover rounded-2xl border"
            />
            <img
              src={equipo2}
              alt="Equipos de radio del Chaco Radio Club"
              className="w-full h-32 sm:h-full object-cover rounded-2xl border"
            />
            <img
              src={equipo3}
              alt="Radio con patente LU4GF"
              className="w-full h-32 sm:h-full object-cover rounded-2xl border"
            />
          </div>
        </div>
        <img
          src={torreAntena}
          alt="Socio realizando mantenimiento en la torre de antenas"
          className="w-full h-48 sm:h-full sm:w-64 object-cover rounded-2xl border"
        />
      </div>

      {/* Sección de novedades */}
      <Novedades />
    </div>
  );
}

export default Inicio;
