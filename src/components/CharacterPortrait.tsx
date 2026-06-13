import React, { useMemo } from "react";
import { CharacterStateID } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, HelpCircle, Music, CloudRain, ShieldAlert } from "lucide-react";

interface CharacterPortraitProps {
  character: "Aranxita" | "Franxito";
  expression: CharacterStateID;
  size?: "md" | "lg" | "xl";
}

// Map characters to their high-quality generated images
const CHARACTER_IMAGES = {
  Aranxita: "/images/aranxita_portrait_1781238275011.png",
  Franxito: "/images/franxito_portrait_1781238286427.jpg"
};

export const CharacterPortrait: React.FC<CharacterPortraitProps> = ({
  character,
  expression,
  size = "lg",
}) => {
  const isAranxita = character === "Aranxita";

  const sizeClasses = {
    md: "w-36 h-48 sm:w-40 sm:h-56",
    lg: "w-56 h-72 sm:w-64 sm:h-80 md:w-72 md:h-96",
    xl: "w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[420px]",
  };

  // Determine emotional overlays, filters, and animation variants in CSS
  const expressionConfig = useMemo(() => {
    switch (expression) {
      case "Feliz":
        return {
          filter: "brightness(1.05) contrast(1.02) saturate(1.1)",
          overlay: "from-pink-500/10 to-transparent",
          borderColor: "border-pink-300/40",
          shadowColor: "shadow-pink-500/10",
          scale: 1.03,
          yOffset: [0, -5, 0],
          yDuration: 2.2,
          emoji: "✨",
          icon: <Sparkles className="w-4 h-4 text-pink-400" />,
          label: "Feliz"
        };
      case "Sonrojado":
        return {
          filter: "brightness(0.98) saturate(1.15) sepia(0.08)",
          overlay: "from-rose-600/20 via-transparent to-transparent",
          borderColor: "border-rose-400/50",
          shadowColor: "shadow-rose-600/20",
          scale: 1.01,
          yOffset: [0, -1, 1, 0],
          yDuration: 4.0,
          emoji: "😳",
          icon: <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />,
          label: "Sonrojada"
        };
      case "Pensativo":
        return {
          filter: "brightness(0.95) contrast(0.98) saturate(0.9) hue-rotate(-5deg)",
          overlay: "from-blue-900/15 to-transparent",
          borderColor: "border-slate-500/30",
          shadowColor: "shadow-slate-800/10",
          scale: 1.0,
          yOffset: [0, -2, 0],
          yDuration: 5.0,
          emoji: "💬",
          icon: <span className="text-xs font-mono font-bold text-slate-400">...</span>,
          label: "Pensativo"
        };
      case "Confundido":
        return {
          filter: "contrast(0.95) saturate(0.95)",
          overlay: "from-indigo-950/20 to-transparent",
          borderColor: "border-indigo-400/30",
          shadowColor: "shadow-indigo-500/5",
          scale: 0.98,
          tilt: -2,
          yOffset: [0, -2, 2, 0],
          yDuration: 4.5,
          emoji: "❓",
          icon: <HelpCircle className="w-4 h-4 text-indigo-400" />,
          label: "Confundida"
        };
      case "Triste":
        return {
          filter: "brightness(0.88) contrast(0.95) saturate(0.7) hue-rotate(-10deg)",
          overlay: "from-sky-950/30 via-transparent to-transparent",
          borderColor: "border-sky-700/30",
          shadowColor: "shadow-sky-900/15",
          scale: 0.97,
          yOffset: [0, 4, 0],
          yDuration: 5.5,
          emoji: "💧",
          icon: <CloudRain className="w-4 h-4 text-sky-400" />,
          label: "Melancólica"
        };
      case "Divertido":
        return {
          filter: "brightness(1.06) contrast(1.05) saturate(1.15)",
          overlay: "from-amber-400/10 to-transparent",
          borderColor: "border-amber-300/40",
          shadowColor: "shadow-amber-500/10",
          scale: 1.04,
          yOffset: [0, -8, 0],
          yDuration: 1.8,
          emoji: "🎵",
          icon: <Music className="w-4 h-4 text-amber-400" />,
          label: "Divertida"
        };
      case "Incómodo":
        return {
          filter: "brightness(0.95) saturate(0.93)",
          overlay: "from-yellow-905/10 to-transparent",
          borderColor: "border-yellow-600/20",
          shadowColor: "shadow-yellow-700/5",
          scale: 0.99,
          jitter: true,
          yOffset: [0, -1, 1, -1, 0],
          yDuration: 0.25,
          emoji: "sweat",
          icon: <ShieldAlert className="w-4 h-4 text-yellow-500" />,
          label: "Incómoda"
        };
      case "Sorprendido":
        return {
          filter: "brightness(1.08) contrast(1.08) saturate(1.1)",
          overlay: "from-purple-500/15 to-transparent",
          borderColor: "border-purple-400/60",
          shadowColor: "shadow-purple-500/20",
          scale: 1.06,
          yOffset: [0, -3, 0],
          yDuration: 1.2,
          emoji: "🚨",
          icon: <span className="text-xs font-mono font-bold text-purple-300">!!!</span>,
          label: "Asombrada"
        };
      case "Nostálgico":
        return {
          filter: "brightness(0.96) contrast(0.98) sepia(0.2) saturate(0.95)",
          overlay: "from-amber-800/15 via-transparent to-transparent",
          borderColor: "border-amber-400/40",
          shadowColor: "shadow-amber-600/15",
          scale: 1.0,
          yOffset: [0, -1, 0],
          yDuration: 4.8,
          emoji: "🍂",
          icon: <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />,
          label: "Nostálgica"
        };
      case "Normal":
      default:
        return {
          filter: "brightness(1.0) contrast(1.0)",
          overlay: "from-transparent to-transparent",
          borderColor: "border-slate-700/40",
          shadowColor: "shadow-black/20",
          scale: 1.0,
          yOffset: [0, -3, 0],
          yDuration: 4.2,
          emoji: "✨",
          icon: null,
          label: "Serena"
        };
    }
  }, [expression]);

  return (
    <div
      id={`${character.toLowerCase()}-card`}
      className="relative flex flex-col items-center justify-center shrink-0"
    >
      {/* Anime Art Card wrapper */}
      <motion.div
        animate={
          expressionConfig.jitter
            ? {
                x: [0, -1, 1, -1, 1, 0],
                y: [0, 0.5, -0.5, 0.5, 0]
              }
            : {
                y: expressionConfig.yOffset,
                rotate: expressionConfig.tilt || 0,
                scale: expressionConfig.scale,
              }
        }
        transition={{
          repeat: Infinity,
          duration: expressionConfig.yDuration,
          ease: "easeInOut",
        }}
        className={`relative ${sizeClasses[size]} overflow-hidden rounded-3xl border-2 ${expressionConfig.borderColor} shadow-2xl ${expressionConfig.shadowColor} transition-all duration-700 bg-slate-950`}
      >
        {/* Actual illustration image generated with Gemini model */}
        <img
          src={CHARACTER_IMAGES[character]}
          alt={`${character} - ${expression}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-700 select-none"
          style={{ filter: expressionConfig.filter }}
        />

        {/* Emotion Gradient Tint Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${expressionConfig.overlay} pointer-events-none transition-all duration-700`} />

        {/* Cinematic dust specs or visual particle accents inside card */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />

        {/* Sparkle or heart micro-particles floating based on expression */}
        {expression === "Feliz" && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[1, 2, 3].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 150, x: 20 + i * 40 }}
                animate={{ opacity: [0, 1, 0], y: -20, x: 10 + i * 50 + Math.sin(i) * 15 }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5 + i,
                  delay: i * 0.4,
                  ease: "easeOut"
                }}
                className="absolute text-pink-400 text-sm"
              >
                ✦
              </motion.div>
            ))}
          </div>
        )}

        {expression === "Sonrojado" && (
          <div className="absolute inset-x-0 top-1/4 flex justify-center pointer-events-none">
            <div className="w-16 h-8 bg-rose-500/20 blur-md rounded-full shadow-[0_0_20px_10px_rgba(244,63,94,0.18)]" />
          </div>
        )}

        {/* Custom Indicator Pill showing active feeling */}
        <div className="absolute top-3 right-3 bg-slate-950/65 backdrop-blur-md text-[10px] tracking-wider px-2.5 py-1 rounded-full text-slate-200 border border-slate-800/85 font-mono shadow-sm flex items-center gap-1">
          {expressionConfig.icon}
          <span>{expressionConfig.label}</span>
        </div>
      </motion.div>

      {/* Floating high-contrast frosted glass nameplate */}
      <div className="mt-3 relative z-10">
        <span
          className={`font-sans font-bold tracking-wide text-xs sm:text-sm px-5 py-2 rounded-full border shadow-lg backdrop-blur-md inline-flex items-center gap-1.5 transition-all duration-300 ${
            isAranxita
              ? "bg-rose-950/80 text-rose-200 border-rose-500/35 hover:bg-rose-900/90"
              : "bg-indigo-950/80 text-indigo-200 border-indigo-500/35 hover:bg-indigo-900/90"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {character}
        </span>
      </div>
    </div>
  );
};
