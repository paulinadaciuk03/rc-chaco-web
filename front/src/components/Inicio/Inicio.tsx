import Novedades from "../Novedades/Novedades";
import logo from "../../assets/logo-rc.png"

function Inicio() {
  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-10" data-aos="fade-up">
      {/* Sección de bienvenida */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 max-w-7xl mx-auto" >
        {/* Texto */}
        <div className="flex-1">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sky-950 leading-tight">
            Bienvenidos al Chaco Radio Club
            <span className="text-red-700 font-bold"> LU4GF</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mt-6 text-neutral-600">
            Este es un espacio para compartir conocimientos, experiencias y fortalecer la comunidad de radioaficionados del Chaco y más allá.
            Ya seas un operador con experiencia o estés dando tus primeros pasos en el mundo de la radio, ¡tenés un lugar entre nosotros!
          </p>
        </div>

        {/* Imagen */}
        <div>
          <img src={logo} alt="Chaco" className="max-w-50 md:max-w-70" />
        </div>
      </div>

      {/* Sección de novedades */}

        <h2 className="text-3xl sm:text-4xl font-bold underline underline-offset-10 decoration-1 decoration-stone-300 mb-8 text-center">
          NOVEDADES
        </h2>
        <Novedades />

    </div>
  );
}

export default Inicio;
