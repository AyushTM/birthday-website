import { useMemo } from "react";
import { Heart } from "lucide-react";

export function FloatingHearts({ count = 18 }: { count?: number }) {
  const hearts = useMemo(
    () => Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 8,
      size: 14 + Math.random() * 22,
      opacity: 0.4 + Math.random() * 0.5,
    })),
    [count]
  );
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <Heart
          key={h.id}
          className="absolute text-rose-400 fill-rose-400"
          style={{
            left: `${h.left}%`,
            bottom: 0,
            width: h.size,
            height: h.size,
            opacity: h.opacity,
            animation: `heart-float ${h.duration}s ease-in ${h.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
