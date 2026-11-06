// Rutinas de entreno (4 días). Pesos de partida sacados de los registros de Lyfta; null = calibrar la 1.ª semana.
// Campos: sets, reps [mín, máx], rir, kg de partida, step (subida de peso), rest (descanso en s).
// check: true = calentamiento que solo se marca como hecho. warm: true = series ligeras, sin progresión ni récords.
// No cambies los id: el historial de cada ejercicio se guarda con ellos.
const ROUTINES = {
  push: {
    name: "Push", icon: "🫸", sub: "Pecho, hombro y tríceps",
    ex: [
      { id: "pec-deck", name: "Pec deck (calentamiento)", sets: 2, reps: [15, 20], rir: "3–4", kg: null, step: 2.5, rest: 60, warm: true, note: "Ligero: solo para calentar el pecho, lejos del fallo." },
      { id: "press-inclinado", name: "Press inclinado en multipower", sets: 3, reps: [8, 12], rir: "1–2", kg: 40, step: 2.5, rest: 150 },
      { id: "press-plano", name: "Press plano en multipower", sets: 2, reps: [6, 10], rir: "1–2", kg: 45, step: 2.5, rest: 150 },
      { id: "press-hombro", name: "Press de hombros sentado", sets: 2, reps: [8, 12], rir: "1–2", kg: 17.5, step: 2.5, rest: 120 },
      { id: "aperturas-altas", name: "Aperturas altas en polea (de arriba abajo)", sets: 2, reps: [10, 15], rir: "0–1", kg: 30, step: 2.5, rest: 90, note: "Pecho inferior: lleva las manos hacia la cadera." },
      { id: "elevacion-lateral", name: "Elevación lateral unilateral", sets: 3, reps: [12, 20], rir: "0–1", kg: 10, step: 2, rest: 60, note: "Por brazo, sin balanceo." },
      { id: "triceps-cabeza", name: "Extensión de tríceps por encima de la cabeza (polea)", sets: 3, reps: [10, 15], rir: "0–1", kg: 25, step: 2.5, rest: 90 }
    ]
  },
  pull: {
    name: "Pull", icon: "🫷", sub: "Espalda y bíceps",
    ex: [
      { id: "bandas", name: "Bandas: calentamiento de hombro, pull apart y rotación externa (2 × 12–20)", check: true },
      { id: "jalon", name: "Jalón al pecho", sets: 4, reps: [8, 12], rir: "1–2", kg: 67.5, step: 2.5, rest: 150 },
      { id: "remo-polea", name: "Remo sentado en polea", sets: 3, reps: [8, 12], rir: "1–2", kg: 52.5, step: 2.5, rest: 120 },
      { id: "remo-maquina", name: "Remo en máquina (Lever Seated Row)", sets: 3, reps: [10, 15], rir: "1", kg: 40, step: 2.5, rest: 120, note: "Si tiene apoyo de pecho, úsalo: descarga la lumbar." },
      { id: "face-pull", name: "Face pull de rodillas", sets: 3, reps: [12, 20], rir: "0–1", kg: 47.5, step: 2.5, rest: 60, note: "Codos altos y con control: es para el hombro trasero, no un remo." },
      { id: "curl-predicador", name: "Curl predicador", sets: 3, reps: [8, 12], rir: "0–1", kg: 25, step: 2.5, rest: 90 }
    ]
  },
  legs: {
    name: "Legs", icon: "🦵", sub: "Pierna sin compuestos y lumbar",
    ex: [
      { id: "core", name: "Core: bird dog, bear plank y curl-up (1 serie de cada)", check: true },
      { id: "extension", name: "Extensión de cuádriceps", sets: 4, reps: [10, 15], rir: "0–1", kg: 70, step: 5, rest: 90 },
      { id: "curl-femoral", name: "Curl femoral sentado", sets: 4, reps: [8, 12], rir: "0–1", kg: 45, step: 5, rest: 90 },
      { id: "hip-thrust", name: "Hip thrust en máquina", sets: 3, reps: [8, 12], rir: "1–2", kg: null, step: 5, rest: 120, note: "Aprieta arriba sin arquear la lumbar.",
        alt: { id: "patada-gluteo", name: "Patada de glúteo en polea o máquina", reps: [12, 15], kg: null, step: 2.5, rest: 75, note: "Para los días en que el hip thrust te moleste la lumbar. Peso por pierna." } },
      { id: "aduccion", name: "Aducción en máquina", sets: 2, reps: [12, 15], rir: "1", kg: 45, step: 5, rest: 60 },
      { id: "abduccion", name: "Abducción en máquina", sets: 3, reps: [12, 20], rir: "0–1", kg: 55, step: 5, rest: 60 },
      { id: "gemelos", name: "Gemelos en máquina sentado", sets: 4, reps: [10, 15], rir: "0–1", kg: null, step: 5, rest: 60, note: "Pausa de 1 s abajo, estirando." },
      { id: "hiperextension", name: "Hiperextensión a 45°", sets: 3, reps: [10, 15], rir: "2–3", kg: 0, step: 5, rest: 90, note: "Bajada en 3 s, sin pasar de la línea recta. El peso es el disco que abrazas (0 = sin disco). Nunca al fallo." },
      { id: "bird-dog", name: "Bird dog: 2 × 8 por lado, 5 s arriba", check: true }
    ]
  },
  torso: {
    name: "Torso y brazos", icon: "💪", sub: "Pecho, espalda y brazos (2.ª vez en la semana)",
    ex: [
      { id: "press-inclinado-2", name: "Press inclinado en multipower", sets: 2, reps: [8, 12], rir: "1–2", kg: 40, step: 2.5, rest: 150 },
      { id: "aperturas-altas-2", name: "Aperturas altas en polea (pecho inferior)", sets: 3, reps: [10, 15], rir: "0–1", kg: 30, step: 2.5, rest: 90 },
      { id: "remo-estrecho", name: "Remo con agarre estrecho alterno (máquina)", sets: 3, reps: [10, 12], rir: "1", kg: 47.5, step: 2.5, rest: 120 },
      { id: "jalon-2", name: "Jalón al pecho", sets: 2, reps: [10, 12], rir: "1", kg: 60, step: 2.5, rest: 120 },
      { id: "elevacion-lateral-2", name: "Elevación lateral unilateral", sets: 3, reps: [12, 20], rir: "0–1", kg: 10, step: 2, rest: 60 },
      { id: "curl-martillo", name: "Curl martillo", sets: 3, reps: [10, 15], rir: "0–1", kg: 15, step: 2, rest: 75 },
      { id: "triceps-unilateral", name: "Extensión de tríceps unilateral en polea", sets: 3, reps: [10, 15], rir: "0–1", kg: 30, step: 2.5, rest: 75 },
      { id: "curl-polea", name: "Curl en polea (superserie con el siguiente)", sets: 2, reps: [12, 15], rir: "0–1", kg: null, step: 2.5, rest: 0 },
      { id: "triceps-cuerda", name: "Extensión de tríceps con cuerda", sets: 2, reps: [12, 15], rir: "0–1", kg: null, step: 2.5, rest: 75 }
    ]
  }
};
// Músculo principal (para las series por semana) y nombre en inglés para buscar vídeos de técnica.
// Las fotos (inicio y final) están en img/ex/<id>-0.jpg y -1.jpg, del repositorio libre yuhonas/free-exercise-db (Unlicense).
const EX_INFO = {
  "pec-deck": ["pecho", "pec deck machine fly"], "press-inclinado": ["pecho", "smith machine incline bench press"],
  "press-plano": ["pecho", "smith machine bench press"], "press-hombro": ["hombro", "seated dumbbell shoulder press"],
  "aperturas-altas": ["pecho", "high to low cable fly"], "elevacion-lateral": ["hombro", "one arm dumbbell lateral raise"],
  "triceps-cabeza": ["triceps", "cable overhead triceps extension"], "bandas": ["hombro", "band pull apart external rotation"],
  "jalon": ["espalda", "lat pulldown"], "remo-polea": ["espalda", "seated cable row"], "remo-maquina": ["espalda", "chest supported machine row"],
  "face-pull": ["hombro", "half kneeling cable face pull"], "curl-predicador": ["biceps", "preacher curl"],
  "core": ["core", "bird dog bear plank curl up"], "extension": ["cuadriceps", "leg extension machine"], "curl-femoral": ["femoral", "seated leg curl"],
  "hip-thrust": ["gluteo", "machine hip thrust"], "patada-gluteo": ["gluteo", "cable glute kickback"], "aduccion": ["aductores", "hip adduction machine"],
  "abduccion": ["gluteo", "hip abduction machine"], "gemelos": ["gemelos", "seated calf raise"], "hiperextension": ["lumbar", "45 degree back extension"],
  "bird-dog": ["core", "bird dog exercise"], "remo-estrecho": ["espalda", "alternating seated machine row"], "curl-martillo": ["biceps", "hammer curl"],
  "triceps-unilateral": ["triceps", "single arm cable triceps pushdown"], "curl-polea": ["biceps", "cable biceps curl"], "triceps-cuerda": ["triceps", "rope triceps pushdown"]
};
const EX_IMG = new Set(Object.keys(EX_INFO).filter(k => k !== "bird-dog"));
const MUSCLES = { pecho: "Pecho", espalda: "Espalda", hombro: "Hombro", biceps: "Bíceps", triceps: "Tríceps", cuadriceps: "Cuádriceps", femoral: "Femoral", gluteo: "Glúteo", aductores: "Aductores", gemelos: "Gemelos", lumbar: "Lumbar", core: "Core" };

// Plan por defecto: lunes Push, martes Pull, jueves Legs, viernes Torso y brazos
const DEFAULT_TRAIN_PLAN = { 1: "push", 2: "pull", 4: "legs", 5: "torso" };

if (typeof module !== "undefined") module.exports = { ROUTINES, DEFAULT_TRAIN_PLAN, EX_INFO, EX_IMG, MUSCLES };
