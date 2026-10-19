/* ==========================================================================
   RadioMóvil Cochabamba — Lógica
   Todo el contenido editable (textos, números, contacto) vive en CONFIG.
   ========================================================================== */

const CONFIG = {
  brand: "Dr. Limbert Ortega Álvarez",
  whatsappNumber: "59167444106",
  whatsappMessage: "Hola, necesito una radiografía a domicilio...",
  instagram: "https://instagram.com/usuario",
  facebook: "https://facebook.com/usuario",
  stats: [
    { value: 30, suffix: " min", label: "Tiempo de respuesta promedio" },
    { value: 5000, suffix: "+", label: "Estudios realizados" },
    { value: 24, suffix: "/7", label: "Disponibilidad", urgent: true },
    { value: 98, suffix: "%", label: "Clientes satisfechos" },
  ],
};

const waLink = (msg) =>
  `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg || CONFIG.whatsappMessage)}`;

document.querySelectorAll("[data-wa-link]").forEach((el) => {
  el.href = waLink(el.dataset.waMessage);
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------------- Loader: corto y solo en la primera visita ---------------- */
(function loader() {
  const el = document.querySelector(".loader");
  if (!el) return;
  const seen = sessionStorage.getItem("rm_loader_seen");
  const delay = seen ? 0 : 500; // tope duro, nunca una espera larga
  setTimeout(() => {
    el.dataset.hidden = "true";
    sessionStorage.setItem("rm_loader_seen", "1");
  }, delay);
})();

/* ---------------- Cursor halo (solo escritorio con mouse real) ---------------- */
if (hasFinePointer && !prefersReducedMotion) {
  const halo = document.querySelector(".cursor-halo");
  if (halo) {
    window.addEventListener("pointermove", (e) => {
      halo.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      halo.dataset.active = "true";
    });
    window.addEventListener("pointerdown", () => (halo.dataset.pressed = "true"));
    window.addEventListener("pointerup", () => (halo.dataset.pressed = "false"));
  }
}

/* ---------------- Fondo de partículas (solo hero, se apaga en touch/reduced-motion) ---------------- */
(function particles() {
  const canvas = document.querySelector(".particles-canvas");
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let w, h, points, raf;
  const isCoarse = !hasFinePointer;
  const count = isCoarse ? 28 : 60; // menos partículas en móvil: naive heuristic, suficiente aquí

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function init() {
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }

  let mouse = { x: -9999, y: -9999 };
  if (hasFinePointer) {
    canvas.addEventListener("pointermove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0, 212, 255, 0.7)";
    ctx.strokeStyle = "rgba(0, 212, 255, 0.12)";

    for (const p of points) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x, dy = points[i].y - points[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(tick);
  }

  resize();
  init();
  tick();
  window.addEventListener("resize", () => {
    resize();
    init();
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else tick();
  });
})();

/* ---------------- Efecto radiografía: sigue el puntero / toque ---------------- */
(function xrayEffect() {
  const frame = document.querySelector(".xray-frame");
  if (!frame) return;

  function setPos(x, y) {
    const r = frame.getBoundingClientRect();
    frame.style.setProperty("--mx", `${x - r.left}px`);
    frame.style.setProperty("--my", `${y - r.top}px`);
  }

  frame.addEventListener("pointerenter", (e) => {
    frame.dataset.xray = "true";
    setPos(e.clientX, e.clientY);
  });
  frame.addEventListener("pointermove", (e) => setPos(e.clientX, e.clientY));
  frame.addEventListener("pointerleave", () => (frame.dataset.xray = "false"));

  // en touch: alterna al tocar, en vez de depender de hover
  if (!hasFinePointer) {
    frame.addEventListener("click", (e) => {
      const isOn = frame.dataset.xray === "true";
      setPos(e.clientX || frame.getBoundingClientRect().left + frame.offsetWidth / 2,
             e.clientY || frame.getBoundingClientRect().top + frame.offsetHeight / 2);
      frame.dataset.xray = isOn ? "false" : "true";
    });
  }
})();

/* ---------------- Reveal al hacer scroll (una sola vez) ---------------- */
(function revealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.revealDelay || 0);
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
          io.unobserve(entry.target); // dispara una sola vez: nunca se re-anima al volver a scrollear
        }
      });
    },
    { threshold: 0.2, rootMargin: "-40px" }
  );

  items.forEach((el) => io.observe(el));
})();

/* ---------------- Contadores animados (una sola vez, al entrar en viewport) ---------------- */
(function counters() {
  const els = document.querySelectorAll("[data-counter]");
  if (!els.length) return;

  function animateCount(el) {
    const target = Number(el.dataset.counter);
    const suffix = el.dataset.suffix || "";
    if (prefersReducedMotion) {
      el.textContent = target.toLocaleString("es-BO") + suffix;
      return;
    }
    const duration = 900;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("es-BO") + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  els.forEach((el) => io.observe(el));
})();

/* ---------------- Tilt 3D en tarjetas (solo con mouse real) ---------------- */
if (hasFinePointer && !prefersReducedMotion) {
  document.querySelectorAll("[data-tilt]").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${py * -8}deg) rotateY(${px * 8}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
    });
  });
}

/* ---------------- Ripple en botones (transform + opacity) ---------------- */
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("pointerdown", (e) => {
    if (prefersReducedMotion) return;
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(r.width, r.height);
    ripple.className = "btn__ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - r.left - size / 2}px`;
    ripple.style.top = `${e.clientY - r.top - size / 2}px`;
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
});

/* ---------------- FAQ: details nativo con altura animada ---------------- */
document.querySelectorAll(".faq__item").forEach((item) => {
  const summary = item.querySelector("summary");
  const panel = item.querySelector(".faq__panel");

  summary.addEventListener("click", (e) => {
    e.preventDefault();
    const isOpen = item.hasAttribute("open");

    if (isOpen) {
      panel.style.height = panel.scrollHeight + "px";
      requestAnimationFrame(() => {
        panel.style.height = "0px";
        panel.style.opacity = "0";
      });
      panel.addEventListener("transitionend", function onEnd() {
        item.removeAttribute("open");
        panel.removeEventListener("transitionend", onEnd);
      }, { once: true });
    } else {
      item.setAttribute("open", "");
      panel.style.height = "0px";
      panel.style.opacity = "0";
      requestAnimationFrame(() => {
        panel.style.height = panel.scrollHeight + "px";
        panel.style.opacity = "1";
      });
      panel.addEventListener("transitionend", function onEnd() {
        panel.style.height = "auto"; // deja que el contenido fluya si cambia el viewport
        panel.removeEventListener("transitionend", onEnd);
      }, { once: true });
    }
  });
});
