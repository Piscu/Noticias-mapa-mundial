import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
export const RAIZ = path.resolve(aqui, "..", "..");
export const DIR_DATOS = path.join(RAIZ, "datos");
export const ARCHIVO = path.join(DIR_DATOS, "noticias.json");
export const ARCHIVO_LOCK = path.join(DIR_DATOS, "estado.json");

export interface Noticia {
  id: string;
  titulo: string;
  enlace: string;
  descripcion: string;
  imagen?: string;
  autor?: string;
  /** Fecha de publicación en ISO, si el feed la trae. */
  fecha?: string;
  /** Fecha en la que el pipeline la vio por primera vez. */
  fechaRecopilacion: string;
  fuenteId: string;
  fuenteNombre: string;
  fuenteColor: string;
  fuentePais: string;
  categoria: string;
  /** Todas las temáticas que superaron el umbral, para filtros combinados. */
  categorias: string[];
  lugarId: string;
  lugarNombre: string;
  lugarTipo: "pais" | "region" | "ciudad";
  /**
   * true = el topónimo se dedujo del país del portal, no aparece en el texto.
   * La interfaz lo marca para no presentar una inferencia como un hecho.
   */
  ubicacionInferida: boolean;
  lat: number;
  lon: number;
  /** Etiqueta manual aplicada desde la interfaz; gana sobre la automática. */
  categoriaManual?: string;
  /** Marca de que el usuario la editó, para no sobrescribirla al re-recopilar. */
  editada?: boolean;
}

export interface Estado {
  ultimaEjecucion?: string;
  ultimaExitosa?: string;
  duracionMs?: number;
  feedsTotales: number;
  feedsOk: number;
  feedsFallidos: number;
  articlesLeidos: number;
  articlesNuevos: number;
  articlesActualizados: number;
  sinUbicacion: number;
  /** Noticias cuya ubicación se dedujo del portal, sin topónimo en el texto. */
  ubicacionesInferidas: number;
  porFuente: Array<{ fuente: string; nombre: string; nuevos: number; total: number }>;
}

export const MAX_ITEMS = 2500;
const MAX_ANTIGUEDAD_DIAS = 14;

interface Archivo {
  noticias: Noticia[];
  estado: Estado;
}

const vacio: Archivo = {
  noticias: [],
  estado: {
    feedsTotales: 0,
    feedsOk: 0,
    feedsFallidos: 0,
    articlesLeidos: 0,
    articlesNuevos: 0,
    articlesActualizados: 0,
    sinUbicacion: 0,
    ubicacionesInferidas: 0,
    porFuente: [],
  },
};

let cache: Archivo | null = null;
let escribiendo: Promise<void> = Promise.resolve();

export async function cargar(): Promise<Archivo> {
  if (cache) return cache;
  try {
    const txt = await fs.readFile(ARCHIVO, "utf8");
    cache = JSON.parse(txt) as Archivo;
  } catch {
    cache = structuredClone(vacio);
  }
  return cache!;
}

/** Escritura atómica y serializada para evitar corrupción por concurrencia. */
export async function guardar(datos: Archivo): Promise<void> {
  cache = datos;
  const tmp = `${ARCHIVO}.tmp`;
  escribiendo = escribiendo.then(async () => {
    await fs.mkdir(DIR_DATOS, { recursive: true });
    await fs.writeFile(tmp, JSON.stringify(datos), "utf8");
    await fs.rename(tmp, ARCHIVO);
  });
  await escribiendo;
}

export function ordenarYRecortar(lista: Noticia[]): Noticia[] {
  const ahora = Date.now();
  const limite = ahora - MAX_ANTIGUEDAD_DIAS * 86_400_000;
  return lista
    .filter((n) => {
      const ref = Date.parse(n.fecha ?? n.fechaRecopilacion);
      return Number.isFinite(ref) ? ref >= limite : true;
    })
    .sort((a, b) => {
      const fa = Date.parse(a.fecha ?? a.fechaRecopilacion);
      const fb = Date.parse(b.fecha ?? b.fechaRecopilacion);
      return (Number.isFinite(fb) ? fb : 0) - (Number.isFinite(fa) ? fa : 0);
    })
    .slice(0, MAX_ITEMS);
}

/** Hash estable y corto para el id. */
export async function hash(entrada: string): Promise<string> {
  const { createHash } = await import("node:crypto");
  return createHash("sha1").update(entrada).digest("hex").slice(0, 12);
}