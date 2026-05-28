import { useEffect, useMemo, useState } from "react";

const COLORS = ["#ff4d6d", "#ffd166", "#06d6a0", "#118ab2", "#c77dff"];

export function Fireworks() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  useEffect(() => {
    let id = 0;
    const spawn = () => {
      const b = {
        id: id++,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 50,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
      setBursts((prev) => [...prev.slice(-5), b]);
    };
    spawn();
    const t = setInterval(spawn, 1200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {bursts.map((b) => <Burst key={b.id} {...b} />)}
    </div>
  );
}

function Burst({ x, y, color }: { x: number; y: number; color: string }) {
  const particles = useMemo(
    () => Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const dist = 80 + Math.random() * 60;
      return { id: i, fx: Math.cos(angle) * dist, fy: Math.sin(angle) * dist };
    }),
    []
  );
  return (
    <div style={{ position: "absolute", left: `${x}%`, top: `${y}%` }}>
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            boxShadow: `0 0 12px ${color}`,
            animation: "firework 1.4s ease-out forwards",
            ["--fx" as never]: `${p.fx}px`,
            ["--fy" as never]: `${p.fy}px`,
          }}
        />
      ))}
    </div>
  );
}
