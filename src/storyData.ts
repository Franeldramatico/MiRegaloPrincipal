import { DialogNode } from "./types";

export const STORY_NODES: Record<string, DialogNode> = {
  // --- INTRO CINEMÁTICA ---
  intro_1: {
    id: "intro_1",
    type: "internal",
    text: "El andén huele a vapor, lluvia limpia y metal húmedo. Miles de personas pasan de largo, con prisas, arrastrando maletas pesadas hacia destinos lejanos. Yo solo quería huir de la rutina de siempre. Llegar a destino, sin complicaciones.",
    background: "estacion_lluvia",
    next: "intro_2"
  },
  intro_2: {
    id: "intro_2",
    type: "internal",
    text: "Apreté mi bolso contra el pecho mientras observaba la pantalla de horarios. El tren de las 12 horas estaba a punto de llegar. Deseaba, con cada fibra de mi ser, que nadie se sentara a mi lado. Quería silencio. Un viaje vacío.",
    background: "estacion_andén",
    next: "intro_3"
  },
  intro_3: {
    id: "intro_3",
    type: "internal",
    text: "De repente, un chirrido metálico. Los frenos del tren resuenan en la gran bóveda de la estación. Una bocanada de vapor cálido empaña los cristales de la parada. El tren de larga distancia se detiene majestuosamente.",
    background: "estacion_tren_llega",
    next: "intro_4"
  },
  intro_4: {
    id: "intro_4",
    type: "internal",
    text: "Subo los peldaños de metal, sintiendo la vibración del motor de la locomotora bajo mis pies. Busco mi asiento: Coche 4, número 22. Junto a la ventana. Perfecto. Dejo mi equipaje arriba, me acomodo y suspiro aliviada mirando el cristal empañado.",
    background: "tren_interior_vacio",
    next: "intro_5"
  },
  intro_5: {
    id: "intro_5",
    type: "dialog",
    speaker: "Desconocido",
    text: "Perdón... disculpa, creo que ese asiento de al lado es el mío. El 21. Si no te importa que pase...",
    expressionFranxito: "Incómodo",
    expressionAranxita: "Sorprendido",
    background: "tren_interior_dia",
    choices: [
      {
        text: "Mover mis piernas hacia atrás con cortesía y sonreír un poco.",
        type: "reaccionar",
        next: "intro_6_reaccionar_amable",
        effects: { affinity: 2, personality: "Divertida" }
      },
      {
        text: "Hacerle espacio en silencio, asintiendo levemente sin mirarlo a los ojos.",
        type: "actuar",
        next: "intro_6_actuar_timido",
        effects: { affinity: 0, personality: "Tímida" }
      },
      {
        text: "—Claro, adelante. Sí, el viaje va a ser largo, mejor acomodarse pronto.",
        type: "responder",
        next: "intro_6_responder_seguro",
        effects: { affinity: 1, personality: "Aventurera" }
      }
    ]
  },

  // --- RESPONDING BRANCHES FROM THE FIRST SEAT MEETING ---
  intro_6_reaccionar_amable: {
    id: "intro_6_reaccionar_amable",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Gracias! Qué desorden de maletas hay afuera. Por un momento pensé que perdería el tren. Soy Franxito, por cierto. Un placer compartir vagón contigo.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    background: "tren_interior_dia",
    next: "intro_conversa_1"
  },
  intro_6_actuar_timido: {
    id: "intro_6_actuar_timido",
    type: "dialog",
    speaker: "Franxito",
    text: "Gracias... (Sonríe un poco tímido, acomodando un bulto ligero de lona en el portaequipajes). Parece que va a ser un viaje muy tranquilo hoy.",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    background: "tren_interior_dia",
    next: "intro_conversa_1"
  },
  intro_6_responder_seguro: {
    id: "intro_6_responder_seguro",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Toda la razón! Doce horas por delante. Yo soy Franxito. Viajo bastante en esta línea, pero hoy el ambiente se siente... diferente, de algún modo agradable.",
    expressionFranxito: "Normal",
    expressionAranxita: "Normal",
    background: "tren_interior_dia",
    next: "intro_conversa_1"
  },

  // --- TRANSITION TO THE MORNING OF CONVERSATION (MAÑANA) ---
  intro_conversa_1: {
    id: "intro_conversa_1",
    type: "internal",
    text: "(El tren arranca suavemente. El paisaje empieza a deslizarse tras mi ventana empañada. El suave balanceo y el rítmico 'clac-clac' de las vías nos envuelven). Franxito saca un termo pequeño y me mira con timidez.",
    background: "tren_interior_dia",
    expressionFranxito: "Pensativo",
    next: "conversa_manana_start"
  },
  conversa_manana_start: {
    id: "conversa_manana_start",
    type: "dialog",
    speaker: "Franxito",
    text: "¿Te molesta si pongo un poco de música instrumental muy bajita? O bueno... si prefieres absoluto silencio, lo entiendo perfectamente. No quiero ser el típico vecino de asiento insoportable.",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    choices: [
      {
        text: "—¡No me molesta en absoluto! Me encanta la música de fondo.",
        type: "responder",
        next: "manana_musica_acepta",
        effects: { affinity: 2, personality: "Curiosa", remember: { key: "gustoMusica", value: "abierta" } }
      },
      {
        text: "(Sacar mis propios auriculares y sonreírle como diciendo 'yo también voy a lo mío').",
        type: "actuar",
        next: "manana_musica_neutral",
        effects: { affinity: 0, personality: "Reserved", remember: { key: "gustoMusica", value: "auriculares" } }
      },
      {
        text: "—Depende de qué estilo sea... Si es jazz o piano, me apunto.",
        type: "responder",
        next: "manana_musica_jazz",
        effects: { affinity: 3, personality: "Reflexiva", remember: { key: "gustoMusica", value: "jazz" } }
      }
    ]
  },

  manana_musica_acepta: {
    id: "manana_musica_acepta",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Estupendo! Es una compilación acústica que hice yo mismo. Me ayuda a calmar los nervios del viaje. Por cierto, ¿viajas por placer o tienes algún asunto urgente en destino?",
    expressionFranxito: "Feliz",
    expressionAranxita: "Normal",
    next: "manana_charla_destino"
  },
  manana_musica_neutral: {
    id: "manana_musica_neutral",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Ah, bien pensado! Nada como aislarse un poco del mundo en un tren largo. Bueno, de todas formas... si necesitas que baje el tono o cualquier cosa, me avisas. Iré leyendo un rato.",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    next: "manana_charla_destino"
  },
  manana_musica_jazz: {
    id: "manana_musica_jazz",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Vaya, qué buen gusto! Es exactamente jazz suave con piano lo que tenía puesto. Un álbum clásico precioso. Parece que este viaje ya empieza de maravilla.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    next: "manana_charla_destino"
  },

  manana_charla_destino: {
    id: "manana_charla_destino",
    type: "dialog",
    speaker: "Franxito",
    text: "A mí me gusta viajar porque siento que el tiempo en el tren no pertenece a la vida real. Es como una burbuja flotando entre la salida y la llegada. ¿Tú también sientes que estás escapando un poco hoy?",
    expressionFranxito: "Nostálgico",
    choices: [
      {
        text: "—La verdad es que sí... Necesitaba un escape de la rutina pesada.",
        type: "responder",
        next: "manana_escapar_si",
        effects: { affinity: 2, personality: "Reflexiva", remember: { key: "motivoViaje", value: "escape" } }
      },
      {
        text: "—No realmente, solo voy a visitar a unos familiares/amigos.",
        type: "responder",
        next: "manana_escapar_no",
        effects: { affinity: 1, personality: "Reservada", remember: { key: "motivoViaje", value: "visita" } }
      },
      {
        text: "Reírte suavemente y encogerte de hombros de manera misteriosa.",
        type: "reaccionar",
        next: "manana_escapar_misterio",
        effects: { affinity: 2, personality: "Divertida", remember: { key: "motivoViaje", value: "misterio" } }
      }
    ]
  },

  manana_escapar_si: {
    id: "manana_escapar_si",
    type: "dialog",
    speaker: "Franxito",
    text: "Te entiendo tanto. El trabajo, el teléfono que no para de sonar, las expectativas ajenas... En fin, un brindis imaginario con agua mineral por los que huimos a tiempo.",
    expressionFranxito: "Divertido",
    expressionAranxita: "Divertido",
    next: "manana_pregunta_comida"
  },
  manana_escapar_no: {
    id: "manana_escapar_no",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Ah! Qué bien. Visitar gente siempre es agradable. Espero que no te canse demasiado el trayecto. A veces las 12 horas pesan un poco en los huesos.",
    expressionFranxito: "Normal",
    expressionAranxita: "Normal",
    next: "manana_pregunta_comida"
  },
  manana_escapar_misterio: {
    id: "manana_escapar_misterio",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Guau, una viajera misteriosa! Eso le da mucha más clase a la novela de misterio que me estoy imaginando en mi cabeza en este momento.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Feliz",
    next: "manana_pregunta_comida"
  },

  manana_pregunta_comida: {
    id: "manana_pregunta_comida",
    type: "dialog",
    speaker: "Franxito",
    text: "Por cierto, he traído un par de dulces caseros que cociné ayer. Bueno, decir 'cociné' es un cumplido para mí mismo, pero son de chocolate. ¿Cuál es tu debilidad dulce o comida favorita absoluta para viajar?",
    expressionFranxito: "Feliz",
    choices: [
      {
        text: "—El chocolate, definitivamente. ¿Y lo preparaste tú?",
        type: "responder",
        next: "manana_comida_save_chocolate",
        effects: { affinity: 3, personality: "Divertida", remember: { key: "comidaFav", value: "chocolate" } }
      },
      {
        text: "—Prefiero algo salado, como patatas fritas o cacahuetes.",
        type: "responder",
        next: "manana_comida_save_salado",
        effects: { affinity: 1, personality: "Inteligente", remember: { key: "comidaFav", value: "salado" } }
      },
      {
        text: "—Cualquier cosa que lleve fruta fresca o mermelada.",
        type: "responder",
        next: "manana_comida_save_fruta",
        effects: { affinity: 2, personality: "Curiosa", remember: { key: "comidaFav", value: "fruta" } }
      }
    ]
  },

  manana_comida_save_chocolate: {
    id: "manana_comida_save_chocolate",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Punto para mí! (Me extiende uno alegremente). Sí, los hice yo. Bueno, quemé una bandeja primero, pero estos sobrevivieron al juicio del horno.",
    expressionFranxito: "Divertido",
    expressionAranxita: "Feliz",
    next: "mediodia_transition"
  },
  manana_comida_save_salado: {
    id: "manana_comida_save_salado",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Oh, el bando de lo salado! Sabia elección para evitar el dolor de estómago. Lástima, tendré que comerme los dulces yo solo... más para mí.",
    expressionFranxito: "Divertido",
    expressionAranxita: "Divertido",
    next: "mediodia_transition"
  },
  manana_comida_save_fruta: {
    id: "manana_comida_save_fruta",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Qué sano y refrescante! Yo soy un desastre con la fruta, siempre compro de más y se me olvida en el refrigerador hasta que muta. Tienes buenos hábitos de viaje.",
    expressionFranxito: "Normal",
    expressionAranxita: "Normal",
    next: "mediodia_transition"
  },

  // --- MEDIODÍA (HOUR 3-4) ---
  mediodia_transition: {
    id: "mediodia_transition",
    type: "internal",
    text: "Las horas transcurren con el sutil vaivén del compartimento. El sol de mediodía brilla alto iluminando los campos verdes, aunque algunas nubes grises asoman tímidas en el horizonte. La luz inunda el tren y el barullo en el pasillo aumenta ligeramente, recordándonos que el mundo sigue ahí afuera.",
    background: "tren_interior_mediodia",
    next: "mediodia_start",
    effects: { timeChange: "Mediodía", hourCost: 3 }
  },
  mediodia_start: {
    id: "mediodia_start",
    type: "dialog",
    speaker: "Franxito",
    text: "A mediodía siempre parece que el vagón despierta un poco más. ¿Ves a esa señora de tres filas más adelante? Lleva tejiendo la misma bufanda desde que subimos. Me pregunto si los trenes inspiran a las personas a terminar sus proyectos o a abandonarse a la pereza silenciosa.",
    expressionFranxito: "Pensativo",
    expressionAranxita: "Normal",
    choices: [
      {
        text: "—A mí me inspiran a ponerme nostálgica, como si fuera una película.",
        type: "responder",
        next: "mediodia_filosofar_cine",
        effects: { affinity: 2, personality: "Reflexiva", remember: { key: "pasatiempo", value: "cine" } }
      },
      {
        text: "—Suelo abandonarme de lleno a la pereza. Dormir es mi deporte favorito del tren.",
        type: "responder",
        next: "mediodia_filosofar_dormir",
        effects: { affinity: 3, personality: "Divertida", remember: { key: "pasatiempo", value: "dormir" } }
      },
      {
        text: "Sacar tu propio cuaderno de notas para dibujar o apuntar algo pensativamente.",
        type: "actuar",
        next: "mediodia_filosofar_escribir",
        effects: { affinity: 2, personality: "Inteligente", remember: { key: "pasatiempo", value: "escribir" } }
      }
    ]
  },

  mediodia_filosofar_cine: {
    id: "mediodia_filosofar_cine",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Absolutamente! Con la banda sonora de fondo, el cristal mostrando un lienzo cambiante de nubes y bosques... Eres una romántica de los viajes, Aranxita. Eso me agrada.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    next: "mediodia_pregunta_clima"
  },
  mediodia_filosofar_dormir: {
    id: "mediodia_filosofar_dormir",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Jajaja! El legendario arte del sopor ferroviario. Te envidio muchísimo. Yo soy incapaz de cerrar los ojos sin pensar en si nos pasaremos de parada pase lo que pase.",
    expressionFranxito: "Divertido",
    expressionAranxita: "Divertido",
    next: "mediodia_pregunta_clima"
  },
  mediodia_filosofar_escribir: {
    id: "mediodia_filosofar_escribir",
    type: "dialog",
    speaker: "Franxito",
    text: "¿Ah, dibujas o escribes? ¡Qué increíble! Siempre he admirado a los que pueden trasladar sus pensamientos a un papel en pleno movimiento. Yo solo sé hacer garabatos amorfos.",
    expressionFranxito: "Sorprendido",
    expressionAranxita: "Normal",
    next: "mediodia_pregunta_clima"
  },

  mediodia_pregunta_clima: {
    id: "mediodia_pregunta_clima",
    type: "dialog",
    speaker: "Franxito",
    text: "¿Has visto el cielo? El clima está cambiando muy rápido. Me encanta cuando el clima se pone un poco drástico, hace que el interior del tren se sienta aún más seguro y cálido. ¿A ti qué tipo de clima te conforta más en momentos así?",
    expressionFranxito: "Normal",
    choices: [
      {
        text: "—Me encanta la lluvia pesada y la tormenta. Golpear el cristal.",
        type: "responder",
        next: "mediodia_clima_lluvia",
        effects: { weather: "Lluvia", affinity: 2, personality: "Romántica" }
      },
      {
        text: "—Un atardecer despejado y un sol radiante que entibie el aire.",
        type: "responder",
        next: "mediodia_clima_sol",
        effects: { weather: "Sol", affinity: 1, personality: "Aventurera" }
      },
      {
        text: "—La nieve cayendo en silencio. Todo se vuelve blanco.",
        type: "responder",
        next: "mediodia_clima_nieve",
        effects: { weather: "Nieve", affinity: 3, personality: "Tímida" }
      },
      {
        text: "—La niebla espesa, como si flotáramos sobre las nubes.",
        type: "responder",
        next: "mediodia_clima_niebla",
        effects: { weather: "Niebla", affinity: 2, personality: "Reflexiva" }
      }
    ]
  },

  mediodia_clima_lluvia: {
    id: "mediodia_clima_lluvia",
    type: "dialog",
    speaker: "Franxito",
    text: "A juego con las gotas de antes. Mira (apunta con el dedo), ya empiezan a deslizarse pequeños ríos de agua por el cristal. Es hipnotizante.",
    expressionFranxito: "Pensativo",
    expressionAranxita: "Pensativo",
    next: "parada_1_transition"
  },
  mediodia_clima_sol: {
    id: "mediodia_clima_sol",
    type: "dialog",
    speaker: "Franxito",
    text: "El optimismo de la luz dorada. Realmente llena de energía el vagón. Hace que den ganas de salir a correr por las laderas verdes que dejamos atrás.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Normal",
    next: "parada_1_transition"
  },
  mediodia_clima_nieve: {
    id: "mediodia_clima_nieve",
    type: "dialog",
    speaker: "Franxito",
    text: "La nieve... silencia el mundo entero. Hizo que recordara una infancia libre de preocupaciones, construyendo fortalezas heladas que caían al día siguiente.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Pensativo",
    next: "parada_1_transition"
  },
  mediodia_clima_niebla: {
    id: "mediodia_clima_niebla",
    type: "dialog",
    speaker: "Franxito",
    text: "Un misterioso mar blanco. El tren se abre paso como un fantasma de hierro. Le confiere una calma casi mística a esta cabina, ¿verdad?",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    next: "parada_1_transition"
  },

  // --- TARDE: ESTACIÓN PEQUEÑA (HOUR 5-6) ---
  parada_1_transition: {
    id: "parada_1_transition",
    type: "internal",
    text: "El tren disminuye la marcha progresivamente. Los altavoces interiores carraspean con un sonido metálico. 'Próxima parada: Estación de San Miguel. Parada de diez minutos'. Miro de reojo a Franxito. Parece cansado pero sus ojos brillan con curiosidad.",
    background: "tren_interior_tarde",
    next: "parada_1_start",
    effects: { timeChange: "Tarde", hourCost: 2 }
  },
  parada_1_start: {
    id: "parada_1_start",
    type: "dialog",
    speaker: "Franxito",
    text: "Bueno, San Miguel es una estación pequeña preciosa. Suelen vender un chocolate caliente exquisito en un pequeño quiosco del andén, o café de grano molido. ¿Me acompañas a estirar las piernas y tomar algo caliente, o prefieres esperarme aquí resguardada?",
    expressionFranxito: "Normal",
    choices: [
      {
        text: "—¡Te acompaño! Me vendrá genial respirar un poco de aire fresco.",
        type: "actuar",
        next: "parada_1_acompana",
        effects: { affinity: 3, personality: "Aventurera", remember: { key: "accionParada1", value: "juntos" } }
      },
      {
        text: "—Mejor te espero aquí, pero... ¿me traerías un café o té si no es molestia?",
        type: "responder",
        next: "parada_1_pide_bebida",
        effects: { affinity: 2, personality: "Tímida", remember: { key: "accionParada1", value: "encargo" } }
      },
      {
        text: "—Prefiero quedarme leyendo un rato en el asiento solitario, gracias.",
        type: "actuar",
        next: "parada_1_sola",
        effects: { affinity: 0, personality: "Reservada", remember: { key: "accionParada1", value: "sola" } }
      }
    ]
  },

  parada_1_acompana: {
    id: "parada_1_acompana",
    type: "dialog",
    speaker: "Franxito",
    text: "(Bajamos juntos. El aire fresco de la tarde nos golpea la cara de golpe, huele a tierra mojada bajo la luz dorada). Aquí tienes, un chocolate bien espeso. Está increíblemente caliente. Cuidado no te quemes, Aranxita.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Normal",
    background: "estacion_andén_tarde",
    next: "parada_1_conclusio"
  },
  parada_1_pide_bebida: {
    id: "parada_1_pide_bebida",
    type: "dialog",
    speaker: "Franxito",
    text: "(Cinco minutos después, Franxito regresa sonriendo con dos vasos humeantes de cartón). Te he traído un café cremoso especial. Pensé que te gustaría. ¡Ojalá haya acertado con el azúcar!",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    background: "tren_interior_tarde",
    next: "parada_1_conclusio"
  },
  parada_1_sola: {
    id: "parada_1_sola",
    type: "dialog",
    speaker: "Franxito",
    text: "(Regresa justo antes de que las puertas se cierren automáticamente, sacudiéndose un poco el pelo). Todo un acierto quedarte aquí calientita, soplaba un viento bastante helado ahí fuera. Te he traído un bombón del puesto de todas formas, para amenizar el viaje.",
    expressionFranxito: "Normal",
    expressionAranxita: "Sorprendido",
    background: "tren_interior_tarde",
    next: "parada_1_conclusio"
  },

  parada_1_conclusio: {
    id: "parada_1_conclusio",
    type: "internal",
    text: "El tren arranca de nuevo. Con la tarde asentándose, la conversación fluye de manera mucho más natural. Su risa, que al principio me parecía ajena, ahora me dibuja una sonrisa involuntaria.",
    background: "tren_interior_tarde",
    next: "atardecer_transition"
  },

  // --- ATARDECER: EL MOMENTO ÍNTIMO (HOUR 7-8) ---
  atardecer_transition: {
    id: "atardecer_transition",
    type: "internal",
    text: "El vagón se sumerge en una luz ámbar profunda. El sol empieza a ocultarse tras las montañas y colinas distantes, tiñendo el cielo de naranjas encendidos, púrpuras y rosas. Es una quietud hermosa que amortigua todo el ruido. Un silencio cómodo se asienta sobre nosotros antes de que Franxito vuelva a mirarme de frente.",
    background: "tren_interior_atardecer",
    next: "atardecer_start",
    effects: { timeChange: "Atardecer", hourCost: 2 }
  },
  atardecer_start: {
    id: "atardecer_start",
    type: "dialog",
    speaker: "Franxito",
    text: "Qué atardecer tan espectacular... Siempre me pongo un poco reflexivo a esta hora. Siento que es el momento en que las máscaras caen. Dime, Aranxita... ¿qué es lo que más te asusta o te quita el sueño en la rutina diaria? Si no es demasiado atrevido preguntar.",
    expressionFranxito: "Pensativo",
    expressionAranxita: "Normal",
    choices: [
      {
        text: "—Me aterra la rutina eterna, la sensación de estar estancada en el mismo sitio.",
        type: "responder",
        next: "atardecer_miedo_save_rutina",
        effects: { affinity: 3, personality: "Aventurera", remember: { key: "miedoAranxita", value: "rutina" } }
      },
      {
        text: "—El miedo a la soledad absoluta, a no encontrar una conexión sincera.",
        type: "responder",
        next: "atardecer_miedo_save_soledad",
        effects: { affinity: 4, personality: "Romántica", remember: { key: "miedoAranxita", value: "soledad" } }
      },
      {
        text: "—El fracaso, decepcionar a las personas que confían en mí.",
        type: "responder",
        next: "atardecer_miedo_save_fracaso",
        effects: { affinity: 2, personality: "Inteligente", remember: { key: "miedoAranxita", value: "fracaso" } }
      },
      {
        text: "Evitar la pregunta con una voz suave: —A veces, me asusta el propio futuro incierto.",
        type: "reaccionar",
        next: "atardecer_miedo_save_futuro",
        effects: { affinity: 1, personality: "Tímida", remember: { key: "miedoAranxita", value: "futuro" } }
      }
    ]
  },

  atardecer_miedo_save_rutina: {
    id: "atardecer_miedo_save_rutina",
    type: "dialog",
    speaker: "Franxito",
    text: "El estancamiento constante... Sí, es espantoso. Ver cómo los días se copian unos a otros sin alma. Por eso este tren significa tanto para ti hoy, ¿verdad? Un corte definitivo en la rutina.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Pensativo",
    next: "atardecer_franco_comparte"
  },
  atardecer_miedo_save_soledad: {
    id: "atardecer_miedo_save_soledad",
    type: "dialog",
    speaker: "Franxito",
    text: "La soledad... Estar rodeado de gente pero no ser visto por nadie. Lo entiendo perfectamente. (Su mirada descansa un instante largo en mis ojos). Pero hoy... hoy no te sientes tan sola, ¿verdad?",
    expressionFranxito: "Sonrojado",
    expressionAranxita: "Sonrojado",
    next: "atardecer_franco_comparte"
  },
  atardecer_miedo_save_fracaso: {
    id: "atardecer_miedo_save_fracaso",
    type: "dialog",
    speaker: "Franxito",
    text: "El peso de las expectativas ajenas. Es una mochila muy pesada que no elegimos cargar. A veces hay que permitirse caer, Aranxita, solo para recordar que el suelo no es el fin del mundo.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Pensativo",
    next: "atardecer_franco_comparte"
  },
  atardecer_miedo_save_futuro: {
    id: "atardecer_miedo_save_futuro",
    type: "dialog",
    speaker: "Franxito",
    text: "La incertidumbre... no saber qué vendrá tras la siguiente Estación. Da vértigo, es verdad. Pero mira este tren, avanza en la oscuridad sin ver las vías lejanas, confiando en que el camino está ahí.",
    expressionFranxito: "Pensativo",
    expressionAranxita: "Pensativo",
    next: "atardecer_franco_comparte"
  },

  atardecer_franco_comparte: {
    id: "atardecer_franco_comparte",
    type: "dialog",
    speaker: "Franxito",
    text: "Yo... por mi parte, tengo pavor a volverme una persona cínica. A perder la capacidad de sorprenderme por las pequeñas cosas, como un viaje compartido con una perfecta desconocida que resulta ser maravillosa.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Sonrojado",
    choices: [
      {
        text: "—No pareces alguien cínico en absoluto. Al revés, eres muy cálido.",
        type: "responder",
        next: "atardecer_halago_franco",
        effects: { affinity: 3, personality: "Divertida" }
      },
      {
        text: "Sonreír tímidamente y apartar la mirada disimuladamente hacia el paisaje.",
        type: "reaccionar",
        next: "atardecer_timidez_franco",
        effects: { affinity: 2, personality: "Tímida" }
      },
      {
        text: "—¿Y qué pequeños sueños tienes para evitar ese cinismo?",
        type: "responder",
        next: "atardecer_sueños_franco",
        effects: { affinity: 3, personality: "Curiosa", remember: { key: "interesSueño", value: "sueños" } }
      }
    ]
  },

  atardecer_halago_franco: {
    id: "atardecer_halago_franco",
    type: "dialog",
    speaker: "Franxito",
    text: "Gracias, Aranxita. No sabes lo bien que me sienta oír eso. (Se rasca la nuca, un poco avergonzado pero muy feliz). A veces dudo de mí mismo más de lo que muestro.",
    expressionFranxito: "Sonrojado",
    expressionAranxita: "Normal",
    next: "noche_transition"
  },
  atardecer_timidez_franco: {
    id: "atardecer_timidez_franco",
    type: "dialog",
    speaker: "Franxito",
    text: "(Se produce un breve silencio dorado. Las sombras se estiran sobre la tapicería del vagón. Percibo que está sonriendo dulcemente al verme reaccionar de esa manera).",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    next: "noche_transition"
  },
  atardecer_sueños_franco: {
    id: "atardecer_sueños_franco",
    type: "dialog",
    speaker: "Franxito",
    text: "Mi gran sueño... es construir una pequeña casa de madera cerca de un lago, tener mi propio jardín botánico y vivir escribiendo cuentos que nadie publique. Un poco ingenuo, supongo.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Pensativo",
    next: "noche_transition"
  },

  // --- NOCHE: LA ESTACIÓN GRANDE Y MEMORIAS (HOUR 9-10) ---
  noche_transition: {
    id: "noche_transition",
    type: "internal",
    text: "La oscuridad total se traga el paisaje campestre. Solo se vislumbran pequeños puntos de luz intermitentes a lo lejos: pueblos remotos y estrellas solitarias. Las luces de lectura individuales del vagón se encienden, creando rincones íntimos de penumbra cálida. El mundo duerme. Solo quedamos nosotros dos charlando en voz baja de nuestras cosas.",
    background: "tren_interior_noche",
    next: "noche_start",
    effects: { weather: "Noche Estrellada", timeChange: "Noche", hourCost: 2 }
  },
  noche_start: {
    id: "noche_start",
    type: "dialog",
    speaker: "Franxito",
    text: "El tren está entrando en la Estación Central del Este. Estaremos parados 20 minutos completos. Es una estación enorme con un lucernario antiguo de hierro impresionante. ¿Quieres bajar a explorar las vías vacías conmigo o prefieres que charlemos al resguardo nocturno de la cabina?",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    choices: [
      {
        text: "—Vamos a caminar por la plataforma fría. Me apetece explorar la noche contigo.",
        type: "actuar",
        next: "noche_parada_caminar",
        effects: { affinity: 4, personality: "Aventurera", remember: { key: "accionParada2", value: "caminar" } }
      },
      {
        text: "—Prefiero que nos quedemos aquí compartiendo secretos en la intimidad.",
        type: "actuar",
        next: "noche_parada_quedar",
        effects: { affinity: 3, personality: "Romántica", remember: { key: "accionParada2", value: "quedar" } }
      },
      {
        text: "—Podríamos comprar algo dulce para comer mientras vemos pasar los furgones de carga.",
        type: "responder",
        next: "noche_parada_comer",
        effects: { affinity: 3, personality: "Reflexiva", remember: { key: "accionParada2", value: "comer" } }
      }
    ]
  },

  noche_parada_caminar: {
    id: "noche_parada_caminar",
    type: "dialog",
    speaker: "Franxito",
    text: "(El andén está desierto y la niebla nocturna flota suavemente. Damos pasos lentos. Aprieto mis manos en los bolsillos para calentarme). Qué bonita es la arquitectura industrial bajo los focos de vapor... Me encanta este silencio de medianoche.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Pensativo",
    background: "estacion_andén_noche",
    next: "noche_memoria_trigger"
  },
  noche_parada_quedar: {
    id: "noche_parada_quedar",
    type: "dialog",
    speaker: "Franxito",
    text: "Tienes razón... Estar aquí arrinconados con las luces bajas se siente como estar en el fin del universo. Nadie nos busca aquí dentro, somos invisibles por unas horas.",
    expressionFranxito: "Feliz",
    expressionAranxita: "Sonrojado",
    background: "tren_interior_noche",
    next: "noche_memoria_trigger"
  },
  noche_parada_comer: {
    id: "noche_parada_comer",
    type: "dialog",
    speaker: "Franxito",
    text: "¡Jaja, un gran plan goloso nocturno! (Conseguimos unos dónuts glaseados y los comemos sentados al borde del andén vacío). Qué placer tan culposo comer azúcar de madrugada.",
    expressionFranxito: "Divertido",
    expressionAranxita: "Divertido",
    background: "estacion_andén_noche",
    next: "noche_memoria_trigger"
  },

  noche_memoria_trigger: {
    id: "noche_memoria_trigger",
    type: "dialog",
    speaker: "Franxito",
    text: "Sabes... he estado pensando en lo que compartiste antes. Dijiste que tu debilidad era el chocolate y que te asustaba mucho esa soledad/rutina de siempre. Es curioso cómo en unas pocas horas he llegado a comprenderte de un modo tan dulce.",
    expressionFranxito: "Nostálgico",
    expressionAranxita: "Sonrojado",
    next: "noche_pregunta_profunda"
  },
  noche_pregunta_profunda: {
    id: "noche_pregunta_profunda",
    type: "dialog",
    speaker: "Franxito",
    text: "Si al bajarnos de este tren resultara que el destino tiene planes distintos para cada uno... ¿crees que te acordarías de este viaje nocturno en los años venideros? ¿O seré solo una anécdota difusa de tren para ti, Aranxita?",
    expressionFranxito: "Nostálgico",
    choices: [
      {
        text: "—Jamás te olvidaría, Franxito. Has significado algo real en un día gris.",
        type: "responder",
        next: "noche_respuesta_emocion",
        effects: { affinity: 5, personality: "Romántica" }
      },
      {
        text: "—Serás una lección bonita. No todas las conexiones humanas son para siempre, pero sí valiosas.",
        type: "responder",
        next: "noche_respuesta_realista",
        effects: { affinity: 2, personality: "Reflexiva" }
      },
      {
        text: "(Apoyar lentamente mi cabeza sobre su hombro sin decir nada, dejando que el silencio responda).",
        type: "actuar",
        next: "noche_respuesta_hombro",
        effects: { affinity: 6, personality: "Tímida" }
      }
    ]
  },

  noche_respuesta_emocion: {
    id: "noche_respuesta_emocion",
    type: "dialog",
    speaker: "Franxito",
    text: "Yo tampoco te olvidaré. Me has removido cosas por dentro que creía apagadas por la rutina cotidiana de la gran ciudad. Gracias por cruzar a mi asiento hoy.",
    expressionFranxito: "Sonrojado",
    expressionAranxita: "Sonrojado",
    background: "tren_interior_noche",
    next: "madrugada_transition"
  },
  noche_respuesta_realista: {
    id: "noche_respuesta_realista",
    type: "dialog",
    speaker: "Franxito",
    text: "Tienes una madurez increíble. Sí, los encuentros efímeros tienen su propia poesía trágica. Aceptamos el presente tal como es, sin forzar futuros de fantasía.",
    expressionFranxito: "Normal",
    expressionAranxita: "Pensativo",
    background: "tren_interior_noche",
    next: "madrugada_transition"
  },
  noche_respuesta_hombro: {
    id: "noche_respuesta_hombro",
    type: "dialog",
    speaker: "Franxito",
    text: "(Siento cómo su respiración se acelera levemente y apoya suavemente su cabeza contra la mía, entrelazando tímidamente sus dedos de la mano con los míos. El calor es absoluto).",
    expressionFranxito: "Sonrojado",
    expressionAranxita: "Sonrojado",
    background: "tren_interior_noche",
    next: "madrugada_transition"
  },

  // --- MADRUGADA: CUENTA REGRESIVA METAFÓRICA (HOUR 11-12) ---
  madrugada_transition: {
    id: "madrugada_transition",
    type: "internal",
    text: "La última fase del largo viaje se cierne sobre nosotros. Una neblina fría de madrugada enturbia las ventanas exteriores. Las luces de la cabina titilan como estrellas cansadas. Faltan apenas unos minutos para llegar a la Estación Terminal. Siento una tensión melancólica insoportable en el pecho.",
    background: "tren_interior_madrugada",
    next: "madrugada_start",
    effects: { timeChange: "Madrugada", hourCost: 2 }
  },
  madrugada_start: {
    id: "madrugada_start",
    type: "dialog",
    speaker: "Franxito",
    text: "Quedan apenas unos pocos kilómetros. El tren va perdiendo velocidad sigilosamente. Pronto abrirán las compuertas y el bullicio de la ciudad devorará todo lo que hemos construido en este rincón de acero y madera. Aranxita... ha sido un trayecto increíble. ¿Cómo te gustaría que terminara nuestra historia hoy?",
    expressionFranxito: "Nostálgico",
    choices: [
      {
        text: "—No hagamos promesas. Dejemos que acabe aquí de manera perfecta, como un sueño hermoso.",
        type: "responder",
        next: "final_evaluar_sueño",
        effects: { affinity: 2, personality: "Reflexiva" }
      },
      {
        text: "—Quiero seguir conociéndote. Toma mi número de teléfono. Llámame en cuanto llegues.",
        type: "responder",
        next: "final_evaluar_numero",
        effects: { affinity: 5, personality: "Aventurera" }
      },
      {
        text: "—Me asusta despedirme... ¿y si bajamos juntos en un andén intermedio y cambiamos de rumbo hoy?",
        type: "responder",
        next: "final_evaluar_huida",
        effects: { affinity: 6, personality: "Aventurera", achievementId: "viaje_eterno" }
      },
      {
        text: "(Permitir un último abrazo apretado y susurrarle al oído: 'Búscame siempre en tus recuerdos').",
        type: "reaccionar",
        next: "final_evaluar_abrazo",
        effects: { affinity: 4, personality: "Romántica" }
      },
      {
        text: "Separarte poco a poco en silencio absoluto y mirar fijamente por la ventana rota de nostalgia.",
        type: "actuar",
        next: "final_evaluar_silencio",
        effects: { affinity: 0, personality: "Reservada" }
      }
    ]
  },

  // --- INTERMEDIATE EVALUATORS FOR MULTIPLE PATHS AND DETERMINING THE 15 DISTINCT ENDINGS ---
  final_evaluar_sueño: {
    id: "final_evaluar_sueño",
    type: "internal",
    text: "Evalúo mis propios deseos íntimos frente a la neblina invernal del vagón de madrugada. Elegir que esta conexión viva siempre intacta en el santuario de la memoria, sin la mancha del desgaste diario del futuro...",
    next: "route_sueño_determinar"
  },
  final_evaluar_numero: {
    id: "final_evaluar_numero",
    type: "internal",
    text: "Prefiero arriesgarme. Darle mi contacto escrito a mano en un boleto usado de tren, con mis latidos a flor de piel. Cruzando los dedos bajo mi abrigo ancho...",
    next: "route_numero_determinar"
  },
  final_evaluar_huida: {
    id: "final_evaluar_huida",
    type: "internal",
    text: "Un impulso de locura absoluta en el andén intermedio antes de la gran terminal. La idea irracional de huir juntos de este tren y tomar otra dirección desconocida...",
    next: "route_huida_determinar"
  },
  final_evaluar_abrazo: {
    id: "final_evaluar_abrazo",
    type: "internal",
    text: "El aroma a abrigo humeante y su pulso latiendo acelerado contra mi clavícula. Un abrazo suspendido en el aire frío de la madrugada que desafía la llegada inminente...",
    next: "route_abrazo_determinar"
  },
  final_evaluar_silencio: {
    id: "final_evaluar_silencio",
    type: "internal",
    text: "La frialdad del metal que vuelve a invadir mis venas. Callar y replegarme en mi propia timidez segura de siempre mientras se divisan las luces hostiles de los rascacielos terminales...",
    next: "route_silencio_determinar"
  },

  // --- THE DETERMINISTIC ROUTING LEADING TO THE 15 SPECTACULAR ENDINGS ---
  route_sueño_determinar: {
    id: "route_sueño_determinar",
    type: "internal",
    text: "El tren da una fuerte sacudida hidráulica. El altavoz final ruge sin piedad: 'Estación Terminal. Fin de trayecto'. Franxito asiente despacio con una sonrisa triste, comprendiendo mi decisión táctica de congelar nuestro encuentro sagrado.",
    next: "ending_1_sueño_distancia" // default ending of this branch, or more specific
  },
  route_numero_determinar: {
    id: "route_numero_determinar",
    type: "internal",
    text: "Escribo mis dígitos temblando un poco por el traqueteo final. Nos levantamos tirando de nuestras maletas hacia las puertas correderas automáticas...",
    next: "ending_eval_numero_cond"
  },
  route_huida_determinar: {
    id: "route_huida_determinar",
    type: "internal",
    text: "Nuestros ojos se cruzan desesperadamente mientras el tren se detiene unos segundos en una vía de maniobras intermedia de desvío...",
    next: "ending_eval_huida_cond"
  },
  route_abrazo_determinar: {
    id: "route_abrazo_determinar",
    type: "internal",
    text: "Nos soltamos despacio. Sus manos sujetan mis mejillas un segundo helado bajo las luces mortecinas de salida...",
    next: "ending_eval_abrazo_cond"
  },
  route_silencio_determinar: {
    id: "route_silencio_determinar",
    type: "internal",
    text: "Sin una palabra más, las compuertas se deslizan con estruendo. Los viajeros descienden atropelladamente hacia el andén masificado de la ciudad...",
    next: "ending_eval_silencio_cond"
  },

  // --- FINALS LOGIC EVALUATORS & RESOLUTIONS ---
  // Ends based on values:
  // Let's create endpoints for 15 endings!

  // Branches of Number:
  ending_eval_numero_cond: {
    id: "ending_eval_numero_cond",
    type: "internal",
    text: "Analizando la afinidad construida con Franxito a lo largo del viaje...",
    next: "ending_4_cafe_pendiente" // We'll route them dynamically in the UI code to save file space or represent them here
  },
  ending_eval_huida_cond: {
    id: "ending_eval_huida_cond",
    type: "internal",
    text: "La valentía de dar el salto irracional a lo inesperado...",
    next: "ending_13_viaje_interminable"
  },
  ending_eval_abrazo_cond: {
    id: "ending_eval_abrazo_cond",
    type: "internal",
    text: "El calor humano contra el frío de la intemperie...",
    next: "ending_6_amor_distancia"
  },
  ending_eval_silencio_cond: {
    id: "ending_eval_silencio_cond",
    type: "internal",
    text: "El eco de lo que no fue. La soledad elegida...",
    next: "ending_1_nunca_mas_vieron"
  },

  // ----------------- THE 15 PHYSICAL ENDINGS -----------------
  // ENDING 1: Nunca volvieron a verse (Solo un destello)
  ending_1_nunca_mas_vieron: {
    id: "ending_1_nunca_mas_vieron",
    type: "ending",
    text: "Nuestros caminos se separaron entre el mar de maletas de la terminal metropolitana. Me giré una última vez, buscando su gabardina marrón, pero ya se había esfumado en el gentío. Conservo intacto aquel trayecto, pero nuestras vidas regresaron a sus órbitas paralelas por siempre. Un destello de lo que pudo ser.",
    speaker: "Sistema",
    background: "estacion_andén_noche",
    next: "end_credits"
  },

  // ENDING 2: Los amigos del café de las 5
  ending_2_amigos_cafe: {
    id: "ending_2_amigos_cafe",
    type: "ending",
    text: "No hubo chispas de amor de novela, pero hoy Franxito es mi mejor contacto para intercambiar anécdotas de viajes. Nos enviamos fotos tontas de andenes descuadrados por mensajería cada dos meses y bromeamos sobre las bufandas de punto interminables. Un puente firme de amistad nacido de un asiento fortuito.",
    speaker: "Sistema",
    background: "tren_interior_dia",
    next: "end_credits"
  },

  // ENDING 3: Melodía compartida
  ending_3_melodia_compartida: {
    id: "ending_3_melodia_compartida",
    type: "ending",
    text: "Compartimos un auricular el resto del trayecto nocturno. Al bajar, me prometió enviarme sus listas de música por correo. Cumplió. Hoy, cada vez que escucho ese jazz antiguo con piano, recuerdo su respiración rítmica a mi lado y sé que, en algún vagón oscuro del país, él también comparte acordes.",
    speaker: "Sistema",
    background: "tren_interior_noche",
    next: "end_credits"
  },

  // ENDING 4: Un café pendiente en la ciudad
  ending_4_cafe_pendiente: {
    id: "ending_4_cafe_pendiente",
    type: "ending",
    text: "Escribió 'Café a las 17:00' en mi boleto usado de tren. Tres horas después de bajarme, sonó mi teléfono celular: '¿Sigues libre para esa taza humeante, Aranxita?'. El café de la gran urbe supo dulce, y el viaje de doce horas de ayer se convirtió en el prólogo del primer día de nuestra verdadera historia de amor.",
    speaker: "Sistema",
    background: "estacion_andén_tarde",
    next: "end_credits"
  },

  // ENDING 5: Una foto en el andén
  ending_5_foto_anden: {
    id: "ending_5_foto_anden",
    type: "ending",
    text: "En una parada grande le reté a hacernos un selfie desastroso e instantáneo con un viejo filtro nostálgico. Quedamos espantosos, riendo a carcajadas con los pelos desordenados por el viento de la estación. Tengo esa foto pegada a mi refrigerador; Franxito sale con un dónut a medio morder y yo con los cachetes sonrojados. El recuerdo vívido del día en que decidimos no ser desconocidos.",
    speaker: "Sistema",
    background: "estacion_andén_tarde",
    next: "end_credits"
  },

  // ENDING 6: Amor en la distancia
  ending_6_amor_distancia: {
    id: "ending_6_amor_distancia",
    type: "ending",
    text: "Vivimos a setecientos kilómetros de distancia y el boleto de tren de ida y vuelta cuesta casi un sueldo entero. Pero no nos importó en absoluto. Nos despedimos llorando contra el pecho del otro prometiendo luchar. Hoy, somos asiduos a los pases de tren del fin de semana, y cada reencuentro en el andén se siente como el final feliz de nuestra propia película.",
    speaker: "Sistema",
    background: "tren_interior_madrugada",
    next: "end_credits"
  },

  // ENDING 7: La llave olvidada (Secret ending)
  ending_7_llave_olvidada: {
    id: "ending_7_llave_olvidada",
    type: "ending",
    text: "Un misterioso llavero de cobre con forma de tren apareció en la profundidad de mi bolso al desempacar. Franxito lo deslizó ahí a escondidas con un papel diminuto: 'La llave de mi casa del lago tardará en construirse, pero quédate con esto para que me la devuelvas en persona el próximo sábado'. Una dulce trampa de la que me declaro gustosa prisionera.",
    speaker: "Sistema",
    background: "estacion_andén_noche",
    next: "end_credits"
  },

  // ENDING 8: El silbido del viento (Nolstalgic farewell)
  ending_8_silbido_viento: {
    id: "ending_8_silbido_viento",
    type: "ending",
    text: "Esa tarde profunda nos vaciamos el alma compartiendo los miedos infantiles y el dolor de los fracasos pasados. Al llegar, nos abrazamos con el alma trémula pero no intercambiamos números. Hay bellezas que solo existen si son efímeras. Él me devolvió la fe en la bondad humana, y yo le regalé un espacio seguro. Nos salvamos el uno al otro en una sola noche de tren.",
    speaker: "Sistema",
    background: "tren_interior_atardecer",
    next: "end_credits"
  },

  // ENDING 9: Promesa bajo la lluvia
  ending_9_promesa_lluvia: {
    id: "ending_9_promesa_lluvia",
    type: "ending",
    text: "La tormenta arreciaba al bajar en la estación húmeda. Franxito abrió un paraguas rojo enorme de lunares gastados y me refugió contra su hombro ancho. Con la lluvia golpeando el lucernario de metal, nos miramos en silencio y prometimos que esta tormenta jamás apagaría los cachetes sonrojados de Aranxita. Sostuvimos las manos calientes bajo el diluvio.",
    speaker: "Sistema",
    background: "estacion_lluvia",
    next: "end_credits"
  },

  // ENDING 10: Bajo la misma constelación
  ending_10_misma_constelacion: {
    id: "ending_10_misma_constelacion",
    type: "ending",
    text: "La noche estrellada de nuestro viaje nocturno dejó paso a una promesa eterna. Nos pasamos horas señalando a Orión y las Pléyades a través del techo de cristal del vagón. Hoy, vivimos bajo la misma constelación compartiendo un piso de techos altos y una ventana desde la que ver pasar las luces parpadeantes de la vía del tren nocturno.",
    speaker: "Sistema",
    background: "tren_interior_noche",
    next: "end_credits"
  },

  // ENDING 11: Chocolate invernal calientito
  ending_11_chocolate_invernal: {
    id: "ending_11_chocolate_invernal",
    type: "ending",
    text: "Nieve densa cubriendo las colinas de destino. Con las caras congeladas y frotándonos los dedos descalzos de los guantes, compartimos la última taza de chocolate espeso en un humilde banco de la cafetería de la terminal ferroviaria. La nieve crujía, pero por dentro ardíamos de alegría cómplice. Fue el invierno más cálido de toda mi juventud.",
    speaker: "Sistema",
    background: "tren_interior_mediodia", // represents cold/snowy scenery
    next: "end_credits"
  },

  // ENDING 12: Silencio cómplice (Handwritten note)
  ending_12_silencio_complice: {
    id: "ending_12_silencio_complice",
    type: "ending",
    text: "Nuestra timidez mutua nos impidió hablar con soltura. Pero nos intercambiamos un diario de bocetos a mitad del trayecto silencioso. Justo antes de bajar, me devolvió el cuaderno con una nota manuscrita: 'Tus silencios son los más hermosos del mundo. ¿Te importaría que hiciéramos otro viaje silencioso el mes que viene?'. A veces, callar une mucho más que las palabras vacías.",
    speaker: "Sistema",
    background: "tren_interior_dia",
    next: "end_credits"
  },

  // ENDING 13: El viaje interminable (Huir juntos)
  ending_13_viaje_interminable: {
    id: "ending_13_viaje_interminable",
    type: "ending",
    text: "Nuestra locura nos empujó a bajarnos tres paradas antes de nuestras terminales de destino programadas. Cambiamos de tren a contrapié en un andén perdido sin mirar el cartel del destino. Hoy, nuestra vida entera es un trayecto continuo de larga distancia: sin domicilio fijo, acumulando historias tontas y kilómetros infinitos. Nos convertimos en la última estación del otro.",
    speaker: "Sistema",
    background: "estacion_andén_tarde",
    next: "end_credits"
  },

  // ENDING 14: Divergencia inevitable
  ending_14_divergencia_inevitable: {
    id: "ending_14_divergencia_inevitable",
    type: "ending",
    text: "Le pedí con timidez educada si podía cambiar de compartimento al mediodía para tener espacio a solas. Él asintió muy comprensivo y cortésmente, trayendo al revisor para hacer el traslado de maletas en paz. Fue un viaje frío e introspectivo para mí, donde aprendí que a veces levantamos barreras tan altas que nadie tiene la oportunidad de salvarnos de nuestra comodidad desolada.",
    speaker: "Sistema",
    background: "tren_interior_vacio",
    next: "end_credits"
  },

  // ENDING 15: Miradas perdidas en el andén terminal
  ending_15_miradas_perdidas: {
    id: "ending_15_miradas_perdidas",
    type: "ending",
    text: "Nos quedamos dormidos exhaustos y acurrucados con los hombros cansados cruzados durante la noche fría. Al despertar de repente por la frenada violenta de la terminal final, salimos con prisas torpes para no perder los objetos personales del equipaje. Cuando logré serenarme entre las de la multitud, ya no estaba allí. El caos urbano me privó de una despedida limpia, grabándome una nostalgia preciosa e inconclusa para siempre.",
    speaker: "Sistema",
    background: "tren_interior_madrugada",
    next: "end_credits"
  },

  end_credits: {
    id: "end_credits",
    type: "internal",
    text: "Gracias por vivir este viaje a bordo de 'Hasta la Última Estación'. Ojalá la calidez de Aranxita y Franxito te acompañe en cada andén y andadura de tu vida real.",
    speaker: "Sistema",
    background: "estacion_andén_noche"
  }
};
