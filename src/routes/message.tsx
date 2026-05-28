import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FloatingHearts } from "@/components/FloatingHearts";
import { Fireworks } from "@/components/Fireworks";
import { FINAL_MESSAGE, RECIPIENT_NAME } from "@/lib/birthday";

export const Route = createFileRoute("/message")({
  head: () => ({
    meta: [
      { title: `A Final Wish — ${RECIPIENT_NAME}` },
      { name: "description", content: "A heartfelt birthday message with fireworks and floating hearts." },
      { property: "og:title", content: `A Final Wish — ${RECIPIENT_NAME}` },
      { property: "og:description", content: "A heartfelt birthday message with fireworks and floating hearts." },
    ],
  }),
  component: MessagePage,
});

function MessagePage() {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setText(FINAL_MESSAGE.slice(0, i));
      if (i >= FINAL_MESSAGE.length) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden flex items-center justify-center px-6 py-20 gradient-romance animate-gradient-shift">
      <FloatingHearts />
      <Fireworks />
      <div className="relative z-10 max-w-2xl w-full glass rounded-3xl p-8 md:p-12 shadow-glow text-center">
        <p className="font-script text-3xl md:text-4xl text-gradient-rose mb-4">From the heart…</p>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">
          For you, <span className="text-gradient-gold">{RECIPIENT_NAME}</span> ❤️
        </h1>
        <p className="text-base md:text-lg leading-relaxed text-foreground/90 min-h-[10rem]">
          {text}
          <span className="inline-block w-[2px] h-5 bg-accent ml-0.5 animate-pulse align-middle" />
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-festive">Start Again</Link>
          <Link to="/gallery" className="btn-festive btn-gold">Revisit Memories</Link>
        </div>
      </div>
    </main>
  );
}
