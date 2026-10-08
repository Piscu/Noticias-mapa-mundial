/**
 * Núcleo compartido por el servidor Express y el navegador.
 *
 * El sitio publicado en GitHub Pages no tiene servidor detrás, así que la
 * interfaz tiene que filtrar las noticias y clasificar textos por su cuenta.
 * En lugar de mantener dos implementaciones —que terminan divergiendo—, este
 * módulo se empaqueta con esbuild para el navegador (`npm run web`) y se
 * importa igual desde `src/servidor.ts`.
 *
 * Regla de la casa: aquí sólo lógica pura y datos. Nada de `node:fs`, nada de
 * red, nada de `process`. Lo que toque salir de Node vive en `estatico.ts`.
 */
import { CATEGORIAS } from "../data/categorias.js";
import { FUENTES } from "../data/fuentes.js";
import { LUGARES, type Lugar } from "../data/gazetteer.js";
import type { Estado, Noticia } from "../almacen/tienda.js";
import { clasificar, geolocalizar, resolverUbicacion } from "./procesar.js";

/* ------------------------------------------------------------------ */
/* Filtros                                                             */
/* ------------------------------------------------------------------ */

export interface Filtro {
  /** Búsqueda libre sobre titular, descripción y nombre del portal. */
  q?: string;
  categorias?: string[];
  /** Nombres de lugar (no ids), como los devuelve `n.lugarNombre`. */
  lugares?: string[];
  fuentes?: string[];
  /** Ventana de horas hacia atrás contando desde `fecha` o `fechaRecopilacion`. */
  horas?: number;
  /** "todas" | "solo" las deducidas del país del portal | "no" (las deducidas). */
  inferidas?: "todas" | "no" | "solo";
  orden?: "fecha" | "relevancia";
  limite?: number;
}

/**
 * Filtra y recorta. Devuelve el mismo formato que expone la API:
 * `total` es el número de coincidencias y `noticias` sólo las primeras.
 */
export function consultarNoticias(
  noticias: Noticia[],
  f: Filtro = {}
): { total: number; noticias: Noticia[] } {
  const q = (f.q ?? "").toLowerCase().trim();
  const cats = f.categorias ?? [];
  const lugares = f.lugares ?? [];
  const fuentes = f.fuentes ?? [];
  const horas = f.horas ?? 0;
  const limite = Math.min(Math.max(Number(f.limite ?? 500) || 500, 1), 2500);

  let lista = noticias;

  if (q) {
    lista = lista.filter((n) =>
      (n.titulo + " " + n.descripcion + " " + n.fuenteNombre).toLowerCase().includes(q)
    );
  }
  if (cats.length) lista = lista.filter((n) => n.categorias.some((c) => cats.includes(c)));
  if (lugares.length) lista = lista.filter((n) => lugares.includes(n.lugarNombre));
  if (fuentes.length) lista = lista.filter((n) => fuentes.includes(n.fuenteId));
  if (horas > 0) {
    const desde = Date.now() - horas * 3_600_000;
    lista = lista.filter((n) => {
      const t = Date.parse(n.fecha ?? n.fechaRecopilacion);
      return Number.isFinite(t) ? t >= desde : false;
    });
  }
  if (f.inferidas === "solo") lista = lista.filter((n) => !n.ubicacionInferida);
  if (f.inferidas === "no") lista = lista.filter((n) => n.ubicacionInferida);

  if (f.orden === "relevancia") {
    // Más noticias por lugar primero, luego más recientes
    const cuenta = new Map<string, number>();
    for (const n of lista) cuenta.set(n.lugarId, (cuenta.get(n.lugarId) ?? 0) + 1);
    lista = [...lista].sort((a, b) => {
      const d = (cuenta.get(b.lugarId) ?? 0) - (cuenta.get(a.lugarId) ?? 0);
      if (d !== 0) return d;
      return fecha(b) - fecha(a);
    });
  }

  return { total: lista.length, noticias: lista.slice(0, limite) };
}

function fecha(n: Noticia): number {
  const t = Date.parse(n.fecha ?? n.fechaRecopilacion);
  return Number.isFinite(t) ? t : 0;
}

/* ------------------------------------------------------------------ */
/* Facetas                                                             */
/* ------------------------------------------------------------------ */

export interface Facetas {
  categorias: Array<{ id: string; nombre: string; color: string; total: number }>;
  lugares: Array<{ nombre: string; total: number }>;
  fuentes: Array<{ id: string; nombre: string; color: string; pais: string; total: number }>;
}

/** Recuentos globales por temática, lugar y portal. */
export function calcularFacetas(noticias: Noticia[]): Facetas {
  const porCat = new Map<string, number>();
  const porLugar = new Map<string, number>();
  const porFuente = new Map<string, number>();

  for (const n of noticias) {
    porCat.set(n.categoria, (porCat.get(n.categoria) ?? 0) + 1);
    porLugar.set(n.lugarNombre, (porLugar.get(n.lugarNombre) ?? 0) + 1);
    porFuente.set(n.fuenteId, (porFuente.get(n.fuenteId) ?? 0) + 1);
  }

  return {
    categorias: CATEGORIAS.map((c) => ({ ...c, total: porCat.get(c.id) ?? 0 })),
    lugares: [...porLugar.entries()]
      .map(([nombre, total]) => ({ nombre, total }))
      .sort((a, b) => b.total - a.total),
    fuentes: FUENTES.map((f) => ({
      id: f.id,
      nombre: f.nombre,
      color: f.color,
      pais: f.paisPorDefecto ?? "",
      total: porFuente.get(f.id) ?? 0,
    })).sort((a, b) => b.total - a.total),
  };
}

/* ------------------------------------------------------------------ */
/* Estado                                                              */
/* ------------------------------------------------------------------ */

/** Lo que la barra de pie muestra como «última actualización». */
export function estadoPublico(estado: Estado, total: number, enCurso: boolean) {
  return { ...estado, total, enCurso };
}

/* ------------------------------------------------------------------ */
/* Geografía                                                           */
/* ------------------------------------------------------------------ */

/** El gazetteer sin los alias: bastante para alinear mapa y filtros. */
export type LugarLigero = Omit<Lugar, "alias">;

/** El gazetteer entero, para alinear el mapa con los filtros de la barra. */
export function lugaresPublicos(): LugarLigero[] {
  return LUGARES.map((l) => ({
    id: l.id,
    nombre: l.nombre,
    tipo: l.tipo,
    lat: l.lat,
    lon: l.lon,
    pais: l.pais,
  }));
}

/* ------------------------------------------------------------------ */
/* Probador                                                            */
/* ------------------------------------------------------------------ */

export interface ResultadoPrueba {
  categoria: string;
  puntuacion: number;
  alternativas: Array<{ categoria: string; puntuacion: number }>;
  toponimo: {
    nombre: string;
    tipo: string;
    lat: number;
    lon: number;
    donde: string;
    coincidencias: string[];
  } | null;
  final: { nombre: string; lat: number; lon: number; inferida: boolean } | null;
}

/**
 * Clasifica y geolocaliza un texto libre. Es el mismo código que corre en el
 * servidor y en el navegador: el botón 🧪 funciona igual con y sin backend.
 */
export function probar(titulo: string, descripcion: string, paisPortal = ""): ResultadoPrueba {
  const c = clasificar(titulo, descripcion);
  const explicita = geolocalizar(titulo, descripcion);
  const conFallback = resolverUbicacion(titulo, descripcion, paisPortal || undefined);

  return {
    categoria: c.categoria,
    puntuacion: c.puntuacion,
    alternativas: c.todas.slice(0, 4),
    toponimo: explicita
      ? {
          nombre: explicita.lugar.nombre,
          tipo: explicita.lugar.tipo,
          lat: explicita.lugar.lat,
          lon: explicita.lugar.lon,
          donde: explicita.donde,
          coincidencias: explicita.coincidencias,
        }
      : null,
    final: conFallback
      ? {
          nombre: conFallback.lugar.nombre,
          lat: conFallback.lugar.lat,
          lon: conFallback.lugar.lon,
          inferida: conFallback.inferida,
        }
      : null,
  };
}
