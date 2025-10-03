// Home.jsx
import { useEffect } from "react";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as Accordion from "@radix-ui/react-accordion";
import { Listbox } from "@headlessui/react";

import MarkerClusterGroup from "react-leaflet-markercluster";

import terapeutas from "../data/terapeutas.json";
import servicios from "../data/servicios.json";

import { useNavigate } from "react-router-dom";
import slugify from "slugify";

const Home = () => {
  const bannerUrl = "https://i.postimg.cc/1tr6GDCT/front-view-therapist-woman-1-min.jpg";

  const navigate = useNavigate();

  // Estados para filtros
  const [especialidad, setEspecialidad] = useState(null);
  const [provincia, setProvincia] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [map, setMap] = useState(null);

  // Valores únicos desde JSON
  const categoriasDisponibles = [...new Set(servicios.map(s => s.Categoria))];
  const provinciasUnicas = [...new Set(terapeutas.map(t => t.Provincia))];
  const ciudadesUnicas = [...new Set(terapeutas.map(t => t.Ciudad))];

  // Filtrar terapeutas primero
  const terapeutasFiltrados = terapeutas.filter((t) => {
    const coincideEspecialidad = !especialidad || servicios.some(
      (s) => s.Terapeutaid === t.Id && s.Categoria === especialidad
    );
    const coincideProvincia = !provincia || t.Provincia === provincia;
    const coincideCiudad = !ciudad || t.Ciudad === ciudad;
    return coincideEspecialidad && coincideProvincia && coincideCiudad;
  });

  // Luego el useEffect usa terapeutasFiltrados
  useEffect(() => {
    if (!map || terapeutasFiltrados.length === 0) return;

    const bounds = L.latLngBounds(
      terapeutasFiltrados.map(t => [Number(t.Latitud), Number(t.Longitud)])
    );

    map.fitBounds(bounds, { padding: [50, 50] });
  }, [terapeutasFiltrados, map]);

  // Filtrar ciudades según provincia seleccionada
const ciudadesFiltradas = provincia
  ? [...new Set(terapeutas
      .filter(t => t.Provincia === provincia)
      .map(t => t.Ciudad)
    )]
  : [...new Set(terapeutas.map(t => t.Ciudad))]; // todas si no hay provincia

  const faqItems = [
    {
      question: "¿Cómo reservo una sesión?",
      answer: "Elegis la sesión adecuada y la reservas directamente por WhatsApp."
    },
    {
      question: "¿Necesito registrarme para reservar?",
      answer: "No, no es necesario registrarse para reservar sesiones."
    },
    {
      question: "¿Cómo recibo los datos del terapeuta?",
      answer: "Los datos del terapeuta se comparten por WhatsApp una vez que abonaste la sesión."
    },
    {
      question: "¿Cómo puedo abonar la sesión?",
      answer: "Podes abonar mediante transferencia CBU/CVU a la cuenta de Mercado Pago de Servicios Holisticos."
    },
    {
      question: "¿Puedo cambiar la fecha de la sesión?",
      answer: "Sí, coordina directamente con el terapeuta por WhatsApp para modificar la fecha y hora ideal."
    }
  ];

  // Icono de marcador circular
  const customIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <div className="space-y-16">

      {/* Banner */}
      <div className="w-full h-[200px] overflow-hidden shadow-lg">
        <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* Título y subtítulo */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700">
          Catálogo Holistico 🌿
        </h1>
        <p className="text-gray-700 mt-2">
          Explora servicios online y presencial por categoría, duración, precio y género del terapeuta para encontrar la sesión ideal para vos
        </p>
      </div>

      {/* Sección de categorías */}
      <div className="py-8 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2 text-center">
          Especialidades online 👩🏻‍💻
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Explora las sesiones online disponibles
        </p>
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          {categoriasDisponibles.map((cat, index) => (
            <span
              key={index}
              className="px-2 py-1 border-2 border-pink-400 rounded-3xl bg-white text-pink-500 font-normal cursor-pointer hover:bg-pink-100 transition"
              onClick={() => {
                const slug = slugify(cat, { lower: true, strict: true });
                navigate(`/servicios/${slug}`);
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Nuevos terapeutas holísticos */}
      <div className="py-8 px-4 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-2 text-center">
          Nuevos terapeutas 🦋
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Mira los perfiles con ubicaciones, especialidades y servicios que ofrecen
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          {terapeutas.map((t) => {
            const slug = slugify(t.NombreApellido, { lower: true, strict: true });
            return (
              <div key={t.Id} className="flex flex-col items-center">
                <div className="w-24 h-24 overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
                  <img src={t.ImagenPerfil} alt={t.NombreApellido} className="w-full h-full rounded-full object-cover" />
                </div>
                <button
                  className="mb-6 mt-3 text-pink-500 font-medium hover:underline rounded-3xl text-sm"
                  onClick={() => navigate(`/terapeuta/${slug}`)}
                >
                  Ver perfil
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sesiones presenciales */}
      <div className="py-8 px-4 max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Sesiones presenciales 📌
        </h2>
        <p className="text-gray-600 mb-6">
          Busca terapeutas holísticos cerca tuyo. Filtra por especialidad, provincia y ciudad y reserva tu sesión hoy mismo
        </p>

        {/* Filtros */}
<div className="flex flex-wrap justify-center gap-4 mb-6 w-full relative">

  {/* Especialidad */}
  <Listbox value={especialidad} onChange={setEspecialidad}>
    <div className="relative w-56 flex items-center">
      <Listbox.Button className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-center focus:outline-none focus:ring-0 flex justify-between items-center">
        <span>{especialidad || "Especialidad"}</span>
        {especialidad && (
          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={(e) => { e.stopPropagation(); setEspecialidad(null); }}
          >
            ✕
          </button>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        {categoriasDisponibles.map((esp, idx) => (
          <Listbox.Option
            key={idx}
            value={esp}
            className="cursor-pointer px-3 py-2 hover:bg-pink-100"
          >
            {esp}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </div>
  </Listbox>

  {/* Provincia */}
  <Listbox value={provincia} onChange={setProvincia}>
    <div className="relative w-56">
      <Listbox.Button className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-center focus:outline-none focus:ring-0 flex justify-between items-center">
        <span>{provincia || "Provincia"}</span>
        {provincia && (
          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation(); // evita abrir el Listbox al hacer click en la X
              setProvincia(null);
            }}
          >
            ✕
          </button>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        {provinciasUnicas.map((prov, idx) => (
          <Listbox.Option
            key={idx}
            value={prov}
            className="cursor-pointer px-3 py-2 hover:bg-pink-100"
          >
            {prov}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </div>
  </Listbox>

  {/* Ciudad */}
  <Listbox value={ciudad} onChange={setCiudad}>
    <div className="relative w-56">
      <Listbox.Button className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-center focus:outline-none focus:ring-0 flex justify-between items-center">
        <span>{ciudad || "Ciudad"}</span>
        {ciudad && (
          <button
            className="ml-2 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation(); // evita abrir el Listbox al hacer click en la X
              setCiudad(null);
            }}
          >
            ✕
          </button>
        )}
      </Listbox.Button>
      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        {ciudadesFiltradas.map((ciu, idx) => (
          <Listbox.Option
            key={idx}
            value={ciu}
            className="cursor-pointer px-3 py-2 hover:bg-pink-100"
          >
            {ciu}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </div>
  </Listbox>

</div>

        {/* Mapa Leaflet */}
        <div className="w-full rounded-xl overflow-hidden shadow-lg relative z-0 mb-16">
          <MapContainer
            center={[-38.4161, -63.6167]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "400px" }}
            whenCreated={setMap}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <MarkerClusterGroup>
              {Object.entries(
                terapeutasFiltrados.reduce((acc, t) => {
                  const key = `${t.Ciudad}-${t.Provincia}`;
                  if (!acc[key]) acc[key] = [];
                  acc[key].push(t);
                  return acc;
                }, {})
              ).map(([key, terapeutasCiudad]) => {
                const { Latitud, Longitud } = terapeutasCiudad[0];

                return (
                  <Marker
                    key={key}
                    position={[Latitud, Longitud]}
                    icon={customIcon}
                  >
                    <Popup className="w-64">
                      <div className="text-center">
                        <div className="mb-2 flex justify-center">
                          <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                            {terapeutasCiudad.length} terapeuta{terapeutasCiudad.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        {terapeutasCiudad.map((t) => (
                          <div key={t.Id} className="mb-3 border-b pb-2 last:border-b-0 last:pb-0">
                            <div className="w-14 h-14 rounded-full overflow-hidden mx-auto mb-1">
                              <img
                                src={t.ImagenPerfil}
                                alt={t.NombreApellido}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <p className="font-semibold text-gray-800 text-sm">{t.NombreApellido}</p>
                            <button
                              className="mt-1 text-pink-500 font-medium hover:underline text-xs"
                              onClick={() =>
                                navigate(`/terapeuta/${slugify(t.NombreApellido, { lower: true, strict: true })}`)
                              }
                            >
                              Ver perfil
                            </button>
                          </div>
                        ))}
                      </div>
                    </Popup>
                  </Marker>
                );
              })}
            </MarkerClusterGroup>

          </MapContainer>
        </div>

  {/* ¿Quién soy? */}
  <div className="py-8 px-4 max-w-6xl mx-auto text-center space-y-6">
    <h2 className="text-2xl font-bold text-gray-700 mb-4">¿Quién soy?</h2>

    <p className="text-gray-600">
      Hola 👋 soy Andi, el creador de este espacio online. Mi misión es conectar a personas con terapeutas holisticos para que puedan encontrar el apoyo que necesitan.
    </p>

    <p className="text-gray-600">
      En estos tiempos críticos, es muy importante regresar hacia nuestro interior para encontrar serenidad y Conexión, para poder vivir con mayor claridad mental y conectarnos con nuestro Ser Interno.
    </p>

    <p className="text-gray-600">
      De esa imperiosa necesidad humana es que nace este espacio online, como un punto de encuentro entre quienes brindan sesiones para tu bienestar y buscador@s como vos, personas con un profundo deseo de trascender.
    </p>

    <p className="text-gray-600">
      Espero que encuentres la sesión que buscas y que disfrutes de tu experiencia. Si tenés alguna pregunta o sugerencia, no dudes en contactarme.
    </p>

    <p className="text-gray-600">
      Te abrazo donde quieras que estés 💞
    </p>

    <p className="text-gray-600">
      Namaste 🙏
    </p>

  {/* Imágenes adicionales */}
  <div className="flex justify-center gap-4 mt-4 flex-wrap">
    <img
      src="https://i.postimg.cc/HLbgR5LN/FB-IMG-1759420757070.jpg"
      alt="Imagen 1"
      className="w-32 h-32 object-cover rounded-md shadow-md"
    />
    <img
      src="https://i.postimg.cc/BQRR36km/FB-IMG-1759420871991.jpg"
      alt="Imagen 2"
      className="w-32 h-32 object-cover rounded-md shadow-md"
    />
    <img
      src="https://i.postimg.cc/0ygX34KZ/FB-IMG-1759420689612.jpg"
      alt="Imagen 3"
      className="w-32 h-32 object-cover rounded-md shadow-md"
    />
    <img
      src="https://i.postimg.cc/0jwFK1Jt/FB-IMG-1759420768439.jpg"
      alt="Imagen 4"
      className="w-32 h-32 object-cover rounded-md shadow-md"
    />
    <img
      src="https://i.postimg.cc/5Nmp7t1p/IMG-20250930-103949-132.webp"
      alt="Imagen 5"
      className="w-32 h-32 object-cover rounded-md shadow-md mb-12"
    />
  </div>
</div>

{/* Preguntas frecuentes */}
<div className="py-8 px-4 max-w-6xl mx-auto">
  <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Preguntas frecuentes</h2>
  <Accordion.Root type="single" collapsible className="space-y-2">
    {faqItems.map((item, index) => (
      <Accordion.Item key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg overflow-hidden">
        <Accordion.Header className="bg-gray-100 px-4 py-2 cursor-pointer">
          <Accordion.Trigger className="w-full text-left font-medium text-gray-700 hover:text-pink-500 transition focus:outline-none focus:ring-0">
            {item.question}
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content className="px-4 py-2 text-gray-600 bg-white">
          {item.answer}
        </Accordion.Content>
      </Accordion.Item>
    ))}
  </Accordion.Root>

</div>
        </div>
      </div>
    );


      };

export default Home;