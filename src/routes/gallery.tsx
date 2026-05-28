import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { RECIPIENT_NAME } from "@/lib/birthday";
import { MessageCircleHeart } from "lucide-react";
import { FloatingParticles } from "@/components/FloatingParticles";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: `Memories — ${RECIPIENT_NAME}` },
      { name: "description", content: "A 3D rotating gallery of cherished memories." },
      { property: "og:title", content: `Memories — ${RECIPIENT_NAME}` },
      { property: "og:description", content: "A 3D rotating gallery of cherished memories." },
    ],
  }),
  component: GalleryPage,
});

const MEDIA = [
  {
    type: "video",
    src: "public/videos/6.mp4",
  },
  {
    type: "video",
    src: "public/videos/2.mp4",
  },
  {
    type: "video",
    src: "public/videos/7.mp4",
  },
  {
    type: "video",
    src: "public/videos/4.mp4",
  },
  {
    type: "video",
    src: "public/videos/5.mp4",
  },
  {
    type: "video",
    src: "public/videos/3.mp4",
  },
  {
    type: "video",
    src: "public/videos/1.mp4",
  },
  {
    type: "video",
    src: "public/videos/8.mp4",
  },
];

function GalleryPage() {
  const [rotation, setRotation] = useState(0);
  const autoRef = useRef<number | null>(null);
  const dragging = useRef<{ startX: number; startRot: number } | null>(null);
  const radius = 320;

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!dragging.current) setRotation((r) => r + dt * 12);
      autoRef.current = requestAnimationFrame(tick);
    };
    autoRef.current = requestAnimationFrame(tick);
    return () => { if (autoRef.current) cancelAnimationFrame(autoRef.current); };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = { startX: e.clientX, startRot: rotation };
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const delta = e.clientX - dragging.current.startX;
    setRotation(dragging.current.startRot + delta * 0.4);
  };
  const onPointerUp = () => { dragging.current = null; };

  return (
    <main
  className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-16 gradient-romance animate-gradient-shift"
>
      {/* Spotlight */}
      <FloatingParticles />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20 animate-float-soft"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.7,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 30%, oklch(1 0 0 / 0.15), transparent 50%)" }} />

      <div className="relative z-10 text-center mb-5">
        {/* <p className="font-script text-2xl text-accent">Your moments</p> */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-gold">Memory Gallery</h1>
        <p className="text-muted-foreground mt-2 text-sm">Drag to rotate · auto-spins</p>
      </div>

      <div
        className="relative w-full"
        style={{ height: 360, perspective: 1200, touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="relative mx-auto preserve-3d"
          style={{
            width: 210, height: 320,
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transition: dragging.current ? "none" : "transform 0.05s linear",
          }}
        >
          {MEDIA.map((item, i) => {
            const angle = (360 / MEDIA.length) * i;
            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl overflow-hidden cursor-grab"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  boxShadow: "0 20px 40px oklch(0 0 0 / 0.5)",
                }}
              >
                {item.type === "image" ? (
                  <img
                    src={item.src}
                    alt={`Memory ${i + 1}`}
                    className="w-full h-full object-cover transition-all duration-300 hover:brightness-125"
                    style={{ filter: "saturate(1.1)", backdropFilter: "blur(6px)", }}
                    loading="lazy"
                    draggable={false}
                
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover transition-all duration-300 hover:brightness-125"
                    style={{ filter: "saturate(1.1)", backdropFilter: "blur(6px)", }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
                
                <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl hover:ring-accent/80 hover:shadow-glow transition-all" />
                {/* Reflection */}
                <div
                  className="absolute left-0 right-0 top-full h-24 rounded-b-2xl opacity-40"
                  style={{
                    background: item.type === "image"
                      ? `url(${item.src}) center/cover`
                      : "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
                    transform: "scaleY(-1)",
                    maskImage: "linear-gradient(to bottom, oklch(1 0 0 / 0.4), transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, oklch(1 0 0 / 0.4), transparent)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mb-2 text-center animate-fade-up">
        <p
          className="font-script text-2xl md:text-3xl text-white/90 italic"
          style={{
            textShadow: "0 0 20px rgba(255,255,255,0.25)",
          }}
        >
          “Biduraat neek lagat hee”
        </p>

        <p className="mt-2 text-base md:text-lg text-pink-200">
          (Haste hue bahut achhi lagti hai)
        </p>

        <p className="mt-1 text-sm md:text-base text-accent/80 tracking-widest">
          — DADI 👵✨
        </p>
      </div>

      
      <div className="relative z-10 mt-2 text-center animate-fade-up">
        <Link to="/message" className="btn-festive btn-gold inline-flex items-center gap-2">
          Final Message <MessageCircleHeart className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
