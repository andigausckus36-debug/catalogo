import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import serviciosData from "../data/servicios.json";
import terapeutasData from "../data/terapeutas.json";
import slugify from "slugify";

const ServicioDetalle = () => {
  const { slug } = useParams();
  const servicio = serviciosData.find(
    (s) => slugify(s.Titulo, { lower: true, strict: true }) === slug
  );
  const terapeuta = terapeutasData.find((t) => t.Id === servicio.Terapeutaid);
  const [activeTab, setActiveTab] = useState("Terapeuta");

  const sku = `${servicio.Categoria.slice(0, 3).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 5)
    .toUpperCase()}`;

  const handleWhatsApp = () => {
    const mensaje = `Hola 👋 Quiero reservar una sesión para este servicio:\n\nServicio: ${
      servicio.Titulo
    }\nPrecio: $${servicio.Precio.toLocaleString("es-AR")}\nTerapeuta a cargo: ${
      terapeuta.NombreApellido
    }`;
    window.open(
      `https://wa.me/5493548563662?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

  const categoriaSlug = slugify(servicio.Categoria, { lower: true, strict: true });
  const terapeutaSlug = slugify(terapeuta.NombreApellido, { lower: true, strict: true });

  return (
    <div className="max-w-screen-lg mx-auto px-3 py-8 space-y-4 overflow-x-hidden pt-20">
      <img
        src={servicio.Urlimagen}
        alt={servicio.Titulo}
        className="w-full h-54 md:h-64 object-cover rounded-lg shadow-md"
      />

      <p className="text-gray-500 text-sm">
        <Link to="/" className="hover:underline text-pink-500">Inicio</Link> /{" "}
        <Link to={`/servicios/${categoriaSlug}`} className="hover:underline text-pink-500">Servicios</Link> /{" "}
        <span className="font-medium">{servicio.Titulo}</span>
      </p>

      <h1 className="text-3xl font-medium text-pink-600">{servicio.Titulo}</h1>

      <div className="mt-4 pt-6">
        <div className="flex gap-4 border-b">
          {["Terapeuta", "Disponibilidad", "Descripción"].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-2 ${
                activeTab === tab
                  ? "border-b-2 border-pink-500 font-normal text-pink-600"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {activeTab === "Terapeuta" && (
            <div className="flex flex-col items-center text-center">
              <img
                src={terapeuta.ImagenPerfil}
                alt={terapeuta.NombreApellido}
                className="w-28 h-28 rounded-full object-cover shadow"
              />
              <p className="mt-2 font-medium text-lg">{terapeuta.NombreApellido}</p>
              <Link
                to={`/terapeuta/${terapeutaSlug}`}
                className="mt-2 text-pink-500 underline"
              >
                Ver perfil
              </Link>
            </div>
          )}
          {activeTab === "Disponibilidad" && (
            <p className="text-gray-700">{terapeuta.Disponibilidad}</p>
          )}
          {activeTab === "Descripción" && (
            <p className="text-gray-700">{servicio.Descripcion}</p>
          )}
        </div>
      </div>

      <hr className="my-6" />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-2xl font-normal text-gray-800">
          ${servicio.Precio.toLocaleString("es-AR")}
        </p>
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Agendar sesión
        </button>
      </div>
    </div>
  );
};

export default ServicioDetalle;