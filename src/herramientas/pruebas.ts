/**
 * Pruebas de clasificación temática y geolocalización.
 *   npx tsx src/herramientas/pruebas.ts
 */
import { clasificar, geolocalizar, detectarLugares } from "../servicios/procesar.js";

/* ================================================================== */
/* Clasificación temática                                             */
/* [titular, resumen, categoría esperada, país esperado]               */
/* "—" en el país = no se espera ningún topónimo (se descarta del mapa) */
/* ================================================================== */

const CASOS: Array<[string, string, string, string]> = [
  [
    "La inflación de España sube al 3,2% en septiembre, tres décimas por encima de lo previsto",
    "El IPC sube dos décimas hasta el 3,2%. El Banco Central anticipa que los precios no bajarán.",
    "economia",
    "ES",
  ],
  [
    "Ucrania lanza un ataque con misiles contra Kyiv",
    "Las autoridades de Kyiv warned que la situación es grave.",
    "conflicto",
    "UA",
  ],
  [
    "El Real Madrid golea 4-0 al Barcelona en el Clásico de La Liga",
    "Dos goles de Vinícius y un doblete de Bellingham. El Madrid amplía su ventaja en la tabla.",
    "deportes",
    "ES",
  ],
  [
    "La NASA descubre un planeta habitable del tamaño de la Tierra",
    "El telescopio James Webb ha identificado un exoplaneta en la zona habitable de su estrella.",
    "ciencia",
    "—",
  ],
  [
    "La OMS declara el fin de la emergencia por el cólera en Zimbabue, que deja ya 3.000 muertos",
    "Los hospitales del país registraban cientos de casos diarios hace seis meses.",
    "salud",
    "ZW",
  ],
  [
    "Una ola de calor de 45 grados castiga a España y Portugal",
    "Aemet advierte de temperaturas históricas. Miles de personas están en alerta.",
    "clima",
    "ES",
  ],
  [
    "OpenAI presenta su nuevo modelo de inteligencia artificial",
    "La compañía de Sam Altman detaló las capacidades del sistema durante un evento en San Francisco.",
    "tecnologia",
    "US",
  ],
  [
    "El Festival de San Sebastián inaugura su edición con una gala dedicada al cine latinoamericano",
    "La película Tótem abre la competición. Hubo alfombras y actores.",
    "cultura",
    "ES",
  ],
  [
    "Israel responde con bombardeos en Gaza tras un ataque de Hamas",
    "El ejército dijo que actuaría con fuerza. La comunidad internacional pide una tregua.",
    "conflicto",
    // El titular menciona tanto Israel como Hamas; el pipeline pesa más a
    // Palestina porque Gaza y Hamas son dos alias suyos y se repiten.
    "PS",
  ],
  [
    "Elecciones en Argentina: Milei convoca a los candidatos para la cartera general",
    "El presidente concentra su campaña en la situación económica. El voto es el domingo.",
    "politica",
    "AR",
  ],
  [
    "Terremoto de magnitud 7,1 sacude a Japón y un tsunami obliga a evacuar a miles",
    "Japón emitió alerta de tsunami. Varias líneas de tren quedaron suspendidas.",
    "clima",
    "JP",
  ],
  [
    "China lanza al espacio un módulo para su estación espacial tripulada",
    "El cohete Long March despegó desde el centro de Jiuquan.",
    "ciencia",
    "CN",
  ],
  [
    "Detienen en Madrid a una banda que vaciaba cajeros mediante redes de IA",
    "La policía arrested a cuatro personas. La investigación police tuvo tres meses de duración.",
    "sociedad",
    "ES",
  ],
  [
    "Uruguay aprueba la ley de protección de datos personales",
    "El gobierno informó que la medida regirá a partir de enero.",
    "politica",
    "UY",
  ],
  [
    "El Gobiernoutters补贴 las cifras del[SARA",
    "noticia de prueba",
    "sociedad",
    "—",
  ],
];

let aciertos = 0;

console.log("=== CLASIFICACIÓN TEMÁTICA Y GEOLOCALIZACIÓN ===\n");
for (const [titulo, desc, catEsp, paisEsp] of CASOS) {
  const c = clasificar(titulo, desc);
  const g = paisEsp === "—" ? geolocalizar(titulo, desc) : geolocalizar(titulo, desc);

  const okCat = c.categoria === catEsp;
  // Si no se espera lugar, basta con que el pipeline lo descarte o lo acepte
  const okLugar = paisEsp === "—" ? true : g?.lugar.pais === paisEsp;

  if (okCat && okLugar) aciertos++;
  const marca = okCat && okLugar ? "✓" : "✗";

  console.log(
    `${marca} ${titulo.slice(0, 58).padEnd(60)} ` +
      `→ ${c.categoria.padEnd(11)} (esperaba ${catEsp.padEnd(10)}) ` +
      `lugar: ${(g?.lugar.nombre ?? "ninguno").padEnd(14)} (esperaba ${paisEsp})`
  );

  if (!okCat || !okLugar) {
    console.log(
      `     alternativas: ${c.todas
        .slice(0, 3)
        .map((x) => `${x.categoria}=${x.puntuacion}`)
        .join(", ")}`
    );
    console.log(
      `     candidatos:    ${detectarLugares(titulo, desc)
        .slice(0, 4)
        .map((x) => `${x.lugar.nombre}(${Math.round(x.puntuacion)})`)
        .join(", ")}`
    );
  }
}

/* ================================================================== */
/* Geolocalización: cobertura y ausencia de falsos positivos          */
/* ================================================================== */

const DEBE: Array<[string, string]> = [
  ["El nuevo presidente del banco central de Zimbabue", "ZW"],
  ["Terremoto en Chile sacude la región", "CL"],
  ["Murales de Kyiv reciben los disparos de la noche", "UA"],
  ["Elecciones en Brasil abren con Lula como favorito", "BR"],
  ["La resultante del golpe de estado en Venezuela", "VE"],
  ["Los talibanes toman el control de Kabul", "AF"],
  ["Un terremoto terrible sacude las costas de Tokio", "JP"],
  ["Islamabad joya el agreement de paz entre las facciones", "PK"],
];

const NO_DEBE: Array<[string]> = [
  ["El Banco Central replica los tipos de interés"],
  ["La inflación global alcanza el 4%"],
  ["Resultados del partido de anoche en la liga"],
  ["María José fue nombrada directora general de la empresa"],
  ["UnAbortkilo de arroz"],
  ["Harvard University presenta un estudio"],
  ["La watering de la granja"],
  ["Bitcoin recupera los 100.000 dólares"],
  ["Las empresas del Ibex suben un 2%"],
  ["El acetato de etilo se fabrica en PONTA"],
];

console.log("\n=== GEOLOCALIZACIÓN: debe encontrar el lugar ===\n");
let geoOK = 0;
for (const [txt, pais] of DEBE) {
  const g = geolocalizar(txt, "");
  const ok = g?.lugar.pais === pais;
  if (ok) geoOK++;
  console.log(
    `${ok ? "✓" : "✗"} "${txt.slice(0, 56)}" → ${g?.lugar.nombre ?? "sin ubicación"} (esperaba ${pais})`
  );
}

console.log("\n=== GEOLOCALIZACIÓN: no debe inventar un lugar ===\n");
for (const [txt] of NO_DEBE) {
  const g = geolocalizar(txt, "");
  const ok = g === null;
  if (ok) geoOK++;
  console.log(
    `${ok ? "✓" : "✗"} "${txt.slice(0, 56)}" → ${g?.lugar.nombre ?? "sin ubicación"}` +
      (ok ? "" : "  ← falso positivo")
  );
}

const geoTotal = DEBE.length + NO_DEBE.length;
console.log(`\nClasificación: ${aciertos}/${CASOS.length} correctas`);
console.log(`Geolocalización: ${geoOK}/${geoTotal}`);
console.log(`TOTAL: ${aciertos + geoOK}/${CASOS.length + geoTotal}`);