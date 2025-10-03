import { useState, useEffect } from "react";

const tracks = [

  "/musica/relaxing-flute-horn-bagpipe-chamber-382912.mp3",
  "/musica/flute-meditation-music-8-230805.mp3",
  "/musica/relaxing-music-with-flute-144016.mp3",
  "/musica/epic-relaxing-flute-music-144009.mp3"
];

const MusicPlayer = () => {
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    const handleEnded = () => {
      setCurrent((prev) => (prev + 1) % tracks.length);
    };
    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("bg-music");
    if (isPlaying) audio.play();
  }, [current, isPlaying]);

  const togglePlay = () => {
    const audio = document.getElementById("bg-music");
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  return (
    <div className="fixed top-1/4 right-2 z-50 bg-white rounded-lg p-1 shadow-lg flex flex-col items-center gap-1 transform -translate-y-1/2">
      <audio
        id="bg-music"
        src={tracks[current]}
        autoPlay
        controls={false}
      />

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
            La música se reproduce constantemente, ideal para meditar o simplemente relajarte
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;