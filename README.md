# Menú Mensual

App de menú mensual interactivo (dieta con macros) en HTML/CSS/JS puro, sin dependencias. Guarda tus selecciones en `localStorage` del navegador y funciona instalada como PWA (offline) en el móvil o el escritorio.

## Estructura

```
index.html              # app (UI + lógica): Menú, Compra, Diario y Guía
foods.js                 # tabla de alimentos (macros por 100 g, pasillo, ración máx. baja en FODMAP)
data.js                  # platos por franja/rol (con ingredientes) y extras/postres proteicos
prep.js                  # «Cómo se hace» de cada plato (por título)
manifest.webmanifest     # metadatos de instalación (PWA)
service-worker.js        # caché offline (red primero, caché si no hay conexión)
icons/                   # iconos de instalación
```

## Funciones

- **Menú** (pensado para móvil): calendario por meses, tarjetas por comida con receta, selector a pantalla completa con buscador que muestra cómo quedaría el total del día con cada plato, autocompletar mes o día y barras de objetivo diario.
- **Cuándo entrenas**: cada día eliges entre qué comidas entrenas (en ayunas, desayuno→comida, comida→merienda o merienda→cena), sin horas fijas. La app marca la comida pre-entreno y la post-entreno, usa platos adecuados para cada una y avisa si un plato no es ideal.
- **Yo**: objetivo (ganar músculo, recomposición, mantener o perder grasa), datos personales, actividad, entreno semanal e hipotiroidismo. Calcula metabolismo basal (Mifflin-St Jeor, con Katch-McArdle si hay % de grasa), gasto diario y kcal/macros para días de fuerza y de descanso. Las raciones de cada día se ajustan solas con dos factores (alimentos proteicos → proteína; hidratos y grasas → kcal); verduras y frutas con límite FODMAP, huevos, queso y jamón no cambian. Registro de peso con gráfica y ajuste automático de calorías según la tendencia real.
- **Compra**: lista agrupada por pasillo para N días, con cantidades en crudo para carnes, pescados y cereales y precio aproximado por producto y total; se puede marcar y copiar.
- **Presupuesto ajustado** (en «Más»): el autocompletar evita platos caros (gambas, dorada, bacalao, filete de ternera) y prefiere los baratos; el salmón se permite. Cada plato y cada día muestran su coste aproximado (precios orientativos en `foods.js`, campo `eur`).
- **Tuppers del domingo** (en «Más», activado por defecto): el autocompletar repite cada comida y cena 2–3 veces por semana (unos 6 platos por domingo) y deja al principio de semana lo que no se congela. En «Compra» se ve qué cocinar, cuánto en total y qué tupper va a la nevera (lunes–miércoles) o al congelador (jueves–sábado).
- Los días en que cambias el entreno a mano se respetan al autocompletar el mes.
- **Diario**: hinchazón, pesadez, cansancio, gases y dolor (0-3), deposiciones y escala de Bristol, hábitos (paseo tras comer, no picar, agua…), notas, historial de 14 días y «platos a vigilar».
- **Más**: plan semanal de entreno, modo digestión suave, platos descartados, copia de seguridad y guía SIBO/IMO.

## Cómo desplegar

### GitHub Pages (usado en este repo)
1. Repo → Settings → Pages → Source: rama `main`, carpeta `/ (root)`.
2. La URL queda en `https://<usuario>.github.io/<repo>/`.
3. Cualquier `git push` a `main` actualiza el sitio automáticamente (puede tardar 1-2 min).

### Alternativa: Vercel
1. Importa el repo en vercel.com (framework: "Other" / estático).
2. Build command: ninguno. Output directory: `.` (raíz).
3. Deploy automático en cada push.

## Cómo instalar en el móvil

Abre la URL desplegada en Chrome/Safari → menú del navegador → "Añadir a pantalla de inicio" / "Instalar app". Con el service worker activo, la app sigue funcionando sin conexión tras la primera carga.

## Cómo editar los alimentos y platos

- `foods.js`: cada alimento lleva `kcal, p, f, c` por 100 g (o por unidad si `unit: true`), `cat` (pasillo), `lim` (ración máxima baja en FODMAP) y `raw` (factor cocinado→crudo para la compra).
- `data.js`: `POOLS[franja][rol]` con roles `normal`, `pre`, `post` y `cardio` (desayuno, comida y merienda tienen `pre` y `post`; la cena, `post`). Cada plato es `{ name, i: [[alimento, cantidad], ...] }`; las kcal y macros se calculan solas. Añade platos **al final** de cada lista: los días guardados se referencian por posición.
- `EXTRAS`: batidos y postres proteicos; `prep` es el texto de «Cómo se hace».
- `prep.js`: receta corta de cada plato, por su título. Si añades un plato nuevo, añade aquí su receta.

## Exportar / importar datos

Junto a "Borrar selección del mes" hay dos botones:

- **Exportar datos**: descarga un `.json` con todas tus selecciones guardadas.
- **Importar datos**: carga un `.json` exportado previamente y restaura las selecciones (sobrescribe las actuales).

Sirve para pasar tu plan del móvil al PC o viceversa, o para hacer una copia de seguridad antes de borrar el navegador.
