import { createContext, useContext, useState, useEffect } from "react";

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const tracks = ["/musica/relaxing-flute-horn-bagpipe-chamber-382912.mp3"];

  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = document.getElementById("global-music");
    if (!audio) return;

    const handleEnded = () => {
      setTimeout(() => setCurrent((prev) => (prev + 1) % tracks.length), 3000);
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    const audio = document.getElementById("global-music");
    if (audio && isPlaying) audio.play();
  }, [current, isPlaying]);

  const togglePlay = () => {
    const audio = document.getElementById("global-music");
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <MusicContext.Provider value={{ current, isPlaying, togglePlay }}>
      {children}
      <audio
        id="global-music"
        src={tracks[current]}
        autoPlay
        controls={false}
      />
    </MusicContext.Provider>
  );
};

// ✅ Hook para usar el contexto más fácilmente
export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic debe usarse dentro de MusicProvider");
  }
  return context;
};