import { useMemo } from "react";

const COLORS = [
  "oklch(0.7 0.22 20)",
  "oklch(0.75 0.2 340)",
  "oklch(0.8 0.17 85)",
  "oklch(0.7 0.18 220)",
  "oklch(0.72 0.2 145)",
  "oklch(0.78 0.16 300)",
];

export function Balloons({ count = 18 }: { count?: number }) {
  const balloons = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 95,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 120,
      color: COLORS[i % COLORS.length],
      size: 50 + Math.random() * 40,
    })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="absolute"
          style={{
            left: `${b.left}%`,
            bottom: -100,
            animation: `float-up ${b.duration}s linear ${b.delay}s infinite`,
            ["--drift" as never]: `${b.drift}px`,
          }}
        >
          <div
            className="rounded-full relative"
            style={{
              width: b.size,
              height: b.size * 1.2,
              background: `radial-gradient(circle at 30% 30%, oklch(1 0 0 / 0.7), ${b.color} 60%)`,
              boxShadow: `inset -8px -10px 20px oklch(0 0 0 / 0.2)`,
            }}
          >
            <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent" style={{ borderTopColor: b.color }} />
            <div className="absolute left-1/2 top-full w-px h-24 bg-white/40" />
          </div>
        </div>
      ))}
    </div>
  );
}
