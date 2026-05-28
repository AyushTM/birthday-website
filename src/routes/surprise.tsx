import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { RECIPIENT_NAME } from "@/lib/birthday";
import { Images } from "lucide-react";

export const Route = createFileRoute("/surprise")({
  head: () => ({
    meta: [
      { title: `A Surprise For ${RECIPIENT_NAME}` },
      { name: "description", content: "Open your animated birthday surprise card." },
      { property: "og:title", content: `A Surprise For ${RECIPIENT_NAME}` },
      { property: "og:description", content: "Open your animated birthday surprise card." },
    ],
  }),
  component: SurprisePage,
});

function Sparkles() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {Array.from({ length: 16 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-full bg-accent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 12px var(--accent)",
            animation: `sparkle 2s ease-in-out ${Math.random() * 2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function SurprisePage() {
  const [open, setOpen] = useState(false);
  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-16 gradient-pastel animate-gradient-shift">
      <Sparkles />
      <div className="relative z-10 w-full max-w-xl text-center">
        <p className="font-script text-3xl text-rose-600 mb-2">A little something…</p>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-foreground/90" style={{ color: "oklch(0.25 0.08 320)" }}>
          Open Your Surprise 🎁
        </h1>

        {/* Cute GIF */}
        <img
          src="https://media.giphy.com/media/26FPJGjhefSJuaRhu/giphy.gif"
          alt="Happy birthday cartoon"
          className="mx-auto mb-8 rounded-3xl shadow-soft w-56 md:w-72 animate-float-soft"
          loading="lazy"
        />

        {/* Card */}
        <div
          className="mx-auto cursor-pointer preserve-3d transition-transform duration-1000"
          style={{
            width: "min(600px, 92vw)",
            height: 350,
            transformStyle: "preserve-3d",
            transform: open ? "rotateY(180deg)" : "rotateY(0)",
          }}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl backface-hidden shadow-soft flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #ff7eb9, #ff65a3)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="text-white text-center px-8">
              <div className="text-6xl mb-3">🎁</div>
              <p className="text-2xl font-bold">Tap to open</p>
              <p className="text-sm opacity-80 mt-1">A message inside ❤️</p>
            </div>
            {/* Ribbon */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-yellow-300/80" />
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 bg-yellow-300/80" />
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl backface-hidden glass-light p-6 flex items-center justify-center text-center"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              color: "oklch(0.25 0.08 320)",
            }}
          >
            <p className="font-script text-2xl md:text-3xl leading-snug">
              One random thing I wanted to tell you today—<br/>
              No matter how stressful or tiring life gets sometimes, talking to you somehow makes my day feel lighter. Even small things like your messages, your mood swings, your stories like "tumhe pta" ya "Peet Dungi" for no reason become parts of my day that I genuinely look forward to 😭❤️
              <br/>So yeah… thank you for existing, Simmi ✨
            </p>
          </div>
        </div>

        <div className="mt-10">
          <Link to="/gallery" className="btn-festive inline-flex items-center gap-2">
            Open Memory Gallery <Images className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
