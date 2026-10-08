/**
 * Recopilación manual desde consola.
 *   npm run recopilar
 *   npm run recopilar -- --verbose=false
 */
import { recopilar } from "./servicios/recopilador.js";
import { cargar } from "./almacen/tienda.js";

const verbose = !process.argv.includes("--verbose=false");

try {
  const { estado } = await recopilar({ verbose });
  const { noticias } = await cargar();
  const cat = new Map<string, number>();
  for (const n of noticias) cat.set(n.categoria, (cat.get(n.categoria) ?? 0) + 1);
  console.log("\nResumen por temática:");
  for (const [c, t] of [...cat.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${c.padEnd(18)} ${t}`);
  }
  console.log(`\nTotal en el archivo: ${noticias.length}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}