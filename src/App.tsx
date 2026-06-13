import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  BookOpen,
  Sparkles,
  Compass,
  Save,
  Music,
  History,
  Trophy,
  Sliders,
  Play,
  ArrowRight,
  ChevronRight,
  RefreshCw,
  LogOut,
  HelpCircle,
  Award
} from "lucide-react";

import {
  TimeOfDay,
  Weather,
  CharacterStateID,
  SaveSlot,
  Achievement,
  DialogNode
} from "./types";

import { STORY_NODES } from "./storyData";
import { CharacterPortrait } from "./components/CharacterPortrait";
import { DynamicBackground } from "./components/DynamicBackground";
import { SettingsPanel } from "./components/SettingsPanel";
import { SavePanel } from "./components/SavePanel";
import { GalleryPanel } from "./components/GalleryPanel";
import { AchievementsPanel } from "./components/AchievementsPanel";
import { MusicPlayerPanel } from "./components/MusicPlayerPanel";
import { DialogLogPanel } from "./components/DialogLogPanel";
import { musicEngine } from "./lib/AudioSynthesizer";

// Initial set of achievements to lock
const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: "primer_viaje", title: "Andas de Ida", description: "Completa tu primer viaje en tren hasta la última estación.", icon: "🎫" },
  { id: "pasaje_confianza", title: "Pasaje de Confianza", description: "Comparte tus miedos más profundos durante el mágico atardecer dorado.", icon: "🌅" },
  { id: "viajero_melomano", title: "Vía de Armonías", description: "Acepta escuchar la lista acústica de jazz junto a Franxito.", icon: "🎵" },
  { id: "salto_vacio", title: "Salto al Vacío", description: "Decide huir juntos de la vida programada y cambiar de rumbo.", icon: "🤸" },
  { id: "fraternidad_cafe", title: "Fraternidad de Café", description: "Acompaña a Franxito al andén nevado por chocolate caliente.", icon: "☕" },
  { id: "llavero_cobre", title: "Trampa de Cobre", description: "Descubre el llavero secreto que Franxito deslizó en tu bolso.", icon: "🔑" },
  { id: "silencio_complice", title: "Silencio Cómplice", description: "Intercambia notas manuscritas en lugar de hablar innecesariamente.", icon: "📓" },
  { id: "invierno_intimo", title: "Invierno Íntimo", description: "Comparte chocolate espeso en un andén nevado durante la tormenta.", icon: "❄️" },
  { id: "adios_eterno", title: "Mundos Paralelos", description: "Regresa a tu órbita metropolitana ordinaria sin mirar atrás.", icon: "🏙️" },
  { id: "coleccionista_destinos", title: "Corte de Estaciones", description: "Desbloquea 5 o más finales únicos en tu colección.", icon: "🏆" }
];

export default function App() {
  // Game screens
  // "startup" -> click coordinates to unlock AudioContext
  // "menu" -> Main home with title and interactive prologue
  // "game" -> Interactive visual novel active carriage loop
  const [screen, setScreen] = useState<"startup" | "menu" | "game">("startup");

  // Core gameplay states
  const [currentNodeId, setCurrentNodeId] = useState<string>("intro_1");
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("Mañana");
  const [weather, setWeather] = useState<Weather>("Sol");
  const [affinity, setAffinity] = useState<number>(5); // hidden level
  const [memories, setMemories] = useState<Record<string, string>>({});
  const [personalityPoints, setPersonalityPoints] = useState<Record<string, number>>({
    Tímida: 0,
    Divertida: 0,
    Curiosa: 0,
    Inteligente: 0,
    Reservada: 0,
    Aventurera: 0,
    Romántica: 0,
    Reflexiva: 0
  });

  // Dialog visual states
  const [arExpression, setArExpression] = useState<CharacterStateID>("Normal");
  const [frExpression, setFrExpression] = useState<CharacterStateID>("Normal");
  const [displayText, setDisplayText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingTimerRef = useRef<any>(null);
  const typewriterGenRef = useRef(0);

  // Panels visibility
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Player settings (cached)
  const [volume, setVolume] = useState<number>(0.5);
  const [mute, setMute] = useState<boolean>(false);
  const [textSpeed, setTextSpeed] = useState<number>(35); // word speed in ms

  // Persistent user profiles (cached in localStorage)
  const [unlockedEndings, setUnlockedEndings] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [dialogueHistory, setDialogueHistory] = useState<string[]>([]);
  const [saveSlots, setSaveSlots] = useState<SaveSlot[]>([]);
  const [autoSaveSlot, setAutoSaveSlot] = useState<SaveSlot | null>(null);

  const activeNode: DialogNode = STORY_NODES[currentNodeId] || STORY_NODES["intro_1"];

  // Fetch persistent parameters on mount
  useEffect(() => {
    const cachedEndings = localStorage.getItem("novel_unlocked_endings");
    if (cachedEndings) setUnlockedEndings(JSON.parse(cachedEndings));

    const cachedAchievements = localStorage.getItem("novel_achievements");
    if (cachedAchievements) {
      setAchievements(JSON.parse(cachedAchievements));
    }

    const cachedSlots = localStorage.getItem("novel_save_slots");
    if (cachedSlots) {
      setSaveSlots(JSON.parse(cachedSlots));
    } else {
      // populate 3 empty slots
      const initialSlots: SaveSlot[] = [
        { id: "1", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 },
        { id: "2", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 },
        { id: "3", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 }
      ];
      localStorage.setItem("novel_save_slots", JSON.stringify(initialSlots));
      setSaveSlots(initialSlots);
    }

    const cachedAuto = localStorage.getItem("novel_autosave");
    if (cachedAuto) setAutoSaveSlot(JSON.parse(cachedAuto));
  }, []);

  // Sync volume with physical music synthesizer class
  useEffect(() => {
    musicEngine.setVolume(volume);
    musicEngine.setMute(mute);
  }, [volume, mute]);

  // Adjust engine weather sound
  useEffect(() => {
    musicEngine.setWeatherSound(weather);
  }, [weather]);

  // Trigger typewriter printing when node text shifts
  const startTypewriter = useCallback((textTemplate: string) => {
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    // Resolve placeholders from smart memories
    let formattedText = textTemplate;
    Object.entries(memories).forEach(([key, val]) => {
      formattedText = formattedText.replaceAll(`{${key}}`, val as string);
    });

    if (textSpeed === 0) {
      setDisplayText(formattedText);
      setIsTyping(false);
      return;
    }

    const gen = ++typewriterGenRef.current;
    let buffer = "";
    let index = 0;
    setDisplayText("");
    setIsTyping(true);

    typingTimerRef.current = setInterval(() => {
      if (typewriterGenRef.current !== gen) return;
      if (index >= formattedText.length) {
        clearInterval(typingTimerRef.current);
        setIsTyping(false);
        return;
      }
      buffer += formattedText.charAt(index);
      setDisplayText(buffer);
      index++;
    }, textSpeed);
  }, [memories, textSpeed]);

  // Handle active speech change and portraits values updates
  useEffect(() => {
    if (screen !== "game") return;

    if (activeNode.expressionAranxita) setArExpression(activeNode.expressionAranxita);
    if (activeNode.expressionFranxito) setFrExpression(activeNode.expressionFranxito);

    // Apply specific weather changes
    if (activeNode.background === "estacion_lluvia") {
      setWeather("Lluvia");
    }

    startTypewriter(activeNode.text);

    // Append dialogue line to scrolling audit log
    const speakerPrefix = activeNode.speaker
      ? activeNode.speaker === "Aranxita"
        ? "Aranxita"
        : activeNode.speaker
      : activeNode.type === "internal"
      ? "Aranxita (Pensamiento)"
      : "Sistema";

    // Format logged message
    let line = activeNode.text;
    Object.entries(memories).forEach(([key, val]) => {
      line = line.replaceAll(`{${key}}`, val as string);
    });

    setDialogueHistory((prev) => {
      const entry = `${speakerPrefix}: ${line}`;
      // Prevent logs spam duplicated rows
      if (prev[prev.length - 1] === entry) return prev;
      return [...prev, entry];
    });

    // Handle autosaves on crucial state pivots
    autoSaveCurrentTrip(currentNodeId);
  }, [currentNodeId, screen, startTypewriter]);

  // Skip word printing instantly when clicked directly on text container
  const skipTypewriterEffect = () => {
    if (!isTyping) return;
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    
    let formattedText = activeNode.text;
    Object.entries(memories).forEach(([key, val]) => {
      formattedText = formattedText.replaceAll(`{${key}}`, val as string);
    });

    setDisplayText(formattedText);
    setIsTyping(false);
  };

  // Main navigation action button
  const handleNextNode = () => {
    if (isTyping) {
      skipTypewriterEffect();
      return;
    }

    // Play a gentle keyboard click sound procedurally
    musicEngine.playSingleMelodyNote(0.85);

    // If node is an ending pivot, handle final calculations and reveal the respective screen
    if (activeNode.type === "ending" && activeNode.next === "end_credits") {
      unlockAchievement("primer_viaje");
      triggerFullGameCompletion();
    }

    if (activeNode.next) {
      // Evaluate custom routing hooks to trigger multiple endings
      if (activeNode.next.startsWith("route_") || activeNode.next.startsWith("ending_eval_")) {
        routeToEndingBranch(activeNode.next);
      } else {
        setCurrentNodeId(activeNode.next);
      }
    }
  };

  // Evaluate final nodes based on affinity and personality
  const routeToEndingBranch = (pivotKey: string) => {
    // Dominant personality points
    let maxPers = "Reflexiva";
    let maxVal = -1;
    Object.entries(personalityPoints).forEach(([pers, val]) => {
      const pVal = val as number;
      if (pVal > maxVal) {
        maxVal = pVal;
        maxPers = pers;
      }
    });

    if (pivotKey === "route_sueño_determinar") {
      if (weather === "Nieve") {
        setCurrentNodeId("ending_11_chocolate_invernal");
        unlockAchievement("invierno_intimo");
        registerEndingUnlocked("ending_11_chocolate_invernal");
      } else if (weather === "Noche Estrellada") {
        setCurrentNodeId("ending_10_misma_constelacion");
        registerEndingUnlocked("ending_10_misma_constelacion");
      } else {
        // High/medium check
        if (affinity > 9) {
          setCurrentNodeId("ending_3_melodia_compartida");
          registerEndingUnlocked("ending_3_melodia_compartida");
          unlockAchievement("viajero_melomano");
        } else {
          setCurrentNodeId("ending_8_silbido_viento");
          registerEndingUnlocked("ending_8_silbido_viento");
          unlockAchievement("pasaje_confianza");
        }
      }
    } else if (pivotKey === "route_numero_determinar" || pivotKey === "ending_eval_numero_cond") {
      if (affinity > 13) {
        if (maxPers === "Romántica" || maxPers === "Tímida") {
          setCurrentNodeId("ending_6_amor_distancia");
          registerEndingUnlocked("ending_6_amor_distancia");
        } else {
          setCurrentNodeId("ending_4_cafe_pendiente");
          registerEndingUnlocked("ending_4_cafe_pendiente");
        }
      } else {
        setCurrentNodeId("ending_2_amigos_cafe");
        registerEndingUnlocked("ending_2_amigos_cafe");
      }
    } else if (pivotKey === "route_huida_determinar" || pivotKey === "ending_eval_huida_cond") {
      if (affinity > 14 && (personalityPoints["Aventurera"] || 0) > 2) {
        setCurrentNodeId("ending_13_viaje_interminable");
        registerEndingUnlocked("ending_13_viaje_interminable");
        unlockAchievement("salto_vacio");
      } else {
        // Declined escape, leads to soft bittersweet farewell
        setCurrentNodeId("ending_8_silbido_viento");
        registerEndingUnlocked("ending_8_silbido_viento");
      }
    } else if (pivotKey === "route_abrazo_determinar" || pivotKey === "ending_eval_abrazo_cond") {
      if (weather === "Lluvia" || weather === "Tormenta") {
        setCurrentNodeId("ending_9_promesa_lluvia");
        registerEndingUnlocked("ending_9_promesa_lluvia");
      } else if (maxPers === "Tímida") {
        setCurrentNodeId("ending_12_silencio_complice");
        registerEndingUnlocked("ending_12_silencio_complice");
        unlockAchievement("silencio_complice");
      } else if (affinity > 11) {
        // Left keyring secret
        setCurrentNodeId("ending_7_llave_olvidada");
        registerEndingUnlocked("ending_7_llave_olvidada");
        unlockAchievement("llavero_cobre");
      } else {
        setCurrentNodeId("ending_5_foto_anden");
        registerEndingUnlocked("ending_5_foto_anden");
      }
    } else if (pivotKey === "route_silencio_determinar" || pivotKey === "ending_eval_silencio_cond") {
      if ((memories["accionParada1"] || "") === "sola") {
        setCurrentNodeId("ending_14_divergencia_inevitable");
        registerEndingUnlocked("ending_14_divergencia_inevitable");
      } else if (affinity > 10) {
        setCurrentNodeId("ending_15_miradas_perdidas");
        registerEndingUnlocked("ending_15_miradas_perdidas");
      } else {
        setCurrentNodeId("ending_1_nunca_mas_vieron");
        registerEndingUnlocked("ending_1_nunca_mas_vieron");
        unlockAchievement("adios_eterno");
      }
    }
  };

  // Handle a user choice selection
  const handleChoiceSelect = (choice: any) => {
    if (isTyping) return;
    
    musicEngine.playSingleMelodyNote(1.1);

    // Apply direct state effects
    if (choice.effects) {
      if (choice.effects.affinity !== undefined) {
        setAffinity((prev) => prev + choice.effects.affinity);
      }
      if (choice.effects.personality) {
        setPersonalityPoints((prev) => {
          const updated = { ...prev };
          const p = choice.effects.personality;
          updated[p] = (updated[p] || 0) + 1;
          return updated;
        });
      }
      if (choice.effects.remember) {
        setMemories((prev) => ({
          ...prev,
          [choice.effects.remember.key]: choice.effects.remember.value,
        }));
      }
      if (choice.effects.weather) setWeather(choice.effects.weather);
      if (choice.effects.timeChange) setTimeOfDay(choice.effects.timeChange);
      if (choice.effects.achievementId) unlockAchievement(choice.effects.achievementId);
    }

    // Move to respective node target
    if (choice.next.startsWith("route_") || choice.next.startsWith("ending_eval_")) {
      routeToEndingBranch(choice.next);
    } else {
      setCurrentNodeId(choice.next);
    }
  };

  // Auto-saves gameplay parameters to LocalStorage
  const autoSaveCurrentTrip = (nodeId: string) => {
    const slotData: SaveSlot = {
      id: "AutoSave",
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) + " - " + new Date().toLocaleDateString(),
      currentNodeId: nodeId,
      timeOfDay,
      weather,
      affinity,
      memories,
      personalityPoints,
      dialogueHistory,
      aranxitaExpression: arExpression,
      franxitoExpression: frExpression,
      hour: 1
    };
    localStorage.setItem("novel_autosave", JSON.stringify(slotData));
    setAutoSaveSlot(slotData);
  };

  // manual slots saving
  const handleSaveSlot = (slotId: string) => {
    const freshSlots = saveSlots.map((slot) => {
      if (slot.id === slotId) {
        return {
          id: slotId,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + new Date().toLocaleDateString(),
          currentNodeId,
          timeOfDay,
          weather,
          affinity,
          memories,
          personalityPoints,
          dialogueHistory,
          aranxitaExpression: arExpression,
          franxitoExpression: frExpression,
          hour: 1
        };
      }
      return slot;
    });
    localStorage.setItem("novel_save_slots", JSON.stringify(freshSlots));
    setSaveSlots(freshSlots);
    musicEngine.playChime();
    alert(`Partida guardada con éxito en Ranura ${slotId}`);
  };

  // manual slots loading
  const handleLoadSlot = (slot: SaveSlot) => {
    setCurrentNodeId(slot.currentNodeId);
    setTimeOfDay(slot.timeOfDay);
    setWeather(slot.weather);
    setAffinity(slot.affinity);
    setMemories(slot.memories);
    setPersonalityPoints(slot.personalityPoints);
    setDialogueHistory(slot.dialogueHistory);
    setArExpression(slot.aranxitaExpression);
    setFrExpression(slot.franxitoExpression);
    setActivePanel(null);
    setScreen("game");
    musicEngine.playChime();
  };

  // Unlock achievements and store safely
  const unlockAchievement = (id: string) => {
    const updated = achievements.map((ach) => {
      if (ach.id === id && !ach.unlockedAt) {
        return {
          ...ach,
          unlockedAt: new Date().toLocaleDateString()
        };
      }
      return ach;
    });
    
    // Check if total endings achievement locked
    const totalUnlockedEndings = unlockedEndings.length;
    const finalUpdated = updated.map((ach) => {
      if (ach.id === "coleccionista_destinos" && totalUnlockedEndings >= 5 && !ach.unlockedAt) {
        return {
          ...ach,
          unlockedAt: new Date().toLocaleDateString()
        };
      }
      return ach;
    });

    setAchievements(finalUpdated);
    localStorage.setItem("novel_achievements", JSON.stringify(finalUpdated));
  };

  // Register newly unlocked endings in the collection
  const registerEndingUnlocked = (id: string) => {
    if (unlockedEndings.includes(id)) return;
    const newList = [...unlockedEndings, id];
    setUnlockedEndings(newList);
    localStorage.setItem("novel_unlocked_endings", JSON.stringify(newList));
  };

  // End credits summary state
  const triggerFullGameCompletion = () => {
    setCurrentNodeId("intro_1");
    setScreen("menu");
  };

  // Start new travel voyage
  const startNewTravelVoyage = () => {
    musicEngine.init();
    musicEngine.playChime();
    
    // Reset transient metrics, preserve collections
    setCurrentNodeId("intro_1");
    setTimeOfDay("Mañana");
    setWeather("Sol");
    setAffinity(5);
    setMemories({});
    setDialogueHistory([]);
    setPersonalityPoints({
      Tímida: 0,
      Divertida: 0,
      Curiosa: 0,
      Inteligente: 0,
      Reservada: 0,
      Aventurera: 0,
      Romántica: 0,
      Reflexiva: 0
    });
    setArExpression("Normal");
    setFrExpression("Normal");
    setScreen("game");
  };

  // Start safe audio background and trigger core menu
  const triggerMainDashboard = () => {
    musicEngine.init();
    musicEngine.setMusicMood("default");
    musicEngine.playSingleMelodyNote(1.0);
    setScreen("menu");
  };

  // Reset full system
  const handleResetEntireDatabase = () => {
    localStorage.removeItem("novel_unlocked_endings");
    localStorage.removeItem("novel_achievements");
    localStorage.removeItem("novel_save_slots");
    localStorage.removeItem("novel_autosave");
    
    setUnlockedEndings([]);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setAutoSaveSlot(null);
    const wipedSlots = [
      { id: "1", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 },
      { id: "2", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 },
      { id: "3", date: "", currentNodeId: "", timeOfDay: "Mañana", weather: "Sol", affinity: 5, memories: {}, personalityPoints: {}, dialogueHistory: [], aranxitaExpression: "Normal", franxitoExpression: "Normal", hour: 1 }
    ];
    setSaveSlots(wipedSlots);
    setScreen("startup");
    setActivePanel(null);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-zinc-950 flex flex-col font-sans select-none text-slate-100">
      
      {/* 1. STARTUP INTERSTICIAL (Web Audio Activation safety requirement) */}
      {screen === "startup" && (
        <div className="relative inset-0 flex-1 flex flex-col items-center justify-center bg-radial-gradient from-slate-900 to-black p-6 text-center text-slate-350">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 max-w-md bg-slate-950/40 p-8 rounded-3xl border border-slate-800 backdrop-blur-md shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500/80 mx-auto flex items-center justify-center text-white shadow-xl">
              <BookOpen className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-100">Hasta la Última Estación</h1>
              <p className="text-xs text-slate-400 font-mono">NOVELA INTERACTIVA WEB PREMIUM</p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Subir a bordo requiere habilitar el sintetizador acústico interactivo para una inmersión atmosférica total.
            </p>

            <button
              onClick={triggerMainDashboard}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-semibold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/20"
            >
              <Play className="w-4 h-4" />
              Subir al vagón
            </button>
          </motion.div>
        </div>
      )}

      {/* 2. CHIC NOVEL TITLE HUB (MENU) */}
      {screen === "menu" && (
        <div className="relative inset-0 flex-1 flex flex-col justify-between p-6 bg-radial-gradient from-slate-900 via-zinc-950 to-black overflow-y-auto">
          {/* Poetic upper margin decorations */}
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono tracking-widest uppercase">
            <span>Coche 4 • Asiento 22</span>
            <span>Hasta la última estación</span>
          </div>

          {/* Hero centerpiece container */}
          <div className="max-w-xl mx-auto w-full text-center space-y-6 my-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-3"
            >
              <h1 className="text-5xl font-black tracking-tight font-sans bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-pink-200 to-indigo-100 drop-shadow-sm leading-tight uppercase">
                Hasta la Última Estación
              </h1>
              <p className="text-xs text-rose-400 font-mono tracking-widest uppercase">
                Una novela visual interactiva y emocional
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-rose-500 to-indigo-400 mx-auto mt-4" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-slate-350 leading-relaxed max-w-sm mx-auto font-serif"
            >
              "¿Qué pasaría si una persona completamente desconocida se sentara a tu lado durante un viaje de varias horas y terminara cambiando tu vida?"
            </motion.p>

            {/* Core control cluster */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 pt-6"
            >
              <button
                onClick={startNewTravelVoyage}
                className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-sans text-sm font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-rose-600/25"
              >
                Inaugurar Viaje (12 Horas)
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Dynamic triggers grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                {/* Save system load shortcut */}
                <button
                  onClick={() => setActivePanel("saves")}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-300 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-slate-400" />
                  Cuaderno de Recuerdos
                </button>

                {/* Gallery */}
                <button
                  onClick={() => setActivePanel("gallery")}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-300 py-3 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  Galería de Destinos
                </button>

                {/* Achievements */}
                <button
                  onClick={() => setActivePanel("achievements")}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-755 text-slate-300 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1"
                >
                  <Trophy className="w-3.5 h-3.5 text-slate-400" />
                  Bitácora de Logros
                </button>

                {/* Music Synthesizer room */}
                <button
                  onClick={() => setActivePanel("music")}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-755 text-slate-300 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1"
                >
                  <Music className="w-3.5 h-3.5 text-slate-400" />
                  Tocadiscos del Vagón
                </button>
              </div>
            </motion.div>
          </div>

          {/* Quick legal / credit row */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-600 mt-6 pt-4 border-t border-slate-900 font-mono">
            <span>© 2026 • Franxito & Aranxita</span>
            <span>Establecido bajo clima dinámico y piano Rhodes</span>
          </div>
        </div>
      )}

      {/* 3. CORE ACTIVE GAME INTERFACE (VISUAL NOVEL LOOP) */}
      {screen === "game" && (
        <div id="gameplay-stage" className="relative flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* Dynamic background panel layer behind characters portrait */}
          <DynamicBackground
            timeOfDay={timeOfDay}
            weather={weather}
            sceneryType={activeNode.background || "tren_interior"}
          />

          {/* Top floating control deck */}
          <div id="control-navigation-bar" className="relative z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 flex flex-wrap gap-2 items-center justify-between">
            {/* Left side details indicators */}
            <div className="flex items-center gap-2">
              <span className="bg-rose-600/30 text-rose-300 text-[10px] font-mono border border-rose-500/10 px-2.5 py-1 rounded-full uppercase tracking-widest font-bold">
                {timeOfDay}
              </span>
              <span className="bg-slate-850/60 text-slate-300 text-[10px] font-mono px-2.5 py-1 rounded-full border border-slate-800">
                Clima: {weather}
              </span>
            </div>

            {/* Icons set toolbar */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-slate-800/40 p-1 rounded-2xl">
              <button
                onClick={() => setActivePanel("saves")}
                title="Ranuras de guardado"
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePanel("logs")}
                title="Historial de diálogos"
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <History className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePanel("achievements")}
                title="Logros"
                className="p-2 hover:bg-slate-800 rounded-xl text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePanel("music")}
                title="Tocadiscos"
                className="p-2 hover:bg-slate-800 rounded-xl text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
              >
                <Music className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActivePanel("settings")}
                title="Ajustes y volumen"
                className="p-2 hover:bg-slate-800 rounded-xl text-slate-300 hover:text-slate-100 transition-colors cursor-pointer"
              >
                <Sliders className="w-4 h-4" />
              </button>
              <div className="w-px h-5 bg-slate-800 mx-1" />
              <button
                onClick={() => {
                  if (confirm("¿Estás segura de que quieres abandonar este viaje a medias y regresar al menú principal? Se guardará automáticamente.")) {
                    setScreen("menu");
                  }
                }}
                title="Abandonar viaje"
                className="p-2 hover:bg-red-950/20 text-red-400 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-900/10"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Character Portraits slots center-aligned */}
          <div className="relative flex-1 flex items-center justify-around px-4 sm:px-12 gap-4 max-w-4xl mx-auto w-full z-10 select-none pointer-events-none">
            {/* Aranxita on Left (only show when not terminal station background isolated or based on speaker tags) */}
            {activeNode.id !== "intro_1" && activeNode.id !== "intro_2" && activeNode.id !== "intro_3" && activeNode.id !== "intro_4" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="aranxita"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: activeNode.speaker === "Franxito" ? 0.76 : 1,
                    scale: activeNode.speaker === "Aranxita" ? 1.02 : 1,
                    x: 0,
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  className="transition-all duration-300"
                >
                  <CharacterPortrait
                    character="Aranxita"
                    expression={arExpression}
                    size="lg"
                  />
                </motion.div>
              </AnimatePresence>
            )}

            {/* Franxito on Right */}
            {activeNode.id !== "intro_1" && activeNode.id !== "intro_2" && activeNode.id !== "intro_3" && activeNode.id !== "intro_4" && activeNode.type !== "ending" && (
              <AnimatePresence mode="wait">
                <motion.div
                  key="franxito"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{
                    opacity: activeNode.speaker === "Aranxita" ? 0.76 : 1,
                    scale: activeNode.speaker === "Franxito" ? 1.02 : 1,
                    x: 0,
                  }}
                  exit={{ opacity: 0, x: 50 }}
                  className="transition-all duration-300"
                >
                  <CharacterPortrait
                    character="Franxito"
                    expression={frExpression}
                    size="lg"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Interactive bottom dialogues box */}
          <div className="relative z-45 max-w-3xl mx-auto w-full p-4 shrink-0">
            {/* Custom styled dialog cards */}
            <div
              onClick={isTyping ? skipTypewriterEffect : undefined}
              className={`rounded-3xl border p-5 sm:p-6 shadow-2xl transition-all h-auto min-h-[178px] flex flex-col justify-between ${
                activeNode.type === "internal"
                  ? "bg-purple-950/20 backdrop-blur-lg border-purple-500/20 shadow-purple-500/5 text-purple-100"
                  : activeNode.type === "ending"
                  ? "bg-gradient-to-r from-rose-950/40 to-slate-900/80 backdrop-blur-lg border-rose-500/30"
                  : "bg-slate-900/70 backdrop-blur-lg border-slate-700/50"
              }`}
            >
              {/* Speaker Header label */}
              <div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest font-black px-3 py-1 rounded-full border ${
                    activeNode.type === "internal"
                      ? "bg-purple-500/20 text-purple-300 border-purple-500/10"
                      : activeNode.speaker === "Aranxita"
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/10"
                      : activeNode.speaker === "Franxito"
                      ? "bg-blue-500/20 text-blue-300 border-blue-500/10"
                      : "bg-slate-800 text-slate-350 border-slate-700/60"
                  }`}
                >
                  {activeNode.type === "internal"
                    ? "Tus Pensamientos (Aranxita)"
                    : activeNode.speaker || "Sistema"}
                </span>

                {/* Subtitle / Narrative style type label */}
                {activeNode.type === "ending" && (
                  <span className="ml-2 bg-pink-500/20 text-pink-300 border border-pink-500/10 text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded">
                    Epílogo Final
                  </span>
                )}
              </div>

              {/* Typewritten Dialogue body text */}
              <div className="my-4 relative flex-1 overflow-y-auto max-h-[180px] scrollbar-custom">
                <p className={`text-sm sm:text-[15px] leading-relaxed font-serif tracking-wide ${activeNode.type === 'internal' ? 'italic text-purple-200' : 'text-slate-100'}`}>
                  {displayText}
                </p>
                {isTyping && (
                  <span className="absolute bottom-1 right-0 w-1.5 h-4 bg-rose-500 animate-pulse inline-block" />
                )}
              </div>

              {/* Action Area (Choices OR navigation controls list) */}
              <div className="flex justify-end pt-3 border-t border-slate-850/45 shrink-0">
                {/* CHOICE PIVOTS MATRIX (Fulfills multi-choice rule) */}
                {activeNode.choices && activeNode.choices.length > 0 && !isTyping ? (
                  <div className="w-full flex flex-col gap-2 pt-2 animate-fade-in">
                    {activeNode.choices.map((choice, i) => {
                      // Styling based on decision types: reply (responder), act (actuar), react (reaccionar)
                      const choiceBadges = {
                        responder: "bg-blue-500/10 text-blue-300 border-blue-500/20 hover:bg-blue-500/20",
                        actuar: "bg-amber-500/10 text-amber-300 border-amber-500/20 hover:bg-amber-500/20",
                        reaccionar: "bg-rose-500/10 text-rose-300 border-rose-500/20 hover:bg-rose-500/20",
                      };

                      return (
                        <button
                          key={i}
                          onClick={() => handleChoiceSelect(choice)}
                          className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer group ${
                            choiceBadges[choice.type] || "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded bg-black/30 border border-white/5 opacity-80 select-none">
                              {choice.type}
                            </span>
                            <span className="font-sans font-medium">{choice.text}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  /* Standard advance button */
                  <button
                    onClick={handleNextNode}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 font-sans text-xs font-semibold py-2 px-5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer hover:border-rose-500/20"
                  >
                    {isTyping ? "Terminar fila" : activeNode.type === "ending" ? "Registrar epílogo" : "Siguiente"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODALS AND FLOATING PANELS CLUSTER */}
      <AnimatePresence>
        {activePanel === "settings" && (
          <SettingsPanel
            onClose={() => setActivePanel(null)}
            volume={volume}
            onVolumeChange={(v) => {
              setVolume(v);
              musicEngine.setVolume(v);
            }}
            mute={mute}
            onMuteToggle={() => setMute((prev) => !prev)}
            textSpeed={textSpeed}
            onTextSpeedChange={setTextSpeed}
            currentWeather={weather}
            onWeatherChange={setWeather}
            onResetGame={handleResetEntireDatabase}
          />
        )}

        {activePanel === "saves" && (
          <SavePanel
            onClose={() => setActivePanel(null)}
            slots={saveSlots}
            autoSaveSlot={autoSaveSlot}
            onSave={handleSaveSlot}
            onLoad={handleLoadSlot}
            onLoadAutoSave={() => autoSaveSlot && handleLoadSlot(autoSaveSlot)}
          />
        )}

        {activePanel === "gallery" && (
          <GalleryPanel
            onClose={() => setActivePanel(null)}
            unlockedEndings={unlockedEndings}
          />
        )}

        {activePanel === "achievements" && (
          <AchievementsPanel
            onClose={() => setActivePanel(null)}
            achievements={achievements}
          />
        )}

        {activePanel === "music" && (
          <MusicPlayerPanel
            onClose={() => setActivePanel(null)}
          />
        )}

        {activePanel === "logs" && (
          <DialogLogPanel
            onClose={() => setActivePanel(null)}
            logs={dialogueHistory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
