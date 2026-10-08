"use strict";
(() => {
  // min3.js
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.getElementById("subtitulo").textContent = "LISTO";
    });
  } else {
    document.getElementById("subtitulo").textContent = "LISTO YA";
  }
})();
