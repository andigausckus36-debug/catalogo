// src/componente/WhatsAppButton.jsx
import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+5493548563662";
  const message = encodeURIComponent("Hola 👋 Servicios Holisticos. Quiero hacer una consulta.");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg animate-bounce transition-colors"
      title="Enviar WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        className="w-7 h-7"
      >
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.553 4.096 1.515 5.854L0 24l6.496-1.503A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.707 16.293c-.28.78-1.64 1.5-2.285 1.576-.578.07-1.375.1-2.407-.433-2.173-1.077-3.584-3.004-4.154-3.877-.55-.849-.464-1.476-.263-1.645.2-.168.46-.278.687-.416.23-.14.308-.233.462-.384.155-.15.078-.282-.038-.416-.116-.134-1.006-2.413-1.38-3.288-.364-.862-.735-.744-.995-.758-.255-.013-.55-.015-.84-.015-.287 0-.75.105-1.145.505-.395.398-1.51 1.475-1.51 3.6s1.547 4.174 1.762 4.468c.21.295 3.048 4.655 7.38 6.01 5.14 1.57 5.14-3.72 5.14-3.796 0-.078.02-.137-.02-.195z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;