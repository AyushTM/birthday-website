import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FloatingParticles } from "@/components/FloatingParticles";
import { Balloons } from "@/components/Balloons";
import { Confetti } from "@/components/Confetti";
import { Cake } from "@/components/Cake";
import { RECIPIENT_NAME } from "@/lib/birthday";
import { Gift, PartyPopper, Cake as CakeIcon, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${RECIPIENT_NAME} — A Wish For You` },
      { name: "description", content: `An animated birthday wish for ${RECIPIENT_NAME}. Drop a banner, release balloons, light the cake and celebrate.` },
      { property: "og:title", content: `Happy Birthday, ${RECIPIENT_NAME}` },
      { property: "og:description", content: "An interactive, animated birthday wish website." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const [bannerOn, setBannerOn] = useState(false);
  const [balloonsKey, setBalloonsKey] = useState(0);
  const [showBalloons, setShowBalloons] = useState(false);
  const [cakeOn, setCakeOn] = useState(false);
  const [candlesLit, setCandlesLit] = useState(true);
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [wishShown, setWishShown] = useState(false);

  const releaseBalloons = () => {
    setShowBalloons(true);
    setBalloonsKey((k) => k + 1);
    setTimeout(() => setShowBalloons(false), 11000);
  };
  const celebrate = () => {
    setShowConfetti(true);
    setConfettiKey((k) => k + 1);
    setTimeout(() => setShowConfetti(false), 6000);
  };
  const blowCandles = () => {
    setCandlesLit(false);
    setTimeout(() => setWishShown(true), 800);
    // little blow sound
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 120;
      g.gain.value = 0.15;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      o.stop(ctx.currentTime + 0.9);
    } catch { /* noop */ }
  };

  return (
    <main className="relative min-h-screen overflow-hidden gradient-hero animate-gradient-shift">
      <FloatingParticles />
      {showBalloons && <div key={balloonsKey}><Balloons /></div>}
      {showConfetti && <div key={confettiKey}><Confetti /></div>}

      {/* Banner */}
      {bannerOn && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 animate-drop-banner">
          <div className="origin-top animate-sway">
            <div className="px-10 py-4 rounded-b-3xl shadow-glow text-2xl md:text-3xl font-bold tracking-wide"
              style={{ background: "var(--gradient-rose)", color: "white" }}>
              ✨ Happy Birthday {RECIPIENT_NAME} ✨
            </div>
            <div className="flex justify-center gap-6 mt-1">
              {["🎈","🎀","🎂","🎁","🎉"].map((e,i)=>(
                <span key={i} className="text-2xl" style={{animationDelay:`${i*0.2}s`}}>{e}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="relative z-10 px-6 pt-28 pb-12 text-center max-w-4xl mx-auto">
        <p className="font-script text-2xl md:text-3xl text-accent animate-fade-up">
          A little wish, just for you
        </p>
        <h1 className="mt-3 text-5xl md:text-7xl font-extrabold animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Happy Birthday,{" "}
          <span className="text-gradient-gold">{RECIPIENT_NAME}</span>
          <span className="ml-2">🎉🎂</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Today is all about you and your beautiful smile ❤️
        </p>

        {/* Decoration buttons */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <button onClick={() => setBannerOn(true)} className="btn-festive flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Add Banner
          </button>
          <button onClick={releaseBalloons} className="btn-festive flex items-center justify-center gap-2">
            🎈 Release Balloons
          </button>
          <button onClick={() => setCakeOn(true)} className="btn-festive btn-gold flex items-center justify-center gap-2">
            <CakeIcon className="w-4 h-4" /> Show Cake
          </button>
          <button onClick={celebrate} className="btn-festive flex items-center justify-center gap-2">
            <PartyPopper className="w-4 h-4" /> Celebrate
          </button>
        </div>
      </section>

      {/* Cake area */}
      {cakeOn && (
        <section className="relative z-10 px-6 pb-24 animate-fade-up">
          <div className="max-w-xl mx-auto glass rounded-3xl p-8 shadow-glow">
            <Cake candlesLit={candlesLit} />
            <div className="mt-6 text-center">
              {candlesLit ? (
                <button onClick={blowCandles} className="btn-festive btn-gold inline-flex items-center gap-2">
                  Blow the Candles 🕯️
                </button>
              ) : wishShown ? (
                <div className="space-y-4 animate-fade-up">
                  <p className="font-script text-3xl md:text-4xl text-gradient-rose">Make a wish ✨</p>
                  <Link to="/surprise" className="btn-festive inline-flex items-center gap-2">
                    Next Surprise <Gift className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <p className="text-muted-foreground">…</p>
              )}
            </div>
          </div>
        </section>
      )}

      {!cakeOn && (
        <div className="relative z-10 pb-16 text-center">
          <Link to="/surprise" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Skip to next surprise →
          </Link>
        </div>
      )}
    </main>
  );
}
