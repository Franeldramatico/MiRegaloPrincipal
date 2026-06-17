import React, { useMemo } from "react";
import { TimeOfDay, Weather } from "../types";
import { motion } from "motion/react";

interface DynamicBackgroundProps {
  timeOfDay: TimeOfDay;
  weather: Weather;
  sceneryType?: string; // e.g. "tren_interior", "estacion_lluvia", etc.
  vibrate?: boolean;
}

const BASE = import.meta.env.BASE_URL;

// Map backgrounds to their premium generated illustration images
const SCENERY_IMAGES = {
  train_day: `${BASE}images/scenery_train_day_1781238298175.jpg`,
  train_sunset: `${BASE}images/scenery_train_sunset_1781238307638.jpg`,
  train_night: `${BASE}images/scenery_train_night_1781238319503.jpeg`,
  station_rain: `${BASE}images/scenery_station_rain_1781238336044.jpg`
};

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({
  timeOfDay,
  weather,
  sceneryType = "tren_interior",
  vibrate = true,
}) => {
  const isStationScene = sceneryType.includes("estacion") || sceneryType.includes("andén") || sceneryType.includes("anden");

  // Choose the best matching visual illustration asset
  const backgroundImage = useMemo(() => {
    if (isStationScene) {
      return SCENERY_IMAGES.station_rain;
    }
    
    // Divide cabin views based on progress timetables
    if (timeOfDay === "Mañana" || timeOfDay === "Mediodía") {
      return SCENERY_IMAGES.train_day;
    } else if (timeOfDay === "Tarde" || timeOfDay === "Atardecer") {
      return SCENERY_IMAGES.train_sunset;
    } else {
      return SCENERY_IMAGES.train_night;
    }
  }, [isStationScene, timeOfDay]);

  // Establish custom lighting filters and ambient vignette tones
  const colorOverlayGrid = useMemo(() => {
    switch (timeOfDay) {
      case "Mañana":
        return "bg-amber-100/5 mix-blend-soft-light shadow-[inset_0_0_120px_rgba(251,191,36,0.06)]";
      case "Mediodía":
        return "bg-sky-500/5 mix-blend-overlay shadow-[inset_0_0_100px_rgba(255,255,255,0.04)]";
      case "Tarde":
        return "bg-orange-400/10 mix-blend-color-burn shadow-[inset_0_0_140px_rgba(245,158,11,0.1)]";
      case "Atardecer":
        return "bg-fuchsia-600/15 mix-blend-color-burn shadow-[inset_0_0_160px_rgba(236,72,153,0.16)]";
      case "Noche":
        return "bg-indigo-950/30 mix-blend-multiply shadow-[inset_0_0_200px_rgba(0,0,0,0.85)]";
      case "Madrugada":
        return "bg-slate-950/45 mix-blend-multiply shadow-[inset_0_0_240px_rgba(0,0,0,0.92)]";
      default:
        return "bg-transparent";
    }
  }, [timeOfDay]);

  // Weather particles for falling rain or drifting snow over the illustration
  const weatherParticles = useMemo(() => {
    const items = [];
    let count = 0;
    if (weather === "Lluvia" || weather === "Tormenta") count = 45;
    if (weather === "Nieve") count = 25;
    if (weather === "Noche Estrellada") count = 30;

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: 1.2 + Math.random() * 1.8,
        size: 1.5 + Math.random() * (weather === "Nieve" ? 4.5 : 2.0),
        opacity: 0.15 + Math.random() * 0.65,
      });
    }
    return items;
  }, [weather]);

  return (
    <div
      id="scenery-background-container"
      className="absolute inset-0 overflow-hidden bg-slate-950 transition-all duration-1000 select-none z-0"
    >
      {/* 1. MASTER ILLUSTRATION LAYER - With gentle zoom to simulate train movement */}
      <motion.div
        animate={
          vibrate && !isStationScene
            ? {
                scale: [1.02, 1.025, 1.02, 1.025, 1.02],
                x: [0, -1, 1, -1, 0],
                y: [0, 0.5, -0.5, 0]
              }
            : {
                scale: 1.01,
              }
        }
        transition={{
          repeat: Infinity,
          duration: 6.0,
          ease: "easeInOut",
        }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={backgroundImage}
          alt={`Background Scenery ${timeOfDay} - ${weather}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover select-none filter contrast-102 saturate-102"
        />
      </motion.div>

      {/* 2. DYNAMIC COLOR LIGHTING FILTER - Merges character and window light */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 z-10 ${colorOverlayGrid}`} />

      {/* 3. ATMOSPHERIC WEATHER RENDERER - Animates climate drops & flakes */}
      <div id="weather-particle-field" className="absolute inset-0 overflow-hidden pointer-events-none z-20">
        
        {/* Soft fog cover */}
        {weather === "Niebla" && (
          <div className="absolute inset-0 bg-neutral-200/25 backdrop-blur-[2px] transition-all duration-1000" />
        )}

        {/* Rain particles */}
        {(weather === "Lluvia" || weather === "Tormenta") &&
          weatherParticles.map((pt) => (
            <div
              key={pt.id}
              className="absolute bg-sky-200/50 rounded-full"
              style={{
                left: pt.left,
                width: "1.5px",
                height: `${pt.size * 6}px`,
                transform: "rotate(12deg)",
                top: "-15%",
                opacity: pt.opacity,
                animation: `fall-rain ${pt.duration}s linear infinite`,
                animationDelay: `${pt.delay}s`,
              }}
            />
          ))}

        {/* Snow particles */}
        {weather === "Nieve" &&
          weatherParticles.map((pt) => (
            <div
              key={pt.id}
              className="absolute bg-white rounded-full text-[10px]"
              style={{
                left: pt.left,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                top: "-10%",
                opacity: pt.opacity,
                animation: `drift-snow ${pt.duration * 1.8}s ease-in-out infinite`,
                animationDelay: `${pt.delay}s`,
              }}
            />
          ))}

        {/* Star Sparkles */}
        {weather === "Noche Estrellada" &&
          weatherParticles.map((pt) => (
            <div
              key={pt.id}
              className="absolute bg-amber-100 rounded-full shadow-[0_0_8px_rgba(253,230,138,0.6)]"
              style={{
                left: pt.left,
                top: `${8 + Math.random() * 45}%`,
                width: `${pt.size}px`,
                height: `${pt.size}px`,
                opacity: pt.opacity,
                animation: "twinkle 3s ease-in-out infinite",
                animationDelay: `${pt.delay}s`,
              }}
            />
          ))}
      </div>

      {/* 4. PASSENGER GLASS REFLECTION - Soft elegant streaks for interior cabin */}
      {!isStationScene && (
        <div className="absolute inset-4 rounded-3xl border border-white/5 bg-white/[0.005] pointer-events-none z-30 overflow-hidden">
          {/* Glass glare band */}
          <div className="h-full w-full bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent pointer-events-none" />
          
          {/* Dripping window glass condensation during precipitation */}
          {(weather === "Lluvia" || weather === "Tormenta" || weather === "Nieve") && (
            <div className="absolute inset-0 grid grid-cols-12 gap-12 pointer-events-none opacity-30">
              {Array.from({ length: 36 }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-1.5 h-1.5 rounded-full bg-slate-300/40 justify-self-center"
                  style={{
                    transform: `translateY(${(idx * 15) % 180}px)`,
                    animation: idx % 4 === 0 ? "slide-down 10s linear infinite" : "none",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inline styles for physical rain fall, drifting snow and twilight twinkle */}
      <style>{`
        @keyframes fall-rain {
          0% {
            transform: translateY(0) rotate(12deg);
          }
          100% {
            transform: translateY(115vh) rotate(12deg);
          }
        }
        @keyframes drift-snow {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(50vh) translateX(20px);
          }
          100% {
            transform: translateY(115vh) translateX(-10px);
          }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.9); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
        @keyframes slide-down {
          0% { transform: translateY(-10px); opacity: 0.4; }
          100% { transform: translateY(400px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
