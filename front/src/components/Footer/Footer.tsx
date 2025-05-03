import facebook from "../../assets/contacto/facebook.svg";
import mail from "../../assets/contacto/mail.svg";
import pin from "../../assets/contacto/pin-white.svg";
import heart from "../../assets/heart.svg";
function Footer() {
  return (
    <>
      <div className="flex bg-sky-950">
        <div className="flex flex-col text-white m-10">
          <h1 className="font-bold text-xl">Chaco Radio Club</h1>
          <h1 className="text-l">1950 - {new Date().getFullYear()}</h1>
          <div className="flex">
            <p className="text-sm">Hecho con </p>
            <img src={heart} alt="" className="mr-1 ml-1" />
            <p className="text-sm">por Daciuk Paulina y Limberti Franco</p>
          </div>
        </div>
        <div className="flex flex-col text-white m-10">
          <h1 className="font-bold text-xl">Contacto</h1>
          <p>secretaria.lu4gf@gmail.com</p>
          <p>lu4gf@yahoo.com.ar</p>
          <p>Saavedra 468; Resistencia, Chaco - Argentina</p>
          <div className="flex">
            <a
              href="https://www.facebook.com/LU4GF/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="" className="w-10 m-2" />
            </a>
            <a
              href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwrwxCfLrBqDSPsnFccBMfchlKmzpPnDgLccwcsqcCfWHHrZmLZwnBdzzNQZktDJXcMGrV"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={mail} alt="" className="w-10 m-2" />
            </a>
            <a
              href="https://www.google.com.ar/maps/place/LU4GF+Chaco+Radio+Club/@-27.4502149,-58.9774203,21z/data=!4m15!1m8!3m7!1s0x94450cfa0312918b:0x9f2b6d02c55ab346!2sANJ,+Saavedra+468,+H3500+Resistencia,+Chaco!3b1!8m2!3d-27.4501884!4d-58.9773794!16s%2Fg%2F11h4zqk0kl!3m5!1s0x94450cfa02bae597:0xfcbe47602df86d40!8m2!3d-27.45017!4d-58.9773332!16s%2Fg%2F1tjrr1gw?hl=es&entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={pin} alt="" className="w-10 m-2" />
            </a>
          </div>
        </div>
        <div className="flex flex-col text-white m-10">
          <h1 className="font-bold text-xl">Horarios de Atención</h1>
          <p>Martes a Jueves</p>
          <p className="text-green-400">9:30 - 11:30 a.m.</p>
          <br />
          <p>Viernes</p>
          <p className="text-green-400">9:30 - 11:30 a.m.</p>
          <p className="text-green-400">9 p.m. - 12 a.m.</p>
          <br />
          <p>Sábado Domingo y Lunes</p>
          <p className="text-red-400">Cerrado</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
