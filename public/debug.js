"use strict";
(() => {
  // debug_test.js
  (async function() {
    const el = document.getElementById("subtitulo");
    try {
      const r = await fetch("datos/noticias.json", { cache: "no-cache" });
      const d = await r.json();
      el.textContent = "OK " + (d.total || 0) + " noticias";
    } catch (e) {
      el.textContent = "ERR " + e.message;
    }
  })();
})();
