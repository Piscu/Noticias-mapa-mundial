/**
 * Publicación del sitio como archivos estáticos.
 *
 * GitHub Pages sólo sirve ficheros, así que la aplicación necesita el dato ya
 * resuelto dentro de `public/datos/`. Este módulo escribe ahí una instantánea
 * de `datos/noticias.json` cada vez que cambia, de modo que el servidor local
 * y la web publicada ven exactamente lo mismo.
 *
 * Sólo se publican dos ficheros:
 *   noticias.json  todo el caudal, para que el navegador filtre en cliente
 *   estado.json    cuándo se recopiló y cómo fue
 *
 * Las facetas no se publican: se calculan en el cliente con `calcularFacetas`
 * a partir de las propias noticias, que ya están ahí.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { cargar, RAIZ } from "../almacen/tienda.js";
import { estadoPublico } from "./nucleo.js";

export const DIR_PUBLICA = path.join(RAIZ, "public", "datos");

/** Escritura atómica: si alguien pide el fichero a mitad de escritura, no lee un trozo. */
async function escribirAtomico(ruta: string, contenido: string): Promise<void> {
  const tmp = `${ruta}.tmp`;
  await fs.writeFile(tmp, contenido, "utf8");
  await fs.rename(tmp, ruta);
}

/**
 * Vuelca el almacén a `public/datos/`. Llamar después de cada `guardar()` y al
 * arrancar el servidor; es barato (dos ficheros) y evita que el sitio publicado
 * se quede con datos viejos.
 */
export async function escribirEstatico(): Promise<void> {
  const { noticias, estado } = await cargar();
  await fs.mkdir(DIR_PUBLICA, { recursive: true });

  await Promise.all([
    escribirAtomico(
      path.join(DIR_PUBLICA, "noticias.json"),
      JSON.stringify({ total: noticias.length, noticias })
    ),
    escribirAtomico(
      path.join(DIR_PUBLICA, "estado.json"),
      JSON.stringify(estadoPublico(estado, noticias.length, false))
    ),
  ]);
}
