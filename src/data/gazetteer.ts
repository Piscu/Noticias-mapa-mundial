/**
 * Gazetteer para geolocalizar noticias en español.
 *
 * Tres niveles:
 *   - `pais`   centroides de país (el marcador por defecto en el mapa)
 *   - `region` divisiones internas (Cataluña, Baviera, …) → se resuelven al país
 *   - `ciudad` deserving Breaking Bad cities, con alias en español
 *
 * Reglas de coincidencia (ver `detectarLugares` en src/servicios/procesar.ts):
 *   · los alias deben tener 4+ caracteres y coincidencia por palabra entera,
 *     para que "de" no active Alemania ni "la" active Laos;
 *   · los países puntúan más que las ciudades, y las regiones menos: cuando
 *     sólo aparece "Cataluña" se coloca el marcador en España.
 */

export type TipoLugar = "pais" | "region" | "ciudad";

export interface Lugar {
  id: string;
  nombre: string;
  tipo: TipoLugar;
  /** ISO 3166-1 alpha-2 del país al que pertenece (o el propio país). */
  pais: string;
  lat: number;
  lon: number;
  /** Alias normalizados: minúsculas y sin acentos. */
  alias: string[];
}

const normaliza = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** ISO 3166-1 alpha-2 de España: "ES" → "es", para ids estables. */
const iso = (c: string) => c.toLowerCase();

const P = (nombre: string, isoPais: string, lat: number, lon: number, alias: string[] = []): Lugar => ({
  id: iso(isoPais),
  nombre,
  tipo: "pais",
  pais: isoPais,
  lat,
  lon,
  alias: [nombre, ...alias].map(normaliza).filter(Boolean),
});

const R = (
  nombre: string,
  isoPais: string,
  lat: number,
  lon: number,
  alias: string[] = []
): Lugar => ({
  id: `${iso(isoPais)}-r-${normaliza(nombre).replace(/\s+/g, "-")}`,
  nombre,
  tipo: "region",
  pais: isoPais,
  lat,
  lon,
  alias: [nombre, ...alias].map(normaliza).filter(Boolean),
});

const C = (
  nombre: string,
  isoPais: string,
  lat: number,
  lon: number,
  alias: string[] = []
): Lugar => ({
  id: `${iso(isoPais)}-c-${normaliza(nombre).replace(/\s+/g, "-")}`,
  nombre,
  tipo: "ciudad",
  pais: isoPais,
  lat,
  lon,
  alias: [nombre, ...alias].map(normaliza).filter(Boolean),
});

/* ================================================================== */
/* Países                                                              */
/* ================================================================== */

export const PAISES: Lugar[] = [
  // --- Europa ---------------------------------------------------------
  P("España", "ES", 40.4637, -3.7492, [
    "reino de espana", "estado espanol", "peninsula iberica", "espana",
  ]),
  P("Portugal", "PT", 39.3999, -8.2245),
  P("Francia", "FR", 46.2276, 2.2137),
  P("Mónaco", "MC", 43.7333, 7.4167, ["monaco"]),
  P("Andorra", "AD", 42.5063, 1.5218, ["la massana", "andorra la vella"]),
  P("Reino Unido", "GB", 55.3781, -3.436, [
    "gran bretana", "reino unido", "inglaterra", "pais de gales", "gales",
    "irlanda del norte", "escocia",
  ]),
  P("Irlanda", "IE", 53.4129, -8.2439, ["dublin", "republica de irlanda"]),
  P("Bélgica", "BE", 50.5039, 4.4699, ["belgica", "bruselas"]),
  P("Países Bajos", "NL", 52.1326, 5.2913, ["paises bajos", "holanda", "amsterdam"]),
  P("Luxemburgo", "LU", 49.8153, 6.1296),
  P("Liechtenstein", "LI", 47.166, 9.5554, ["vaduz"]),
  P("Suiza", "CH", 46.8182, 8.2275, ["suizo"]),
  P("Austria", "AT", 47.5162, 14.5501, ["viena"]),
  P("Italia", "IT", 41.8719, 12.5674, ["italiano", "roma"]),
  P("Ciudad del Vaticano", "VA", 41.9029, 12.4534, ["vaticano", "santa sede"]),
  P("San Marino", "SM", 43.9424, 12.4578),
  P("Malta", "MT", 35.9375, 14.3754, ["valletta"]),
  P("Eslovenia", "SI", 46.1512, 14.9955, ["liubliana"]),
  P("Croacia", "HR", 45.1, 15.2, ["zagreb", "croata"]),
  P("Hungría", "HU", 47.1625, 19.5033, ["hungria", "budapest", "hungaro"]),
  P("Eslovaquia", "SK", 48.669, 19.699, ["bratislava"]),
  P("Rumanía", "RO", 45.9432, 24.9668, ["rumania", "bucarest", "rumanos"]),
  P("Bulgaria", "BG", 42.7339, 25.4858, ["sofia", "búlgaro"]),
  P("Serbia", "RS", 44.0165, 21.0059, ["belgrado", "serbio"]),
  P("Bosnia y Herzegovina", "BA", 43.9159, 17.6791, ["bosnia", "herzegovina", "sarajevo"]),
  P("Montenegro", "ME", 42.7087, 19.3744, ["podgorica"]),
  P("Kosovo", "XK", 42.6026, 20.9022, ["kosovar", "pristina", "priština"]),
  P("Albania", "AL", 41.1533, 20.1683, ["tirana", "tiranë", "albanés"]),
  P("Macedonia del Norte", "MK", 41.6086, 21.7453, ["macedonia", "skopje"]),
  P("Grecia", "GR", 39.0742, 21.8243, ["atenás", "griego"]),
  P("Turquía", "TR", 38.9637, 32.9931, ["turquia", "estambul", "istanbul", "ankara", "turco"]),
  P("Chipre", "CY", 35.1264, 33.4299, ["nicosia", "limasol"]),
  P("Polonia", "PL", 51.9194, 19.1451, ["varsovia", "polaco"]),
  P("Alemania", "DE", 51.1657, 10.4515, ["alemania", "berlín", "berlin", "aleman"]),
  P("Suécia", "SE", 60.1282, 18.6435, ["suecia", "estocolmo", "sueco"]),
  P("Noruega", "NO", 60.472, 8.4689, ["oslo"]),
  P("Dinamarca", "DK", 56.2639, 9.5018, ["copenhague"]),
  P("Finlandia", "FI", 61.9241, 25.7482, ["helsinki"]),
  P("Islandia", "IS", 64.9631, -19.0208, ["reikiavik"]),
  P("Estonia", "EE", 58.5953, 25.0136, ["tallin", "tallinn"]),
  P("Letonia", "LV", 56.8796, 24.6032, ["riga"]),
  P("Lituania", "LT", 55.1694, 23.8813, ["vilnius"]),
  P("Bielorrusia", "BY", 53.7098, 27.9534, ["bi riusa", "minsk"]),
  P("Ucrania", "UA", 48.3794, 31.1656, ["ucrania", "kyiv", "kiev", "ucranianos", "odessa"]),
  P("Rusia", "RU", 61.524, 105.3188, ["rusia", "moscu", "moscú", "san petersburgo", "petrogrado", "kremlin", "ruso"]),
  P("Moldavia", "MD", 47.4116, 28.3699, ["chisinau", "moldavo"]),
  P("Georgia", "GE", 42.3154, 43.3569, ["tbilisi"]),
  P("Armenia", "AM", 40.0691, 45.0382, ["erevan", "yerevan"]),
  P("Azerbaiyán", "AZ", 40.1431, 47.5769, ["azerbaiyan", "baku"]),

  // --- Oriente Próximo y Asia occidental ------------------------------
  P("Israel", "IL", 31.0461, 34.8516, ["israeli", "jerusalén", "jerusalem", "tel aviv"]),
  P("Palestina", "PS", 31.9522, 35.2332, [
    "cisjordania", "gaza", "hamas", "palestino", "gaza strip", "franja de gaza",
  ]),
  P("Jordania", "JO", 30.5852, 36.2384, ["amman"]),
  P("Líbano", "LB", 33.8547, 35.8623, ["beirut", "libano"]),
  P("Siria", "SY", 34.8021, 38.9968, ["siria", "damasco", "sirio"]),
  P("Irak", "IQ", 33.2232, 43.6793, ["iraq", "baghdad"]),
  P("Irán", "IR", 32.4279, 53.688, ["iran", "persia", "teherán", "teheran", "iranies"]),
  P("Arabia Saudí", "SA", 23.8859, 45.0792, [
    "arabia saudita", "arabia saudi", "riad", "riyad", "saudita", "jeddah",
  ]),
  P("Yemen", "YE", 15.5527, 48.5164, ["sanaa", "yemeni", "yemení", "arabia yemenita"]),
  P("Omán", "OM", 21.4735, 55.9754, ["oman", "omán", "muscat", "masqat"]),
  P("Emiratos Árabes Unidos", "AE", 23.4241, 53.8478, [
    "emiratos", "emiratos arabes unidos", "emiratos arabes", "dubai", "abu dhabi",
  ]),
  P("Qatar", "QA", 25.3548, 51.1839, ["doha"]),
  P("Kuwait", "KW", 29.3117, 47.4818, ["kuwait", "ciudad de kuwait"]),
  P("Baréin", "BH", 25.9304, 50.6378, ["barein", "manama"]),
  P("Afganistán", "AF", 33.9391, 67.71, ["afganistan", "kabul", "talibanes", "talibán"]),
  P("Pakistán", "PK", 30.3753, 69.3451, ["pakistan", "islamabad", "karachi", "lahore"]),

  // --- Asia -----------------------------------------------------------
  P("India", "IN", 20.5937, 78.9629, [
    "indio", "india", "nueva delhi", "delhi", "mumbai", "bangalore", "chennai", "kolkata",
  ]),
  P("Bangladesh", "BD", 23.685, 90.3563, ["dhaka"]),
  P("Sri Lanka", "LK", 7.8731, 80.7718, ["colombo"]),
  P("Nepal", "NP", 28.3949, 84.124, ["katmandu", "kathmandu"]),
  P("Birmania", "MM", 21.9139, 95.9562, ["myanmar", "rangún", "rangoon", "naipidaw", "birmania"]),
  P("Tailandia", "TH", 15.87, 100.9925, ["bangkok", "tailandés", "tailandes"]),
  P("Vietnam", "VN", 14.0583, 108.2772, ["vietnamita", "hanoi", "ho chi minh"]),
  P("Camboya", "KH", 12.5657, 104.991, ["nom penh", "phanom penh"]),
  P("Laos", "LA", 19.8563, 102.4955, ["vientiane"]),
  P("Malasia", "MY", 4.2105, 101.9758, ["kuala lumpur", "malayo"]),
  P("Singapur", "SG", 1.3521, 103.8198, ["singapur"]),
  P("Indonesia", "ID", -0.7893, 113.9213, ["jakarta", "indonesio"]),
  P("Filipinas", "PH", 12.8797, 121.774, ["manila", "filipino"]),
  P("Brunéi", "BN", 4.5353, 114.7277, ["brunei"]),
  P("Timor Oriental", "TL", -8.8742, 125.7275, ["timoreste"]),
  P("China", "CN", 35.8617, 104.1954, [
    "chino", "china", "pekin", "beijing", "shanghai", "hong kong", "tibet",
    "xinjiang", "uighur", "macau", "macao", "shenzhen", "guangzhou",
  ]),
  P("Japón", "JP", 36.2048, 138.2529, ["japon", "tokio", "tokyo", "osaka", "japonés", "japonesa"]),
  P("Corea del Sur", "KR", 35.9078, 127.7669, ["corea", "seúl", "seul", "coreano", "busan"]),
  P("Corea del Norte", "KP", 40.3399, 127.5106, ["piran", "pyongyang", "coreano del norte"]),
  P("Mongolia", "MN", 46.8625, 103.8467, ["ulaanbaatar", "ulaanbaatar"]),
  P("Kazajistán", "KZ", 48.0196, 66.9237, ["kazajistan", "nur sultan", "astana", "almaty"]),
  P("Uzbekistán", "UZ", 41.3775, 64.5853, ["uzbekistan", "tashkent"]),
  P("Kirguistán", "KG", 41.2044, 74.7661, ["kirguistan", "bishkek"]),
  P("Tayikistán", "TJ", 38.861, 71.2761, ["tayikistan", "duchanbe"]),
  P("Turkmenistán", "TM", 38.9697, 59.5561, ["turkmenistan", "askhabad"]),

  // --- África ---------------------------------------------------------
  P("Marruecos", "MA", 31.7917, -7.0926, ["rabat", "marrakech", "marruecos"]),
  P("Argelia", "DZ", 28.0339, 1.6596, ["argel", "algeria"]),
  P("Túnez", "TN", 33.8869, 9.5375, ["tunez", "túnez"]),
  P("Libia", "LY", 26.3351, 17.2283, ["libia", "trípoli", "tripoli"]),
  P("Egipto", "EG", 26.8206, 30.8025, ["egipto", "el cairo", "cairo", "giza"]),
  P("Sudán", "SD", 12.8628, 30.2176, ["sudan", "jartum", "khartoum"]),
  P("Sudán del Sur", "SS", 6.877, 31.307, ["sudan del sur"]),
  P("Etiopía", "ET", 9.145, 40.4897, ["etiopia", "addis abeba"]),
  P("Somalia", "SO", 5.1521, 46.1996, ["somalia", "mogadishu", "somalí"]),
  P("Kenia", "KE", -0.0236, 37.9062, ["kenia", "nairobi"]),
  P("Uganda", "UG", 1.3733, 32.2903, ["kampala"]),
  P("Ruanda", "RW", -1.9403, 29.8739, ["kigali"]),
  P("Nigeria", "NG", 9.082, 8.6753, ["nigeria", "lagos", "abuja", "nigerianos"]),
  P("Ghana", "GH", 7.9465, -1.0232, ["ghana", "acra"]),
  P("Senegal", "SN", 14.4974, -14.4524, ["senegal", "dakar"]),
  P("Gambia", "GM", 13.4432, -15.3101, ["banjul"]),
  P("Guinea-Bissau", "GW", 11.8037, -15.1804, ["guinea bissau", "bissau"]),
  P("Guinea", "GN", 9.9456, -9.6966, ["conakry"]),
  P("Costa de Marfil", "CI", 7.54, -5.5471, ["abidjan"]),
  P("Burkina Faso", "BF", 12.2383, -1.5616, ["ouagadougou"]),
  P("Malí", "ML", 17.5707, -4.0003, ["mali", "malí", "bamako"]),
  P("Níger", "NE", 13.5117, 2.1251, ["niger", "níger", "niamey"]),
  P("Chad", "TD", 15.4542, 18.7322, ["yamena", "ndjamena"]),
  P("Mauritania", "MR", 21.0079, -10.9408, ["nouakchott"]),
  P("Cabo Verde", "CV", 16.0021, -24.0132, ["cabo verde", "praia"]),
  P("República Centroafricana", "CF", 6.6111, 20.9394, ["bangui"]),
  P("Camerún", "CM", 7.3697, 12.3547, ["cameroon", "yaunde", "douala"]),
  P("Gabón", "GA", -0.8037, 11.6094, ["gabon", "libreville"]),
  P("Guinea Ecuatorial", "GQ", 1.6508, 10.2679, ["malabo", "bioko"]),
  P("Congo", "CG", -0.228, 15.8277, ["republica del congo", "brazaville"]),
  P("República Democrática del Congo", "CD", -4.0383, 21.7587, ["kinshasa", "rdc", "congo"]),
  P("Angola", "AO", -11.2027, 17.8739, ["luanda"]),
  P("Namibia", "NA", -22.9576, 18.4904, ["windhoek"]),
  P("Botsuana", "BW", -22.3285, 24.6849, ["gaborone"]),
  P("Zimbabue", "ZW", -19.0154, 29.1549, ["zimbabue", "harare"]),
  P("Zambia", "ZM", -13.1339, 27.8493, ["lusaka"]),
  P("Mozambique", "MZ", -18.6657, 35.5296, ["mozambique", "maputo"]),
  P("Malaui", "MW", -13.2543, 34.3015, ["malawi", "lilongwe"]),
  P("Tanzania", "TZ", -6.369, 34.8888, ["tanzania", "dodoma", "darmania"]),
  P("Sudáfrica", "ZA", -30.5595, 22.9375, [
    "sudafrica", "pretoria", "johannesburgo", "ciudad del cabo", "durban",
  ]),
  P("Lesoto", "LS", -29.6099, 28.2336, ["maseru"]),
  P("Esuatini", "SZ", -26.5225, 31.4659, ["mbabane"]),
  P("Madagascar", "MG", -18.7669, 46.8691, ["antananarivo"]),
  P("Mauricio", "MU", -20.3484, 57.5522, ["port louis"]),
  P("Seychelles", "SC", -4.6796, 55.492, ["victoria"]),
  P("Comoras", "KM", -11.875, 43.8721, ["moroni"]),
  P("Mayotte", "YT", -12.8275, 45.1662),
  P("Reunión", "RE", -21.1151, 55.5364, ["reunion"]),

  // --- América --------------------------------------------------------
  P("México", "MX", 23.6345, -102.5528, [
    "mexico", "méjico", "estados mexicanos", "mexicano",
  ]),
  P("Guatemala", "GT", 15.7835, -90.2308, ["guatemala", "guatemalteco"]),
  P("El Salvador", "SL", 13.7942, -88.8965, ["salvador", "salvadoreño"]),
  P("Honduras", "HN", 15.1999, -86.2419, ["honduras", "hondureño"]),
  P("Nicaragua", "NI", 12.8654, -85.2072, ["nicaragua", "managua"]),
  P("Costa Rica", "CR", 9.7489, -83.7534, ["costa rica", "san jose"]),
  P("Panamá", "PA", 8.538, -80.7821, ["panama", "panamá"]),
  P("Cuba", "CU", 21.5218, -77.7812, ["cuba", "la habana", "habana", "cubano"]),
  P("Jamaica", "JM", 18.1096, -77.2975, ["kingston"]),
  P("Haití", "HT", 18.9712, -72.2852, ["haiti", "port au principe"]),
  P("República Dominicana", "DO", 18.7357, -70.1627, ["dominicana", "santo domingo"]),
  P("Puerto Rico", "PR", 18.2208, -66.5901, ["puerto rico", "san juan"]),
  P("Bahamas", "BS", 25.0343, -77.3963, ["nassau"]),
  P("Barbados", "BB", 13.1939, -59.5431, ["bridgetown"]),
  P("Trinidad y Tobago", "TT", 10.6918, -61.2225, ["trinidad", "port of spain"]),
  P("Granada", "GD", 12.1165, -61.679, ["saint george"]),
  P("Santa Lucía", "LC", 13.9094, -60.9789, ["santa lucia", "castries"]),
  P("Antigua y Barbuda", "AG", 17.0606, -61.7968, ["saint johns"]),
  P("San Vicente y las Granadinas", "VC", 12.9843, -61.2872, ["kingstown"]),
  P("Dominica", "DM", 15.415, -61.3347, ["roseau"]),
  P("San Cristóbal y Nívis", "KN", 17.3578, -62.782998, ["basseterre"]),
  P("Belice", "BZ", 17.1899, -88.4976, ["belmopan"]),
  P("Colombia", "CO", 4.5709, -74.2973, ["colombia", "colombiano"]),
  P("Venezuela", "VE", 6.4238, -66.5897, ["venezuela", "venezolano"]),
  P("Guyana", "GY", 4.8604, -58.9302, ["georgetown guyana"]),
  P("Surinam", "SR", 3.9193, -56.0278, ["paramaribo"]),
  P("Ecuador", "EC", -1.8312, -78.1834, ["ecuador", "quito"]),
  P("Perú", "PE", -9.19, -75.0152, ["peru", "peruano"]),
  P("Bolivia", "BO", -16.2902, -63.5887, ["bolivia", "boliviano"]),
  P("Brasil", "BR", -14.235, -51.9253, [
    "brasil", "brasileño", "brasileira", "sao paulo", "são paulo",
    "rio de janeiro", "brasilia", "brasília",
  ]),
  P("Paraguay", "PY", -23.4425, -58.4438, ["paraguay", "paraguayo", "asuncion", "asunción"]),
  P("Uruguay", "UY", -32.5228, -55.7658, ["uruguayo", "montevideo", "uruguay"]),
  P("Argentina", "AR", -38.4161, -63.6167, ["argentina", "argentino", "buenos aires"]),
  P("Islas Malvinas", "FK", -51.7963, -59.5236, ["malvinas", "falkland"]),
  P("Chile", "CL", -35.6751, -71.543, ["chile", "chileno", "santiago de chile", "santiago"]),

  // --- América del Norte y Oceania ------------------------------------
  P("Estados Unidos", "US", 37.0902, -95.7129, [
    "estados unidos", "eeuu", "ee uu", "usa", "washington", "nueva york",
    "california", "texas", "florida", "estadounidense", "washington dc",
    "cancún", "cancun", "san francisco", "los angeles", "chicago", "miami",
    "boston", "houston", "philadelphia", "atlanta", "las vegas", "seattle",
    "denver", "portland", "san diego", "san jose", "nashville", "detroit",
    "minneapolis", "charlotte", "orlando", "phoenix", "san francisco",
    "casa blanca", "capitolio", "silicon valley", "valle de silicon",
    "kansas city", "salt lake city", "pittsburgh", "houston", "baltimore",
    "st louis", "cincinnati", "cleveland", "milwaukee", "sacramento",
    "austin", "jacksonville", "columbus", "indianapolis", "charlotte",
  ]),
  P("Canadá", "CA", 56.1304, -106.3468, [
    "canada", "canadiense", "ottawa", "toronto", "montreal", "québec", "quebec",
    "vancouver", "calgary", "edmonton", "winnipeg", "halifax",
  ]),
  P("Bermudas", "BM", 32.3214, -64.7574, ["bermuda", "hamilton bermudas"]),
  P("Groenlandia", "GL", 71.7069, -42.6043, ["groenlandia", "nuuk"]),
  P("Australia", "AU", -25.2744, 133.7751, [
    "australia", "australiano", "sydney", "melbourne", "canberra", "perth",
    "brisbane", "adelaide",
  ]),
  P("Nueva Zelanda", "NZ", -40.9006, 174.886, [
    "nueva zelanda", "nueva zelandia", "nuevo zealand", "wellington", "christchurch",
  ]),
  P("Papúa Nueva Guinea", "PG", -6.315, 143.9555, ["port moresby"]),
  P("Fiji", "FJ", -17.7134, 178.065, ["suva"]),
  P("Islas Salomón", "SB", -9.6457, 160.1562, ["honiara", "salomon"]),
  P("Vanuatu", "VU", -15.3767, 166.9592, ["port vila"]),
  P("Samoa", "WS", -13.7593, -172.1046, ["apia"]),
  P("Tonga", "TO", -21.1789, -175.1982, ["nuku alofa"]),
  P("Micronesia", "FM", 6.9248, 158.1611, ["palu", "micronesia federal"]),
  P("Islas Marshall", "MH", 7.1315, 171.1845, ["majuro"]),
  P("Palau", "PW", 7.5149, 134.5825, ["ngerulmud"]),
  P("Nauru", "NR", -0.5228, 166.9315),
  P("Tuvalu", "TV", -7.1095, 177.6493, ["funafuti"]),
  P("Kiribati", "KI", 1.4167, 173, ["tarawa"]),
  P("Islas Cook", "CK", -21.2367, -159.7777, ["avarua"]),
  P("Wallis y Futuna", "WF", -13.7688, -177.1561, ["mata uta"]),
  P("Nueva Caledonia", "NC", -20.9043, 165.618, ["noumea"]),
  P("Polinesia Francesa", "PF", -17.6795, -149.4068, ["tahiti", "papeete"]),
  P("Guayana Francesa", "GF", 3.9339, -53.1258, ["cayena", "guayana francesa"]),
  P("Antártida", "AQ", -82.8628, 135, ["antartida", "antarctica"]),
];

/* ================================================================== */
/* Regiones (se resuelven al país en el mapa)                         */
/* ================================================================== */

export const REGIONES: Lugar[] = [
  // España
  R("Cataluña", "ES", 41.6, 1.8, ["catalan", "catalana", "girona", "lleida", "tarragona", "barcelona", "barcelona"]),
  R("Euskadi", "ES", 43.3, -2.5, [
    "pais vasco", "país vasco", "bilbao", "vizcaya", "guipuzcoa", "gipuzkoa",
    "san sebastian", "donostia", "euskadi", "vasco",
  ]),
  R("Galicia", "ES", 42.9, -8.5, ["gallego", "santiago de compostela", "compostela", "vigo", "a coruña", "ourense"]),
  R("Comunidad Valenciana", "ES", 39.5, -0.5, ["valencia", "valenciano", "alicante"]),
  R("Andalucía", "ES", 37.4, -5.0, [
    "andalucia", "andaluz", "sevilla", "malaga", "málaga", "granada", "cordoba", "córdoba", "cadiz", "cádiz",
  ]),
  R("Navarra", "ES", 42.8, -1.6, ["pamplona", "iruña"]),
  R("Aragón", "ES", 41.3, -0.5, ["aragon", "aragonesa", "zaragoza", "huesca"]),
  R("Asturias", "ES", 43.3, -5.8, ["oviedo", "asturiano"]),
  R("Cantabria", "ES", 43.3, -4.0, ["santander", "cantabrico", "cántabrico"]),
  R("Región de Murcia", "ES", 37.6, -1.3, ["murcia", "murciano"]),
  R("Castilla-La Mancha", "ES", 39.5, -2.5, ["toledo", "albacete", "ciudad real"]),
  R("Castilla y León", "ES", 41.5, -4.5, ["castilla y leon", "valladolid", "burgos", "leon", "león"]),
  R("La Rioja", "ES", 42.0, -2.5, ["rioja", "logroño"]),
  R("Extremadura", "ES", 39.0, -6.0, ["badajoz", "caceres", "cáceres"]),
  R("Islas Baleares", "ES", 39.6, 3.0, ["baleares", "mallorca", "palma de mallorca", "ibiza", "menorca"]),
  R("Islas Canarias", "ES", 28.1, -15.4, [
    "canarias", "las palmas", "tenerife", "gran canaria", "lanzarote", "canario",
  ]),
  R("Ceuta", "ES", 35.8894, -5.3213),
  R("Melilla", "ES", 35.2923, -2.9381),

  // Otros países con divisiones conocidas
  R("Baviera", "DE", 48.79, 11.25, ["munich", "múnich", "nuremberg", "núremberg", "bavaro", "bávaro"]),
  R("Renania del Norte-Westfalia", "DE", 51.5136, 7.4653, ["dusseldorf", "düsseldorf", "colonia", "köln"]),
  R("Cataluña del Norte", "FR", 42.5, 2.5, ["cataluña francesa"]),
  R("Bretaña", "FR", 48.2, -2.9, ["breton"]),
  R("Cerdeña", "IT", 40.0, 9.1, ["sardo", "cagliari", "sassari"]),
  R("Sicilia", "IT", 37.6, 14.0, ["palermo", "siciliano"]),
  R("Lombardía", "IT", 45.5, 9.5, ["milano", "italia"]),
  R("Flandes", "BE", 51.0, 3.5, ["flamencos", "gante", "bruselas"]),
  R("Wallonia", "BE", 50.4, 4.4, ["valonia", "lieja", "charleroi"]),
  R("Anaturolia", "TR", 39.0, 33.0, ["turquia asiática"]),
  R("Chipre del Norte", "CY", 35.25, 33.4),
  R("Gaza", "PS", 31.5, 34.4667, ["franja de gaza", "strip de gaza"]),
  R("Cisjordania", "PS", 32.0, 35.3, ["palestina ocupada", "ramala", "nablus", "hebron"]),
  R("Kurdistán", "IQ", 35.5, 44.0, ["kurdo", "erbil"]),
  R("Dagestan", "RU", 42.4, 47.0, ["chechenia", "checania", "grozny", "grozný"]),
  R("Siberia", "RU", 62.0, 95.0, ["siberiano"]),
  R("Kashmir", "IN", 34.0836, 74.7973, ["cachemira", "srinagar"]),
  R("Nagorno-Karabakh", "AM", 39.8, 46.75, ["karabakh"]),
  R("Sáhara Occidental", "EH", 24.2155, -12.8858, ["polisario"]),
  R("Amazonas", "BR", -3.0, -60.0, ["amazonia", "región amazónica"]),
  R("Patagonia", "AR", -45.0, -70.0, ["patagónico"]),
  R("Alta Blanch", "MX", 19.0, -99.5),
];

/* ================================================================== */
/* Ciudades                                                            */
/* ================================================================== */

export const CIUDADES: Lugar[] = [
  // --- España ---------------------------------------------------------
  C("Madrid", "ES", 40.4168, -3.7038, ["madrileno", "madrilena"]),
  C("Barcelona", "ES", 41.3874, 2.1686, ["barça", "barca", "culé", "cule"]),
  C("Valencia", "ES", 39.4699, -0.3763),
  C("Sevilla", "ES", 37.3891, -5.9845, ["sevillano"]),
  C("Zaragoza", "ES", 41.6488, -0.8891),
  C("Bilbao", "ES", 43.263, -2.935, ["bilbaíno"]),
  C("Málaga", "ES", 36.7213, -4.4214, ["malaga", "malagueño"]),
  C("Granada", "ES", 37.1773, -3.5986),
  C("Palma de Mallorca", "ES", 39.5696, 2.6502, ["palma"]),
  C("Las Palmas", "ES", 28.1235, -15.4363),
  C("Santa Cruz de Tenerife", "ES", 28.4636, -16.2518),

  // --- América --------------------------------------------------------
  C("Ciudad de México", "MX", 19.4326, -99.1332, ["cdmx", "distrito federal", "capital de mexico"]),
  C("Guadalajara", "MX", 20.6597, -103.3496, ["jalisco", "tapatío"]),
  C("Monterrey", "MX", 25.6866, -100.3161, ["nuevo leon", "nuevo león"]),
  C("Tijuana", "MX", 32.5149, -117.0382),
  C("Ciudad Juárez", "MX", 31.6904, -106.4245, ["juarez", "juárez"]),
  C("Cancún", "MX", 21.1619, -86.8515, ["cancun"]),
  C("Mazatlán", "MX", 23.2494, -106.4111, ["mazatlan", "mazatlán"]),
  C("Puebla", "MX", 19.0414, -98.2063),
  C("Querétaro", "MX", 20.5888, -100.3899, ["queretaro"]),
  C("Oaxaca", "MX", 17.0732, -96.7266),
  C("Acapulco", "MX", 16.8531, -99.8237),

  C("Buenos Aires", "AR", -34.6037, -58.3816, ["porteño", "porteña", "porteño"]),
  C("Córdoba", "AR", -31.4201, -64.1888, ["cordoba argentino"]),
  C("Rosario", "AR", -32.9442, -60.6505),
  C("Mendoza", "AR", -32.8895, -68.8458),

  C("Bogotá", "CO", 4.711, -74.0721, ["bogota", "capital de colombia", "bogotano"]),
  C("Medellín", "CO", 6.2442, -75.5812, ["medellin", "poblado"]),
  C("Cali", "CO", 3.4516, -76.532),
  C("Barranquilla", "CO", 10.9685, -74.7813),
  C("Cartagena", "CO", 10.391, -75.4794, ["cartagena de indias"]),

  C("Santiago", "CL", -33.4489, -70.6693, ["santiago de chile"]),
  C("Valparaíso", "CL", -33.0472, -71.6127, ["valparaiso"]),
  C("Concepción", "CL", -36.8201, -73.0444, ["concepcion"]),
  C("Antofagasta", "CL", -23.6509, -70.3975, ["antofagasta", "copiapó"]),

  C("Lima", "PE", -12.0464, -77.0428, ["capital de peru", "capital del perú", "limeño"]),
  C("Arequipa", "PE", -16.409, -71.5375),
  C("Cusco", "PE", -13.5319, -71.9675, ["cuzco"]),
  C("Trujillo", "PE", -8.109, -79.0215),

  C("Caracas", "VE", 10.4806, -66.9036, ["caraqueño", "caraqueña"]),
  C("Maracaibo", "VE", 10.6427, -71.6125),
  C("Valencia (Venezuela)", "VE", 10.162, -68.0077, ["valencia classy"]),
  C("Ciudad Guayana", "VE", 8.35, -62.65),

  C("Quito", "EC", -0.1807, -78.4678, ["quiteño", "quiteña"]),
  C("Guayaquil", "EC", -2.1894, -79.8891, ["guayaquileño"]),
  C("Cuenca", "EC", -2.9, -79.9),

  C("La Paz", "BO", -16.4897, -68.1193, ["la paz bolivia", "paceño"]),
  C("Santa Cruz de la Sierra", "BO", -17.7833, -63.1821, ["santa cruz", "cruzano"]),
  C("Cochabamba", "BO", -17.3895, -66.1568, ["cocha"]),

  C("Montevideo", "UY", -34.9011, -56.1645, ["montevideano"]),
  C("Asunción", "PY", -25.2637, -57.5759, ["asuncion", "paraguayo"]),
  C("Ciudad del Este", "PY", -25.5095, -54.6112),

  C("San José", "CR", 9.9281, -84.0907, ["san jose de costa rica"]),
  C("Ciudad de Panamá", "PA", 8.9824, -79.5199, ["ciudad de panama"]),
  C("La Habana", "CU", 23.1136, -82.3666, ["habana", "habano"]),
  C("Santiago de Cuba", "CU", 20.0217, -75.8292),
  C("Kingston", "JM", 17.9714, -76.7931, ["kingston jamaica"]),
  C("Santo Domingo", "DO", 18.4861, -69.9312, ["dominicano"]),
  C("Port-au-Prince", "HT", 18.5944, -72.3074, ["puerto principe"]),
  C("San Juan", "PR", 18.4655, -66.1057, ["san juan puerto rico"]),

  // --- Estados Unidos y Canadá ----------------------------------------
  C("Nueva York", "US", 40.7128, -74.006, ["new york", "ny", "nueva york city"]),
  C("Washington", "US", 38.9072, -77.0369, ["washington dc", "washington d.c.", "casa blanca", "capitolio"]),
  C("Los Ángeles", "US", 34.0522, -118.2437, ["los angeles", "hollywood"]),
  C("Chicago", "US", 41.8781, -87.6298),
  C("Houston", "US", 29.7604, -95.3698),
  C("Phoenix", "US", 33.4484, -112.074, ["fenix", "fénix"]),
  C("Philadelphia", "US", 39.9526, -75.1652, ["filadelfia"]),
  C("San Antonio", "US", 29.4241, -98.4936),
  C("San Diego", "US", 32.7157, -117.1611),
  C("Dallas", "US", 32.7767, -96.797),
  C("San José (California)", "US", 37.3382, -121.8863, [
    "san jose california", "valle de silicon", "silicon valley", "san jose",
  ]),
  C("Austin", "US", 30.2672, -97.7431),
  C("Jacksonville", "US", 30.3322, -81.6557),
  C("San Francisco", "US", 37.7749, -122.4194),
  C("Seattle", "US", 47.6062, -122.3321),
  C("Denver", "US", 39.7392, -104.9903),
  C("Boston", "US", 42.3601, -71.0589),
  C("Miami", "US", 25.7617, -80.1918, ["miami"]),
  C("Atlanta", "US", 33.749, -84.388),
  C("Las Vegas", "US", 36.1699, -115.1398),
  C("Detroit", "US", 42.3314, -83.0458),
  C("Minneapolis", "US", 44.9778, -93.265),
  C("Portland", "US", 45.5152, -122.6784),
  C("Nashville", "US", 36.1627, -86.7816),
  C("Orlando", "US", 28.5383, -81.3792),
  C("Charlotte", "US", 35.2271, -80.8431),
  C("Honolulu", "US", 21.3069, -157.8583, ["hawai", "hawaï"]),
  C("Anchorage", "US", 61.2181, -149.9003),
  

  C("Ottawa", "CA", 45.4215, -75.6972),
  C("Toronto", "CA", 43.6532, -79.3832),
  C("Montreal", "CA", 45.5019, -73.5674, ["montreal", "montréal"]),
  C("Vancouver", "CA", 49.2827, -123.1207),
  C("Calgary", "CA", 51.0447, -114.0719),
  C("Edmonton", "CA", 53.5461, -113.4938),
  C("Halifax", "CA", 44.6488, -63.5752),

  // --- Europa ---------------------------------------------------------
  C("Londres", "GB", 51.5074, -0.1278, ["london", "londinense"]),
  C("Manchester", "GB", 53.4808, -2.2426),
  C("Birmingham", "GB", 52.4862, -1.8904),
  C("Edimburgo", "GB", 55.9533, -3.1883, ["edinburgh", "edimburgo"]),
  C("Glasgow", "GB", 55.8642, -4.2518, ["glasgow"]),
  C("Dublín", "IE", 53.3498, -6.2603, ["dublin", "dublín"]),
  C("Bruselas", "BE", 50.8503, 4.3517, ["bruselas", "bruselense"]),
  C("Amsterdam", "NL", 52.3676, 4.9041, ["amsterdam", "holandés"]),
  C("La Haya", "NL", 52.0705, 4.3007),
  C("París", "FR", 48.8566, 2.3522, ["paris", "parís", "parisino", "frances"]),
  C("Marsella", "FR", 43.2965, 5.3698, ["marseille"]),
  C("Lyon", "FR", 45.764, 4.8357),
  C("Berlín", "DE", 52.52, 13.405, ["berlin", "berlín", "berlinés", "berlines"]),
  C("Múnich", "DE", 48.1351, 11.582, ["munich", "múnich"]),
  C("Colonia", "DE", 50.9375, 6.9603, ["köln", "colonia alemana"]),
  C("Hamburgo", "DE", 53.5511, 9.9937, ["hamburg"]),
  C("Fráncfort", "DE", 50.1109, 8.6821, ["frankfurt"]),
  C("Viena", "AT", 48.2082, 16.3738, ["vienés", "vienna"]),
  C("Zúrich", "CH", 47.3769, 8.5417, ["zurich", "zúrich", "suizo"]),
  C("Ginebra", "CH", 46.2044, 6.1432, ["geneva", "ginebra"]),
  C("Roma", "IT", 41.9028, 12.4964, ["roman", "romano"]),
  C("Milán", "IT", 45.4642, 9.19, ["milan", "milán"]),
  C("Nápoles", "IT", 40.8518, 14.2681, ["napoles"]),
  C("Turín", "IT", 45.0703, 7.6869, ["turin", "torino"]),
  C("Atenas", "GR", 37.9838, 23.7275, ["atenas", "atenienses"]),
  C("Lisboa", "PT", 38.7223, -9.1393, ["lisboa", "portugués", "lisboeta"]),
  C("Oporto", "PT", 41.1579, -8.6291, ["porto", "oporto"]),
  C("Estambul", "TR", 41.0082, 28.9784, ["istanbul", "estambul", "constantinopla"]),
  C("Ankara", "TR", 39.9334, 32.8597, ["turco", "ankara"]),
  C("Varsovia", "PL", 52.2297, 21.0122, ["varsovia", "polaco"]),
  C("Cracovia", "PL", 50.0647, 19.945, ["cracovia", "krakow"]),
  C("Estocolmo", "SE", 59.3293, 18.0686, ["stocolmo", "sueco"]),
  C("Oslo", "NO", 59.9139, 10.7522, ["oslo", "noruego"]),
  C("Copenhague", "DK", 55.6761, 12.5683, ["copenhague", "danés"]),
  C("Helsinki", "FI", 60.1699, 24.9384, ["helsinki", "finés"]),
  C("Reikiavik", "IS", 64.1466, -21.9426, ["reykjavik", "reikiavik"]),
  C("Moscú", "RU", 55.7558, 37.6173, ["moscu", "moscú", "moscovita"]),
  C("San Petersburgo", "RU", 59.9311, 30.3609, ["san petersburgo", "petrogrado", "leningrado"]),
  C("Kiev", "UA", 50.4501, 30.5234, ["kyiv", "kiev", "kievita"]),
  C("Odesa", "UA", 46.4825, 30.7233, ["odessa", "odesa"]),
  C("Lviv", "UA", 49.8397, 24.0297, ["lviv", "leopolis"]),
  C("Minsk", "BY", 53.9006, 27.559, ["minsk", "bielorruso"]),
  C("Chisináu", "MD", 47.0105, 28.8638, ["chisinau", "moldavo"]),
  C("Tiflis", "GE", 41.7151, 44.8271, ["tbilisi", "tiflis"]),
  C("Ereván", "AM", 40.1792, 44.4991, ["erevan", "yerevan"]),
  C("Bakú", "AZ", 40.4093, 49.8671, ["baku", "azerbaiyano"]),
  C("Belgrado", "RS", 44.7866, 20.4489, ["belgrado", "serbio"]),
  C("Zagreb", "HR", 45.815, 15.9819, ["zagreb", "croata"]),
  C("Ljubljana", "SI", 46.0569, 14.5058, ["liubliana", "esloveno"]),
  C("Sarajevo", "BA", 43.8563, 18.4131, ["sarajevo", "bosnio"]),
  C("Podgorica", "ME", 42.4304, 19.2594, ["podgorica"]),
  C("Skopje", "MK", 41.9973, 21.428, ["skopje", "macedonio"]),
  C("Tirana", "AL", 41.3275, 19.8187, ["tirana", "albanés"]),
  C("Praga", "CZ", 50.0755, 14.4378, ["praga", "checo"]),
  C("Bratislava", "SK", 48.1486, 17.1077, ["bratislava", "eslovaco"]),
  C("Budapest", "HU", 47.4979, 19.0402, ["budapest", "húngaro"]),
  C("Bucarest", "RO", 44.4268, 26.1025, ["bucarest", "bucuresti", "rumano"]),
  C("Sofía", "BG", 42.6977, 23.3219, ["sofia", "búlgaro"]),

  // --- Oriente Próximo -------------------------------------------------
  C("Jerusalén", "IL", 31.7683, 35.2137, ["jerusalem", "jerusalen"]),
  C("Tel Aviv", "IL", 32.0853, 34.7818, ["tel aviv"]),
  C("Haifa", "IL", 32.794, 34.9896, ["haifa", "haifa"]),
  C("Eilat", "IL", 29.5581, 34.9482, ["eilat", "eilat"]),
  C("Gaza", "PS", 31.5, 34.4667, ["gaza", "hamás"]),
  C("Ramala", "PS", 31.9038, 35.2034, ["ramala"]),
  C("Nablus", "PS", 32.2211, 35.2544, ["nablus", "nablus"]),
  C("Beirut", "LB", 33.8938, 35.5018, ["beirut", "beirutí"]),
  C("Damasco", "SY", 33.5138, 36.2765, ["damasco", "sirio"]),
  C("Aleppo", "SY", 36.2021, 37.1343, ["aleppo", "alepo"]),
  C("Baghdad", "IQ", 33.3152, 44.3661, ["baghdad", "iraquí", "baghán"]),
  C("Erbil", "IQ", 36.1911, 44.0092, ["erbil", "kurdo"]),
  C("Teherán", "IR", 35.6892, 51.389, ["teheran", "iraní", "persa"]),
  C("Riad", "SA", 24.7136, 46.6753, ["riad", "riyad", "saudita"]),
  C("Jedda", "SA", 21.4858, 39.1925, ["jeddah", "yeda"]),
  C("Sanaa", "YE", 15.3694, 44.191, ["sanaa", "yemení"]),
  C("Dubái", "AE", 25.2048, 55.2708, ["dubai", "emiratí"]),
  C("Abu Dabi", "AE", 24.4539, 54.3773, ["abu dhabi"]),
  C("Doha", "QA", 25.2854, 51.531, ["doha", "qatari"]),
  C("Muscat", "OM", 23.588, 58.3829, ["masqat", "omaní"]),
  C("Kabul", "AF", 34.5553, 69.2075, ["kabul", "afgano"]),
  C("Karachi", "PK", 31.5204, 74.3587, ["karachi", "paquistani"]),
  C("Lahore", "PK", 31.5204, 74.3587, ["lahore"]),
  C("Islamabad", "PK", 33.6844, 73.0479, ["islamabad"]),

  // --- Asia -----------------------------------------------------------
  C("Nueva Delhi", "IN", 28.6139, 77.209, ["delhi", "nueva delhi", "indio"]),
  C("Mumbai", "IN", 19.076, 72.8777, ["bombay", "bombay"]),
  C("Bangalore", "IN", 12.9716, 77.5946, ["bengaluru"]),
  C("Chennai", "IN", 13.0827, 80.2707, ["madras"]),
  C("Dhaka", "BD", 23.8103, 90.4125, ["dhaka", "bangladeshi"]),
  C("Colombo", "LK", 6.9271, 79.8612, ["colombo"]),
  C("Katmandu", "NP", 27.7172, 85.324, ["kathmandu", "katmandu"]),
  C("Rangún", "MM", 16.8409, 96.1735, ["yangon", "rangoon"]),
  C("Bangkok", "TH", 13.7563, 100.5018, ["bangkok", "tailandés"]),
  C("Hanói", "VN", 21.0278, 105.8342, ["hanoi", "vietnamita"]),
  C("Ciudad de Ho Chi Minh", "VN", 10.8231, 106.6297, ["ho chi minh"]),
  C("Nom Penh", "KH", 11.5564, 104.9282, ["nom penh", "phanom penh", "camboyano"]),
  C("Vientiane", "LA", 17.9757, 102.6331, ["vientiane"]),
  C("Kuala Lumpur", "MY", 3.139, 101.6869, ["kuala lumpur", "malayo"]),
  C("Singapur", "SG", 1.3521, 103.8198, ["singapur", "singapurés"]),
  C("Yakarta", "ID", -6.2088, 106.8456, ["jakarta", "indonesio"]),
  C("Manila", "PH", 14.5995, 120.9842, ["manila", "filipino"]),
  C("Pekín", "CN", 39.9042, 116.4074, ["pekin", "beijing", "chino"]),
  C("Shanghái", "CN", 31.2304, 121.4737, ["shanghai"]),
  C("Hong Kong", "CN", 22.3193, 114.1694, ["hong kong"]),
  C("Cantón", "CN", 23.1291, 113.2644, ["guangzhou", "canton"]),
  C("Shenzhen", "CN", 22.5431, 114.0579),
  C("Hangzhou", "CN", 30.2741, 120.1551),
  C("Wuhan", "CN", 30.5928, 114.3055),
  C("Xi'an", "CN", 34.3416, 108.9398, ["xian", "sian"]),
  C("Urumqi", "CN", 43.8256, 87.6168, ["urumqi", "xinjiang"]),
  C("Lhasa", "CN", 29.65, 91.14, ["lhasa", "tibet"]),
  C("Tokio", "JP", 35.6762, 139.6503, ["tokio", "tokyo", "japonés", "japonesa"]),
  C("Kioto", "JP", 35.0116, 135.7681, ["kyoto"]),
  C("Osaka", "JP", 34.6937, 135.5023),
  C("Yokohama", "JP", 35.4437, 139.638),
  C("Seúl", "KR", 37.5665, 126.978, ["seul", "coreano", "seúl"]),
  C("Busan", "KR", 35.1796, 129.0756, ["pusan"]),
  C("Pyeongchang", "KR", 37.3727, 128.3901, ["corea 2018"]),
  C("Pyongyang", "KP", 39.0392, 125.7625, ["piran", "norcoreano"]),
  C("Ulaanbaatar", "MN", 47.8864, 106.9057, ["ulaanbaatar", "mongol"]),
  C("Almaty", "KZ", 43.222, 76.8512, ["almaty", "almatí", "kazajo"]),
  C("Astana", "KZ", 51.1694, 71.4491, ["nur sultan", "nur-sultan"]),
  C("Tashkent", "UZ", 41.2995, 69.2401, ["tashkent", "uzbeko"]),

  // --- África ---------------------------------------------------------
  C("El Cairo", "EG", 30.0444, 31.2357, ["cairo", "egipcio"]),
  C("Giza", "EG", 30.0444, 31.2357),
  C("Alejandría", "EG", 31.2001, 29.9187, ["alexandria"]),
  C("Tripoli", "LY", 32.8872, 13.1913, ["trípoli"]),
  C("Bengasi", "LY", 32.1167, 20.0667, ["bengasi"]),
  C("Túnez", "TN", 36.8065, 10.1815, ["tunez", "tunecino"]),
  C("Argel", "DZ", 36.7538, 3.0588, ["argel", "argelino"]),
  C("Rabat", "MA", 34.0209, -6.8416, ["rabat", "marroquí"]),
  C("Casablanca", "MA", 33.5731, -7.5898, ["casa blanca", "casablanca"]),
  C("Jartum", "SD", 15.5007, 32.5599, ["khartoum"]),
  C("Addis Abeba", "ET", 9.032, 38.7469, ["addis abeba"]),
  C("Mogadishu", "SO", 2.0469, 45.3182, ["mogadishu"]),
  C("Nairobi", "KE", -1.2921, 36.8219, ["nairobi", "keniano"]),
  C("Abuja", "NG", 9.0765, 7.3986, ["abuja"]),
  C("Lagos", "NG", 6.5244, 3.3792, ["lagos", "nigeriano"]),
  C("Kano", "NG", 12.0022, 8.592, ["kano"]),
  C("Pretoria", "ZA", -25.7479, 28.2293, ["pretoria"]),
  C("Johannesburgo", "ZA", -26.2041, 28.0473, ["johannesburgo", "sudafricano"]),
  C("Ciudad del Cabo", "ZA", -33.9249, 18.4241, ["ciudad del cabo", "cape town"]),
  C("Durban", "ZA", -29.8587, 31.0218, ["durban"]),
  C("Kinshasa", "CD", -4.4419, 15.2663, ["kinshasa"]),
  C("Luanda", "AO", -8.839, 13.2894, ["luanda", "angolano"]),
  C("Maputo", "MZ", -25.9692, 32.5732, ["maputo"]),
  C("Harare", "ZW", -17.8252, 31.0335, ["harare", "zimbabue"]),
  C("Lusaka", "ZM", -15.3875, 28.3228, ["lusaka"]),
  C("Kampala", "UG", 0.3476, 32.5825, ["kampala"]),
  C("Kigali", "RW", -1.9441, 30.0619, ["kigali"]),
  C("Dakar", "SN", 14.7167, -17.4677, ["dakar", "senegalés"]),
  C("Conakry", "GN", 9.6412, -13.5784, ["conakry"]),
  C("Abidjan", "CI", 5.36, -4.0083, ["abidjan"]),
  C("Ouagadougou", "BF", 12.3714, -1.5197, ["ouagadougou"]),
  C("Bamako", "ML", 12.6392, -8.0029, ["bamako"]),
  C("Niamey", "NE", 13.5116, 2.1254, ["niamey"]),
  C("Dodoma", "TZ", -6.163, 35.7516, ["dodoma"]),
  C("Dar es Salaam", "TZ", -6.7924, 39.2083, ["dar es salaam"]),
  C("Antananarivo", "MG", -18.8792, 47.5079, ["antananarivo", "malagasy"]),

  // --- Oceania ---------------------------------------------------------
  C("Sídney", "AU", -33.8688, 151.2093, ["sydney", "australiano"]),
  C("Melbourne", "AU", -37.8136, 144.9631, ["melbourne"]),
  C("Canberra", "AU", -35.2809, 149.13, ["canberra"]),
  C("Perth", "AU", -31.9523, 115.8613, ["perth"]),
  C("Brisbane", "AU", -27.4698, 153.0251, ["brisbane"]),
  C("Adelaida", "AU", -34.9285, 138.6007, ["adelaide"]),
  C("Auckland", "NZ", -36.8485, 174.7633, ["auckland"]),
  C("Wellington", "NZ", -41.2865, 174.7762, ["wellington"]),
  C("Christchurch", "NZ", -43.5321, 172.6362, ["christchurch"]),
  C("Suva", "FJ", -18.1416, 178.4419, ["suva"]),
  C("Port Moresby", "PG", -9.4438, 147.1803, ["port moresby"]),
];

/* ================================================================== */
/* Índice                                                             */
/* ================================================================== */

/**
 * Alias normalizado -> lugares que lo declaran.
 * Un alias puede pertenecer a varios lugares (p. ej. "Santiago" en Chile,
 * o "Valencia" en España y Venezuela). Se priorizan los países.
 */
export const INDICE: Map<string, Lugar[]> = (() => {
  const m = new Map<string, Lugar[]>();
  for (const lugar of [...PAISES, ...REGIONES, ...CIUDADES]) {
    for (const a of lugar.alias) {
      if (a.length < 4) continue; // evita colisiones con palabras cortas
      const arr = m.get(a) ?? [];
      if (!arr.some((x) => x.id === lugar.id)) arr.push(lugar);
      m.set(a, arr);
    }
  }
  // En los alias compartidos, primero los países, luego ciudades, luego regiones
  for (const arr of m.values()) {
    arr.sort((a, b) => pesoTipo(a) - pesoTipo(b));
  }
  return m;
})();

/** Multiplicador por tipo de lugar. */
export function pesoTipo(l: Lugar): number {
  return l.tipo === "pais" ? 3 : l.tipo === "ciudad" ? 2 : 1;
}

export const LUGARES: Lugar[] = [...PAISES, ...REGIONES, ...CIUDADES];

export const LUGAR_POR_ID = new Map(LUGARES.map((l) => [l.id, l]));