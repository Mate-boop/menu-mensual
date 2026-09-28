# Menú Mensual

App de menú mensual interactivo (dieta con macros) en HTML/CSS/JS puro, sin dependencias. Guarda tus selecciones en `localStorage` del navegador y funciona instalada como PWA (offline) en el móvil o el escritorio.

## Estructura

```
index.html              # app completa (UI + lógica)
manifest.webmanifest     # metadatos de instalación (PWA)
service-worker.js        # cache offline (cache-first)
icons/icon-192.png       # icono de instalación
icons/icon-512.png       # icono de instalación
```

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

## Cómo editar los alimentos y macros

Todo el contenido nutricional vive en `index.html`, dentro de la etiqueta `<script>`, en estos objetos:

- `MEALS_COMMON.desayuno` / `MEALS_COMMON.merienda`: opciones de desayuno y merienda para días normales/cardio.
- `MEALS_BY_TYPE.fuerza.comida` / `.cena` y `MEALS_BY_TYPE.cardio.comida` / `.cena`: comidas y cenas según el tipo de día.
- `PRE_POOL`: comidas ligeras pre-entreno (días de fuerza).
- `EXTRAS`: batidos/postres proteicos opcionales.

Cada plato es un objeto `{ name, kcal, p, f, c }` (nombre, kilocalorías, proteína, grasa, carbohidratos en gramos). Para añadir, editar o quitar un plato, modifica el array correspondiente respetando ese formato.

## Exportar / importar datos

Junto a "Borrar selección del mes" hay dos botones:

- **Exportar datos**: descarga un `.json` con todas tus selecciones guardadas.
- **Importar datos**: carga un `.json` exportado previamente y restaura las selecciones (sobrescribe las actuales).

Sirve para pasar tu plan del móvil al PC o viceversa, o para hacer una copia de seguridad antes de borrar el navegador.
