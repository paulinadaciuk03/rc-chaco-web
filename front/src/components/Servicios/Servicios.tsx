import { BookCheck, HeartHandshake, Siren } from "lucide-react";
import {
  FaBroadcastTower,
  FaHandsHelping,
  FaBirthdayCake,
  FaSatelliteDish,
  FaConciergeBell,
  FaClipboardCheck,
} from "react-icons/fa";

export default function Servicios() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-sky-900 mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ofrecemos soluciones integrales para la comunidad y beneficios exclusivos para nuestros socios
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
          <div className="bg-sky-950 p-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <FaBroadcastTower /> 
              Servicios a la comunidad
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              <ServiceItem 
                icon={<Siren className="text-red-500 w-6 h-6" />}
                title="Emergencias y catástrofes"
                description="Prestar servicios de radiocomunicación en caso de emergencias y catástrofes, con autonomía ante cortes de luz."
              />
              <ServiceItem 
                icon={<BookCheck className="text-blue-500 w-5 h-5" />}
                title="Colaboración con autoridades"
                description="Colaborar con las autoridades de orden público."
              />
              <ServiceItem 
                icon={<HeartHandshake className="text-purple-500 w-5 h-5" />}
                title="Acciones solidarias"
                description="Colaborar con acciones solidarias."
              />
            </ul>
          </div>
        </div>

        {/* Servicios a los socios */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
          <div className="bg-sky-950 p-6">
            <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
              <FaHandsHelping /> 
              Servicios a los socios
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              <ServiceItem 
                icon={<FaBirthdayCake className="text-pink-500 w-6 h-6" />}
                title="Salón para eventos"
                description="Alquiler de salón para cumpleaños infantiles, con aire acondicionado, sillas y mesas. Posibilidad de incluir el patio del frente."
              />
              <ServiceItem 
                icon={<FaSatelliteDish className="text-purple-500 w-6 h-6" />}
                title="Sala de radio"
                description="Sala de radio con bandas disponibles de 80 a 10m y 2m."
              />
              <ServiceItem 
                icon={<FaConciergeBell className="text-yellow-500 w-6 h-6" />}
                title="Área de parrilla"
                description="Parrilla y patio trasero techado."
              />
              <ServiceItem 
                icon={<FaClipboardCheck className="text-blue-500 w-6 h-6" />}
                title="Trámites ENACOM"
                description="Trámites ante la ENACOM."
              />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Componente auxiliar para items de servicio
function ServiceItem({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) {
  return (
    <li className="flex gap-4">
      <div className="flex-shrink-0 mt-1">
        {icon}
      </div>
      <div>
        <h4 className="font-medium text-lg text-gray-800 mb-1">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </li>
  );
}