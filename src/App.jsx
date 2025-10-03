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
    </Router>
  </MusicProvider>
);

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);