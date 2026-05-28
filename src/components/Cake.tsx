interface CakeProps {
  candlesLit: boolean;
}

export function Cake({ candlesLit }: CakeProps) {
  return (
    <div className="relative mx-auto" style={{ width: 260, height: 280 }}>
      {/* Plate */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[280px] h-4 rounded-full bg-gradient-to-b from-white/40 to-white/10 shadow-soft" />

      {/* Bottom tier */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[240px] h-[90px] rounded-2xl"
        style={{ background: "linear-gradient(180deg, #ffd6e7, #ff9bbf)" }}>
        <div className="absolute top-2 left-0 right-0 h-3 rounded-full" style={{ background: "repeating-linear-gradient(90deg, #fff 0 18px, #ffd6e7 18px 36px)" }} />
        {/* Drips */}
        {[10, 60, 110, 160, 210].map((x) => (
          <div key={x} className="absolute -top-1 rounded-b-full" style={{ left: x, width: 20, height: 16, background: "#fff8f0" }} />
        ))}
      </div>

      {/* Middle tier */}
      <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-[180px] h-[70px] rounded-2xl"
        style={{ background: "linear-gradient(180deg, #fff8f0, #f5d7a3)" }}>
        <div className="absolute -top-1 left-0 right-0 h-2 rounded-full bg-white/80" />
      </div>

      {/* Top tier */}
      <div className="absolute bottom-[168px] left-1/2 -translate-x-1/2 w-[120px] h-[55px] rounded-2xl"
        style={{ background: "linear-gradient(180deg, #ffd6e7, #ff9bbf)" }}>
        <div className="absolute -top-1 left-0 right-0 h-2 rounded-full bg-white/80" />
      </div>

      {/* Candles */}
      {[-30, 0, 30].map((x, i) => (
        <div key={i} className="absolute" style={{ bottom: 220, left: `calc(50% + ${x}px)`, transform: "translateX(-50%)" }}>
          <div className="w-2 h-10 rounded-sm" style={{ background: ["#f72585", "#ffd166", "#06d6a0"][i] }} />
          {candlesLit ? (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 origin-bottom animate-flicker">
              <div className="w-3 h-5 rounded-full" style={{ background: "radial-gradient(circle at 50% 70%, #fff7a8, #ffb703 60%, #fb5607)", boxShadow: "0 0 15px #ffb703, 0 0 30px #fb5607" }} />
            </div>
          ) : (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="w-2 h-4 rounded-full bg-white/30" style={{ animation: "smoke-rise 2s ease-out infinite" }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
