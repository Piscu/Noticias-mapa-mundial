/**
 * Construye el sitio estático: `npm run estatico`
 *
 * Dos salidas dentro de `public/`:
 *   vendor/web.js     el núcleo (filtros, facetas, probador) empaquetado para
 *                     el navegador con esbuild, sin ningún CDN de por medio
 *   datos/*.json      el almacén de noticias ya resuelto
 *
 * Es el mismo paso que ejecuta GitHub Actions antes de publicar.
 */
import path from "node:path";
import { promises as fs } from "node:fs";
import { build } from "esbuild";
import { RAIZ } from "../almacen/tienda.js";
import { escribirEstatico, DIR_PUBLICA } from "../servicios/estatico.js";

const PAQUETE = path.join(RAIZ, "public", "vendor", "web.js");
const PAQUETE_APP = path.join(RAIZ, "public", "bundle.js");

async function empaquetar(): Promise<number> {
  const res = await build({
    entryPoints: [path.join(RAIZ, "src", "navegador", "web.ts")],
    bundle: true,
    format: "esm",
    minify: true,
    target: "es2022",
    outfile: PAQUETE,
    logLevel: "silent",
    legalComments: "none",
  });
  if (res.errors.length) throw new Error(res.errors.map((e) => e.text).join("\n"));
  return (await fs.stat(PAQUETE)).size;
}

/**
 * La página carga un único script IIFE (sin `type="module"`) con el frontend
 * y el núcleo ya resueltos: así funciona igual en Express y en GitHub Pages.
 */
async function empaquetarApp(): Promise<number> {
  const res = await build({
    entryPoints: [path.join(RAIZ, "public", "app.js")],
    bundle: true,
    format: "iife",
    target: "es2022",
    outfile: PAQUETE_APP,
    logLevel: "silent",
    legalComments: "none",
  });
  if (res.errors.length) throw new Error(res.errors.map((e) => e.text).join("\n"));
  return (await fs.stat(PAQUETE_APP)).size;
}

async function main() {
  const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;

  const bytes = await empaquetar();
  const bytesApp = await empaquetarApp();
  await escribirEstatico();

  const ficheros = await fs.readdir(DIR_PUBLICA);
  const tams = await Promise.all(
    ficheros.map(async (f) => [f, (await fs.stat(path.join(DIR_PUBLICA, f))).size] as const)
  );

  console.log(`\n  Sitio estático listo en public/`);
  console.log(`    bundle.js              ${kb(bytesApp)}`);
  console.log(`    vendor/web.js          ${kb(bytes)}`);
  for (const [f, t] of tams.sort()) console.log(`    datos/${f.padEnd(17)} ${kb(t)}`);
  console.log("");
}

main().catch((e) => {
  console.error("No se pudo generar el sitio:", e);
  process.exit(1);
});
