// MusicPlayer.jsx
import { useState } from "react";
import { useMusic } from "../context/MusicContext";

const MusicPlayer = () => {
  const { isPlaying, togglePlay } = useMusic();
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => setShowTooltip((prev) => !prev);

  return (
    <div className="fixed top-1/4 right-2 z-50 bg-white rounded-lg p-1 shadow-lg flex flex-col items-center gap-1 transform -translate-y-1/2">
      
      <div className="flex items-center gap-2">
        <button
          className="text-gray-700 hover:text-pink-500 font-bold"
          onClick={togglePlay}
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
        <span className="text-sm text-gray-600">Música relajante</span>
        <button
          onClick={toggleTooltip}
          className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-8-3a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showTooltip && (
        <div className="fixed inset-0 flex items-start justify-center mt-24">
          <div className="bg-gray-800 text-white text-xs rounded-md p-2 text-left shadow-lg w-56">
            La música se reproduce constantemente, ideal para navegar en el sitio, meditar o simplemente relajarte
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;