/**
 * Sonda de URLs de feeds: comprueba cuáles responden con XML válido.
 *   npx tsx src/herramientas/sonda.ts
 */
import { descargarFeed, parsearFeed } from "../servicios/rss.js";

const CANDIDATOS: Array<[string, string[]]> = [
  ["elpais", [
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/internacional",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/economia",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/ciencia",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/cultura",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/deportes",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/sociedad",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/sucesos",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/clima-y-medio-ambiente",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/tecnologia",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/mexico",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/america",
  ]],
  ["elmundo", [
    "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/internacional.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/economia.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/ciencia.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/cultura.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/deportes.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/espana.xml",
  ]],
  ["lavanguardia", [
    "https://www.lavanguardia.com/rss/home.xml",
    "https://www.lavanguardia.com/rss/internacional.xml",
    "https://www.lavanguardia.com/rss/economia.xml",
    "https://www.lavanguardia.com/rss/ciencia-y-salud.xml",
    "https://www.lavanguardia.com/rss/cultura.xml",
    "https://www.lavanguardia.com/rss/deportes.xml",
    "https://www.lavanguardia.com/rss/politica.xml",
  ]],
  ["abc", [
    "https://www.abc.es/rss/2.0/portada/",
    "https://www.abc.es/rss/2.0/internacional/",
    "https://www.abc.es/rss/2.0/economia/",
    "https://www.abc.es/rss/2.0/ciencia/",
    "https://www.abc.es/rss/2.0/cultura/",
    "https://www.abc.es/rss/2.0/deportes/",
  ]],
  ["elconfidencial", [
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/portada.xml",
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/internacional.xml",
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/economia.xml",
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/ciencia.xml",
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/tecnologia.xml",
    "https://e00-elmundo.uecdn.es/elconfidencial/rss/deportes.xml",
  ]],
  ["eldiario-es", [
    "https://www.eldiario.es/rss/",
    "https://www.eldiario.es/internacional/rss/",
    "https://www.eldiario.es/economia/rss/",
    "https://www.eldiario.es/politica/rss/",
    "https://www.eldiario.es/sociedad/rss/",
    "https://www.eldiario.es/clima/rss/",
  ]],
  ["elpais-mx", [
    "https://www.eluniversal.com.mx/rss.xml",
    "https://www.eluniversal.com.mx/arc/outboundfeeds/rss/",
    "https://www.eluniversal.com.mx/rss/portada.xml",
    "https://www.eluniversal.com.mx/arc/outboundfeeds/rss/?outputType=xml",
  ]],
  ["milenio", [
    "https://www.milenio.com/rss",
    "https://www.milenio.com/rss.xml",
    "https://www.milenio.com/feed",
    "https://www.milenio.com/arc/outboundfeeds/rss/",
    "https://www.milenio.com/rss/mundo",
  ]],
  ["animalpolitico", [
    "https://animalpolitico.com/feed/",
    "https://animalpolitico.com/rss/",
    "https://animalpolitico.com/mexico/feed/",
    "https://animalpolitico.com/internacional/feed/",
  ]],
  ["infobae", [
    "https://www.infobae.com/feeds/rss/",
    "https://www.infobae.com/arc/outboundfeeds/rss/",
    "https://www.infobae.com/arc/outboundfeeds/rss/category/politica/",
    "https://www.infobae.com/feeds/rss/politica/",
    "https://www.infobae.com/rss",
  ]],
  ["clarin", [
    "https://www.clarin.com/rss/mundo/",
    "https://www.clarin.com/rss/politica/",
    "https://www.clarin.com/rss/economia/",
  ]],
  ["lanacion", [
    "https://www.lanacion.com.ar/rss",
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/",
    "https://www.lanacion.com.ar/politica/rss",
    "https://www.lanacion.com.ar/mundo/rss",
    "https://www.lanacion.com.ar/feed/",
  ]],
  ["eltiempo", [
    "https://www.eltiempo.com/rss/mundo.xml",
    "https://www.eltiempo.com/rss/politica.xml",
    "https://www.eltiempo.com/rss/economia.xml",
  ]],
  ["elespectador", [
    "https://www.elespectador.com/rss.xml",
    "https://www.elespectador.com/arc/outboundfeeds/rss/",
    "https://www.elespectador.com/rss/mundo.xml",
    "https://www.elespectador.com/feed",
  ]],
  ["elcomercio-pe", [
    "https://elcomercio.pe/rss/",
    "https://elcomercio.pe/rss/politica/",
    "https://elcomercio.pe/rss/economia/",
    "https://elcomercio.pe/arc/outboundfeeds/rss/",
    "https://elcomercio.pe/rss/portada.xml",
  ]],
  ["emol", [
    "https://feeds.emol.com/emol/noticias/internacional",
    "https://feeds.emol.com/emol/noticias/nacional",
    "https://www.emol.com/rss/noticias/internacional.xml",
    "https://www.emol.com/arc/outboundfeeds/rss/",
  ]],
  ["latercera", [
    "https://www.latercera.com/rss",
    "https://www.latercera.com/arc/outboundfeeds/rss/",
    "https://www.latercera.com/rss.xml",
    "https://www.latercera.com/feed",
  ]],
  ["elnacional-ve", [
    "https://www.elnacional.com/rss",
    "https://www.elnacional.com/rss.xml",
    "https://www.elnacional.com/feed",
  ]],
  ["primicias", [
    "https://www.primicias.ec/feed/",
    "https://www.primicias.ec/noticias/rss.xml",
    "https://www.primicias.ec/rss/",
    "https://www.primicias.ec/arc/outboundfeeds/rss/",
  ]],
  ["elmonte-py", [
    "https://elmonte.com.py/feed/",
    "https://elmonte.com.py/rss/",
    "https://elmonte.com.py/arc/outboundfeeds/rss/",
  ]],
  ["eldeber", [
    "https://eldeber.com.bo/rss",
    "https://eldeber.com.bo/feed",
    "https://eldeber.com.bo/rss/",
  ]],
  ["elpais-uy", [
    "https://elpais.com.uy/rss/ultimasnoticias.xml",
    "https://elpais.com.uy/rss/internacional.xml",
    "https://elpais.com.uy/feed/",
  ]],
  ["nacion-cr", [
    "https://www.nacion.com/rss",
    "https://www.nacion.com/arc/outboundfeeds/rss/",
    "https://www.nacion.com/feed",
  ]],
  ["laprensaguate", [
    "https://www.laprensaguate.com/rss/",
    "https://www.laprensaguate.com/feed/",
    "https://www.laprensaguate.com/rss.xml",
  ]],
  ["diariolibre", [
    "https://www.diariolibre.com/rss/todas-las-noticias.xml",
    "https://www.diariolibre.com/rss/internacional.xml",
    "https://www.diariolibre.com/rss.xml",
    "https://www.diariolibre.com/feed/",
    "https://www.diariolibre.com/rss/mundo.xml",
  ]],
  ["univision", [
    "https://noticias.univision.com/feed",
    "https://noticias.univision.com/rss/internacional",
    "https://noticias.univision.com/arc/outboundfeeds/rss/",
    "https://noticias.univision.com/rss",
  ]],
  ["cnn-es", [
    "https://cnnespanol.cnn.com/rss",
    "https://cnnespanol.cnn.com/rss/internacional/rss.xml",
    "https://cnnespanol.cnn.com/rss/mundo/rss.xml",
    "https://cnnespanol.cnn.com/arc/outboundfeeds/rss/",
    "https://feeds.cnn.com/rss/edicion_latam.rss",
  ]],
  ["bbc-mundo", [
    "https://feeds.bbci.co.uk/mundo/rss.xml",
  ]],
  ["dw", [
    "https://rss.dw.com/rdf/rss-es-all",
    "https://rss.dw.com/rdf/rss-es-latam",
  ]],
  ["rfi", [
    "https://www.rfi.fr/es/rss",
    "https://www.rfi.fr/es/rss/",
  ]],
  ["expansion", [
    "https://www.expansion.com/rss",
    "https://www.expansion.com/economia/rss.xml",
    "https://www.expansion.com/fintech/rss.xml",
    "https://www.expansion.com/arc/outboundfeeds/rss/",
  ]],
  ["elfinanciero", [
    "https://www.elfinanciero.com.mx/rss",
    "https://www.elfinanciero.com.mx/mercados/rss",
    "https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/",
  ]],
  ["euronews", [
    "https://www.euronews.com/rss",
    "https://www.euronews.com/rss?language=es",
  ]],
  ["telesur", [
    "https://www.telesurenglish.net/rss",
    "https://www.telesurenglish.net/feed/",
  ]],
  ["latampost", [
    "https://www.latampost.com/rss",
    "https://www.latampost.com/feed/",
  ]],
  ["20minutos", [
    "https://www.20minutos.es/rss/todas-las-noticias/",
    "https://www.20minutos.es/rss/",
    "https://www.20minutos.es/arc/outboundfeeds/rss/",
    "https://www.20minutos.es/rss/mundo/",
  ]],
  ["elnacional-cat", [
    "https://www.elnacional.cat/rss.xml",
    "https://www.elnacional.cat/feed/",
    "https://www.elnacional.cat/arc/outboundfeeds/rss/",
  ]],
  ["levante-emv", [
    "https://www.levante-emv.com/rss/todas-noticias.xml",
    "https://www.levante-emv.com/feed/",
    "https://www.levante-emv.com/rss/",
  ]],
  ["hoy-mx", [
    "https://www.hoy.com.mx/rss",
    "https://www.hoy.com.mx/feed/",
    "https://www.hoy.com.mx/arc/outboundfeeds/rss/",
  ]],
  ["notitarde", [
    "https://notitarde.com.do/rss",
    "https://notitarde.com.do/feed/",
  ]],
  ["confidencial-ni", [
    "https://confidencial.com/rss",
    "https://confidencial.com/feed/",
  ]],
  ["efectococuyo", [
    "https://efectococuyo.com/rss/",
    "https://efectococuyo.com/feed/",
  ]],
  ["eluniversaldo", [
    "https://www.eluniversaldo.com/feed/",
    "https://www.eluniversaldo.com/rss/",
  ]],
  ["telemiguel", [
    "https://telemiguel.com/rss/",
    "https://telemiguel.com/feed/",
  ]],
  ["ultimahora-py", [
    "https://www.ultimahora.com/rss/portada.xml",
    "https://www.ultimahora.com/feed/",
    "https://www.ultimahora.com/rss/",
  ]],
  ["eltiempo-dominicano", [
    "https://eltiempo.com.do/rss",
    "https://eltiempo.com.do/feed/",
  ]],
  // ---- ronda 2: variantes Arc Publishing (?outputType=xml) ----
  ["elconfidencial", [
    "https://www.elconfidencial.com/rss",
    "https://www.elconfidencial.com/arc/outboundfeeds/rss/?outputType=xml",
  ]],
  ["milenio", [
    "https://www.milenio.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.milenio.com/rss/politica",
    "https://www.milenio.com/rss/mundo",
  ]],
  ["animalpolitico", [
    "https://animalpolitico.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://animalpolitico.com/rss/mexico/",
    "https://animalpolitico.com/rss/internacional/",
  ]],
  ["elespectador", [
    "https://www.elespectador.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.elespectador.com/rss/mundo.xml",
  ]],
  ["elcomercio-pe", [
    "https://elcomercio.pe/arc/outboundfeeds/rss/?outputType=xml",
    "https://elcomercio.pe/rss/politica.xml",
    "https://elcomercio.pe/rss/economia.xml",
  ]],
  ["emol", [
    "https://www.emol.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.emol.com/noticias/internacional/rss.xml",
    "https://www.emol.com/noticias/nacional/rss.xml",
  ]],
  ["primicias", [
    "https://www.primicias.ec/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.primicias.ec/noticias/rss.xml",
  ]],
  ["elmonte-py", [
    "https://elmonte.com.py/arc/outboundfeeds/rss/?outputType=xml",
    "https://elmonte.com.py/rss.xml",
  ]],
  ["elpais-uy", [
    "https://elpais.com.uy/arc/outboundfeeds/rss/?outputType=xml",
    "https://elpais.com.uy/rss/ultimasnoticias.xml",
  ]],
  ["laprensaguate", [
    "https://www.laprensaguate.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.laprensaguate.com/rss.xml",
  ]],
  ["univision", [
    "https://noticias.univision.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://noticias.univision.com/rss/internacional.xml",
    "https://noticias.univision.com/feed/",
  ]],
  ["cnn-es", [
    "https://cnnespanol.cnn.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://cnnespanol.cnn.com/rss/internacional/rss.xml",
    "https://feeds.cnn.com/rss/edicion_latam.rss",
    "https://cnnespanol.cnn.com/rss/mundo/rss.xml",
  ]],
  ["dw", [
    "https://rss.dw.com/rdf/rss-es-all",
    "https://rss.dw.com/rdf/rss-es-latam",
    "https://rss.dw.com/xml/rss-es-all",
    "https://rss.dw.com/xml/rss-es-latam",
    "https://www.dw.com/es/rss",
  ]],
  ["expansion", [
    "https://www.expansion.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.expansion.com/economia/rss.xml",
    "https://www.expansion.com/fintech/rss.xml",
    "https://www.expansion.com/rss.xml",
  ]],
  ["latampost", [
    "https://www.latampost.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.latampost.com/feed/",
  ]],
  ["elnacional-cat", [
    "https://www.elnacional.cat/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.elnacional.cat/feed",
  ]],
  ["levante-emv", [
    "https://www.levante-emv.com/rss/todas-las-noticias.xml",
    "https://www.levante-emv.com/feed",
  ]],
  ["hoy-mx", [
    "https://www.hoy.com.mx/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.hoy.com.mx/feed/",
  ]],
  ["notitarde", [
    "https://notitarde.com.do/arc/outboundfeeds/rss/?outputType=xml",
    "https://notitarde.com.do/rss.xml",
  ]],
  ["confidencial-ni", [
    "https://confidencial.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://confidencial.com/feed",
  ]],
  ["efectococuyo", [
    "https://efectococuyo.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://efectococuyo.com/rss/",
  ]],
  ["eluniversaldo", [
    "https://www.eluniversaldo.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.eluniversaldo.com/feed",
  ]],
  ["telemiguel", [
    "https://telemiguel.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://telemiguel.com/feed",
  ]],
  ["ultimahora-py", [
    "https://www.ultimahora.com/arc/outboundfeeds/rss/?outputType=xml",
    "https://www.ultimahora.com/rss/portada.xml",
  ]],
  // ---- fuentes nuevas candidatas ----
  ["infobae-mas", [
    "https://www.infobae.com/arc/outboundfeeds/rss/category/mundo/",
    "https://www.infobae.com/arc/outboundfeeds/rss/category/economia/",
    "https://www.infobae.com/arc/outboundfeeds/rss/category/sociedad/",
  ]],
  ["clarin-mas", [
    "https://www.clarin.com/rss/sociedad/",
    "https://www.clarin.com/rss/cultura/",
    "https://www.clarin.com/rss/deportes/",
  ]],
  ["lanacion-mas", [
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/politica/",
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/mundo/",
    "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/",
  ]],
  ["eltiempo-mas", [
    "https://www.eltiempo.com/rss/deportes.xml",
    "https://www.eltiempo.com/rss/cultura.xml",
    "https://www.eltiempo.com/rss/variantes.xml",
  ]],
  ["diariolibre-mas", [
    "https://www.diariolibre.com/rss/politica.xml",
    "https://www.diariolibre.com/rss/economia.xml",
  ]],
  ["eluniversal-mx-mas", [
    "https://www.eluniversal.com.mx/arc/outboundfeeds/rss/category/politica/",
    "https://www.eluniversal.com.mx/arc/outboundfeeds/rss/category/internacional/",
    "https://www.eluniversal.com.mx/arc/outboundfeeds/rss/category/economia/",
  ]],
  ["elfinanciero-mas", [
    "https://www.elfinanciero.com.mx/arc/outboundfeeds/rss/category/mercados/",
  ]],
  ["20minutos-mas", [
    "https://www.20minutos.es/rss/mundo.xml",
    "https://www.20minutos.es/rss/economia.xml",
    "https://www.20minutos.es/rss/deportes.xml",
    "https://www.20minutos.es/rss/ciencia.xml",
  ]],
  ["latercera-mas", [
    "https://www.latercera.com/arc/outboundfeeds/rss/category/politica/",
    "https://www.latercera.com/arc/outboundfeeds/rss/category/internacional/",
  ]],
  ["elpais-secciones", [
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/mexico",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/america",
    "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada/section/elpais.com/portada",
  ]],
  ["lavanguardia-mas", [
    "https://www.lavanguardia.com/rss/internacional/1",
    "https://www.lavanguardia.com/rss/sociedad.xml",
    "https://www.lavanguardia.com/rss/ciencia-y-salud.xml",
    "https://www.lavanguardia.com/rss/clima-y-medio-ambiente.xml",
  ]],
  ["elmundo-mas", [
    "https://e00-elmundo.uecdn.es/elmundo/rss/television.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/clima-y-medio-ambiente.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/salud.xml",
    "https://e00-elmundo.uecdn.es/elmundo/rss/tecnologia.xml",
  ]],
];

const soloOk = process.argv.includes("--solo-ok");
const filtros = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const LENTO = filtros.length > 0 || process.argv.includes("--lento");
const resultados: Array<{ fuente: string; url: string; items: number }> = [];

const cola: Array<[string, string]> = [];
for (const [f, urls] of CANDIDATOS) {
  if (filtros.length && !filtros.includes(f)) continue;
  for (const u of urls) cola.push([f, u]);
}

let cursor = 0;
async function trabajador() {
  while (cursor < cola.length) {
    const [f, u] = cola[cursor++]!;
    const xml = await descargarFeed(u, LENTO ? 1 : 0);
    if (!xml) continue;
    const items = parsearFeed(xml);
    if (items.length > 0) {
      resultados.push({ fuente: f, url: u, items: items.length });
      if (!soloOk) console.log(`OK  ${String(items.length).padStart(3)}  ${f.padEnd(16)} ${u}`);
    }
    if (LENTO) await new Promise((r) => setTimeout(r, 400));
  }
}
await Promise.all(Array.from({ length: LENTO ? 3 : 10 }, trabajador));

if (soloOk) {
  const porFuente = new Map<string, string[]>();
  for (const r of resultados.sort((a, b) => b.items - a.items)) {
    const arr = porFuente.get(r.fuente) ?? [];
    if (!arr.includes(r.url)) arr.push(r.url);
    porFuente.set(r.fuente, arr);
  }
  console.log("\n--- FEEDS VIABLES ---");
  for (const [f, urls] of porFuente) console.log(`${f}:\n  ${urls.join("\n  ")}`);
} else {
  const porFuente = new Set(resultados.map((r) => r.fuente));
  console.log(`\nFuentes con al menos un feed vivo: ${porFuente.size}/${CANDIDATOS.length}`);
  const muertas = CANDIDATOS.filter(([f]) => !porFuente.has(f)).map(([f]) => f);
  console.log(`Sin ningún feed vivo: ${muertas.join(", ") || "ninguna"}`);
}