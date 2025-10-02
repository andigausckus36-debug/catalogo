import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import serviciosData from "../data/servicios.json";
import terapeutas from "../data/terapeutas.json";
import { Listbox } from "@headlessui/react";
import { Clock, DollarSign, User, Monitor, X } from "lucide-react";
import slugify from "slugify";

const duraciones = ["5 a 20 min", "30 a 45 min", "45 a 60 min", "Más de 60 min"];
const precios = ["Menor a mayor", "Mayor a menor"];

const Servicios = () => {
  const { categoria } = useParams();
  const navigate = useNavigate();

  // Estados de filtros
  const [duracionSeleccionada, setDuracionSeleccionada] = useState(null);
  const [precioSeleccionado, setPrecioSeleccionado] = useState(null);
  const [generoSeleccionado, setGeneroSeleccionado] = useState(null);

  // Filtrar servicios por categoría
  let serviciosFiltrados = serviciosData.filter(
    (s) => slugify(s.Categoria, { lower: true, strict: true }) === categoria
  );

  // Añadir propiedad Genero desde terapeutas.json
  serviciosFiltrados = serviciosFiltrados.map((s) => {
    const terapeuta = terapeutas.find((t) => t.Id === s.Terapeutaid);
    return { ...s, Genero: terapeuta?.Genero || "" };
  });

  // Aplicar filtros
  if (duracionSeleccionada) {
    serviciosFiltrados = serviciosFiltrados.filter((s) => {
      // Extraer todos los números de la duración
      const matches = s.Duracion.match(/\d+/g);
      if (!matches) return false;

      // Tomar el mayor número (ej: "5 a 10 min" → 10)
      const minutos = Math.max(...matches.map((n) => parseInt(n, 10)));

      if (duracionSeleccionada === "5 a 20 min") {
        return minutos >= 5 && minutos <= 20;
      }
      if (duracionSeleccionada === "30 a 45 min") {
        return minutos >= 30 && minutos <= 45;
      }
      if (duracionSeleccionada === "45 a 60 min") {
        return minutos >= 45 && minutos <= 60;
      }
      if (duracionSeleccionada === "Más de 60 min") {
        return minutos > 60;
      }
      return true;
    });
  }

  if (precioSeleccionado) {
    serviciosFiltrados = serviciosFiltrados.sort((a, b) => {
      if (precioSeleccionado === "Menor a mayor") return a.Precio - b.Precio;
      else return b.Precio - a.Precio;
    });
  }

  if (generoSeleccionado) {
    serviciosFiltrados = serviciosFiltrados.filter(
      (s) => s.Genero === generoSeleccionado
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10 pt-24">

      {/* Título arriba de los filtros */}
      <h2 className="text-2xl font-medium text-gray-700 text-center">
        Reserva tu sesión online y comienza tu camino de transformación hoy mismo 💫
      </h2>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">

        {/* Duración */}
        <Listbox value={duracionSeleccionada} onChange={setDuracionSeleccionada}>
          <div className="relative w-52">
            <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-center flex items-center justify-between focus:outline-none">
              <span>{duracionSeleccionada || "Duración"}</span>
              {duracionSeleccionada && (
                <X
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDuracionSeleccionada(null);
                  }}
                />
              )}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
              {duraciones.map((d, i) => (
                <Listbox.Option
                  key={i}
                  value={d}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Clock className="w-4 h-4 text-gray-500" /> {d}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Precio */}
        <Listbox value={precioSeleccionado} onChange={setPrecioSeleccionado}>
          <div className="relative w-52">
            <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-center focus:outline-none">
              {precioSeleccionado || "Precio"}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
              {precios.map((p, i) => (
                <Listbox.Option
                  key={i}
                  value={p}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-gray-500" /> {p}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* Género */}
        <Listbox value={generoSeleccionado} onChange={setGeneroSeleccionado}>
          <div className="relative w-52">
            <Listbox.Button className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-center flex items-center justify-between focus:outline-none">
              <span>{generoSeleccionado || "Género del terapeuta"}</span>
              {generoSeleccionado && (
                <X
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setGeneroSeleccionado(null);
                  }}
                />
              )}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 bg-white border border-gray-300 rounded-md max-h-60 overflow-auto z-10">
              {["Masculino", "Femenino"].map((g, i) => (
                <Listbox.Option
                  key={i}
                  value={g}
                  className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-gray-500" /> {g}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {serviciosFiltrados.map((s) => {
          const terapeuta = terapeutas.find((t) => t.Id === s.Terapeutaid);
          return (
            <div key={s.Id} className="relative rounded-lg p-4 w-full shadow-sm">

              {/* Imagen principal */}
              <div className="relative">
                <img
                  src={s.Urlimagen}
                  alt={s.Titulo}
                  className="w-full h-48 object-cover rounded-md"
                />
                {/* Foto de perfil del terapeuta */}
                {terapeuta?.ImagenPerfil && (
                  <img
                    src={terapeuta.ImagenPerfil}
                    alt={terapeuta.NombreApellido}
                    className="absolute top-2 right-2 w-16 h-16 rounded-full border-2 border-white shadow-md"
                  />
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2 text-center">{s.Categoria}</p>
              <h3 className="font-medium mt-1 text-xl text-center mb-4 text-pink-600">
                {s.Titulo}
              </h3>

              {/* Precio, duración y modalidad */}
              <div className="flex justify-center items-center gap-4 mt-1 text-gray-600 text-sm mb-6">
                <span className="flex items-center gap-1 text-xl font-normal text-gray-800">
                  <DollarSign className="w-5 h-5" /> {Number(s.Precio).toLocaleString("es-AR")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {s.Duracion}
                </span>
                <span className="flex items-center gap-1">
                  <Monitor className="w-4 h-4" /> {s.Modalidad || "Online"}
                </span>
              </div>

              {/* Botón */}
              <div className="flex justify-center mt-2">
                <button
                  className="inline-block px-4 bg-pink-500 text-white py-1 rounded-xl"
                  onClick={() => {
  const slug = slugify(s.Titulo, { lower: true, strict: true });
  navigate(`/servicio/${slug}`);
}}
                >
                  Ver servicio
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Servicios;