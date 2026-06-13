import React from "react";
import { X, Trophy, Sparkles, Calendar, BadgeAlert } from "lucide-react";
import { Achievement } from "../types";

interface AchievementsPanelProps {
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  onClose,
  achievements,
}) => {
  const totalUnlocked = achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-xl p-6 text-slate-100 shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy className="w-5 h-5 animate-bounce" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Bitácora de Logros ({totalUnlocked} / {achievements.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
          {achievements.map((item) => {
            const isUnlocked = !!item.unlockedAt;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl p-4 flex gap-4 items-center transition-all duration-300 ${
                  isUnlocked
                    ? "bg-slate-950/40 border-yellow-500/20 shadow-sm"
                    : "bg-slate-950/20 border-slate-800/80 opacity-55"
                }`}
              >
                {/* Achievement Badge Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    isUnlocked
                      ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                      : "bg-slate-900 border-slate-800 text-slate-600"
                  }`}
                >
                  <span className="text-xl font-mono">{item.icon}</span>
                </div>

                {/* Text details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3
                      className={`font-sans font-bold text-sm truncate ${
                        isUnlocked ? "text-slate-100" : "text-slate-500"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {isUnlocked && (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        DESBLOQUEADO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed truncate-2-lines">
                    {item.description}
                  </p>

                  {isUnlocked && item.unlockedAt && (
                    <p className="text-[10px] text-slate-500 flex items-center gap-1 font-mono pt-1">
                      <Calendar className="w-3 h-3 text-slate-600" />
                      Registrado el: {item.unlockedAt}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
