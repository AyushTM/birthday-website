import { useMemo } from "react";

const COLORS = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#c77dff", "#f72585"];
const SHAPES = ["square", "circle", "rect"] as const;

export function Confetti({ count = 80, duration = 4 }: { count?: number; duration?: number }) {
  const pieces = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      dur: duration + Math.random() * 2,
      drift: (Math.random() - 0.5) * 200,
      color: COLORS[i % COLORS.length],
      shape: SHAPES[i % SHAPES.length],
      size: 6 + Math.random() * 8,
    })),
    [count, duration]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: 0,
            width: p.shape === "rect" ? p.size * 0.6 : p.size,
            height: p.shape === "rect" ? p.size * 1.4 : p.size,
            background: p.color,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            animation: `confetti-fall ${p.dur}s linear ${p.delay}s forwards`,
            ["--drift" as never]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
