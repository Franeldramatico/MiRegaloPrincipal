import React from "react";
import { Weather } from "../types";
import { X, Volume2, Sparkles, Sliders, RefreshCw, VolumeX } from "lucide-react";

interface SettingsPanelProps {
  onClose: () => void;
  volume: number;
  onVolumeChange: (v: number) => void;
  mute: boolean;
  onMuteToggle: () => void;
  textSpeed: number;
  onTextSpeedChange: (speed: number) => void;
  currentWeather: Weather;
  onWeatherChange: (w: Weather) => void;
  onResetGame: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  onClose,
  volume,
  onVolumeChange,
  mute,
  onMuteToggle,
  textSpeed,
  onTextSpeedChange,
  currentWeather,
  onWeatherChange,
  onResetGame,
}) => {
  const weathers: Weather[] = ["Sol", "Lluvia", "Niebla", "Tormenta", "Nieve", "Atardecer Despejado", "Noche Estrellada"];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-lg p-6 text-slate-100 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2 text-rose-400">
            <Sliders className="w-5 h-5" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Ajustes del Vagón</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Audio Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium text-slate-300">
              <span className="flex items-center gap-2">
                {mute ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                Volumen Ambiental y Música
              </span>
              <span>{mute ? "Silenciado" : `${Math.round(volume * 100)}%`}</span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                disabled={mute}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500 disabled:opacity-40"
              />
              <button
                onClick={onMuteToggle}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${
                  mute
                    ? "bg-rose-950/40 border-rose-800 text-rose-300"
                    : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {mute ? "Activar" : "Silenciar"}
              </button>
            </div>
          </div>

          {/* Typewriter Speed */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-300 block">Velocidad del Texto (Lectura)</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Rápido", speed: 15 },
                { label: "Medio", speed: 38 },
                { label: "Lento", speed: 70 },
                { label: "Instantáneo", speed: 0 },
              ].map((opt) => (
                <button
                  key={opt.speed}
                  onClick={() => onTextSpeedChange(opt.speed)}
                  className={`py-2 text-xs rounded-xl border transition-all ${
                    textSpeed === opt.speed
                      ? "bg-rose-500/20 border-rose-500 text-rose-300"
                      : "bg-slate-800 border-slate-700 hover:bg-slate-750 text-slate-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sandbox Weather Overrider */}
          <div className="space-y-3">
            <span className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Modificador Climático (Sandbox)
            </span>
            <div className="grid grid-cols-2 gap-2">
              {weathers.map((w) => (
                <button
                  key={w}
                  onClick={() => onWeatherChange(w)}
                  className={`py-1.5 px-3 text-left text-xs rounded-xl border transition-all ${
                    currentWeather === w
                      ? "bg-amber-500/10 border-amber-500 text-amber-200"
                      : "bg-slate-800 border-slate-700/50 hover:bg-slate-750 text-slate-400"
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              *Nota: cambiar el clima desbloquea diferentes diálogos, sonidos ambientales y variaciones en la historia con Franxito.
            </p>
          </div>

          {/* Reset Game Options */}
          <div className="border-t border-slate-850 pt-5 mt-4">
            <button
              onClick={() => {
                if (confirm("¿Estás segura de que deseas restablecer por completo tu historial de juego? Perderás tus partidas guardadas, galería de finales y logros.")) {
                  onResetGame();
                }
              }}
              className="w-full bg-red-950/20 hover:bg-red-950/40 border border-red-900/60 text-red-300 py-2.5 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Restablecer Partida e Historial
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[10px] text-slate-600 mt-6 pt-4 border-t border-slate-850 font-mono">
          "HASTA LA ÚLTIMA ESTACIÓN" • V2.5 WEB PRO
        </div>
      </div>
    </div>
  );
};
