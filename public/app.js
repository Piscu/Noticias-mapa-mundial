/**
 * Frontend: mapa Leaflet + pop-ups + filtro por temáticas.
 *
 * La página no asume que haya un servidor detrás: lee `datos/*.json` y filtra
 * en cliente con el mismo núcleo que usa Express (`src/servicios/nucleo.ts`,
 * empaquetado aquí abajo en `vendor/web.js`). Si al cargar detecta un backend
 * local, activa además el botón «Actualizar» y la recopilación en vivo.
 */
import { calcularFacetas, consultarNoticias, lugaresPublicos, probar } from "./vendor/web";

const CAT_COLORES = {
  politica: "#7c5cff",
  economia: "#00c48c",
  conflicto: "#ff4d4d",
  deportes: "#ffa500",
  ciencia: "#00b8ff",
  salud: "#2ecc71",
  clima: "#22c1c3",
  tecnologia: "#4dd0e1",
  cultura: "#ff6ec7",
  sociedad: "#9b8cff",
  deportes_olimpicos: "#ffd700",
};

const CAT_EMOJI = {
  politica: "🏛️",
  economia: "📈",
  conflicto: "⚔️",
  deportes: "⚽",
  ciencia: "🔬",
  salud: "🏥",
  clima: "🌍",
  tecnologia: "💻",
  cultura: "🎭",
  sociedad: "👥",
  deportes_olimpicos: "🏅",
};

const estado = {
  noticias: [],
  facetas: null,
  cats: new Set(),
  lugares: new Set(),
  fuentes: new Set(),
  q: "",
  horas: 24,
  /** "todas" | "no" (sólo topónimos explícitos) | "solo" (sólo inferidas) */
  inferidas: "todas",
  /** Capa de fronteras de países, apagada por defecto sobre las teselas */
  fronteras: false,
};

/** Todas las noticias del fichero publicado; el filtro se hace en cliente. */
let TODAS = [];
/** ¿Hay un Express detrás (equipo local) o es la web publicada tal cual? */
let hayServidor = false;
/** Instantánea de `datos/estado.json`, para el pie de la barra lateral. */
let estadoServidor = null;

const $ = (s) => document.querySelector(s);
const el = {
  mapa: $("#mapa"),
  cats: $("#filtro-cats"),
  lugares: $("#filtro-lugares"),
  fuentes: $("#filtro-fuentes"),
  q: $("#q"),
  horas: $("#horas"),
  btnRefrescar: $("#btn-refrescar"),
  btnTema: $("#btn-tema"),
  btnLimpiar: $("#btn-limpiar"),
  carga: $("#cargando"),
  inferidas: $("#filtro-inferidas"),
  capas: $("#filtro-capas"),
  dlgProbar: $("#dlg-probar"),
  pTitulo: $("#p-titulo"),
  pDesc: $("#p-desc"),
  pResultado: $("#p-resultado"),
  tira: $("#tira"),
  tiraInfo: $("#tira-info"),
  subtitulo: $("#subtitulo"),
  estadoFuentes: $("#estado-fuentes"),
};

/* ------------------------------------------------------------------ */
/* Mapa                                                                */
/* ------------------------------------------------------------------ */

const mapa = L.map("mapa", {
  worldCopyJump: true,
  minZoom: 2,
  maxZoom: 12,
  zoomControl: true,
}).setView([22, -10], 2);

/*
 * Mapa base: teselas de OpenStreetMap. No hacen falta claves ni registro, pero
 * sí conexión a internet. La capa de países es un añadido opcional para poder
 * filtrar pulsando un país.
 */
const teselasOSM = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
  // Si no hay red, el mar del contenedor hace de fondo en lugar de un square roto
  errorTileUrl: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
}).addTo(mapa);

/** ISO alpha-2 → nombre en español, para alinear el mapa con los filtros. */
const paisesBase = new Map();
const nombrePorIso = new Map();
let paisesCargados = false;

/**
 * Rellena en color los países que están seleccionados en el filtro.
 * Se toca el atributo class del SVG porque Leaflet sólo lee className al crear
 * la capa: setStyle({className}) no la vuelve a pintar.
 */
function resaltarPaises() {
  if (!paisesCargados) return;
  for (const { capa, nombre } of paisesBase.values()) {
    capa.getElement()?.classList.toggle("elegido", estado.lugares.has(nombre));
  }
}

function cargarPaises() {
  return fetch("vendor/paises-mundo.geojson")
    .then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then((geo) => {
      capaPaises = L.geoJSON(geo, {
        className: "pais",
        onEachFeature: (f, l) => {
          const nombre = f.properties?.nombre;
          const iso = f.properties?.iso;
          if (!nombre) return;
          l.bindTooltip(nombre, { sticky: true, className: "pista-pais" });
          if (!iso || !nombrePorIso.has(iso)) return;
          paisesBase.set(iso, { capa: l, nombre: nombrePorIso.get(iso) });
          // Pulsar un país es lo mismo que marcarlo en la barra lateral
          l.on("click", () => {
            alternar(estado.lugares, paisesBase.get(iso).nombre);
            refrescar();
          });
        },
      });
      paisesCargados = true;
      if (estado.fronteras) alternarFronteras(true);
      mapa.invalidateSize();
    })
    .catch((e) => console.warn("Capa de fronteras no disponible:", e.message));
}

let capaPaises = null;

/** Enciende o apaga la capa de fronteras. */
function alternarFronteras(encender) {
  if (!capaPaises) return;
  if (encender) {
    if (!mapa.hasLayer(capaPaises)) capaPaises.addTo(mapa);
    resaltarPaises();
  } else {
    mapa.removeLayer(capaPaises);
  }
}

lugaresPublicos().forEach((l) => {
  if (l.tipo === "pais" && l.pais) nombrePorIso.set(l.pais.toUpperCase(), l.nombre);
});
cargarPaises();

L.control.scale({ imperial: false }).addTo(mapa);
mapa.attributionControl.addAttribution(
  'Fronteras: <a href="https://www.naturalearthdata.com/">Natural Earth</a>'
);

// URL del mapa: permite compartir una vista concreta
const paramsUrl = new URLSearchParams(location.search);
if (paramsUrl.get("lat") && paramsUrl.get("lon")) {
  mapa.setView([Number(paramsUrl.get("lat")), Number(paramsUrl.get("lon"))], Number(paramsUrl.get("z") ?? 5));
}

const capaMarcadores = L.layerGroup().addTo(mapa);
let mapaCalor = null;

/* ------------------------------------------------------------------ */
/* Utilidades de formato                                               */
/* ------------------------------------------------------------------ */

const CAT_NOMBRES = {};

function catNombre(id) {
  return CAT_NOMBRES[id] ?? id;
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

function haceCuanto(iso) {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return "";
  const min = Math.round((Date.now() - t) / 60000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.round(h / 24);
  if (d < 7) return `hace ${d} d`;
  return new Date(t).toLocaleDateString("es", { day: "numeric", month: "short" });
}

function imgSegura(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Petición de datos                                                   */
/* ------------------------------------------------------------------ */

async function pedir(url, opts) {
  const res = await fetch(url, opts);
  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} ${t.slice(0, 120)}`);
  }
  return res.json();
}

async function cargarFacetas() {
  estado.facetas = calcularFacetas(TODAS);
  for (const c of estado.facetas.categorias) CAT_NOMBRES[c.id] = c.nombre;
  pintarFiltros();
}

let cargando = false;
async function cargarNoticias() {
  const p = {
    q: estado.q,
    categorias: estado.cats.size ? [...estado.cats] : undefined,
    lugares: estado.lugares.size ? [...estado.lugares] : undefined,
    fuentes: estado.fuentes.size ? [...estado.fuentes] : undefined,
    horas: estado.horas || 0,
    inferidas: estado.inferidas !== "todas" ? estado.inferidas : undefined,
    orden: undefined,
    limite: 1500,
  };
  const datos = consultarNoticias(TODAS, p);
  estado.noticias = datos.noticias;
  pintarMapa();
  pintarTira();
  el.subtitulo.textContent =
    `${datos.total.toLocaleString("es")} noticias` +
    (estado.cats.size ? ` · ${estado.cats.size} temáticas` : " · todas las temáticas") +
    (estado.inferidas === "no" ? " · sólo topónimos" : estado.inferidas === "solo" ? " · sólo deducidas" : "");
}

/* ------------------------------------------------------------------ */
/* Filtros                                                             */
/* ------------------------------------------------------------------ */

function pintarFiltros() {
  const f = estado.facetas;

  // Temáticas
  el.cats.innerHTML = "";
  for (const c of f.categorias) {
    if (!c.total) continue;
    const chip = document.createElement("button");
    chip.className = "chip" + (estado.cats.has(c.id) ? " activa" : "");
    chip.innerHTML = `<span class="punto" style="background:${c.color}"></span>${CAT_EMOJI[c.id] ?? ""} ${esc(c.nombre)} <span class="n">${c.total}</span>`;
    chip.onclick = () => {
      alternar(estado.cats, c.id);
      refrescar();
    };
    el.cats.append(chip);
  }

  // Lugares
  el.lugares.innerHTML = "";
  const maxL = f.lugares[0]?.total || 1;
  for (const l of f.lugares.slice(0, 80)) {
    const fila = document.createElement("div");
    fila.className = "fila" + (estado.lugares.has(l.nombre) ? " activa" : "");
    fila.innerHTML = `<span>${esc(l.nombre)}</span><span class="barra-mini"><i style="width:${(l.total / maxL) * 100}%"></i></span><span class="n">${l.total}</span>`;
    fila.onclick = () => {
      alternar(estado.lugares, l.nombre);
      refrescar();
    };
    el.lugares.append(fila);
  }
  $("#cont-lugares").textContent = f.lugares.length ? `(${f.lugares.length})` : "";

  // Fuentes
  el.fuentes.innerHTML = "";
  const maxF = f.fuentes[0]?.total || 1;
  for (const s of f.fuentes) {
    if (!s.total) continue;
    const fila = document.createElement("div");
    fila.className = "fila" + (estado.fuentes.has(s.id) ? " activa" : "");
    fila.innerHTML = `<span class="punto" style="background:${s.color}"></span><span>${esc(s.nombre)}</span><span class="barra-mini"><i style="width:${(s.total / maxF) * 100}%"></i></span><span class="n">${s.total}</span>`;
    fila.onclick = () => {
      alternar(estado.fuentes, s.id);
      refrescar();
    };
    el.fuentes.append(fila);
  }
  $("#cont-fuentes").textContent = `(${f.fuentes.filter((s) => s.total).length})`;

  // Origen del marcador: topónimo explícito frente a país deducido del portal
  el.inferidas.innerHTML = "";
  const opciones = [
    ["todas", "Todas"],
    ["no", "Sólo topónimos"],
    ["solo", "Sólo deducidas"],
  ];
  for (const [valor, texto] of opciones) {
    const chip = document.createElement("button");
    chip.className = "chip" + (estado.inferidas === valor ? " activa" : "");
    chip.textContent = texto;
    chip.title =
      valor === "todas"
        ? "Mostrar todas las noticias"
        : valor === "no"
          ? "Ocultar las noticias sin topónimo en el texto, cuya ubicación se dedujo del portal"
          : "Mostrar sólo las noticias cuya ubicación se dedujo del portal";
    chip.onclick = () => {
      estado.inferidas = valor;
      pintarFiltros();
      cargarNoticias();
    };
    el.inferidas.append(chip);
  }

  // Capa de fronteras: encendida, las teselas de OpenStreetMap quedan debajo
  el.capas.innerHTML = "";
  const chipCapa = document.createElement("button");
  chipCapa.className = "chip" + (estado.fronteras ? " activa" : "");
  chipCapa.textContent = "Fronteras de países";
  chipCapa.title = estado.fronteras
    ? "Ocultar las fronteras y dejar sólo el mapa de OpenStreetMap"
    : "Superponer las fronteras para ver los países resaltados y filtrar al pulsarlos";
  chipCapa.onclick = () => {
    estado.fronteras = !estado.fronteras;
    alternarFronteras(estado.fronteras);
    pintarFiltros();
  };
  el.capas.append(chipCapa);
}

function alternar(set, valor) {
  set.has(valor) ? set.delete(valor) : set.add(valor);
}

let temporizador;
function refrescar() {
  // Repinta los filtros al instante (marca los activos) y pide los datos con retardo
  pintarFiltros();
  resaltarPaises();
  clearTimeout(temporizador);
  temporizador = setTimeout(cargarNoticias, 180);
}

/* ------------------------------------------------------------------ */
/* Marcadores                                                          */
/* ------------------------------------------------------------------ */

function agruparPorLugar(noticias) {
  const mapa = new Map();
  for (const n of noticias) {
    const arr = mapa.get(n.lugarId);
    if (arr) arr.push(n);
    else mapa.set(n.lugarId, [n]);
  }
  // Prioriza los grupos con más noticias: son los "focos"
  return [...mapa.entries()].sort(
    (a, b) => b[1].length - a[1].length || Date.parse(b[1][0].fecha ?? 0) - Date.parse(a[1][0].fecha ?? 0)
  );
}

function pintarMapa() {
  capaMarcadores.clearLayers();
  if (mapaCalor) {
    mapa.removeLayer(mapaCalor);
    mapaCalor = null;
  }

  const grupos = agruparPorLugar(estado.noticias);
  const maxN = grupos[0]?.[1].length || 1;

  for (const [lugarId, noticias] of grupos) {
    const catPrincipal = contarCategorias(noticias)[0] ?? "sociedad";
    const color = CAT_COLORES[catPrincipal] ?? "#4c8dff";
    const primero = noticias[0];
    const radio = 6 + Math.min(16, Math.log2(1 + noticias.length / maxN) * 14 + noticias.length * 0.7);

    // Si toda la agrupación viene de una inferencia del portal, el borde pasa
    // a discontinuo para no sugerir una precisión que no tenemos.
    const todoInferido = noticias.every((n) => n.ubicacionInferida);

    const marcador = L.circleMarker([primero.lat, primero.lon], {
      radius: radio,
      color,
      weight: 2,
      dashArray: todoInferido ? "3 3" : undefined,
      fillColor: color,
      fillOpacity: 0.45,
      className: "marcador-" + lugarId,
    });

    marcador.bindPopup(popupHtml(lugarId, primero, noticias), {
      maxWidth: 340,
      minWidth: 260,
      className: "popup-noticia",
    });

    marcador.on("click", () => destacarMarcador(lugarId));
    capaMarcadores.addLayer(marcador);
  }

  // Capa de calor sobre los focos para ver la densidad regional
  if (grupos.length > 3) {
    mapaCalor = L.layerGroup();
    for (const [, noticias] of grupos) {
      const p = noticias[0];
      const c = L.circle([p.lat, p.lon], {
        radius: 90000 + noticias.length * 30000,
        color: "#ffffff",
        weight: 0,
        opacity: 0.06,
        fillOpacity: 0.06,
        interactive: false,
      });
      mapaCalor.addLayer(c);
    }
    mapaCalor.addTo(mapa);
  }
}

function destacarMarcador(lugarId) {
  document.querySelectorAll(".marcador-hl").forEach((n) => n.classList.remove("marcador-hl"));
  capaMarcadores.eachLayer((l) => {
    if (l.options?.className === "marcador-" + lugarId) {
      l.getElement?.()?.classList.add("marcador-hl");
    }
  });
  // Resaltar las tarjetas de ese lugar
  document.querySelectorAll(".tarjeta").forEach((t) => {
    t.style.outline = t.dataset.lugar === lugarId ? "2px solid var(--acento)" : "";
  });
}

function contarCategorias(noticias) {
  const c = new Map();
  for (const n of noticias) c.set(n.categoria, (c.get(n.categoria) ?? 0) + 1);
  return [...c.entries()].sort((a, b) => b[1] - a[1]);
}

function popupHtml(lugarId, primero, noticias) {
  const cats = contarCategorias(noticias);
  const cat = cats[0][0];
  const color = CAT_COLORES[cat] ?? "#4c8dff";
  const img = imgSegura(primero.imagen);
  const catTags = cats
    .slice(0, 3)
    .map(
      ([id, n]) =>
        `<span class="etiqueta-cat" style="background:${CAT_COLORES[id] ?? "#4c8dff"}">${CAT_EMOJI[id] ?? ""} ${esc(catNombre(id))} ${n}</span>`
    )
    .join(" ");

  const lista = noticias
    .slice(0, 12)
    .map(
      (n) => `<li style="margin:5px 0"><a href="${esc(n.enlace)}" target="_blank" rel="noopener">${esc(n.titulo)}</a>
      <div style="font-size:11px;color:#667">${esc(n.fuenteNombre)} · ${haceCuanto(n.fecha ?? n.fechaRecopilacion)}${n.ubicacionInferida ? " · 📍 deducida" : ""}</div></li>`
    )
    .join("");

  const inferidas = noticias.filter((n) => n.ubicacionInferida).length;

  return `
    ${img ? `<img class="img" src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[cat] ?? ""} ${esc(catNombre(cat))}</span>
      <span style="font-size:11px;color:#667">${esc(primero.lugarNombre)} · ${noticias.length} noticia${noticias.length === 1 ? "" : "s"}</span>
    </div>
    ${
      inferidas
        ? `<p class="ubica" title="En ${inferidas} de estas noticias no aparece ningún topónimo en el texto, así que el marcador se ha situado en el país del portal.">📍 ${inferidas} situadas por el país del portal, sin topónimo en el texto</p>`
        : ""
    }
    <div style="margin-top:8px">${catTags}</div>
    <ul style="margin:10px 0 0;padding-left:18px;max-height:260px;overflow:auto">${lista}</ul>
    ${noticias.length > 12 ? `<p class="ubica">+${noticias.length - 12} más en esta zona</p>` : ""}
    <div class="ubica">Coordenadas: ${primero.lat.toFixed(2)}, ${primero.lon.toFixed(2)}</div>
    <div style="margin-top:8px">
      <button onclick="window.__marcar('${esc(lugarId)}')" style="font-size:11px;padding:4px 8px">Ver en la tira de noticias</button>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* Tira de noticias                                                    */
/* ------------------------------------------------------------------ */

function pintarTira() {
  el.tira.innerHTML = "";
  const lista = estado.noticias.slice(0, 200);
  for (const n of lista) {
    const color = CAT_COLORES[n.categoria] ?? "#4c8dff";
    const card = document.createElement("article");
    card.className = "tarjeta";
    card.style.setProperty("--cat-color", color);
    card.dataset.lugar = n.lugarId;
    card.innerHTML = `
      <div class="et">
        <span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[n.categoria] ?? ""} ${esc(catNombre(n.categoria))}</span>
        <span>${n.ubicacionInferida ? "📍 " : ""}${esc(n.lugarNombre)}</span>
      </div>
      <h3>${esc(n.titulo)}</h3>
      <div class="pie">
        <span>${esc(n.fuenteNombre)}</span>
        <span>·</span>
        <span>${haceCuanto(n.fecha ?? n.fechaRecopilacion)}</span>
      </div>`;
    card.onclick = () => {
      mapa.setView([n.lat, n.lon], Math.max(mapa.getZoom(), 4), { animate: true });
      capaMarcadores.eachLayer((l) => {
        if (l.options?.className === "marcador-" + n.lugarId) l.openPopup();
      });
      destacarMarcador(n.lugarId);
    };
    el.tira.append(card);
  }
  el.tiraInfo.textContent = `${lista.length} visibles`;
}

window.__marcar = (lugarId) => {
  el.tira.scrollIntoView({ behavior: "smooth", block: "nearest" });
  destacarMarcador(lugarId);
  const primero = el.tira.querySelector(`.tarjeta[data-lugar="${CSS.escape(lugarId)}"]`);
  primero?.scrollIntoView({ behavior: "smooth", inline: "center" });
};

/* ------------------------------------------------------------------ */
/* Acciones de la interfaz                                             */
/* ------------------------------------------------------------------ */

let refTimer;
el.btnRefrescar.onclick = async () => {
  if (!hayServidor) return;
  el.btnRefrescar.disabled = true;
  el.btnRefrescar.textContent = "Actualizando…";
  el.carga.classList.remove("oculto");
  try {
    await pedir("/api/recopilar", { method: "POST" });
    // Actualiza la instantánea estática y vuelve a cargar
    const r = await fetch("datos/noticias.json", { cache: "no-store" });
    if (r.ok) {
      const d = await r.json();
      TODAS = Array.isArray(d.noticias) ? d.noticias : [];
    }
    await cargarFacetas();
    await cargarNoticias();
  } catch (e) {
    alert("No se pudo actualizar: " + e.message);
  } finally {
    el.carga.classList.add("oculto");
    el.btnRefrescar.disabled = false;
    el.btnRefrescar.textContent = "Actualizar";
  }
};

el.btnLimpiar.onclick = () => {
  estado.cats.clear();
  estado.lugares.clear();
  estado.fuentes.clear();
  estado.q = "";
  el.q.value = "";
  estado.horas = 0;
  el.horas.value = "0";
  estado.inferidas = "todas";
  pintarFiltros();
  cargarNoticias();
};

/* ------------------------------------------------------------------ */
/* Probador de clasificación                                           */
/* ------------------------------------------------------------------ */

$("#btn-probar").onclick = () => el.dlgProbar.showModal();

$("#p-ejecutar").onclick = async (ev) => {
  ev.preventDefault();
  const titulo = el.pTitulo.value.trim();
  if (!titulo) {
    el.pResultado.innerHTML = `<p class="muestreo">Escribe un titular.</p>`;
    return;
  }
  try {
    const r = probar(titulo, el.pDesc.value.trim());
    const cat = r.categoria;
    const color = CAT_COLORES[cat] ?? "#4c8dff";
    el.pResultado.innerHTML = `
      <p><span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[cat] ?? ""} ${esc(catNombre(cat))}</span>
         <span class="muestreo">puntuación ${r.puntuacion}</span></p>
      ${
        r.toponimo
          ? `<p>📍 Topónimo detectado: <strong>${esc(r.toponimo.nombre)}</strong>
             <span class="muestreo">(${r.toponimo.tipo}, en el ${r.toponimo.donde})</span></p>`
          : `<p class="muestreo">Sin topónimo en el texto.</p>`
      }
      ${
        r.final && r.final.inferida
          ? `<p class="muestreo">Se situaría en ${esc(r.final.nombre)} por el país del portal.</p>`
          : ""
      }
      <p class="muestreo">Otras: ${r.alternativas
        .slice(1)
        .map((a) => `${esc(catNombre(a.categoria))} (${a.puntuacion})`)
        .join(", ") || "—"}</p>`;
  } catch (e) {
    el.pResultado.innerHTML = `<p class="muestreo">Error: ${esc(e.message)}</p>`;
  }
};

el.btnTema.onclick = () => {
  const html = document.documentElement;
  const nuevo = html.dataset.tema === "claro" ? "oscuro" : "claro";
  html.dataset.tema = nuevo;
  el.btnTema.textContent = nuevo === "claro" ? "☀️" : "🌙";
  localStorage.setItem("tema", nuevo);
  // El mapa base son vectores con variables CSS: el cambio de tema es automático
};

const temaGuardado = localStorage.getItem("tema");
if (temaGuardado === "claro") el.btnTema.click();

let qTimer;
el.q.oninput = () => {
  clearTimeout(qTimer);
  qTimer = setTimeout(() => {
    estado.q = el.q.value.trim();
    refrescar();
  }, 300);
};

el.horas.onchange = () => {
  estado.horas = Number(el.horas.value);
  cargarNoticias();
};

$("#btn-tira-mas").onclick = () => el.tira.scrollBy({ left: 620, behavior: "smooth" });
$("#btn-tira-menos").onclick = () => el.tira.scrollBy({ left: -620, behavior: "smooth" });

/* ------------------------------------------------------------------ */
/* Estado del servidor                                                 */
/* ------------------------------------------------------------------ */

async function refrescarEstado() {
  if (!hayServidor) return;
  try {
    const e = await pedir("/api/estado");
    estadoServidor = e;
    const cuando = e.ultimaExitosa ? new Date(e.ultimaExitosa).toLocaleString("es") : "nunca";
    el.estadoFuentes.textContent =
      `${e.total} noticias · ${e.feedsOk}/${e.feedsTotales} feeds OK · ` +
      `${e.ubicacionesInferidas ?? 0} de país deducido · ` +
      `última actualización: ${cuando}${e.enCurso ? " · recopilando…" : ""}`;
  } catch {
    el.estadoFuentes.textContent = "Servidor local no disponible";
  }
}

/* ------------------------------------------------------------------ */
/* Arranque                                                            */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Arranque                                                            */
/* ------------------------------------------------------------------ */

(async function inicio() {
  cargando = true;
  try {
    const r = await fetch("datos/noticias.json", { cache: "no-cache" });
    if (r.ok) {
      const d = await r.json();
      TODAS = Array.isArray(d.noticias) ? d.noticias : [];
    } else {
      TODAS = [];
    }
  } catch {
    TODAS = [];
  }
  // Detecta si hay un servidor Express detrás
  try {
    const s = await fetch("api/salud", { cache: "no-store" });
    hayServidor = s.ok;
  } catch {
    hayServidor = false;
  }
  if (hayServidor) {
    el.btnRefrescar.style.display = "";
    el.btnRefrescar.onclick = async () => {
      el.btnRefrescar.disabled = true;
      el.btnRefrescar.textContent = "Actualizando…";
      el.carga.classList.remove("oculto");
      try {
        await pedir("api/recopilar", { method: "POST" });
        const r2 = await fetch("datos/noticias.json", { cache: "no-store" });
        if (r2.ok) {
          const d = await r2.json();
          TODAS = Array.isArray(d.noticias) ? d.noticias : [];
        }
        await cargarFacetas();
        await cargarNoticias();
      } catch (e) {
        alert("No se pudo actualizar: " + e.message);
      } finally {
        el.carga.classList.add("oculto");
        el.btnRefrescar.disabled = false;
        el.btnRefrescar.textContent = "Actualizar";
      }
    };
  } else {
    el.btnRefrescar.style.display = "none";
    el.btnRefrescar.onclick = null;
  }
  // Intenta cargar estado del servidor si lo hay
  await refrescarEstado();
  if (!TODAS.length && hayServidor) {
    const datos = await pedir("api/noticias?limite=1500");
    TODAS = datos.noticias;
  }
  cargando = false;
  el.subtitulo.textContent = "Datos cargados";
  pintarFiltros();
  pintarMapa();
  pintarTira();
  el.subtitulo.textContent =
    `${TODAS.length.toLocaleString("es")} noticias` +
    (estado.inferidas === "no" ? " · sólo topónimos" : estado.inferidas === "solo" ? " · sólo deducidas" : " · todas las temáticas");
})();

// Registrar el movimiento del mapa en la URL para compartir
mapa.on("moveend zoomend", () => {
  const c = mapa.getCenter();
  const p = new URLSearchParams(location.search);
  p.set("lat", c.lat.toFixed(3));
  p.set("lon", c.lng.toFixed(3));
  p.set("z", mapa.getZoom());
  history.replaceState(null, "", "?" + p);
});