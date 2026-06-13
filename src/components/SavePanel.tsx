import React from "react";
import { SaveSlot } from "../types";
import { X, Save, FolderOpen, RotateCcw, Clock } from "lucide-react";

interface SavePanelProps {
  onClose: () => void;
  slots: SaveSlot[];
  autoSaveSlot: SaveSlot | null;
  onSave: (slotId: string) => void;
  onLoad: (slot: SaveSlot) => void;
  onLoadAutoSave: () => void;
}

export const SavePanel: React.FC<SavePanelProps> = ({
  onClose,
  slots,
  autoSaveSlot,
  onSave,
  onLoad,
  onLoadAutoSave,
}) => {
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-xl p-6 text-slate-100 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-6">
          <div className="flex items-center gap-2 text-pink-400">
            <Save className="w-5 h-5" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Cuaderno de Recuerdos (Guardado)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* AutoSave slot banner */}
        {autoSaveSlot && (
          <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-2xl p-4 mb-6 flex justify-between items-center">
            <div className="space-y-1">
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full">
                Autoguardado
              </span>
              <div className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <Clock className="w-3.5 h-3.5" />
                {autoSaveSlot.date} — {autoSaveSlot.timeOfDay} ({autoSaveSlot.weather})
              </div>
            </div>
            <button
              onClick={onLoadAutoSave}
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs px-4 py-2 font-semibold rounded-xl flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recobrar
            </button>
          </div>
        )}

        {/* 3 Manual Save Slots */}
        <div className="space-y-4">
          {slots.map((slot) => {
            const isEmpty = slot.currentNodeId === "";

            return (
              <div
                key={slot.id}
                className={`border rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all ${
                  isEmpty
                    ? "border-slate-800 bg-slate-950/20 opacity-65"
                    : "border-slate-700/50 bg-slate-950/40 hover:border-pink-500/30"
                }`}
              >
                <div className="space-y-1">
                  <span className="font-sans font-semibold text-sm text-slate-200">
                    Espacio de Memoria {slot.id}
                  </span>
                  {isEmpty ? (
                    <p className="text-xs text-slate-500 font-mono">Espacio de ranura libre</p>
                  ) : (
                    <div className="text-xs text-slate-400 space-y-1">
                      <p>Fecha: {slot.date}</p>
                      <p className="font-sans font-medium text-pink-400">
                        {slot.timeOfDay} • {slot.weather}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  {/* Save Button */}
                  <button
                    onClick={() => onSave(slot.id)}
                    className="flex-1 sm:flex-initial bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 rounded-xl px-4 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Guardar
                  </button>

                  {/* Load Button (Disabled if empty) */}
                  {!isEmpty && (
                    <button
                      onClick={() => onLoad(slot)}
                      className="flex-1 sm:flex-initial bg-pink-600 hover:bg-pink-700 text-white rounded-xl px-4 py-2 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-pink-600/10"
                    >
                      <FolderOpen className="w-3.5 h-3.5" /> Cargar
                    </button>
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
