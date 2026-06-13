export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "endings" | "scenery";
  description: string;
  assetKey: string;
  unlocked: boolean;
}

export interface SoundTrack {
  id: string;
  title: string;
  style: string;
  description: string;
}

export type TimeOfDay = "Mañana" | "Mediodía" | "Tarde" | "Atardecer" | "Noche" | "Madrugada";

export type Weather = "Sol" | "Lluvia" | "Niebla" | "Tormenta" | "Nieve" | "Atardecer Despejado" | "Noche Estrellada";

export type CharacterStateID = "Normal" | "Feliz" | "Sonrojado" | "Pensativo" | "Confundido" | "Triste" | "Divertido" | "Incómodo" | "Sorprendido" | "Nostálgico";

export interface SaveSlot {
  id: string;
  date: string;
  currentNodeId: string;
  timeOfDay: TimeOfDay;
  weather: Weather;
  affinity: number;
  memories: Record<string, string>;
  personalityPoints: Record<string, number>;
  dialogueHistory: string[];
  aranxitaExpression: CharacterStateID;
  franxitoExpression: CharacterStateID;
  hour: number;
}

export interface Choice {
  text: string;
  type: "responder" | "actuar" | "reaccionar";
  next: string;
  effects?: {
    affinity?: number;
    personality?: string; // e.g. "Tímida" | "Divertida" | "Curiosa" | "Inteligente" | "Reservada" | "Aventurera" | "Romántica" | "Reflexiva"
    remember?: { key: string; value: string };
    weather?: Weather;
    timeChange?: TimeOfDay;
    hourCost?: number;
    achievementId?: string;
  };
}

export interface DialogNode {
  id: string;
  type: "internal" | "dialog" | "station" | "ending";
  speaker?: "Aranxita" | "Franxito" | "Altavoz" | "Desconocido" | "Sistema";
  text: string; // supports {memoryKey}
  expressionAranxita?: CharacterStateID;
  expressionFranxito?: CharacterStateID;
  background?: string; // scenery style
  choices?: Choice[];
  next?: string;
  effects?: Choice["effects"];
}
