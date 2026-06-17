import React, { useState } from "react";
import { X, Lock, Eye, Image as ImageIcon, Sparkles } from "lucide-react";

interface GalleryPanelProps {
  onClose: () => void;
  unlockedEndings: string[]; // List of ending IDs, e.g. ["ending_1_nunca_mas_vieron"]
}

export const GalleryPanel: React.FC<GalleryPanelProps> = ({
  onClose,
  unlockedEndings,
}) => {
  const [activeTab, setActiveTab] = useState<"endings" | "scenes">("endings");

  // All 15 Endings with Poetic summaries
  const endingGalleryItems = [
    {
      id: "ending_1_nunca_mas_vieron",
      title: "Fin 1: Destellos en la Niebla",
      description: "Franxito se esfumó entre la multitud de la terminal. Regresaron a órbitas paralelas por siempre.",
      aspect: "Un adiós realista de lo que pudo ser."
    },
    {
      id: "ending_2_amigos_cafe",
      title: "Fin 2: Los Amigos del Café",
      description: "Intercambian fotos tontas de andenes y ríen por chat cada pocos meses. Puente firme de amistad.",
      aspect: "Amistad pura e inmune al paso del tiempo."
    },
    {
      id: "ending_3_melodia_compartida",
      title: "Fin 3: Melodía Compartida",
      description: "Él comparte acordes contigo a través de listas de correo. El jazz es vuestro rincón secreto.",
      aspect: "Conexión musical sin fronteras físicas."
    },
    {
      id: "ending_4_cafe_pendiente",
      title: "Fin 4: Un Café Pendiente",
      description: "Un número en un ticket usado de tren que culmina en una dulce cita telefónica.",
      aspect: "El comienzo de una verdadera historia de amor."
    },
    {
      id: "ending_5_foto_anden",
      title: "Fin 5: Una Foto en el Andén",
      description: "Una foto desastrosa pegada al refrigerador con cachetes sonrojados y dónuts glaseados.",
      aspect: "Un registro visual de un día imborrable."
    },
    {
      id: "ending_6_amor_distancia",
      title: "Fin 6: Amor en la Distancia",
      description: "Largas distancias pero abonos de fin de semana para encontrarse siempre en la terminal.",
      aspect: "Desafiando los kilómetros por un latido sincero."
    },
    {
      id: "ending_7_llave_olvidada",
      title: "Fin 7: La Llave Olvidada",
      description: "Un llavero de cobre con forma de tren oculto en tu bolso como una dulce trampa.",
      aspect: "Un pretexto inolvidable para volverse a ver."
    },
    {
      id: "ending_8_silbido_viento",
      title: "Fin 8: El Silbido del Viento",
      description: "Se vaciaron el alma compartiendo temores infantiles, separándose con un profundo agradecimiento.",
      aspect: "Sanarse mutuamente en un solo viaje otoñal."
    },
    {
      id: "ending_9_promesa_lluvia",
      title: "Fin 9: Promesa Bajo la Lluvia",
      description: "Hundidos bajo un gran paraguas rojo protegiendo vuestro calor corporal de la tormenta.",
      aspect: "Manos entrelazadas impasibles al diluvio."
    },
    {
      id: "ending_10_misma_constelacion",
      title: "Fin 10: Misma Constelación",
      description: "Señalando Orión y compartiendo un ático con un gran ventanal que apunta a las vías nocturnas.",
      aspect: "Unidos para siempre bajo el velo estrellado."
    },
    {
      id: "ending_11_chocolate_invernal",
      title: "Fin 11: Chocolate Invernal",
      description: "Nieve cayendo, dedos cubiertos de guantes y una taza caliente para encender los cachetes.",
      aspect: "El invierno más acogedor de toda tu juventud."
    },
    {
      id: "ending_12_silencio_complice",
      title: "Fin 12: Silencio Cómplice",
      description: "Una tímida nota manuscrita: 'Tus silencios son los más hermosos del mundo'.",
      aspect: "El mutismo que une más que el habla vana."
    },
    {
      id: "ending_13_viaje_interminable",
      title: "Fin 13: El Viaje Interminable",
      description: "Saltar del tren en una parada fantasma y convertiros en el destino constante del otro.",
      aspect: "Huir a contrapié acumulando kilómetros eternos."
    },
    {
      id: "ending_14_divergencia_inevitable",
      title: "Fin 14: Divergencia Inevitable",
      description: "Elegir la soledad antes de que él pudiera conocerte. Un viaje frío y retrospectivo.",
      aspect: "Las barreras rígidas que nos apartan del mundo."
    },
    {
      id: "ending_15_miradas_perdidas",
      title: "Fin 15: Miradas Perdidas",
      description: "Salir corriendo a toda prisa de la terminal metropolitana, perdiéndose el último adiós físico.",
      aspect: "La nostalgia preciosa de una anécdota inacabada."
    }
  ];

  const BASE = import.meta.env.BASE_URL;
  const visualScenes = [
    { title: "Estación con Lluvia", description: "Bóvedas de hierro empañadas de vapor matutino", timeOfDay: "Mañana", weather: "Lluvia", image: `${BASE}images/scenery_station_rain_1781238336044.jpg` },
    { title: "El Vagón de Mediodía", description: "Sol brillante sobre la llanura forestal activa", timeOfDay: "Mediodía", weather: "Sol", image: `${BASE}images/scenery_train_day_1781238298175.jpg` },
    { title: "Cabina Ámbar Íntima", description: "Sombras estiradas e íntima timidez bajo la puesta", timeOfDay: "Atardecer", weather: "Atardecer", image: `${BASE}images/scenery_train_sunset_1781238307638.jpg` },
    { title: "Vías de la Noche Estrellada", description: "Ventanal infinito apuntado al abismo sideral", timeOfDay: "Noche", weather: "Noche Estrellada", image: `${BASE}images/scenery_train_night_1781238319503.jpeg` },
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/60 rounded-3xl w-full max-w-4xl p-6 text-slate-100 shadow-2xl flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-2 text-pink-400">
            <ImageIcon className="w-5 h-5" />
            <h2 className="text-xl font-semibold tracking-wide font-sans">Galería de Destinos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 inline" />
          </button>
        </div>

        {/* Tabs switcher */}
        <div className="flex gap-2 mb-4 shrink-0">
          <button
            onClick={() => setActiveTab("endings")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === "endings"
                ? "bg-pink-600 border-pink-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750"
            }`}
          >
            Terminales Alcanzadas ({unlockedEndings.length} / 15)
          </button>
          <button
            onClick={() => setActiveTab("scenes")}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all ${
              activeTab === "scenes"
                ? "bg-pink-600 border-pink-500 text-white"
                : "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-755"
            }`}
          >
            Aforos del Paisaje (Paisajes)
          </button>
        </div>

        {/* Tab content viewer */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {activeTab === "endings" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {endingGalleryItems.map((item) => {
                const isUnlocked = unlockedEndings.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`relative rounded-2xl p-4 border transition-all duration-500 flex flex-col justify-between ${
                      isUnlocked
                        ? "bg-gradient-to-b from-slate-800/80 to-slate-950/80 border-pink-500/40 opacity-100 shadow-md shadow-pink-500/5"
                        : "bg-slate-950/50 border-slate-800/80 opacity-45"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs font-semibold font-mono tracking-wide ${isUnlocked ? 'text-pink-400' : 'text-slate-500'}`}>
                          {isUnlocked ? "ALCANZADO" : "BLOQUEADO"}
                        </span>
                        {isUnlocked ? (
                          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        ) : (
                          <Lock className="w-4 h-4 text-slate-600" />
                        )}
                      </div>

                      <h3 className={`font-sans font-bold text-sm mb-1 ${isUnlocked ? 'text-slate-100' : 'text-slate-500 font-mono'}`}>
                        {isUnlocked ? item.title : "Destino Desconocido ???"}
                      </h3>

                      <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                        {isUnlocked ? item.description : "Experimenta nuevas elecciones, modifica tu afinidad o cambia el clima dinámico de viaje para revelar este final."}
                      </p>
                    </div>

                    {isUnlocked && (
                      <div className="border-t border-slate-800/60 pt-3 mt-3">
                        <p className="text-[10px] italic text-rose-300 font-serif font-medium">
                          — {item.aspect}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visualScenes.map((sc, index) => {
                const sceneKey = `scene_${index}`;
                // They are always visible as postcards of landscapes we pass by
                return (
                  <div
                    key={index}
                    className="bg-slate-950/40 border border-slate-800 rounded-2xl overflow-hidden shadow-xl"
                  >
                    {/* Real generated postcard matching Time and Weather */}
                    <div className="h-40 relative overflow-hidden bg-slate-950 border-b border-slate-800/50 flex flex-col justify-end p-3">
                      <img
                        src={sc.image}
                        alt={sc.title}
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover select-none transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />

                      <div className="z-20">
                        <span className="bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-[9px] text-slate-200 px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                          {sc.timeOfDay} • {sc.weather}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1">
                      <h4 className="font-sans font-semibold text-sm text-slate-200">{sc.title}</h4>
                      <p className="text-xs text-slate-400">{sc.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
