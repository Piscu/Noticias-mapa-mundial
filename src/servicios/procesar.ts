import { INDICE, PAISES, pesoTipo, type Lugar } from "../data/gazetteer.js";
import { INDICE_TERMINOS } from "../data/categorias.js";
import { PAIS_POR_DOMINIO } from "../data/fuentes.js";

export interface NoticiaCruda {
  titulo: string;
  enlace: string;
  descripcion: string;
  guid: string;
  fecha?: string;
  imagen?: string;
  autor?: string;
  categoriasRss: string[];
  fuenteId: string;
  paisPorDefecto?: string;
}

export interface Ubicacion {
  lugar: Lugar;
  puntuacion: number;
  coincidencias: string[];
  /** Texto en el que se encontró la coincidencia. */
  donde: "titulo" | "resumen";
}

/** Normaliza para comparar: minúsculas, sin acentos, sin puntuación. */
export const normalizar = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Comprueba si un alias aparece en el texto respetando los límites de palabra,
 * de modo que "san francisco" case como topónimo y no "francisco" suelto.
 * Los alias ya vienen normalizados (sin acentos ni puntuación).
 */
function contiene(texto: string, alias: string): boolean {
  const re = new RegExp(`(?<![a-z0-9])${alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z0-9])`);
  return re.test(texto);
}

/* ------------------------------------------------------------------ */
/* Geolocalización                                                     */
/* ------------------------------------------------------------------ */

/**
 * Busca lugares en un texto y devuelve candidatos ordenados.
 *
 * Puntuación:
 *   · coincidencia como palabra entera: 4
 *   · coincidencia como fragmento (p. ej. dentro de un topónimo largo): 1.6
 *   · cada aparición se acumula, así que un lugar repetido gana
 *   · el título pesa el triple que el resumen
 *   · el tipo pondera: país ×3, ciudad ×2, región ×1
 *
 * Se exige una puntuación mínima para evitar que un topónimo accidental en el
 * cuerpo del artículo (mencionado de pasada) sitúe la noticia.
 */
export function detectarLugares(
  titulo: string,
  descripcion: string
): Ubicacion[] {
  const t = normalizar(titulo);
  const d = normalizar(descripcion);
  const palabrasT = new Set(t.split(" ").filter(Boolean));
  const palabrasD = new Set(d.split(" ").filter(Boolean));

  const puntos = new Map<string, Ubicacion & { enTitulo: boolean }>();

  const evaluar = (texto: string, palabras: Set<string>, mult: number, enTitulo: boolean) => {
    for (const [alias, lugares] of INDICE) {
      const entera = palabras.has(alias) || contiene(texto, alias);
      if (!entera) continue;

      const base = 4 * mult * pesoTipo(lugares[0]!);
      for (const lugar of lugares) {
        const p = base * (pesoTipo(lugar) / pesoTipo(lugares[0]!));
        const prev = puntos.get(lugar.id);
        if (prev) {
          prev.puntuacion += p;
          prev.enTitulo = prev.enTitulo || enTitulo;
          if (!prev.coincidencias.includes(alias)) prev.coincidencias.push(alias);
        } else {
          puntos.set(lugar.id, {
            lugar,
            puntuacion: p,
            coincidencias: [alias],
            enTitulo,
            donde: enTitulo ? "titulo" : "resumen",
          });
        }
      }
    }
  };

  evaluar(t, palabrasT, 3, true);
  evaluar(d, palabrasD, 1, false);

  // Al menos una coincidencia en el titular, o una reiteración en el cuerpo.
  const candidatos = [...puntos.values()].filter((u) => {
    const repeticiones = u.coincidencias.length + (u.enTitulo ? 0 : 1);
    return u.enTitulo || u.puntuacion >= 6;
  });

  candidatos.sort((a, b) => b.puntuacion - a.puntuacion);

  // Cuando el mejor es una región, se dibuja en el país (el mapa es mundial).
  return candidatos.map((u) => {
    if (u.lugar.tipo !== "region") return { lugar: u.lugar, puntuacion: u.puntuacion, coincidencias: u.coincidencias, donde: u.donde };
    const padre = candidatos.find((c) => c.lugar.tipo === "pais" && c.lugar.pais === u.lugar.pais);
    return {
      lugar: padre?.lugar ?? u.lugar,
      puntuacion: u.puntuacion,
      coincidencias: u.coincidencias,
      donde: u.donde,
    };
  });
}

/**
 * Ubicación de la noticia.
 *
 * Primero se busca un topónimo explícito en el titular y, si no, en el resumen.
 * Si no hay ninguno, `resolverUbicacion` recurre al país del portal de origen:
 * una noticia de El País sin topónimo es, casi siempre, una noticia de España.
 */
export function geolocalizar(titulo: string, descripcion: string): Ubicacion | null {
  const porTitulo = detectarLugares(titulo, "");
  if (porTitulo.length > 0) return porTitulo[0]!;
  const porDesc = detectarLugares("", descripcion);
  return porDesc.length > 0 ? porDesc[0]! : null;
}

/**
 * Igual que `geolocalizar` pero, si no encuentra topónimo, usa el país del
 * portal. Marca el resultado con `inferida: true` para que la interfaz pueda
 * distinguirla de una geolocalización explícita.
 */
export function resolverUbicacion(
  titulo: string,
  descripcion: string,
  isoPaisPortal?: string
): (Ubicacion & { inferida: boolean }) | null {
  const explicita = geolocalizar(titulo, descripcion);
  if (explicita) return { ...explicita, inferida: false };

  if (isoPaisPortal) {
    const pais = PAISES.find((p) => p.pais.toUpperCase() === isoPaisPortal.toUpperCase());
    if (pais) {
      return {
        lugar: pais,
        puntuacion: 0,
        coincidencias: [],
        donde: "resumen",
        inferida: true,
      };
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Temáticas                                                           */
/* ------------------------------------------------------------------ */

export interface Clasificacion {
  categoria: string;
  puntuacion: number;
  todas: Array<{ categoria: string; puntuacion: number }>;
}

/** Suma los pesos de los términos que aparecen como palabras sueltas. */
function contar(terminos: Map<string, number>, palabras: Set<string>): number {
  let n = 0;
  for (const termino of terminos.keys()) {
    if (palabras.has(termino)) n += terminos.get(termino)!;
  }
  return n;
}

/** Los términos de varias palabras se buscan como frase y pesan algo más. */
function contarFrases(terminos: Map<string, number>, texto: string): number {
  let n = 0;
  for (const [termino, peso] of terminos) {
    if (!termino.includes(" ")) continue;
    if (texto.includes(termino)) n += peso * 1.5;
  }
  return n;
}

/** Índice término -> categoría (con pesos), para poder puntuar por categoría. */
function indicePorCategoria(): Map<string, Map<string, number>> {
  const m = new Map<string, Map<string, number>>();
  for (const [termino, entradas] of INDICE_TERMINOS) {
    for (const { categoria, peso } of entradas) {
      const sub = m.get(categoria) ?? new Map<string, number>();
      sub.set(termino, (sub.get(termino) ?? 0) + peso);
      m.set(categoria, sub);
    }
  }
  return m;
}

const INDICE_CATEGORIAS = indicePorCategoria();

export function clasificar(
  titulo: string,
  descripcion: string,
  categoriasRss: string[] = []
): Clasificacion {
  const t = normalizar(titulo);
  const d = normalizar(descripcion);
  const palabrasT = new Set(t.split(" ").filter(Boolean));
  const palabrasD = new Set(d.split(" ").filter(Boolean));

  const puntos = new Map<string, number>();

  for (const [categoria, terminos] of INDICE_CATEGORIAS) {
    const puntosTitulo = contar(terminos, palabrasT) * 3 + contarFrases(terminos, t) * 3;
    const puntosResumen = contar(terminos, palabrasD) + contarFrases(terminos, d);
    const total = puntosTitulo + puntosResumen;
    if (total > 0) puntos.set(categoria, total);
  }

  // La sección del RSS sólo sirve para desempatar, con un peso bajo.
  const rssNorm = categoriasRss.map(normalizar).filter(Boolean);
  if (rssNorm.length) {
    for (const [categoria, terminos] of INDICE_CATEGORIAS) {
      const nombre = normalizar(categoria);
      const encaja = rssNorm.some(
        (r) => r === nombre || r.startsWith(nombre + " ") || nombre.startsWith(r + " ")
      );
      if (encaja) puntos.set(categoria, (puntos.get(categoria) ?? 0) + 5);
      void terminos;
    }
  }

  const todas = [...puntos.entries()]
    .map(([categoria, puntuacion]) => ({
      categoria,
      puntuacion: Math.round(puntuacion * 10) / 10,
    }))
    .sort((a, b) => b.puntuacion - a.puntuacion);

  const top = todas[0];
  return {
    categoria: top?.categoria ?? "sociedad",
    puntuacion: top?.puntuacion ?? 0,
    todas,
  };
}

/* ------------------------------------------------------------------ */
/* Utilidades de texto                                                */
/* ------------------------------------------------------------------ */

/** "EFE, Madrid" -> "EFE". */
export function limpiarAutor(a?: string): string | undefined {
  if (!a) return undefined;
  const limpio = a.replace(/\s*[,(].*$/, "").trim();
  return limpio.length > 2 && limpio.length < 60 ? limpio : undefined;
}

/** Sólo URLs http(s) y sin imágenes de relleno. */
export function imagenValida(url?: string): string | undefined {
  if (!url) return undefined;
  if (!/^https?:\/\//i.test(url)) return undefined;
  if (/\/(blank|spacer|placeholder|1x1|pixel)\b/i.test(url)) return undefined;
  return url;
}

/** País ISO a partir del dominio de la URL del artículo. */
export function paisPorDominio(url: string): string | undefined {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "").toLowerCase();
    return PAIS_POR_DOMINIO[host];
  } catch {
    return undefined;
  }
}