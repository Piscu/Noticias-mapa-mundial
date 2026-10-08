/**
 * Punto de entrada del paquete que se sirve al navegador (`npm run web`).
 *
 * Es sólo una fachada: la lógica vive en `servicios/nucleo.ts`, que a su vez
 * usa `procesar.ts` y el gazetteer. De este modo el botón 🧪, el filtro de
 * noticias y los contadores de la barra lateral ejecutan literalmente el mismo
 * código en el servidor y en GitHub Pages.
 *
 * Cualquier cosa que necesite `node:fs` o red está prohibida aquí: se empaqueta
 * con esbuild para el cliente y reventaría al cargar la página.
 */
export { consultarNoticias, calcularFacetas, probar, lugaresPublicos } from "../servicios/nucleo";
