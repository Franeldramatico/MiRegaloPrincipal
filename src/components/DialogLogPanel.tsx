import React from "react";
import { X, History, MessageSquare } from "lucide-react";

interface DialogLogPanelProps {
  onClose: () => void;
  logs: string[]; // List of dialogue statements, e.g. ["Aranxita: No quería hablar...", "Franxito: Perdón..."]
}

export const DialogLogPanel: React.FC<DialogLogPanelProps> = ({
  onClose,
  logs,
}) => {
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-xl p-6 text-slate-100 shadow-2xl flex flex-col h-[75vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-rose-400">
            <History className="w-5 h-5" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Bitácora de Recuerdos (Diálogos)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* List of dialogs */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {logs.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-12">
              <MessageSquare className="w-12 h-12 stroke-1 opacity-20 mb-2" />
              <p className="text-xs font-mono">El cuaderno de bitácora está vacío por ahora.</p>
              <p className="text-[11px] text-slate-600 mt-1">Sube a bordo y entabla conversación.</p>
            </div>
          ) : (
            logs.map((log, index) => {
              const isSpeaker = log.includes(":");
              let speaker = "";
              let text = log;

              if (isSpeaker) {
                const parts = log.split(":");
                speaker = parts[0].trim();
                text = parts.slice(1).join(":").trim();
              }

              const isThoughts = speaker === "Pensamiento" || speaker === "Aranxita (Pensamiento)";

              return (
                <div
                  key={index}
                  className={`p-3 rounded-xl border flex flex-col gap-1 text-xs leading-relaxed ${
                    isThoughts
                      ? "bg-slate-950/20 border-purple-500/10 text-purple-300 italic"
                      : speaker === "Aranxita"
                      ? "bg-rose-950/10 border-rose-900/10 text-rose-200"
                      : speaker === "Franxito"
                      ? "bg-blue-950/10 border-blue-900/10 text-blue-200"
                      : "bg-slate-950/30 border-slate-850 text-slate-300"
                  }`}
                >
                  {speaker && (
                    <span
                      className={`font-semibold text-[10px] uppercase tracking-wider font-sans mb-0.5 ${
                        isThoughts
                          ? "text-purple-400"
                          : speaker === "Aranxita"
                          ? "text-rose-400"
                          : speaker === "Franxito"
                          ? "text-blue-400"
                          : "text-slate-400"
                      }`}
                    >
                      {speaker}
                    </span>
                  )}
                  <span>{text}</span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info and indicators */}
        <div className="text-center text-[10px] text-slate-600 border-t border-slate-850 pt-3 mt-4 shrink-0 font-mono">
          Mostrando los últimos {logs.length} fragmentos de conversación recordados.
        </div>
      </div>
    </div>
  );
};
