import { FUENTES, FUENTE_POR_ID } from "../data/fuentes.js";
import { obtenerFeed } from "./rss.js";
import {
  clasificar,
  resolverUbicacion,
  limpiarAutor,
  imagenValida,
  paisPorDominio,
} from "./procesar.js";
import { CATEGORIAS } from "../data/categorias.js";
import { escribirEstatico } from "./estatico.js";
import {
  cargar,
  guardar,
  hash,
  ordenarYRecortar,
  type Noticia,
  type Estado,
} from "../almacen/tienda.js";

const UMBRAL_CATEGORIAS = 3;

let enCurso = false;

export function estaEjecutando(): boolean {
  return enCurso;
}

export interface Resultado {
  estado: Estado;
  noticiasAnadidas: number;
}

/**
 * Recorre todos los feeds, geolocaliza, clasifica y persiste.
 * Un mismo feed no se procesa dos veces en la misma pasada.
 */
export async function recopilar(opts: { verbose?: boolean } = {}): Promise<Resultado> {
  if (enCurso) {
    const { estado } = await cargar();
    return { estado, noticiasAnadidas: 0 };
  }
  enCurso = true;
  const log = (m: string) => opts.verbose !== false && console.log(m);
  const inicio = Date.now();

  const { noticias, estado: previo } = await cargar();
  const porId = new Map(noticias.map((n) => [n.id, n]));

  const feeds = FUENTES.flatMap((f) => f.feeds.map((url) => ({ fuente: f, url })));
  let feedsOk = 0;
  let feedsFallidos = 0;
  let leidos = 0;
  let nuevos = 0;
  let actualizados = 0;
  let sinUbicacion = 0;
  let inferidas = 0;
  const vista = new Set<string>();

  log(`▸ ${feeds.length} feeds de ${FUENTES.length} portales`);

  // Procesado con concurrencia limitada para no saturar los portales.
  const LIMITE = 8;
  let cursor = 0;

  async function trabajador() {
    while (cursor < feeds.length) {
      const idx = cursor++;
      const { fuente, url } = feeds[idx]!;
      try {
        const items = await obtenerFeed(fuente, url);
        if (items.length === 0) {
          feedsFallidos++;
          continue;
        }
        feedsOk++;
        leidos += items.length;

        for (const item of items) {
          const textoBusqueda = `${item.titulo} ${item.descripcion}`;
          const clave = item.enlace || item.guid;
          if (!clave || vista.has(clave)) continue;
          vista.add(clave);

          const id = await hash(`${fuente.id}|${clave}`);
          const existente = porId.get(id);

          // No re-geolocalizamos una noticia ya editada por el usuario.
          if (existente?.editada) continue;

          const geo = resolverUbicacion(
            item.titulo,
            item.descripcion,
            paisPorDominio(item.enlace) ?? fuente.paisPorDefecto
          );
          if (!geo) {
            sinUbicacion++;
            continue;
          }
          if (geo.inferida) inferidas++;

          const clas = clasificar(item.titulo, item.descripcion, item.categorias);
          const secundarias = clas.todas
            .filter((c) => c.puntuacion >= clas.puntuacion * 0.6 && c.categoria !== clas.categoria)
            .map((c) => c.categoria);

          const fechaIso = normalizaFecha(item.fecha);
          const noticia: Noticia = {
            id,
            titulo: item.titulo,
            enlace: item.enlace,
            descripcion: item.descripcion,
            imagen: imagenValida(item.imagen),
            autor: limpiarAutor(item.autor),
            fecha: fechaIso,
            fechaRecopilacion: existente?.fechaRecopilacion ?? new Date().toISOString(),
            fuenteId: fuente.id,
            fuenteNombre: fuente.nombre,
            fuenteColor: fuente.color,
            fuentePais: paisPorDominio(item.enlace) ?? fuente.paisPorDefecto ?? "",
            categoria: existente?.categoriaManual ?? clas.categoria,
            categorias: [clas.categoria, ...secundarias],
            lugarId: geo.lugar.id,
            lugarNombre: geo.lugar.nombre,
            lugarTipo: geo.lugar.tipo,
            ubicacionInferida: geo.inferida,
            lat: geo.lugar.lat,
            lon: geo.lugar.lon,
            ...(existente?.categoriaManual
              ? { categoriaManual: existente.categoriaManual, editada: existente.editada }
              : {}),
          };

          if (existente) {
            // Conservamos la fecha de recolección y la edición manual
            porId.set(id, { ...noticia, editada: existente.editada });
            actualizados++;
          } else {
            porId.set(id, noticia);
            nuevos++;
          }
        }
      } catch (err) {
        feedsFallidos++;
        log(`  ✗ ${url}: ${(err as Error).message}`);
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(LIMITE, feeds.length) }, trabajador));

  // Métricas por fuente
  const cuenta = new Map<string, number>();
  for (const n of porId.values()) cuenta.set(n.fuenteId, (cuenta.get(n.fuenteId) ?? 0) + 1);
  const porFuente = FUENTES.map((f) => ({
    fuente: f.id,
    nombre: f.nombre,
    nuevos: 0,
    total: cuenta.get(f.id) ?? 0,
  }));
  for (const n of porId.values()) {
    if (n.fechaRecopilacion.startsWith(new Date().toISOString().slice(0, 10))) {
      const e = porFuente.find((p) => p.fuente === n.fuenteId);
      if (e) e.nuevos++;
    }
  }

  const lista = ordenarYRecortar([...porId.values()]);
  const estado: Estado = {
    ultimaEjecucion: new Date().toISOString(),
    ultimaExitosa: feedsOk > 0 ? new Date().toISOString() : previo.ultimaExitosa,
    duracionMs: Date.now() - inicio,
    feedsTotales: feeds.length,
    feedsOk,
    feedsFallidos,
    articlesLeidos: leidos,
    articlesNuevos: nuevos,
    articlesActualizados: actualizados,
    sinUbicacion,
    ubicacionesInferidas: inferidas,
    porFuente,
  };

  await guardar({ noticias: lista, estado });
  // Misma instantánea que sirve el frontend estático publicado en Pages
  await escribirEstatico();
  enCurso = false;

  log(
    `✓ ${nuevos} nuevas, ${lista.length} en total · ${feedsOk}/${feeds.length} feeds ok · ` +
      `${inferidas} con país inferido · ${sinUbicacion} descartadas · ${estado.duracionMs} ms`
  );
  return { estado, noticiasAnadidas: nuevos };
}

function normalizaFecha(f?: string): string | undefined {
  if (!f) return undefined;
  const t = Date.parse(f);
  if (Number.isFinite(t)) return new Date(t).toISOString();
  return undefined;
}

export { CATEGORIAS, FUENTES, FUENTE_POR_ID };