Crea una página web de una sola página (landing), solo front-end (HTML + CSS + JavaScript, sin backend), para un servicio de radiología móvil en Cochabamba, Bolivia. Debe verse premium, tecnológica, confiable y muy animada, pero fluida (60fps) y usable en celular.

## Negocio
- Nombre: [NOMBRE DEL RADIÓLOGO / MARCA]
- Servicio: radiografías a domicilio, en clínicas y dentro de cirugías (control intraoperatorio). Atención 24/7, también emergencias.
- Zona: Cochabamba y alrededores (Quillacollo, Sacaba, etc.)
- Contacto: WhatsApp [+591 XXXXXXXX], Instagram/Facebook [@usuario]
- Idioma: español (Bolivia). Tono: profesional, cercano y rápido.

## Equipos que ofrece (sección con imágenes)
- Equipo de rayos X portátil/móvil: [modelo]
- Arco en C (fluoroscopia) para cirugías: [modelo]
- Equipo de rayos X digital (DR) con placa/detector: [modelo]
- [otros equipos, ej. ecógrafo portátil]
Para cada uno: tarjeta con imagen grande, nombre, para qué se usa y ventajas. Usa imágenes de placeholder (Unsplash o similares) con rutas fáciles de reemplazar por las fotos reales en /assets/equipos/.

## Estructura de secciones
1. Hero a pantalla completa: titular fuerte ("Radiología a domicilio, 24/7, donde la necesites"), subtítulo, botón grande de WhatsApp, y un fondo animado de partículas/rayos con estética de radiografía (esqueleto o mano en negativo azul, con efecto de escaneo que recorre la imagen).
2. Franja "24/7 · A domicilio · Resultados rápidos" con contadores animados (tiempo de respuesta, estudios realizados, etc.; marca los números como editables).
3. Servicios: tarjetas con hover 3D (tilt) y glow: domicilio, clínicas, cirugías, urgencias.
4. Equipos: carrusel o galería con parallax, zoom suave y revelado al hacer scroll.
5. Cómo funciona: línea de tiempo animada en 4 pasos (Escríbenos por WhatsApp → Confirmamos precio y hora → Vamos a tu domicilio → Entrega de resultados).
6. Zonas de cobertura: mapa o diagrama estilizado con pulso en Cochabamba.
7. Por qué elegirnos / confianza: puntos clave, protección radiológica, equipo calibrado, puntualidad.
8. Preguntas frecuentes: acordeón animado.
9. CTA final + botón flotante de WhatsApp con pulso, siempre visible, con mensaje prellenado ("Hola, necesito una radiografía a domicilio...").
10. Footer con contacto, horarios (24/7) y redes.

## Efectos visuales y animación
- Scroll suave y animaciones de entrada al hacer scroll (GSAP + ScrollTrigger, o IntersectionObserver si se prefiere liviano).
- Parallax en capas, texto que se revela por líneas, cursor personalizado con halo en escritorio.
- Fondo con canvas (partículas/líneas tipo escáner/haz de rayos X) que reacciona al mouse.
- Efecto "radiografía": al pasar el mouse o hacer scroll, una imagen alterna entre vista normal y vista de rayos X (invertida, azul/cian) con una máscara circular.
- Tarjetas con glassmorphism, glow cian, bordes con gradiente animado.
- Micro-interacciones en botones (magnético, ripple).
- Loader inicial corto con animación (latido/línea ECG).
- Respeta prefers-reduced-motion y desactiva efectos pesados en móvil de gama baja.

## Diseño
- Paleta: fondo oscuro azul marino/negro (#050B16), acentos cian/azul eléctrico (#00D4FF, #2F6BFF), blanco para texto, un acento verde o rojo solo para "24/7" y urgencias.
- Tipografía: una display moderna para títulos (ej. Sora o Space Grotesk) y una legible para texto (Inter).
- Mobile-first: la mayoría de los clientes llegará desde WhatsApp en celular.
- Accesible: buen contraste, alt en imágenes, foco visible.

## Requisitos técnicos
- Archivos separados: index.html, styles.css, script.js, carpeta /assets.
- Sin frameworks pesados; solo librerías por CDN (GSAP, y opcionalmente Lenis o Three.js/particles).
- Imágenes con lazy loading y formato WebP; Lighthouse objetivo: rendimiento 85+ en móvil pese a las animaciones.
- SEO básico: title, meta description, Open Graph, y schema.org (MedicalBusiness) con zona de servicio Cochabamba.
- Todos los textos, números y datos de contacto agrupados en un solo lugar del código (o en variables) para editarlos fácil.
- Entrega el código completo, comentado, y explica cómo reemplazar las imágenes y el número de WhatsApp.