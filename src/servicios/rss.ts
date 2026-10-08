import { XMLParser } from "fast-xml-parser";
import type { Fuente } from "../data/fuentes.js";

/**
 * Nota sobre `processEntities`: se deja desactivado a propósito. Con `true`,
 * fast-xml-parser lanza "Entity expansion limit exceeded" en feeds grandes que
 * repiten entidades HTML (`&nbsp;` miles de veces, habitual en El País o
 * La Vanguardia). Decodificamos las entidades a mano en `limpia()`.
 */
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
  parseTagValue: false,
  processEntities: false,
  htmlEntities: false,
  ignoreDeclaration: true,
  ignorePiTags: true,
});

export interface ItemCrudo {
  titulo: string;
  enlace: string;
  descripcion: string;
  guid: string;
  fecha?: string;
  imagen?: string;
  autor?: string;
  categorias: string[];
}

function toArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

function texto(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if (typeof v === "object") {
    const o = v as Record<string, unknown>;
    // CDATA puede venir como { "#text": "..." }
    if (typeof o["#text"] === "string") return o["#text"];
    if (Array.isArray(o["#text"])) return texto(o["#text"][0]);
  }
  return "";
}

const ENTIDADES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  laquo: "«", raquo: "»", ldquo: "“", rdquo: "”",
  lsquo: "‘", rsquo: "’", hellip: "…", mdash: "—", ndash: "–",
  deg: "°", euro: "€", copy: "©", reg: "®", trade: "™",
  middot: "·", bull: "•", eacute: "é", egrave: "è", agrave: "à",
  oacute: "ó", iacute: "í", uacute: "ú", aacute: "á", ntilde: "ñ",
};

function decodificaEntidades(s: string): string {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, ent: string) => {
    if (ent[0] === "#") {
      const code =
        ent[1] === "x" || ent[1] === "X"
          ? parseInt(ent.slice(2), 16)
          : parseInt(ent.slice(1), 10);
      return Number.isFinite(code) && code > 0 && code < 0x110000
        ? String.fromCodePoint(code)
        : m;
    }
    return ENTIDADES[ent.toLowerCase()] ?? m;
  });
}

function limpia(s: string): string {
  return decodificaEntidades(s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1"))
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normaliza y recorta descripciones larguísimas (muchos feeds HTML completo). */
function recorta(s: string, max = 400): string {
  if (s.length <= max) return s;
  const corte = s.slice(0, max);
  const ult = corte.lastIndexOf(" ");
  return (ult > max * 0.6 ? corte.slice(0, ult) : corte).trim() + "…";
}

export function parsearFeed(xml: string): ItemCrudo[] {
  let doc: Record<string, unknown>;
  try {
    doc = parser.parse(xml) as Record<string, unknown>;
  } catch (err) {
    console.warn(`  ! XML no parseable: ${(err as Error).message}`);
    return [];
  }

  // RSS 2.0: rss > channel > item   |   RDF: rdf:RDF > item   |   Atom: feed > entry
  const channel = (doc.rss as Record<string, unknown> | undefined)?.["channel"] as
    | Record<string, unknown>
    | undefined;
  const rssItems = channel ? toArray(channel["item"] as never) : [];
  const rdfItems = toArray((doc["rdf:RDF"] as Record<string, unknown> | undefined)?.["item"] as never);
  const atomEntries = toArray((doc.feed as Record<string, unknown> | undefined)?.["entry"] as never);

  const items = [...rssItems, ...rdfItems, ...atomEntries];
  const salida: ItemCrudo[] = [];

  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;
    const it = raw as Record<string, unknown>;

    const titulo = limpia(texto(it["title"]));
    if (!titulo) continue;

    let enlace = texto(it["link"]);
    if (!enlace || enlace.startsWith("/")) {
      const alt = it["link"] as Record<string, unknown> | undefined;
      if (alt && typeof alt["@_href"] === "string") enlace = alt["@_href"];
    }

    let imagen = texto(it["enclosure"] ? (it["enclosure"] as Record<string, unknown>)["@_url"] : "");
    if (!imagen) {
      const media = (it["media:content"] ?? it["media:thumbnail"]) as Record<string, unknown> | undefined;
      if (media && typeof media["@_url"] === "string") imagen = media["@_url"];
    }

    const descripcion = limpia(
      texto(it["description"] ?? it["summary"] ?? it["content"] ?? it["content:encoded"])
    );

    const guid =
      texto(it["guid"]) ||
      texto(it["id"]) ||
      enlace ||
      titulo;

    const fecha =
      texto(it["pubDate"]) ||
      texto(it["published"]) ||
      texto(it["dc:date"]) ||
      texto(it["updated"]) ||
      undefined;

    const categorias = [
      ...toArray(it["category"] as never).map((c) =>
        limpia(typeof c === "object" && c ? texto(c) || texto((c as Record<string, unknown>)["@_term"]) : texto(c))
      ),
      ...toArray(it["dc:subject"] as never).map((c) => limpia(texto(c))),
    ].filter(Boolean);

    salida.push({
      titulo,
      enlace: enlace.trim(),
      descripcion: recorta(descripcion),
      guid: guid.trim(),
      fecha,
      imagen: imagen || undefined,
      autor: limpia(texto(it["dc:creator"] ?? it["author"])) || undefined,
      categorias,
    });
  }

  return salida;
}

const UA =
  "Mozilla/5.0 (compatible; NoticiasMapaMundial/1.0; +https://localhost) RSS reader";

/** Descarga un feed con timeout y reintentos. */
export async function descargarFeed(url: string, intentos = 2): Promise<string | null> {
  for (let i = 0; i <= intentos; i++) {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15_000);
    try {
      const res = await fetch(url, {
        signal: ctrl.signal,
        redirect: "follow",
        headers: { "user-agent": UA, accept: "application/rss+xml, application/xml, text/xml, */*" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      if (i === intentos) {
        console.warn(`  ✗ feed fallido (${url}): ${(err as Error).message}`);
        return null;
      }
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    } finally {
      clearTimeout(t);
    }
  }
  return null;
}

/** Descarga y parsea un feed de una fuente. */
export async function obtenerFeed(fuente: Fuente, url: string): Promise<ItemCrudo[]> {
  const xml = await descargarFeed(url);
  if (!xml) return [];
  return parsearFeed(xml);
}