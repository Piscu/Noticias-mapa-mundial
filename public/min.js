"use strict";
(() => {
  // min_test.js
  async function main() {
    const el = document.getElementById("subtitulo");
    try {
      const r = await fetch("datos/noticias.json", { cache: "no-cache" });
      if (!r.ok) throw new Error(r.status);
      const d = await r.json();
      el.textContent = d.total + " noticias cargadas";
    } catch (e) {
      el.textContent = "MINERR:" + e.message;
    }
  }
  main();
})();
