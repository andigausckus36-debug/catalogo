// PerfilTerapeuta.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import terapeutas from "../data/terapeutas.json";
import servicios from "../data/servicios.json";
import slugify from "slugify";

const PerfilTerapeuta = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const terapeuta = terapeutas.find((t) => t.Slug === slug);

  const [showMore, setShowMore] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  if (!terapeuta) {
    return <p className="text-center mt-20">Terapeuta no encontrado.</p>;
  }

  const serviciosDelTerapeuta = servicios.filter(
    (s) => s.Terapeutaid === terapeuta.Id
  );

  return (
    <div className="max-w-5xl mx-auto px-3 py-8 pt-20 space-y-10 bg-gray-50">
      {/* Imagen de portada */}
      <div className="w-full h-56 rounded-xl overflow-hidden shadow-md cursor-pointer" onClick={() => setModalImage(terapeuta.ImagenPortada)}>
        <img
          src={terapeuta.ImagenPortada}
          alt="Portada"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Imagen de perfil + datos */}
      <div className="flex flex-col items-center -mt-24">
        <div
          className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer"
          onClick={() => setModalImage(terapeuta.ImagenPerfil)}
        >
          <img
            src={terapeuta.ImagenPerfil}
            alt={terapeuta.NombreApellido}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold">{terapeuta.NombreApellido}</h1>
        <p className="text-gray-600">{terapeuta.Ciudad}, {terapeuta.Provincia}</p>
      </div>

      {/* Sobre mí */}
      <div className="text-center space-y-3">
        <h2 className="text-xl font-medium">Sobre mí 🌟</h2>
        <p className="text-md text-gray-700">
          {showMore ? terapeuta.SobreMi : `${terapeuta.SobreMi.slice(0, 120)}...`}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-pink-500 font-medium hover:underline"
        >
          {showMore ? "Ver menos" : "Ver más"}
        </button>
      </div>

      {/* Especialidades */}
      <div>
        <h2 className="text-xl font-medium mb-4 text-center">Mis especialidades 🍃</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {terapeuta.Especialidades.map((esp, index) => (
            <span
              key={index}
              className="px-4 py-1 border-2 border-pink-400 rounded-3xl bg-pink-50 text-pink-600 font-medium text-sm"
            >
              {esp}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <p className="px-6 py-1 rounded-3xl bg-green-100 text-green-700 font-medium text-center shadow-sm">
          ¡Te espero en mis sesiones!
        </p>
      </div>

      {/* Servicios */}
      <div>
        <h2 className="text-xl font-medium mb-4 text-center">Mis servicios 🌻</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {serviciosDelTerapeuta.map((s) => (
            <div key={s.Id} className="rounded-lg overflow-hidden text-center">
              <img
                src={s.Urlimagen}
                alt={s.Titulo}
                className="w-full h-40 object-cover cursor-pointer"
                onClick={() => setModalImage(s.Urlimagen)}
              />
              <div className="p-2">
                <p className="text-sm text-gray-500">{s.Categoria}</p>
                <h3 className="font-medium text-xl text-pink-600 mt-1">{s.Titulo}</h3>
                <p className="text-gray-600 font-normal text-xl mt-2 mb-2">${s.Precio.toLocaleString("es-AR")}</p>
                <p className="text-gray-600 mb-2">{s.Modalidad || "Online"}</p>
                <button
                  className="mt-4 px-6 bg-pink-500 text-white py-1 rounded-xl hover:bg-pink-600 transition"
                  onClick={() => navigate(`/servicio/${slugify(s.Titulo, { lower: true, strict: true })}`)}
                >
                  Ver más
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de imagen */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <img src={modalImage} alt="Ampliada" className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={() => setModalImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerfilTerapeuta;