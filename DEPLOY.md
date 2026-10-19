# Cómo actualizar la página en línea

**Link en vivo:** https://notihan.github.io/radiologia-limbert-ortega/

Está en GitHub Pages (no Vercel — no había una cuenta de Vercel logueada en esta
máquina, así que usé GitHub, que ya estaba conectado y es igual de gratis).
El link **no cambia nunca**: cada vez que subas cambios al repositorio, la misma
URL se actualiza sola en 1-2 minutos.

## Repositorio

https://github.com/NOTIHAN/radiologia-limbert-ortega (público — necesario para
que GitHub Pages sea gratis)

## Para subir cambios

Desde la carpeta del proyecto, en la terminal:

```bash
git add .
git commit -m "describe aquí qué cambiaste"
git push
```

Eso es todo. GitHub reconstruye la página sola; refresca el link en 1-2 minutos
(a veces con caché del navegador hace falta Ctrl+Shift+R).

## Si le pides a Claude que haga el cambio

Dile algo como: "sube los cambios al repo" o "haz push" — ya tiene el repositorio
configurado (`origin`) y solo necesita repetir los tres comandos de arriba.

## Reemplazar imágenes o el número de WhatsApp

- Fotos de equipos: `assets/equipos/` — mantén el mismo nombre de archivo o
  actualiza la ruta en `index.html`.
- WhatsApp, Instagram, Facebook: editar el objeto `CONFIG` al inicio de
  `script.js`.

Después de editar, siempre: `git add .` → `git commit -m "..."` → `git push`.

## Si en algún momento quieres pasarlo a Vercel (o al hosting del cliente)

El sitio es 100% estático (HTML/CSS/JS sin backend), así que funciona en
cualquier hosting sin cambios:

1. Crea una cuenta en [vercel.com](https://vercel.com) (gratis).
2. "Add New Project" → "Import Git Repository" → selecciona
   `radiologia-limbert-ortega`.
3. Framework preset: **Other** (no necesita build). Deploy.
4. Vercel te da un link nuevo (`algo.vercel.app`); desde ahí cada `git push`
   también lo actualiza solo.

Si prefieres que yo lo haga, necesito que inicies sesión en Vercel desde el
navegador cuando te lo pida (no puedo crear esa cuenta por ti).
