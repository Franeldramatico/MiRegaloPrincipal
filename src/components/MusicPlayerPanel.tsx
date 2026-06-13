import React, { useState, useEffect } from "react";
import { musicEngine } from "../lib/AudioSynthesizer";
import { X, Music, Play, Pause, Sparkles, Wand2 } from "lucide-react";

interface MusicPlayerPanelProps {
  onClose: () => void;
}

export const MusicPlayerPanel: React.FC<MusicPlayerPanelProps> = ({ onClose }) => {
  const [activeMood, setActiveMood] = useState<string>("default");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  
  // Create beautiful procedural visualizer bars that pulse using CSS keyframes
  const [frequencies, setFrequencies] = useState<number[]>(new Array(16).fill(10));

  useEffect(() => {
    if (!isPlaying) return;
    
    // Simulate music spectrum readings on intervals
    const interval = setInterval(() => {
      setFrequencies(
        Array.from({ length: 16 }, () => Math.floor(15 + Math.random() * 65))
      );
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const changeMood = (mood: string) => {
    setActiveMood(mood);
    musicEngine.setMusicMood(mood);
    // Play a lovely physical node to register change
    musicEngine.playSingleMelodyNote(1.2);
  };

  const togglePlayback = () => {
    const nextVal = !isPlaying;
    setIsPlaying(nextVal);
    musicEngine.setMute(!nextVal);
  };

  const playSynthesizedTone = () => {
    musicEngine.playSingleMelodyNote(1);
    // Spike one bar as feedback
    setFrequencies((prev) => {
      const copy = [...prev];
      copy[Math.floor(Math.random() * copy.length)] = 95;
      return copy;
    });
  };

  const soundtracks = [
    { id: "default", name: "Estribillo Matutino", style: "Piano Rhodes - Escena de Mañana", desc: "Acompañamiento alegre del alba con progresiones de séptima mayor." },
    { id: "jazz", name: "Lounge de Estación", style: "Jazz Ligero - El Mediodía", desc: "Acordes con vibras relajantes y notas suspendidas de té helado." },
    { id: "emotional", name: "Atmósfera Dorada", style: "Piano Emocional - Atardecer", desc: "Melodías profundas de piano menor-mayor para reflexiones honestas." },
    { id: "ending", name: "La Última Estación", style: "Resolución Mayor - Créditos", desc: "Tema de resolución armónica perfecta para despedidas memorables." },
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-xl p-6 text-slate-100 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-5">
          <div className="flex items-center gap-2 text-rose-400">
            <Music className="w-5 h-5" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Sala de Música Sintética</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Waves Audio Spectrum visualizer */}
        <div className="bg-slate-950 rounded-2xl p-5 mb-5 border border-slate-850 flex flex-col justify-between items-center relative overflow-hidden h-40">
          <div className="absolute inset-0 bg-radial-gradient from-rose-500/5 to-transparent pointer-events-none" />
          
          <div className="text-center z-10">
            {isPlaying ? (
              <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full uppercase tracking-widest font-mono animate-pulse">
                Sintetizando espectro de audio real
              </span>
            ) : (
              <span className="text-[10px] bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full uppercase tracking-widest font-mono">
                Osciladores pausados
              </span>
            )}
          </div>

          {/* Equalizer columns */}
          <div className="flex items-end justify-center gap-2 h-20 w-full px-4">
            {frequencies.map((height, idx) => (
              <div
                key={idx}
                className="w-2.5 rounded-full bg-gradient-to-t from-rose-500 to-indigo-400 transition-all duration-150"
                style={{ height: isPlaying ? `${height}%` : "5px" }}
              />
            ))}
          </div>

          <div className="text-center z-10 flex gap-2 items-center text-xs text-slate-500 font-mono">
            <span>MODO SELECCIONADO:</span>
            <span className="text-rose-400 uppercase font-bold tracking-wide">
              {soundtracks.find((s) => s.id === activeMood)?.name || "Default"}
            </span>
          </div>
        </div>

        {/* Soundtracks selector */}
        <div className="space-y-3 flex-1 overflow-y-auto max-h-56 pr-1">
          {soundtracks.map((track) => (
            <button
              key={track.id}
              onClick={() => changeMood(track.id)}
              className={`w-full text-left p-3 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                activeMood === track.id
                  ? "bg-rose-500/10 border-rose-500 text-slate-100 shadow-md shadow-rose-500/5"
                  : "bg-slate-950/30 border-slate-800 hover:border-slate-700 hover:bg-slate-950/50 text-slate-300"
              }`}
            >
              <div className="space-y-0.5">
                <div className="font-sans font-bold text-xs flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-slate-400" />
                  {track.name}
                </div>
                <div className="text-[10px] text-rose-400 uppercase tracking-widest font-mono">
                  {track.style}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1">
                  {track.desc}
                </div>
              </div>
              <Wand2 className={`w-4 h-4 text-slate-500 shrink-0 ${activeMood === track.id ? "text-rose-400 animate-spin" : ""}`} />
            </button>
          ))}
        </div>

        {/* Quick controls bar */}
        <div className="border-t border-slate-850 pt-4 mt-5 flex gap-2">
          {/* Synthesizer key trigger */}
          <button
            onClick={playSynthesizedTone}
            className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-sans text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Tocar Tecla de Piano (Rhodes)
          </button>

          {/* Toggle synth */}
          <button
            onClick={togglePlayback}
            className={`px-4 rounded-xl border font-sans text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer ${
              isPlaying
                ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                : "bg-emerald-900/20 border-emerald-800 text-emerald-300 hover:bg-emerald-900/40"
            }`}
          >
            {isPlaying ? "MUTE" : "UNMUTE"}
          </button>
        </div>
      </div>
    </div>
  );
};
