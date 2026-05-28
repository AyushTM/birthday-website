import { useMemo } from "react";

export function FloatingParticles({ count = 30 }: { count?: number }) {
  const items = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 10 + Math.random() * 15,
      size: 4 + Math.random() * 8,
      drift: (Math.random() - 0.5) * 200,
      hue: Math.random() > 0.5 ? "oklch(0.85 0.17 85)" : "oklch(0.8 0.16 340)",
    })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full opacity-70"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            background: p.hue,
            boxShadow: `0 0 ${p.size * 2}px ${p.hue}`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as never]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
