import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './index.css';

import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import ServicioDetalle from "./pages/ServicioDetalle.jsx";
import Navbar from "./pages/Navbar.jsx";
import PerfilTerapeuta from "./pages/PerfilTerapeuta.jsx";

import { MusicProvider } from "./context/MusicContext.jsx";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const App = () => (
  <MusicProvider>
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios/:categoria" element={<Servicios />} />
        <Route path="/servicio/:slug" element={<ServicioDetalle />} />
        <Route path="/terapeuta/:slug" element={<PerfilTerapeuta />} />
      </Routes>

      {/* Botón clásico de WhatsApp */}
      <a
        href="https://wa.me/5493548563662?text=Hola%20👋%20Servicios%20Holisticos.%20Quiero%20hacer%20una%20consulta."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 z-50 w-16 h-16 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-110 transition-transform animate-bounce"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-10 h-10"
        />
      </a>
    </Router>
  </MusicProvider>
);

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);