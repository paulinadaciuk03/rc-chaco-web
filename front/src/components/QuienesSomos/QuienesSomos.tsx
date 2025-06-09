import foto1 from "../../assets/foto-quienes-somos.jpg";
import { Separator } from "../ui/separator";
import { Card, CardDescription, CardHeader } from "../ui/card";
import formacion from "../../assets/mision/formacion.svg";
import innovacion from "../../assets/mision/innovacion.svg";
import servicio from "../../assets/mision/servicios.svg";
import comunidad from "../../assets/mision/comunidad.svg";
import legado from "../../assets/sumate/legado.svg";
import evento from "../../assets/sumate/evento.svg";
import social from "../../assets/sumate/social.svg";
import pin from "../../assets/contacto/pin.svg";
import contacto from "../../assets/contacto/contacto.svg";
import { buttonVariants } from "../ui/button";
import logo from "../../assets/logo-rc.png";

function QuienesSomos() {
  const cardsMision = [
    {
      img: formacion,
      title: "Formación",
      description:
        "Capacitar a nuevas generaciones de radioaficionados mediante cursos homologados por el organismo nacional de comunicaciones, talleres prácticos y mentorías personalizadas.",
    },
    {
      img: innovacion,
      title: "Innovación",
      description:
        "Impulsar proyectos técnicos, concursos y la participación en actividades nacionales e internacionales.",
    },
    {
      img: servicio,
      title: "Servicio",
      description:
        "Garantizar comunicaciones confiables en situaciones de emergencia, trabajando en red con organismos públicos e instituciones.",
    },
    {
      img: comunidad,
      title: "Comunidad",
      description:
        "Promover la camaradería y el intercambio de conocimientos entre socios, desde principiantes hasta expertos.",
    },
  ];

  const cardsChoose = [
    {
      img: legado,
      title: "Trayectoria y Legado",
      description:
        "Uno de los radio clubes históricos del Norte argentino, con estación propia y reconocimiento a nivel nacional.",
    },
    {
      img: formacion,
      title: "Capacitación Integral",
      description:
        "Desde cursos para obtener tu licencia (LU) hasta talleres avanzados de electrónica y protocolos digitales.",
    },
    {
      img: evento,
      title: "Eventos Exclusivos",
      description:
        "Organizamos salidas al campo, actividades diversas, y charlas con referentes de la radioafición.",
    },
    {
      img: social,
      title: "Impacto Social",
      description:
        "Colaboramos con organismos en proyectos de comunicación solidaria.",
    },
  ];
  return (
    <>
      <div className="max-w-7xl justify-self-center">
        {/*Quiénes Somos*/}
        <div data-aos="fade-up">
  <h1 className="text-3xl font-bold text-center text-sky-950 my-10 md:text-5xl">
    ¿Quiénes Somos?
  </h1>

  <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 px-4 md:px-10">
    <div className="flex-1 text-center mb-5 md:text-left">
      <p className="text-stone-600 mb-4 md:text-xl">
        Somos una institución pionera en radiocomunicaciones del Nordeste argentino, fundada el 14 de mayo de 1950 en Resistencia, Chaco. Con más de siete décadas de trayectoria, agrupamos a radioaficionados, técnicos y entusiastas comprometidos con la innovación, el aprendizaje continuo y el servicio a la comunidad.
      </p>
      <p className="text-stone-600 md:text-xl">
        En el Chaco Radio Club, transformamos las ondas en conexiones que trascienden distancias: fomentamos la formación técnica, participamos en eventos nacionales e internacionales y colaboramos en emergencias, manteniendo viva la esencia de la radioafición con un enfoque moderno y social.
      </p>
    </div>

    {/* Imagen */}
    <div className="flex-1 flex justify-center">
      <img src={foto1} alt="Foto de Quienes Somos" className="w-full max-w-md rounded-xl shadow-md" />
    </div>
  </div>

  <Separator />
</div>

        {/*Nuestra Mision*/}

        <h1
          className=" text-3xl font-bold text-sky-950 my-10 justify-self-center text-center md:text-5xl"
          data-aos="fade-up"
        >
          Nuestra Misión
        </h1>

        <div className="grid md:grid-cols-4 mx-auto">
          {cardsMision.map((card, index) => (
            <Card key={index} className="m-5" data-aos="zoom-in">
              <img src={card.img} alt="" className="w-20 self-center" />
              <CardHeader className=" text-2xl font-bold text-stone-800 text-center md:text-3xl">
                {card.title}
              </CardHeader>
              <CardDescription className="text-1xl text-stone-600 px-5 text-center ">
                {card.description}
              </CardDescription>
            </Card>
          ))}
        </div>
        <Separator></Separator>
        {/*Por qué elegirnos*/}

        <div data-aos="fade-up">
          <h1 className="text-3xl font-bold text-sky-950 m-15 text-center md:text-5xl ">
            ¿Te interesa sumarte?
          </h1>
          <p className="mx-10 text-center text-stone-600 md:text-2xl">
            Unite a nuestra comunidad apasionada por las radiocomunicaciones,
            donde vas a encontrar:
          </p>

          <div className="grid md:grid-cols-2 mx-auto">
            {cardsChoose.map((card, index) => (
              <Card key={index} className="m-5" data-aos="zoom-in">
                <div className="flex text-wrap md:text-nowrap items-center mx-10 text-nowrap">
                  <img src={card.img} alt="" className="w-15 self-center" />
                  <CardHeader className="text-2xl font-bold text-stone-800 md:text-3xl">
                    {card.title}
                  </CardHeader>
                </div>

                <CardDescription className="text-1xl text-stone-600 px-10">
                  {card.description}
                </CardDescription>
              </Card>
            ))}
          </div>
        </div>
        <Separator />
        {/*conecta*/}
        <div data-aos="fade-up">
          <h1 className="text-3xl font-bold text-sky-950 mx-15 my-5 text-center md:text-xl ">
            Conectá con nosotros
          </h1>
          <p className="mx-10 text-center text-stone-600 md:text-2xl">
            Si buscás un espacio donde la comunicación y la tecnología se
            combina con la amistad y el compromiso, ¡este es tu lugar!
          </p>
          <div className="grid my-10 gap-4 md:grid-cols-2">
            <Card className="m-5 p-5" data-aos="zoom-in">
              <div className="flex mx-10 items-center">
                <img src={pin} alt="" className="w-10" />
                <CardHeader className="text-2xl font-bold text-stone-800 md:text-3xl">
                  Visitános
                </CardHeader>
              </div>

              <CardDescription className="text-1xl mx-2 text-stone-600 md:text-xl">
                Calle Saavedra 468; Resistencia, Chaco - Argentina
              </CardDescription>
              <a
                className={buttonVariants({ variant: "outline" })}
                href="https://www.google.com.ar/maps/place/LU4GF+Chaco+Radio+Club/@-27.4502149,-58.9774203,21z/data=!4m15!1m8!3m7!1s0x94450cfa0312918b:0x9f2b6d02c55ab346!2sANJ,+Saavedra+468,+H3500+Resistencia,+Chaco!3b1!8m2!3d-27.4501884!4d-58.9773794!16s%2Fg%2F11h4zqk0kl!3m5!1s0x94450cfa02bae597:0xfcbe47602df86d40!8m2!3d-27.45017!4d-58.9773332!16s%2Fg%2F1tjrr1gw?hl=es&entry=ttu&g_ep=EgoyMDI1MDQzMC4xIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir en Google Maps
              </a>
            </Card>
            <Card className="m-5 p-5" data-aos="zoom-in">
              <div className="flex mx-10 items-center">
                <img src={contacto} alt="" className="w-10" />
                <CardHeader className="text-2xl font-bold text-stone-800 md:text-3xl">
                  Contacto
                </CardHeader>
              </div>

              <CardDescription className="text-1xl mx-2 text-stone-600 md:text-xl">
                secretaria.lu4gf@gmail.com | lu4gf@yahoo.com.ar
              </CardDescription>

              <a
                className={buttonVariants({ variant: "outline" })}
                href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSHwrwxCfLrBqDSPsnFccBMfchlKmzpPnDgLccwcsqcCfWHHrZmLZwnBdzzNQZktDJXcMGrV"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir Gmail
              </a>
            </Card>
          </div>
          <Separator></Separator>
          <div className="flex flex-col items-center m-15" data-aos="fade-up">
            <img src={logo} alt="" className="w-50 mb-10" />
            <h1 className="text-2xl text-center font-bold text-sky-950 md:text-4xl">
              "Más que un hobby, una pasión que nos une."
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuienesSomos;
