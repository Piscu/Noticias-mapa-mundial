import express from "express";
import path from "node:path";
import cron from "node-cron";
import { promises as fs } from "node:fs";
import { CATEGORIAS } from "./data/categorias.js";
import { cargar, guardar, RAIZ } from "./almacen/tienda.js";
import { recopilar, estaEjecutando } from "./servicios/recopilador.js";
import { escribirEstatico } from "./servicios/estatico.js";
import {
  calcularFacetas,
  consultarNoticias,
  estadoPublico,
  lugaresPublicos,
  probar,
} from "./servicios/nucleo.js";

const app = express();
const PUERTO = Number(process.env.PORT ?? 3000);
const INTERVALO_MIN = Number(process.env.INTERVALO_MIN ?? 60);

app.use(express.json());
app.use(express.static(path.join(RAIZ, "public")));

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

app.get("/api/noticias", async (req, res) => {
  const { noticias } = await cargar();
  res.json(
    consultarNoticias(noticias, {
      q: String(req.query.q ?? ""),
      categorias: splitList(req.query.categoria),
      lugares: splitList(req.query.pais),
      fuentes: splitList(req.query.fuente),
      horas: req.query.horas ? Number(req.query.horas) : 0,
      inferidas: (req.query.inferidas as "todas" | "no" | "solo" | undefined) ?? "todas",
      orden: req.query.orden === "relevancia" ? "relevancia" : "fecha",
      limite: Number(req.query.limite ?? 500),
    })
  );
});

app.get("/api/facetas", async (_req, res) => {
  const { noticias } = await cargar();
  res.json(calcularFacetas(noticias));
});

app.get("/api/estado", async (_req, res) => {
  const { estado, noticias } = await cargar();
  res.json(estadoPublico(estado, noticias.length, estaEjecutando()));
});

/** Clasificación automática de un texto libre. */
app.post("/api/clasificar", (req, res) => {
  const { titulo = "", descripcion = "" } = req.body ?? {};
  const r = probar(String(titulo), String(descripcion));
  res.json({
    categoria: r.categoria,
    puntuacion: r.puntuacion,
    alternativas: r.alternativas,
    lugar: r.toponimo
      ? { nombre: r.toponimo.nombre, lat: r.toponimo.lat, lon: r.toponimo.lon }
      : null,
  });
});

/** Reetiquetar manualmente una noticia. */
app.patch("/api/noticias/:id", async (req, res) => {
  const { noticias, estado } = await cargar();
  const n = noticias.find((x) => x.id === req.params.id);
  if (!n) return res.status(404).json({ error: "noticia no encontrada" });

  const cat = String(req.body?.categoria ?? "");
  if (!CATEGORIAS.some((c) => c.id === cat)) {
    return res.status(400).json({ error: "categoría no válida", validas: CATEGORIAS.map((c) => c.id) });
  }
  n.categoriaManual = cat;
  n.categoria = cat;
  n.editada = true;
  n.categorias = [cat, ...n.categorias.filter((c) => c !== cat)];
  await guardar({ noticias, estado });
  await escribirEstatico();
  res.json(n);
});

app.post("/api/recopilar", async (_req, res) => {
  if (estaEjecutando()) return res.status(409).json({ error: "ya hay una recopilación en curso" });
  try {
    const { estado } = await recopilar({ verbose: true });
    res.json(estado);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get("/api/lugares", (_req, res) => {
  res.json(lugaresPublicos());
});

/** Comprobación de la geolocalización y la clasificación con un texto libre. */
app.post("/api/probar", (req, res) => {
  const { titulo = "", descripcion = "", paisPortal = "" } = req.body ?? {};
  res.json(probar(String(titulo), String(descripcion), String(paisPortal)));
});

/* ------------------------------------------------------------------ */

app.get("/api/salud", (_req, res) => res.json({ ok: true, hora: new Date().toISOString() }));

// Cualquier otra ruta cae en el frontend
app.get("*", async (_req, res) => {
  res.sendFile(path.join(RAIZ, "public", "index.html"));
});

function splitList(v: unknown): string[] {
  if (v == null) return [];
  const s = Array.isArray(v) ? v.join(",") : String(v);
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

/* ------------------------------------------------------------------ */
/* Arranque                                                            */
/* ------------------------------------------------------------------ */

async function main() {
  await fs.mkdir(path.join(RAIZ, "datos"), { recursive: true });
  await cargar();
  // Siembra public/datos/ para que el frontend (que lee ficheros, no la API)
  // arranque con datos frescos aunque no haya habido ninguna recopilación.
  await escribirEstatico();

  const servidor = app.listen(PUERTO);

  // Los errores de red llegan después, por evento: hay que declararlos aquí
  // o Node acaba volcando un stack incomprensible.
  servidor.on("error", (e: NodeJS.ErrnoException) => {
    if (e.code === "EADDRINUSE") {
      console.error(`\n  El puerto ${PUERTO} ya está ocupado por otro proceso.`);
      console.error("  Ciérralo, o arranca éste en otro puerto:");
      console.error(`\n    PORT=${PUERTO + 1} npm start\n`);
      console.error(
        `  (En Windows puedes ver quién lo ocupa con: netstat -ano | findstr :${PUERTO})`
      );
    } else {
      console.error(`\n  No se pudo abrir el servidor: ${e.message}`);
    }
    process.exit(1);
  });

  // Todo lo que depende de que el puerto se haya abierto va en el callback
  servidor.on("listening", () => {
    console.log(`\n  Noticias · mapa mundial`);
    console.log(`  http://localhost:${PUERTO}\n`);
    console.log(`  Actualización automática cada ${INTERVALO_MIN} min`);
    if (INTERVALO_MIN > 0) console.log(`  Cron activo: */${INTERVALO_MIN} * * * *`);

    // Primera recopilación al arrancar, shortly después
    setTimeout(() => {
      console.log("▸ Compilando noticias iniciales…");
      recopilar().catch((e) => console.error("Error en la recopilación:", e));
    }, 500);
  });

  if (INTERVALO_MIN > 0) {
    const expr = `*/${INTERVALO_MIN} * * * *`;
    cron.schedule(expr, () => {
      console.log(`\n▸ Recopilación programada (${INTERVALO_MIN} min)`);
      recopilar().catch((e) => console.error("Error en la recopilación:", e));
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});