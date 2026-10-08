/**
 * Genera el mapa base: countries.geojson a partir de Natural Earth 110m.
 *
 *   npx tsx src/herramientas/mapa.ts            # usa public/vendor/paises-110m.geojson
 *   npx tsx src/herramientas/mapa.ts --descargar  # vuelve a bajarlo de Natural Earth
 *
 * Natural Earth es de dominio público. El archivo original pesa ~820 KB con
 * decenas de atributos por país; aquí se queda sólo con el código ISO y el
 * nombre en español, y las coordenadas se redondean a 2 decimales (~1 km, más
 * que suficiente para un mapa mundial). El resultado son ~120 KB que el
 * navegador puede pintar como vectores sin pedir nada a ningún servidor.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { RAIZ, DIR_DATOS } from "../almacen/tienda.js";

const ORIGEN =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

const DIR = path.join(RAIZ, "public", "vendor");
// La descarga original pesa ~820 KB y no se sirve: se queda en la caché.
const CACHE = path.join(DIR_DATOS, "cache");
const CRUDO = path.join(CACHE, "paises-110m.geojson");
const SALIDA = path.join(DIR, "paises-mundo.geojson");
const PRECISION = 2;

type Coord = number[];
type Geometria = { type: string; coordinates: Coord[] | Coord[][] | Coord[][][] };
interface PaisCrudo {
  type: "Feature";
  properties: Record<string, string>;
  geometry: Geometria;
}

async function descargar() {
  const res = await fetch(ORIGEN);
  if (!res.ok) throw new Error(`descarga fallida: HTTP ${res.status}`);
  const texto = await res.text();
  await fs.mkdir(CACHE, { recursive: true });
  await fs.writeFile(CRUDO, texto);
  console.log(`  descargado ${path.relative(RAIZ, CRUDO)} (${Math.round(texto.length / 1024)} KB)`);
}

/** Redondea recursivamente y elimina el último dígito vacío de cada punto. */
function redondear(coords: unknown): unknown {
  if (typeof coords === "number") {
    const r = Number(coords.toFixed(PRECISION));
    return Object.is(r, -0) ? 0 : r;
  }
  if (Array.isArray(coords)) return coords.map(redondear);
  return coords;
}

/** Quita puntos consecutivos idénticos: el redondeo deja dobles. */
function limpiar(coords: unknown): unknown {
  if (!Array.isArray(coords)) return coords;
  if (typeof coords[0] === "number") return coords;
  const salida: unknown[] = [];
  for (const punto of coords as unknown[]) {
    const clave = JSON.stringify(punto);
    if (salida.length && JSON.stringify(salida[salida.length - 1]) === clave) continue;
    salida.push(punto);
  }
  return salida;
}

/** Aplica redondeo + limpieza a cualquier anidamiento de coordenadas. */
function limpiarCoords(coords: unknown): unknown {
  if (!Array.isArray(coords)) return coords;
  if (typeof coords[0] === "number") return coords;
  if (typeof coords[0]?.[0] === "number") return limpiar(redondear(coords));
  return (coords as unknown[]).map(limpiarCoords);
}

function limpio(p: PaisCrudo) {
  const props = p.properties ?? ({} as Record<string, string>);
  const iso = (props.ISO_A2_EH ?? props.ISO_A2 ?? "").trim();
  const nombre = (props.NAME_ES ?? props.NAME ?? "").trim();
  // "-99" es el marcador de Natural Earth para "sin código ISO fiable"
  return {
    type: "Feature" as const,
    id: iso && iso !== "-99" ? iso : undefined,
    properties: { iso: iso && iso !== "-99" ? iso : "", nombre },
    geometry: {
      type: p.geometry.type,
      coordinates: limpiarCoords(p.geometry.coordinates),
    },
  };
}

async function main() {
  await fs.mkdir(DIR, { recursive: true });
  await fs.mkdir(CACHE, { recursive: true });
  const yaEsta = !!(await fs.stat(CRUDO).catch(() => null));
  if (!yaEsta || process.argv.includes("--descargar")) await descargar();

  if (!(await fs.stat(CRUDO).catch(() => null))) {
    console.error(`Falta ${path.relative(RAIZ, CRUDO)}. Usa --descargar para bajarlo.`);
    process.exit(1);
  }

  const crudo = JSON.parse(await fs.readFile(CRUDO, "utf8")) as {
    features: PaisCrudo[];
  };
  const salida = {
    type: "FeatureCollection" as const,
    features: crudo.features.map(limpio),
  };

  const texto = JSON.stringify(salida);
  await fs.writeFile(SALIDA, texto);

  const puntos = salida.features.reduce(
    (n, f) => n + JSON.stringify(f.geometry.coordinates).split("[").length - 1,
    0
  );
  const conIso = salida.features.filter((f) => f.properties.iso).length;
  console.log(`  ${salida.features.length} países (${conIso} con ISO), ${puntos} vértices`);
  console.log(`  ${path.relative(RAIZ, SALIDA)}  ${Math.round(texto.length / 1024)} KB`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});