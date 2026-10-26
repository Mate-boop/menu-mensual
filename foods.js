// Tabla de alimentos: valores por 100 g (o por unidad si unit = true).
// cat: pasillo para la lista de la compra. lim: ración máxima baja en FODMAP por toma (g, Monash) cuando la hay.
// cooked: el peso indicado en los platos es ya cocinado/cocido (la lista de la compra lo convierte a crudo con raw).
const FOODS = {
  // Proteínas
  pollo:      { n: "Pechuga de pollo", kcal: 165, p: 31, f: 3.6, c: 0, cat: "Carne y pescado", raw: 1.33 },
  pavo:       { n: "Pechuga de pavo", kcal: 135, p: 30, f: 1.5, c: 0, cat: "Carne y pescado", raw: 1.33 },
  lomo:       { n: "Lomo de cerdo", kcal: 175, p: 29, f: 6.5, c: 0, cat: "Carne y pescado", raw: 1.3 },
  ternera:    { n: "Carne picada de vacuno magra (~10%)", kcal: 217, p: 26, f: 12.5, c: 0, cat: "Carne y pescado", raw: 1.3 },
  solomillo:  { n: "Solomillo/filete de ternera", kcal: 170, p: 30, f: 5.5, c: 0, cat: "Carne y pescado", raw: 1.3 },
  merluza:    { n: "Merluza", kcal: 90, p: 19.5, f: 1.3, c: 0, cat: "Carne y pescado", raw: 1.2 },
  bacalao:    { n: "Bacalao fresco o desalado", kcal: 100, p: 22.5, f: 1, c: 0, cat: "Carne y pescado", raw: 1.2 },
  dorada:     { n: "Dorada o lubina", kcal: 135, p: 23, f: 4.8, c: 0, cat: "Carne y pescado", raw: 1.25 },
  salmon:     { n: "Salmón", kcal: 206, p: 22, f: 13, c: 0, cat: "Carne y pescado", raw: 1.25 },
  gambas:     { n: "Gambas o langostinos pelados", kcal: 99, p: 23, f: 0.8, c: 0.2, cat: "Carne y pescado", raw: 1.15 },
  atun:       { n: "Atún al natural (escurrido)", kcal: 110, p: 25, f: 1, c: 0, cat: "Conservas" },
  sardinas:   { n: "Sardinas en AOVE (escurridas)", kcal: 210, p: 24, f: 12.5, c: 0, cat: "Conservas" },
  huevo:      { n: "Huevos", kcal: 78, p: 6.7, f: 5.4, c: 0.3, cat: "Huevos y lácteos", unit: true },
  claras:     { n: "Claras de huevo (brick)", kcal: 52, p: 11, f: 0.2, c: 0.7, cat: "Huevos y lácteos" },
  jamon:      { n: "Jamón serrano", kcal: 225, p: 31, f: 11, c: 0, cat: "Carne y pescado" },
  pavofiambre:{ n: "Pechuga de pavo en lonchas (>90% carne, sin ajo/cebolla)", kcal: 100, p: 20, f: 1.5, c: 1.5, cat: "Carne y pescado" },
  tofu:       { n: "Tofu firme", kcal: 145, p: 15.5, f: 8.7, c: 2, cat: "Huevos y lácteos" },
  queso:      { n: "Queso curado", kcal: 400, p: 26, f: 33, c: 0.5, cat: "Huevos y lácteos", lim: 40 },
  mozzarella: { n: "Mozzarella sin lactosa", kcal: 250, p: 18, f: 19, c: 1, cat: "Huevos y lácteos", lim: 40 },
  leche:      { n: "Leche semidesnatada sin lactosa (ml)", kcal: 46, p: 3.2, f: 1.6, c: 4.8, cat: "Huevos y lácteos" },
  skyr:       { n: "Yogur proteico/skyr sin lactosa natural", kcal: 62, p: 10.5, f: 0.2, c: 4, cat: "Huevos y lácteos" },
  proteina:   { n: "Proteína de huevo en polvo", kcal: 370, p: 80, f: 1, c: 6, cat: "Despensa" },
  gelatina:   { n: "Gelatina neutra en láminas", kcal: 340, p: 85, f: 0, c: 0, cat: "Despensa" },

  // Hidratos
  arroz:      { n: "Arroz basmati", kcal: 130, p: 2.7, f: 0.3, c: 28, cat: "Despensa", raw: 0.36 },
  pasta:      { n: "Pasta de maíz y arroz", kcal: 155, p: 3, f: 0.8, c: 34, cat: "Despensa", raw: 0.44 },
  quinoa:     { n: "Quinoa", kcal: 120, p: 4.4, f: 1.9, c: 21, cat: "Despensa", raw: 0.38, lim: 155 },
  avena:      { n: "Copos de avena (sin gluten si los toleras mejor)", kcal: 370, p: 13, f: 7, c: 59, cat: "Despensa", lim: 52 },
  polenta:    { n: "Polenta (harina de maíz)", kcal: 70, p: 1.6, f: 0.3, c: 15, cat: "Despensa", raw: 0.2 },
  patata:     { n: "Patata", kcal: 86, p: 1.9, f: 0.1, c: 20, cat: "Fruta y verdura" },
  boniato:    { n: "Boniato", kcal: 90, p: 2, f: 0.1, c: 21, cat: "Fruta y verdura", lim: 75 },
  panespelta: { n: "Pan de masa madre 100% espelta", kcal: 250, p: 9, f: 1.5, c: 49, cat: "Despensa", lim: 52 },
  tortitas:   { n: "Tortitas de arroz o maíz", kcal: 387, p: 8, f: 3, c: 81, cat: "Despensa" },
  galletas:   { n: "Galletas Triple Zero", kcal: 415, p: 7.7, f: 14.5, c: 50, cat: "Despensa" },

  // Fruta
  platano:    { n: "Plátano firme (poco maduro)", kcal: 89, p: 1.1, f: 0.3, c: 21, cat: "Fruta y verdura", lim: 100 },
  kiwi:       { n: "Kiwi verde", kcal: 61, p: 1.1, f: 0.5, c: 12, cat: "Fruta y verdura", lim: 150 },
  pina:       { n: "Piña", kcal: 50, p: 0.5, f: 0.1, c: 12, cat: "Fruta y verdura", lim: 140 },
  naranja:    { n: "Naranja", kcal: 47, p: 0.9, f: 0.1, c: 10, cat: "Fruta y verdura", lim: 130 },
  mandarina:  { n: "Mandarina", kcal: 53, p: 0.8, f: 0.3, c: 12, cat: "Fruta y verdura", lim: 90 },
  fresas:     { n: "Fresas", kcal: 32, p: 0.7, f: 0.3, c: 6, cat: "Fruta y verdura", lim: 65 },
  arandanos:  { n: "Arándanos", kcal: 57, p: 0.7, f: 0.3, c: 12, cat: "Fruta y verdura", lim: 125 },
  limon:      { n: "Limón", kcal: 0, p: 0, f: 0, c: 0, cat: "Fruta y verdura" },

  // Verdura
  calabacin:  { n: "Calabacín", kcal: 17, p: 1.2, f: 0.3, c: 3.1, cat: "Fruta y verdura", lim: 65 },
  berenjena:  { n: "Berenjena", kcal: 25, p: 1, f: 0.2, c: 6, cat: "Fruta y verdura", lim: 75 },
  zanahoria:  { n: "Zanahoria", kcal: 41, p: 0.9, f: 0.2, c: 9.6, cat: "Fruta y verdura" },
  judias:     { n: "Judías verdes", kcal: 31, p: 1.8, f: 0.2, c: 7, cat: "Fruta y verdura", lim: 75 },
  pimiento:   { n: "Pimiento verde", kcal: 20, p: 0.9, f: 0.2, c: 4.6, cat: "Fruta y verdura", lim: 50 },
  pimientorojo:{ n: "Pimiento rojo", kcal: 31, p: 1, f: 0.3, c: 6, cat: "Fruta y verdura", lim: 43 },
  espinacas:  { n: "Espinacas", kcal: 23, p: 2.9, f: 0.4, c: 3.6, cat: "Fruta y verdura" },
  tomate:     { n: "Tomate", kcal: 18, p: 0.9, f: 0.2, c: 3.9, cat: "Fruta y verdura", lim: 65 },
  tamizado:   { n: "Tomate tamizado bajo en sal", kcal: 24, p: 1.3, f: 0.2, c: 4.5, cat: "Conservas", lim: 100 },
  pepino:     { n: "Pepino", kcal: 15, p: 0.7, f: 0.1, c: 3.6, cat: "Fruta y verdura" },
  lechuga:    { n: "Lechuga", kcal: 15, p: 1.4, f: 0.2, c: 2.9, cat: "Fruta y verdura" },
  calabaza:   { n: "Calabaza japonesa (kabocha/potimarrón)", kcal: 35, p: 1, f: 0.1, c: 8, cat: "Fruta y verdura", lim: 75 },
  brocoli:    { n: "Brócoli (solo cabezas)", kcal: 35, p: 2.8, f: 0.4, c: 7, cat: "Fruta y verdura", lim: 75 },
  chirivia:   { n: "Chirivía", kcal: 75, p: 1.2, f: 0.3, c: 18, cat: "Fruta y verdura" },
  canonigos:  { n: "Canónigos o rúcula", kcal: 20, p: 2, f: 0.4, c: 2.5, cat: "Fruta y verdura" },
  cebollino:  { n: "Cebollino o parte verde de cebolleta", kcal: 30, p: 3, f: 0.7, c: 4, cat: "Fruta y verdura" },

  // Grasas y frutos secos
  aove:       { n: "Aceite de oliva virgen extra", kcal: 900, p: 0, f: 100, c: 0, cat: "Despensa" },
  mayonesa:   { n: "Mayonesa (sin ajo)", kcal: 700, p: 1, f: 76, c: 1, cat: "Despensa" },
  nueces:     { n: "Nueces", kcal: 654, p: 15, f: 65, c: 7, cat: "Despensa", lim: 30 },
  cacahuete:  { n: "Crema de cacahuete 100%", kcal: 600, p: 25, f: 50, c: 12, cat: "Despensa", lim: 32 },
  pipas:      { n: "Pipas de calabaza peladas", kcal: 560, p: 30, f: 49, c: 11, cat: "Despensa", lim: 23 },
  chia:       { n: "Semillas de chía", kcal: 490, p: 17, f: 31, c: 8, cat: "Despensa", lim: 24 },
  aceitunas:  { n: "Aceitunas verdes", kcal: 145, p: 1, f: 15, c: 1, cat: "Conservas" },
  cacao:      { n: "Cacao puro en polvo", kcal: 350, p: 21, f: 13, c: 12, cat: "Despensa", lim: 8 },
  sirope:     { n: "Sirope de arce puro", kcal: 260, p: 0, f: 0, c: 67, cat: "Despensa" },
  maicena:    { n: "Maicena (almidón de maíz)", kcal: 350, p: 0.3, f: 0.1, c: 87, cat: "Despensa" }
};

if (typeof module !== "undefined") module.exports = { FOODS };
