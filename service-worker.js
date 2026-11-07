const CACHE_NAME = "menu-mensual-cache-v29";
const ASSETS = [
  "./",
  "./index.html",
  "./foods.js",
  "./data.js",
  "./prep.js",
  "./training.js",
  "./manifest.webmanifest",
  "./icons/logo.svg",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS.map((url) => new Request(url, { cache: "reload" }))))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Red primero (para recibir siempre la última versión del menú) y caché si no hay conexión
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request.mode === "navigate" ? event.request.url : event.request, { cache: "no-cache" }).then((response) => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return response;
    }).catch(() => caches.match(event.request))
  );
});

// Al tocar la notificación del descanso, vuelve a la app
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      const win = list.find((c) => "focus" in c);
      return win ? win.focus() : self.clients.openWindow("./");
    })
  );
});
