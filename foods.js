// Tabla de alimentos: valores por 100 g (o por unidad si unit = true), revisados contra USDA FoodData Central,
// BEDCA y etiquetas de productos españoles habituales (revisión 2026-10-26).
// c = hidratos disponibles SIN fibra (criterio europeo, como en las etiquetas españolas); fib = fibra.
// Carnes, pescados, huevo y cereales: peso ya cocinado. Fruta, verdura, frutos secos y queso: peso en crudo.
// cat: pasillo para la lista de la compra. lim: ración máxima baja en FODMAP por toma (g, Monash) cuando la hay.
// raw: factor cocinado → crudo/seco para la lista de la compra.
const FOODS = {
  // Proteínas (cocinadas a la plancha/horno, sin piel ni grasa visible)
  pollo:      { n: "Pechuga de pollo", kcal: 165, p: 31, f: 3.6, c: 0, cat: "Carne y pescado", raw: 1.33 },
  pavo:       { n: "Pechuga de pavo", kcal: 136, p: 29.5, f: 2, c: 0, cat: "Carne y pescado", raw: 1.33 },
  lomo:       { n: "Lomo de cerdo (cinta, sin grasa visible)", kcal: 205, p: 28.5, f: 9.5, c: 0, cat: "Carne y pescado", raw: 1.3 },
  ternera:    { n: "Carne picada de vacuno magra (~10%)", kcal: 217, p: 26, f: 11.8, c: 0, cat: "Carne y pescado", raw: 1.3 },
  solomillo:  { n: "Filete magro de ternera", kcal: 180, p: 28.5, f: 7, c: 0, cat: "Carne y pescado", raw: 1.3 },
  merluza:    { n: "Merluza", kcal: 95, p: 20, f: 1.5, c: 0, cat: "Carne y pescado", raw: 1.2 },
  bacalao:    { n: "Bacalao fresco o desalado", kcal: 105, p: 22.8, f: 0.9, c: 0, cat: "Carne y pescado", raw: 1.2 },
  dorada:     { n: "Dorada o lubina (en filetes)", kcal: 155, p: 25, f: 6, c: 0, cat: "Carne y pescado", raw: 1.25 },
  salmon:     { n: "Salmón", kcal: 206, p: 22, f: 12.4, c: 0, cat: "Carne y pescado", raw: 1.25 },
  gambas:     { n: "Gambas o langostinos pelados", kcal: 99, p: 24, f: 0.3, c: 0.2, cat: "Carne y pescado", raw: 1.15 },
  atun:       { n: "Atún al natural (escurrido)", kcal: 100, p: 23.5, f: 0.8, c: 0, cat: "Conservas" },
  sardinas:   { n: "Sardinas en AOVE (escurridas)", kcal: 210, p: 24, f: 12.5, c: 0, cat: "Conservas" },
  huevo:      { n: "Huevos (talla M-L, ~55 g sin cáscara)", kcal: 79, p: 6.9, f: 5.2, c: 0.4, cat: "Huevos y lácteos", unit: true },
  claras:     { n: "Claras de huevo (brick)", kcal: 52, p: 10.9, f: 0.2, c: 0.7, cat: "Huevos y lácteos" },
  jamon:      { n: "Jamón serrano", kcal: 250, p: 30, f: 14, c: 0, cat: "Carne y pescado" },
  pavofiambre:{ n: "Pechuga de pavo en lonchas (>90% carne, sin ajo/cebolla)", kcal: 100, p: 20, f: 1.5, c: 1.2, cat: "Carne y pescado" },
  tofu:       { n: "Tofu firme", kcal: 145, p: 15.5, f: 8.7, c: 1.5, fib: 1, cat: "Huevos y lácteos" },
  queso:      { n: "Queso curado", kcal: 420, p: 25, f: 35, c: 0.5, cat: "Huevos y lácteos", lim: 40 },
  mozzarella: { n: "Mozzarella sin lactosa", kcal: 245, p: 18, f: 18.5, c: 1, cat: "Huevos y lácteos", lim: 40 },
  leche:      { n: "Leche semidesnatada sin lactosa (ml)", kcal: 46, p: 3.2, f: 1.6, c: 4.7, cat: "Huevos y lácteos" },
  skyr:       { n: "Yogur proteico/skyr sin lactosa natural", kcal: 62, p: 10.5, f: 0.2, c: 4, cat: "Huevos y lácteos" },
  proteina:   { n: "Proteína de huevo en polvo", kcal: 370, p: 80, f: 1, c: 6, cat: "Despensa" },
  gelatina:   { n: "Gelatina neutra en láminas", kcal: 335, p: 85, f: 0, c: 0, cat: "Despensa" },

  // Hidratos (arroz, pasta, quinoa, polenta y patata: peso ya cocido)
  arroz:      { n: "Arroz basmati", kcal: 130, p: 2.7, f: 0.3, c: 27.8, fib: 0.4, cat: "Despensa", raw: 0.36 },
  pasta:      { n: "Pasta de maíz y arroz", kcal: 155, p: 3, f: 0.7, c: 34, fib: 0.9, cat: "Despensa", raw: 0.44 },
  quinoa:     { n: "Quinoa", kcal: 120, p: 4.4, f: 1.9, c: 18.5, fib: 2.8, cat: "Despensa", raw: 0.38, lim: 155 },
  avena:      { n: "Copos de avena (sin gluten si los toleras mejor)", kcal: 370, p: 13.5, f: 7, c: 58.7, fib: 10, cat: "Despensa", lim: 52 },
  polenta:    { n: "Polenta (harina de maíz)", kcal: 72, p: 1.6, f: 0.3, c: 15.2, fib: 0.6, cat: "Despensa", raw: 0.2 },
  patata:     { n: "Patata", kcal: 86, p: 1.9, f: 0.1, c: 18.3, fib: 1.8, cat: "Fruta y verdura" },
  boniato:    { n: "Boniato", kcal: 90, p: 2, f: 0.2, c: 17.4, fib: 3.3, cat: "Fruta y verdura", lim: 75 },
  panespelta: { n: "Pan de masa madre 100% espelta", kcal: 245, p: 9.5, f: 1.6, c: 46, fib: 6, cat: "Despensa", lim: 52 },
  tortitas:   { n: "Tortitas de arroz o maíz", kcal: 383, p: 8, f: 2.8, c: 79, fib: 4, cat: "Despensa" },
  galletas:   { n: "Galletas Triple Zero", kcal: 415, p: 7.7, f: 14.5, c: 50, cat: "Despensa" },

  // Fruta
  platano:    { n: "Plátano firme (poco maduro)", kcal: 89, p: 1.1, f: 0.3, c: 20.2, fib: 2.6, cat: "Fruta y verdura", lim: 100 },
  kiwi:       { n: "Kiwi verde", kcal: 61, p: 1.1, f: 0.5, c: 11.7, fib: 3, cat: "Fruta y verdura", lim: 150 },
  pina:       { n: "Piña", kcal: 50, p: 0.5, f: 0.1, c: 11.7, fib: 1.4, cat: "Fruta y verdura", lim: 140 },
  naranja:    { n: "Naranja", kcal: 47, p: 0.9, f: 0.1, c: 9.4, fib: 2.4, cat: "Fruta y verdura", lim: 130 },
  mandarina:  { n: "Mandarina", kcal: 53, p: 0.8, f: 0.3, c: 11.5, fib: 1.8, cat: "Fruta y verdura", lim: 90 },
  fresas:     { n: "Fresas", kcal: 32, p: 0.7, f: 0.3, c: 5.7, fib: 2, cat: "Fruta y verdura", lim: 65 },
  arandanos:  { n: "Arándanos", kcal: 57, p: 0.7, f: 0.3, c: 12.1, fib: 2.4, cat: "Fruta y verdura", lim: 125 },
  limon:      { n: "Limón", kcal: 0, p: 0, f: 0, c: 0, cat: "Fruta y verdura" },

  // Verdura
  calabacin:  { n: "Calabacín", kcal: 17, p: 1.2, f: 0.3, c: 2.1, fib: 1, cat: "Fruta y verdura", lim: 65 },
  berenjena:  { n: "Berenjena", kcal: 25, p: 1, f: 0.2, c: 2.9, fib: 3, cat: "Fruta y verdura", lim: 75 },
  zanahoria:  { n: "Zanahoria", kcal: 41, p: 0.9, f: 0.2, c: 6.8, fib: 2.8, cat: "Fruta y verdura" },
  judias:     { n: "Judías verdes", kcal: 31, p: 1.8, f: 0.2, c: 4.3, fib: 2.7, cat: "Fruta y verdura", lim: 75 },
  pimiento:   { n: "Pimiento verde", kcal: 20, p: 0.9, f: 0.2, c: 2.9, fib: 1.7, cat: "Fruta y verdura", lim: 50 },
  pimientorojo:{ n: "Pimiento rojo", kcal: 31, p: 1, f: 0.3, c: 3.9, fib: 2.1, cat: "Fruta y verdura", lim: 43 },
  espinacas:  { n: "Espinacas", kcal: 23, p: 2.9, f: 0.4, c: 1.4, fib: 2.2, cat: "Fruta y verdura" },
  tomate:     { n: "Tomate", kcal: 18, p: 0.9, f: 0.2, c: 2.7, fib: 1.2, cat: "Fruta y verdura", lim: 65 },
  tamizado:   { n: "Tomate tamizado bajo en sal", kcal: 24, p: 1.3, f: 0.2, c: 4, fib: 1, cat: "Conservas", lim: 100 },
  pepino:     { n: "Pepino", kcal: 15, p: 0.7, f: 0.1, c: 3.1, fib: 0.5, cat: "Fruta y verdura" },
  lechuga:    { n: "Lechuga", kcal: 15, p: 1.4, f: 0.2, c: 1.6, fib: 1.3, cat: "Fruta y verdura" },
  calabaza:   { n: "Calabaza japonesa (kabocha/potimarrón)", kcal: 34, p: 1, f: 0.1, c: 7, fib: 1.5, cat: "Fruta y verdura", lim: 75 },
  brocoli:    { n: "Brócoli (solo cabezas)", kcal: 34, p: 2.8, f: 0.4, c: 4, fib: 2.6, cat: "Fruta y verdura", lim: 75 },
  chirivia:   { n: "Chirivía", kcal: 75, p: 1.2, f: 0.3, c: 13.1, fib: 4.9, cat: "Fruta y verdura" },
  canonigos:  { n: "Canónigos o rúcula", kcal: 21, p: 2, f: 0.4, c: 2, fib: 1.6, cat: "Fruta y verdura" },
  cebollino:  { n: "Cebollino o parte verde de cebolleta", kcal: 30, p: 3.3, f: 0.7, c: 1.9, fib: 2.5, cat: "Fruta y verdura" },

  // Grasas, frutos secos y despensa
  aove:       { n: "Aceite de oliva virgen extra", kcal: 899, p: 0, f: 99.9, c: 0, cat: "Despensa" },
  mayonesa:   { n: "Mayonesa (sin ajo)", kcal: 680, p: 1, f: 75, c: 1.5, cat: "Despensa" },
  nueces:     { n: "Nueces", kcal: 654, p: 15.2, f: 65.2, c: 7, fib: 6.7, cat: "Despensa", lim: 30 },
  cacahuete:  { n: "Crema de cacahuete 100%", kcal: 610, p: 25.5, f: 50, c: 11, fib: 8, cat: "Despensa", lim: 32 },
  pipas:      { n: "Pipas de calabaza peladas", kcal: 570, p: 31, f: 49, c: 5, fib: 6, cat: "Despensa", lim: 23 },
  chia:       { n: "Semillas de chía", kcal: 486, p: 16.5, f: 30.7, c: 7.7, fib: 34.4, cat: "Despensa", lim: 24 },
  aceitunas:  { n: "Aceitunas verdes", kcal: 145, p: 1, f: 15, c: 0.5, fib: 3.3, cat: "Conservas" },
  cacao:      { n: "Cacao puro en polvo desgrasado", kcal: 350, p: 21, f: 12, c: 12, fib: 30, cat: "Despensa", lim: 8 },
  sirope:     { n: "Sirope de arce puro", kcal: 260, p: 0, f: 0.1, c: 67, cat: "Despensa" },
  maicena:    { n: "Maicena (almidón de maíz)", kcal: 351, p: 0.5, f: 0.1, c: 86, cat: "Despensa" }
};

if (typeof module !== "undefined") module.exports = { FOODS };
