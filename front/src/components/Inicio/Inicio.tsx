import Header from "../Header/Header";
import MenuLateral from "../MenuLateral/MenuLateral";

function Inicio() {
  return (
    <div className="w-400 justify-self-center">
      <Header></Header>
      <div className="flex">
        <MenuLateral></MenuLateral>
        <div className="m-10 flex flex-col">
          <div className="flex mb-25">
            <div>
              <h1 className="text-7xl font-bold text-sky-950">
                Bienvenidos al Chaco Radio Club
                <span className="text-red-700 font-serif"> LU4GF</span>
              </h1>
              <p className="text-lg mt-10 text-neutral-500">
                Este es un espacio para compartir conocimientos, experiencias y
                fortalecer la comunidad de radioaficionados del Chaco y más
                allá. Ya seas un operador con experiencia o estés dando tus
                primeros pasos en el mundo de la radio, ¡tenés un lugar entre
                nosotros!
              </p>
            </div>
            <div className="w-200"></div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-4xl underline underline-offset-20 decoration-neutral-300 font-bold">NOVEDADES</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
