import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";

// Soft public-domain birthday-ish music (royalty free). We use a remote URL.
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    const handler = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
    };
    // try to start after first user interaction
    window.addEventListener("click", handler, { once: true });
    return () => {
      window.removeEventListener("click", handler);
      audio.pause();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Mute music" : "Play music"}
      className="fixed top-4 right-4 z-50 glass rounded-full p-3 hover:scale-110 transition-transform"
    >
      {playing ? <Music className="w-5 h-5 text-accent" /> : <VolumeX className="w-5 h-5 text-muted-foreground" />}
    </button>
  );
}
