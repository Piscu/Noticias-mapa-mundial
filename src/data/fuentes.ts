/**
 * Portales de noticias en español y sus feeds RSS.
 *
 * IMPORTANTE: todas las URLs de esta lista están verificadas y devuelven
 * noticias reales. Verificado el 2026-10-05: 23 portales operativos.
 *
 * Para re-verificar o añadir portales:
 *   npx tsx src/herramientas/sonda.ts            prueba todos los candidatos
 *   npx tsx src/herramientas/sonda.ts --solo-ok  imprime solo los viables
 *   npx tsx src/herramientas/sonda.ts infobae    revisa sólo esa fuente
 *
 * Portales cuyos feeds están caídos y no se incluyen: El Confidencial,
 * Milenio (parcial), Animal Político, El Espectador, Emol, Primicias,
 * El Monte, Última Hora, Efecto Cocuyo, El País (UY), La Prensa (GT),
 * Univision, CNN en Español, Deutsche Welle, Expansión, La Tercera (secciones),
 * El Nacional (Cataluña), Levante-EMV, HOY (MX), Notitarde, Confidencial (NI),
 * El Universo (DO) y Telemiguel.
 */

export interface Fuente {
  id: string;
  nombre: string;
  /** Dominio, usado para determinar el país por defecto de los artículos. */
  dominio: string;
  paisPorDefecto?: string;
  idioma: string;
  /** Color de marca para la etiqueta en el pop-up. */
  color: string;
  feeds: string[];
}

export const FUENTES: Fuente[] = [
  /* --------------------------------------------------------------- España */
  {
    id: "elpais",
    nombre: "El País",
    dominio: "elpais.com",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#0a4d7c",
    feeds: ["https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada"],
  },
  {
    id: "lavanguardia",
    nombre: "La Vanguardia",
    dominio: "lavanguardia.com",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#c8102e",
    feeds: [
      "https://www.lavanguardia.com/rss/home.xml",
      "https://www.lavanguardia.com/rss/internacional.xml",
      "https://www.lavanguardia.com/rss/economia.xml",
      "https://www.lavanguardia.com/rss/politica.xml",
      "https://www.lavanguardia.com/rss/cultura.xml",
      "https://www.lavanguardia.com/rss/deportes.xml",
      "https://www.lavanguardia.com/rss/sociedad.xml",
    ],
  },
  {
    id: "elmundo",
    nombre: "El Mundo",
    dominio: "elmundo.es",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#0b3d6b",
    feeds: [
      "https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml",
      "https://e00-elmundo.uecdn.es/elmundo/rss/internacional.xml",
      "https://e00-elmundo.uecdn.es/elmundo/rss/economia.xml",
      "https://e00-elmundo.uecdn.es/elmundo/rss/espana.xml",
      "https://e00-elmundo.uecdn.es/elmundo/rss/ciencia.xml",
      "https://e00-elmundo.uecdn.es/elmundo/rss/cultura.xml",
    ],
  },
  {
    id: "abc",
    nombre: "ABC",
    dominio: "abc.es",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#1a1a1a",
    feeds: [
      "https://www.abc.es/rss/2.0/portada/",
      "https://www.abc.es/rss/2.0/internacional/",
      "https://www.abc.es/rss/2.0/economia/",
      "https://www.abc.es/rss/2.0/ciencia/",
      "https://www.abc.es/rss/2.0/cultura/",
      "https://www.abc.es/rss/2.0/deportes/",
    ],
  },
  {
    id: "eldiario-es",
    nombre: "elDiario.es",
    dominio: "eldiario.es",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#1b3a2f",
    feeds: ["https://www.eldiario.es/rss/"],
  },
  {
    id: "20minutos",
    nombre: "20 Minutos",
    dominio: "20minutos.es",
    paisPorDefecto: "ES",
    idioma: "es",
    color: "#e4002b",
    feeds: [
      "https://www.20minutos.es/rss/",
      "https://www.20minutos.es/rss/deportes.xml",
      "https://www.20minutos.es/rss/ciencia.xml",
    ],
  },

  /* ------------------------------------------------------------- México */
  {
    id: "el-universal-mx",
    nombre: "El Universal (México)",
    dominio: "eluniversal.com.mx",
    paisPorDefecto: "MX",
    idioma: "es",
    color: "#006847",
    feeds: ["https://www.eluniversal.com.mx/arc/outboundfeeds/rss/?outputType=xml"],
  },
  {
    id: "el-financiero-mx",
    nombre: "El Financiero",
    dominio: "elfinanciero.com.mx",
    paisPorDefecto: "MX",
    idioma: "es",
    color: "#0b2c4a",
    feeds: [
      "https://www.elfinanciero.com.mx/rss",
      "https://www.elfinanciero.com.mx/mercados/rss",
    ],
  },

  /* ------------------------------------------------------------ Argentina */
  {
    id: "infobae",
    nombre: "Infobae",
    dominio: "infobae.com",
    paisPorDefecto: "AR",
    idioma: "es",
    color: "#0f9d58",
    feeds: [
      "https://www.infobae.com/arc/outboundfeeds/rss/",
      "https://www.infobae.com/arc/outboundfeeds/rss/category/politica/",
      "https://www.infobae.com/arc/outboundfeeds/rss/category/economia/",
      "https://www.infobae.com/arc/outboundfeeds/rss/category/sociedad/",
    ],
  },
  {
    id: "lanacion",
    nombre: "La Nación (Argentina)",
    dominio: "lanacion.com.ar",
    paisPorDefecto: "AR",
    idioma: "es",
    color: "#1b3a2f",
    feeds: [
      "https://www.lanacion.com.ar/arc/outboundfeeds/rss/",
      "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/politica/",
      "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/",
    ],
  },
  {
    id: "clarin",
    nombre: "Clarín",
    dominio: "clarin.com",
    paisPorDefecto: "AR",
    idioma: "es",
    color: "#c8102e",
    feeds: [
      "https://www.clarin.com/rss/mundo/",
      "https://www.clarin.com/rss/politica/",
      "https://www.clarin.com/rss/economia/",
      "https://www.clarin.com/rss/sociedad/",
      "https://www.clarin.com/rss/cultura/",
      "https://www.clarin.com/rss/deportes/",
    ],
  },

  /* ------------------------------------------------------- Resto LatAm */
  {
    id: "el-comercio-pe",
    nombre: "El Comercio (Perú)",
    dominio: "elcomercio.pe",
    paisPorDefecto: "PE",
    idioma: "es",
    color: "#8b0000",
    feeds: ["https://elcomercio.pe/arc/outboundfeeds/rss/?outputType=xml"],
  },
  {
    id: "eltiempo-co",
    nombre: "El Tiempo (Colombia)",
    dominio: "eltiempo.com",
    paisPorDefecto: "CO",
    idioma: "es",
    color: "#d4a017",
    feeds: [
      "https://www.eltiempo.com/rss/mundo.xml",
      "https://www.eltiempo.com/rss/politica.xml",
      "https://www.eltiempo.com/rss/economia.xml",
      "https://www.eltiempo.com/rss/deportes.xml",
      "https://www.eltiempo.com/rss/cultura.xml",
    ],
  },
  {
    id: "latercera",
    nombre: "La Tercera",
    dominio: "latercera.com",
    paisPorDefecto: "CL",
    idioma: "es",
    color: "#005b8f",
    feeds: ["https://www.latercera.com/rss"],
  },
  {
    id: "el-nacional-ve",
    nombre: "El Nacional (Venezuela)",
    dominio: "elnacional.com",
    paisPorDefecto: "VE",
    idioma: "es",
    color: "#7d0c0c",
    feeds: ["https://www.elnacional.com/rss"],
  },
  {
    id: "el-deber",
    nombre: "El Deber (Bolivia)",
    dominio: "eldeber.com.bo",
    paisPorDefecto: "BO",
    idioma: "es",
    color: "#8b0000",
    feeds: ["https://eldeber.com.bo/feed"],
  },
  {
    id: "la-nacion-cr",
    nombre: "La Nación (Costa Rica)",
    dominio: "nacion.com",
    paisPorDefecto: "CR",
    idioma: "es",
    color: "#002b5c",
    feeds: ["https://www.nacion.com/rss"],
  },
  {
    id: "diariolibre-do",
    nombre: "Diario Libre (Rep. Dominicana)",
    dominio: "diariolibre.com",
    paisPorDefecto: "DO",
    idioma: "es",
    color: "#1a1a6d",
    feeds: [
      "https://www.diariolibre.com/rss/mundo.xml",
      "https://www.diariolibre.com/rss/politica.xml",
      "https://www.diariolibre.com/rss/economia.xml",
    ],
  },
  {
    id: "eltiempo-do",
    nombre: "El Tiempo (Rep. Dominicana)",
    dominio: "eltiempo.com.do",
    paisPorDefecto: "DO",
    idioma: "es",
    color: "#1a4d8f",
    feeds: ["https://eltiempo.com.do/rss"],
  },

  /* ------------------------------------------------------------ Mundial */
  {
    id: "bbc-mundo",
    nombre: "BBC News Mundo",
    dominio: "bbc.com",
    paisPorDefecto: "GB",
    idioma: "es",
    color: "#bb1919",
    feeds: ["https://feeds.bbci.co.uk/mundo/rss.xml"],
  },
  {
    id: "rfi-es",
    nombre: "RFI Español",
    dominio: "rfi.fr",
    paisPorDefecto: "FR",
    idioma: "es",
    color: "#e4022d",
    feeds: ["https://www.rfi.fr/es/rss"],
  },
  {
    id: "euronews-es",
    nombre: "Euronews Español",
    dominio: "euronews.com",
    paisPorDefecto: "FR",
    idioma: "es",
    color: "#003a70",
    feeds: ["https://www.euronews.com/rss?language=es"],
  },
  {
    id: "telesur",
    nombre: "teleSUR",
    dominio: "telesurenglish.net",
    idioma: "es",
    color: "#007a3d",
    feeds: ["https://www.telesurenglish.net/rss"],
  },
];

export const FUENTE_POR_ID = new Map(FUENTES.map((f) => [f.id, f]));

/** Dominio -> país ISO, para etiquetas de origen más precisas. */
export const PAIS_POR_DOMINIO: Record<string, string> = {
  "elpais.com": "ES",
  "lavanguardia.com": "ES",
  "elmundo.es": "ES",
  "abc.es": "ES",
  "eldiario.es": "ES",
  "20minutos.es": "ES",
  "eluniversal.com.mx": "MX",
  "elfinanciero.com.mx": "MX",
  "infobae.com": "AR",
  "lanacion.com.ar": "AR",
  "clarin.com": "AR",
  "elcomercio.pe": "PE",
  "eltiempo.com": "CO",
  "latercera.com": "CL",
  "elnacional.com": "VE",
  "eldeber.com.bo": "BO",
  "nacion.com": "CR",
  "diariolibre.com": "DO",
  "eltiempo.com.do": "DO",
  "bbc.com": "GB",
  "rfi.fr": "FR",
  "euronews.com": "FR",
  "telesurenglish.net": "VE",
};