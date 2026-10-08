"use strict";
(() => {
  // public/vendor/web.mjs
  var M = [{ id: "politica", nombre: "Pol\xEDtica", color: "#7c5cff", emoji: "\u{1F3DB}\uFE0F", terminos: { elecciones: 4, election: 3, voto: 2, votan: 2, votos: 2, electoral: 3, campa\u00F1a: 2, candidato: 3, candidata: 3, candidatos: 3, partido: 2, coalici\u00F3n: 2, coalicion: 2, congreso: 3, diputado: 3, diputada: 3, diputados: 3, parlamento: 3, parlamentario: 3, senado: 3, legislatura: 3, ley: 2, reforma: 3, gobierno: 3, "gobierno de": 4, legislaci\u00F3n: 3, legislacion: 3, "proyecto de ley": 4, normativa: 2, decreto: 2, "decreto-ley": 4, presidente: 3, presidenta: 3, presidencia: 3, ministro: 3, ministra: 3, ministros: 3, "ministra de": 4, "primer ministro": 4, ministraancell: 4, canciller: 3, oposici\u00F3n: 3, oposicion: 3, mayor\u00EDa: 2, mayoria: 2, alcalde: 3, alcaldesa: 3, ayuntamiento: 3, refer\u00E9ndum: 3, referendun: 3, amnist\u00EDa: 3, amnistia: 3, destituci\u00F3n: 3, destitucion: 3, renuncia: 2, dimision: 3, investidura: 3, debate: 1, votaci\u00F3n: 3, votacion: 3, premier: 3, "gobierno britanico": 5, "white house": 4, "casa blanca": 4, "congreso de los diputados": 5, capitolio: 4 } }, { id: "economia", nombre: "Econom\xEDa", color: "#00c48c", emoji: "\u{1F4C8}", terminos: { inflaci\u00F3n: 5, inflacion: 5, inflation: 4, ipc: 3, pib: 4, econom\u00EDa: 4, economia: 4, economico: 3, econ\u00F3mico: 3, recesion: 4, recesi\u00F3n: 4, deficit: 3, deuda: 3, presupuesto: 3, impuesto: 3, impuestos: 3, fiscal: 3, "banco central": 5, bce: 4, fed: 4, "reserva federal": 5, "tipos de inter\xE9s": 4, "tasa de inter\xE9s": 4, "tipos de interes": 4, mercado: 2, mercados: 2, bolsa: 3, "bolsa de valores": 4, \u00EDndice: 1, ibex: 4, "dow jones": 4, nasdaq: 4, petr\u00F3leo: 4, petroleo: 4, oil: 3, brent: 4, wti: 4, gasolina: 3, carburante: 3, electricidad: 3, caf\u00E9: 2, cafe: 2, puerto: 1, p\u00E9rdidas: 3, perdidas: 3, ganancias: 3, beneficios: 2, p\u00E9rdida: 3, perdida: 3, bono: 3, bonos: 3, "deuda p\xFAblica": 4, consumo: 2, euribor: 4, divisa: 3, divisas: 3, moneda: 2, euro: 2, dolar: 2, d\u00F3lar: 2, devaluaci\u00F3n: 4, devaluacion: 4, empleo: 3, paro: 4, desempleo: 4, salario: 3, salarios: 3, pension: 2, pensiones: 2, pymes: 3, empresa: 2, empresas: 2, startup: 3, banco: 2, bancos: 2, banca: 3, cr\u00E9dito: 3, credito: 3, hipoteca: 3, alquiler: 2, vivienda: 2, inversi\u00F3n: 2, inversion: 2, inversores: 2, tarifa: 2, tarifas: 2, comercial: 1, exportaciones: 3, importaciones: 3, turismo: 3, turista: 3, turistas: 3, viajes: 2 } }, { id: "conflicto", nombre: "Conflictos", color: "#ff4d4d", emoji: "\u2694\uFE0F", terminos: { guerra: 5, "guerra de": 6, conflicto: 4, "conflicto armado": 6, ataque: 4, ataques: 4, atropello: 4, bombardeo: 5, bombardeos: 5, misil: 4, misiles: 4, cohete: 3, munici\u00F3n: 3, municion: 3, explosi\u00F3n: 4, explosion: 4, ej\u00E9rcito: 4, ejercito: 4, militar: 3, militares: 3, soldado: 3, soldados: 3, ofensiva: 4, contraofensiva: 4, invasion: 5, invasi\u00F3n: 5, ocupaci\u00F3n: 4, ocupacion: 4, frontera: 3, ceasefire: 5, "alto el fuego": 5, tregua: 4, "negociaciones de paz": 5, genocidio: 5, "crisis de refugiados": 5, refugiados: 4, desplazados: 4, hambruna: 4, rebeli\u00F3n: 4, rebelion: 4, insurrecci\u00F3n: 5, "golpe de estado": 6, terrorismo: 5, atentado: 5, atentados: 5, secuestro: 4, coup: 3, tensi\u00F3n: 2, tension: 2, escalada: 3, violencia: 3, manifestantes: 3, protestas: 3, protesta: 3, "oposici\xF3n armada": 5, "coup d'etat": 5 } }, { id: "deportes", nombre: "Deportes", color: "#ffa500", emoji: "\u26BD", terminos: { f\u00FAtbol: 5, futbol: 5, football: 4, liga: 2, "la liga": 4, "real madrid": 4, bar\u00E7a: 4, barcelona: 2, atletico: 3, "atl\xE9tico de madrid": 4, juventus: 4, bayern: 4, manchester: 3, champions: 4, "champions league": 5, "liga mx": 5, mundial: 3, copa: 2, torneo: 3, partido: 3, goles: 4, gol: 3, entrenador: 3, entrenadora: 3, jugador: 2, jugadores: 2, transferencia: 3, fichaje: 4, lesi\u00F3n: 3, lesion: 3, lesionado: 3, recuperaci\u00F3n: 1, basketball: 4, b\u00E1squetbol: 4, tenis: 4, "grand slam": 4, atletismo: 4, olimpiadas: 5, ol\u00EDmpicas: 5, "juegos Ol\xEDmpicos": 6, "mundial de": 3, "olympic games": 4, ciclismo: 4, ciclista: 4, "formula 1": 4, "f\xF3rmula 1": 4, "grand prix": 3, motor: 2, boxeo: 4, p\u00E1del: 3, beisbol: 3, b\u00E9isbol: 3, rugby: 4, golf: 3, gimnasia: 4, nataci\u00F3n: 4, remo: 3, deportista: 3, deporte: 2, deportes: 2, estadio: 3, "estadio azteca": 4, "mundial de f\xFAtbol": 5 } }, { id: "ciencia", nombre: "Ciencia", color: "#00b8ff", emoji: "\u{1F52C}", terminos: { ciencia: 4, cient\u00EDfico: 3, cientifico: 3, cient\u00EDficos: 3, investigaci\u00F3n: 3, investigacion: 3, investigadores: 3, estudio: 2, estudios: 2, hallazgo: 3, hallazgos: 3, descubrimiento: 4, descubren: 3, nasa: 4, espacio: 3, astronom\u00EDa: 4, astronomia: 4, astr\u00F3nomo: 3, satelite: 3, sat\u00E9lite: 3, "cohete espacial": 3, marte: 4, luna: 3, planeta: 3, universo: 3, galaxia: 4, telescopio: 4, f\u00EDsica: 4, qu\u00EDmica: 4, quimica: 4, biolog\u00EDa: 4, biologia: 4, gen\u00E9tica: 4, genetica: 4, genoma: 4, dna: 3, rna: 2, "inteligencia artificial": 4, algoritmo: 2, algoritmos: 2, "investigadores de": 3, "premio nobel": 5, nobel: 4, "fusi\xF3n nuclear": 4, "fusion nuclear": 4, eclipse: 4, meteorito: 4, "c dinosaurio": 1, dinosaurio: 4, f\u00F3sil: 4, fosil: 4, arqueolog\u00EDa: 4, arqueologia: 4, arque\u00F3logo: 4, arqueologo: 4, hallan: 2, demuestran: 2, teor\u00EDa: 2, teoria: 2, cerebro: 3, neuronas: 3, consciente: 2, "investigaci\xF3n cient\xEDfica": 5, c\u00E9lula: 2, celula: 2 } }, { id: "salud", nombre: "Salud", color: "#2ecc71", emoji: "\u{1F3E5}", terminos: { salud: 4, sanitario: 3, sanitarios: 3, m\u00E9dico: 4, medico: 4, m\u00E9dica: 4, medica: 4, m\u00E9dicos: 4, medicos: 4, hospital: 4, hospitales: 4, paciente: 3, pacientes: 3, enfermedad: 4, enfermedades: 4, virus: 3, bacterias: 3, vacuna: 3, vacunas: 3, vacunaci\u00F3n: 4, inmunizaci\u00F3n: 4, pandemia: 5, epidemia: 5, brotes: 3, contagio: 4, oms: 4, "organizaci\xF3n mundial de la salud": 6, who: 2, c\u00E1ncer: 4, cancer: 4, oncolog\u00EDa: 4, diabetes: 4, obesidad: 3, card\u00EDaco: 4, cardiaco: 4, infarto: 4, alzheimer: 4, demencia: 4, depresi\u00F3n: 3, depresion: 3, "salud mental": 5, bienestar: 2, nutrici\u00F3n: 3, nutricion: 3, diet: 2, cirug\u00EDa: 4, cirugia: 4, trasplante: 4, medicamento: 3, medicamentos: 3, tratamiento: 2, sida: 3, hiv: 3, tuberculosis: 4, malaria: 4, dengue: 4, covid: 4, sarampi\u00F3n: 4, sarampion: 4, embarazo: 3, mortalidad: 3, muerte: 1, fallece: 2 } }, { id: "clima", nombre: "Clima", color: "#22c1c3", emoji: "\u{1F30D}", terminos: { clima: 4, clim\u00E1tico: 3, climatico: 3, clim\u00E1tica: 3, climatica: 3, "medio ambiente": 4, ecol\u00F3gico: 3, ecologico: 3, ecol\u00F3gica: 3, ecologica: 3, contaminaci\u00F3n: 4, contaminacion: 4, emisiones: 3, emision: 3, carbono: 3, co2: 3, "efecto invernadero": 5, "calentamiento global": 6, temperatura: 3, temperaturas: 3, "ola de calor": 5, "ola calor": 5, sequ\u00EDa: 4, sequia: 4, sequ\u00EDas: 4, sequias: 4, inundaci\u00F3n: 4, inundacion: 4, inundaciones: 4, hurac\u00E1n: 5, huracan: 5, huracanes: 5, cicl\u00F3n: 5, ciclon: 5, tif\u00F3n: 5, tifon: 5, tornado: 4, tormenta: 3, "tormenta tropical": 5, "depresi\xF3n tropical": 4, "depresion tropical": 4, alerta: 1, evacuados: 3, evacuaci\u00F3n: 3, evacuacion: 3, desastre: 3, desastres: 3, cat\u00E1strofe: 4, catastrofe: 4, erupci\u00F3n: 4, erupcion: 4, volc\u00E1n: 4, volcan: 4, terremoto: 4, sismo: 3, incendio: 3, incendios: 3, bombero: 3, bomberos: 3, "protecci\xF3n civil": 4, reciclaje: 3, renovable: 3, renovables: 3, solar: 2, e\u00F3lica: 3, eolica: 3, sostenible: 3, sostenibilidad: 4, "acuerdo de paris": 5, cop28: 5, cop29: 5, cop30: 5, "cambio clim\xE1tico": 6, "cambio climatico": 6 } }, { id: "tecnologia", nombre: "Tecnolog\xEDa", color: "#4dd0e1", emoji: "\u{1F4BB}", terminos: { tecnolog\u00EDa: 4, tecnologia: 4, tecnol\u00F3gico: 3, tecnologico: 3, tech: 3, aplicaci\u00F3n: 2, aplicacion: 2, app: 2, apps: 2, software: 3, hardware: 3, internet: 3, "redes sociales": 4, "red social": 4, facebook: 3, instagram: 3, twitter: 2, "x.com": 2, tiktok: 3, youtube: 3, whatsapp: 3, telegram: 2, "inteligencia artificial": 4, "machine learning": 4, "aprendizaje autom\xE1tico": 4, chatgpt: 4, openai: 4, google: 2, microsoft: 2, apple: 2, amazon: 2, meta: 2, chip: 3, chips: 3, semiconductor: 4, semiconductores: 4, intel: 2, nvidia: 2, smartphone: 3, m\u00F3vil: 2, movil: 2, tel\u00E9fono: 2, telefono: 2, smart: 2, autonomous: 1, aut\u00F3nomo: 3, autonomo: 3, robot: 3, robots: 3, ciberseguridad: 4, ciberataque: 5, hackeo: 4, hack: 3, hacker: 3, ciberdelito: 4, ransomware: 4, "filtraci\xF3n de datos": 4, privacidad: 3, "datos personales": 1, "regulaci\xF3n digital": 4, startup: 3, emprendimiento: 2, "app store": 3, nube: 2, "internet de las cosas": 5, blockchain: 3, criptomoneda: 3, bitcoin: 3, cripto: 2, inteligencia: 2, robotica: 4, nasa: 4, spacex: 4, tesla: 2, samsung: 1, sony: 1, huawei: 1 } }, { id: "cultura", nombre: "Cultura", color: "#ff6ec7", emoji: "\u{1F3AD}", terminos: { cultura: 4, cultural: 3, arte: 3, artista: 3, artistas: 3, museo: 3, museos: 3, exposici\u00F3n: 3, exposicion: 3, pintura: 3, cuadro: 2, escultura: 3, mural: 3, teatro: 3, "obra de teatro": 4, cine: 3, pel\u00EDcula: 3, pelicula: 3, director: 2, directora: 2, actor: 2, actriz: 2, actores: 2, actrices: 2, serie: 2, series: 2, televisi\u00F3n: 3, television: 3, netflix: 3, hbo: 3, streaming: 3, disney: 2, premio: 2, premios: 2, "gana el": 1, nominado: 2, oscar: 4, goya: 4, grammy: 4, grammys: 4, festival: 3, festivales: 3, libro: 2, libros: 2, novela: 3, escritor: 3, escritora: 3, poeta: 3, poes\u00EDa: 3, musica: 3, m\u00FAsica: 3, concierto: 3, cantante: 3, banda: 2, \u00E1lbum: 3, album: 3, cancion: 2, canci\u00F3n: 2, pop: 1, rock: 2, reguet\u00F3n: 3, flamenco: 4, tango: 3, folclore: 4, gastronom\u00EDa: 3, gastronomia: 3, restaurante: 2, cocina: 1, receta: 2, artefactos: 1, arquitectura: 2, monumento: 2, patrimonio: 2, "patrimonio de la humanidad": 4, efem\u00E9rides: 2, aniversario: 2, conmemoraci\u00F3n: 2 } }, { id: "sociedad", nombre: "Sociedad", color: "#9b8cff", emoji: "\u{1F465}", terminos: { sociedad: 3, ciudadanos: 2, ciudadana: 2, habitantes: 2, vecinos: 2, vecino: 2, comunidad: 2, poblaci\u00F3n: 2, migra: 3, migraci\u00F3n: 3, migracion: 3, migrante: 3, migrantes: 3, inmigraci\u00F3n: 3, inmigracion: 3, asilo: 4, tr\u00E1fico: 3, accidente: 3, accidentes: 3, choque: 3, incendio: 3, robo: 3, hurto: 3, delito: 3, delitos: 3, polic\u00EDa: 3, policia: 3, detenido: 3, detencion: 3, detenci\u00F3n: 3, detenciones: 3, juez: 3, jueza: 3, tribunal: 3, fiscal: 2, c\u00E1rcel: 4, carcel: 4, prisi\u00F3n: 4, prision: 4, condena: 3, condenado: 3, condenada: 3, juicio: 3, investiga: 2, "violencia de g\xE9nero": 5, machismo: 3, feminicidio: 4, hambre: 3, pobreza: 3, pobres: 2, desigualdad: 3, educacion: 3, educaci\u00F3n: 3, colegio: 2, escuela: 2, universidad: 2, estudiante: 2, estudiantes: 2, profesores: 2, bombas: 2, explosi\u00F3n: 3, desaparecido: 3, desaparecida: 3, rescate: 3, salvamento: 3, b\u00FAsqueda: 3, busqueda: 3, mujeres: 2, hombres: 2, ni\u00F1os: 2, ninos: 2, adolescentes: 2, "personas mayores": 3, discapacidad: 3, lgbt: 3, lgbtq: 3 } }, { id: "deportes_olimpicos", nombre: "Ol\xEDmpicos", color: "#ffd700", emoji: "\u{1F3C5}", terminos: { ol\u00EDmpico: 4, olimpico: 4, ol\u00EDmpica: 4, olimpica: 4, ol\u00EDmpicos: 4, olimpicos: 4, "juegos ol\xEDmpicos": 6, "medalla de oro": 5, "medalla de plata": 5, "medalla de bronce": 5, medallas: 4, olimpiadas: 5, atleta: 3, atletas: 3, r\u00E9cord: 3, record: 3, "r\xE9cord olympico": 5, paral\u00EDmpico: 5, paralimpico: 5, "comit\xE9 ol\xEDmpico": 5, "committee olimpico": 1 } }];
  var L2 = (() => {
    let o = (r) => r.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim(), i = /* @__PURE__ */ new Map();
    for (let r of M) for (let [s, n] of Object.entries(r.terminos)) {
      let l = o(s);
      if (!l) continue;
      let g = i.get(l) ?? [];
      g.push({ categoria: r.id, peso: n }), i.set(l, g);
    }
    return i;
  })();
  var W = new Map(M.map((o) => [o.id, o]));
  var y = [{ id: "elpais", nombre: "El Pa\xEDs", dominio: "elpais.com", paisPorDefecto: "ES", idioma: "es", color: "#0a4d7c", feeds: ["https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada"] }, { id: "lavanguardia", nombre: "La Vanguardia", dominio: "lavanguardia.com", paisPorDefecto: "ES", idioma: "es", color: "#c8102e", feeds: ["https://www.lavanguardia.com/rss/home.xml", "https://www.lavanguardia.com/rss/internacional.xml", "https://www.lavanguardia.com/rss/economia.xml", "https://www.lavanguardia.com/rss/politica.xml", "https://www.lavanguardia.com/rss/cultura.xml", "https://www.lavanguardia.com/rss/deportes.xml", "https://www.lavanguardia.com/rss/sociedad.xml"] }, { id: "elmundo", nombre: "El Mundo", dominio: "elmundo.es", paisPorDefecto: "ES", idioma: "es", color: "#0b3d6b", feeds: ["https://e00-elmundo.uecdn.es/elmundo/rss/portada.xml", "https://e00-elmundo.uecdn.es/elmundo/rss/internacional.xml", "https://e00-elmundo.uecdn.es/elmundo/rss/economia.xml", "https://e00-elmundo.uecdn.es/elmundo/rss/espana.xml", "https://e00-elmundo.uecdn.es/elmundo/rss/ciencia.xml", "https://e00-elmundo.uecdn.es/elmundo/rss/cultura.xml"] }, { id: "abc", nombre: "ABC", dominio: "abc.es", paisPorDefecto: "ES", idioma: "es", color: "#1a1a1a", feeds: ["https://www.abc.es/rss/2.0/portada/", "https://www.abc.es/rss/2.0/internacional/", "https://www.abc.es/rss/2.0/economia/", "https://www.abc.es/rss/2.0/ciencia/", "https://www.abc.es/rss/2.0/cultura/", "https://www.abc.es/rss/2.0/deportes/"] }, { id: "eldiario-es", nombre: "elDiario.es", dominio: "eldiario.es", paisPorDefecto: "ES", idioma: "es", color: "#1b3a2f", feeds: ["https://www.eldiario.es/rss/"] }, { id: "20minutos", nombre: "20 Minutos", dominio: "20minutos.es", paisPorDefecto: "ES", idioma: "es", color: "#e4002b", feeds: ["https://www.20minutos.es/rss/", "https://www.20minutos.es/rss/deportes.xml", "https://www.20minutos.es/rss/ciencia.xml"] }, { id: "el-universal-mx", nombre: "El Universal (M\xE9xico)", dominio: "eluniversal.com.mx", paisPorDefecto: "MX", idioma: "es", color: "#006847", feeds: ["https://www.eluniversal.com.mx/arc/outboundfeeds/rss/?outputType=xml"] }, { id: "el-financiero-mx", nombre: "El Financiero", dominio: "elfinanciero.com.mx", paisPorDefecto: "MX", idioma: "es", color: "#0b2c4a", feeds: ["https://www.elfinanciero.com.mx/rss", "https://www.elfinanciero.com.mx/mercados/rss"] }, { id: "infobae", nombre: "Infobae", dominio: "infobae.com", paisPorDefecto: "AR", idioma: "es", color: "#0f9d58", feeds: ["https://www.infobae.com/arc/outboundfeeds/rss/", "https://www.infobae.com/arc/outboundfeeds/rss/category/politica/", "https://www.infobae.com/arc/outboundfeeds/rss/category/economia/", "https://www.infobae.com/arc/outboundfeeds/rss/category/sociedad/"] }, { id: "lanacion", nombre: "La Naci\xF3n (Argentina)", dominio: "lanacion.com.ar", paisPorDefecto: "AR", idioma: "es", color: "#1b3a2f", feeds: ["https://www.lanacion.com.ar/arc/outboundfeeds/rss/", "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/politica/", "https://www.lanacion.com.ar/arc/outboundfeeds/rss/category/economia/"] }, { id: "clarin", nombre: "Clar\xEDn", dominio: "clarin.com", paisPorDefecto: "AR", idioma: "es", color: "#c8102e", feeds: ["https://www.clarin.com/rss/mundo/", "https://www.clarin.com/rss/politica/", "https://www.clarin.com/rss/economia/", "https://www.clarin.com/rss/sociedad/", "https://www.clarin.com/rss/cultura/", "https://www.clarin.com/rss/deportes/"] }, { id: "el-comercio-pe", nombre: "El Comercio (Per\xFA)", dominio: "elcomercio.pe", paisPorDefecto: "PE", idioma: "es", color: "#8b0000", feeds: ["https://elcomercio.pe/arc/outboundfeeds/rss/?outputType=xml"] }, { id: "eltiempo-co", nombre: "El Tiempo (Colombia)", dominio: "eltiempo.com", paisPorDefecto: "CO", idioma: "es", color: "#d4a017", feeds: ["https://www.eltiempo.com/rss/mundo.xml", "https://www.eltiempo.com/rss/politica.xml", "https://www.eltiempo.com/rss/economia.xml", "https://www.eltiempo.com/rss/deportes.xml", "https://www.eltiempo.com/rss/cultura.xml"] }, { id: "latercera", nombre: "La Tercera", dominio: "latercera.com", paisPorDefecto: "CL", idioma: "es", color: "#005b8f", feeds: ["https://www.latercera.com/rss"] }, { id: "el-nacional-ve", nombre: "El Nacional (Venezuela)", dominio: "elnacional.com", paisPorDefecto: "VE", idioma: "es", color: "#7d0c0c", feeds: ["https://www.elnacional.com/rss"] }, { id: "el-deber", nombre: "El Deber (Bolivia)", dominio: "eldeber.com.bo", paisPorDefecto: "BO", idioma: "es", color: "#8b0000", feeds: ["https://eldeber.com.bo/feed"] }, { id: "la-nacion-cr", nombre: "La Naci\xF3n (Costa Rica)", dominio: "nacion.com", paisPorDefecto: "CR", idioma: "es", color: "#002b5c", feeds: ["https://www.nacion.com/rss"] }, { id: "diariolibre-do", nombre: "Diario Libre (Rep. Dominicana)", dominio: "diariolibre.com", paisPorDefecto: "DO", idioma: "es", color: "#1a1a6d", feeds: ["https://www.diariolibre.com/rss/mundo.xml", "https://www.diariolibre.com/rss/politica.xml", "https://www.diariolibre.com/rss/economia.xml"] }, { id: "eltiempo-do", nombre: "El Tiempo (Rep. Dominicana)", dominio: "eltiempo.com.do", paisPorDefecto: "DO", idioma: "es", color: "#1a4d8f", feeds: ["https://eltiempo.com.do/rss"] }, { id: "bbc-mundo", nombre: "BBC News Mundo", dominio: "bbc.com", paisPorDefecto: "GB", idioma: "es", color: "#bb1919", feeds: ["https://feeds.bbci.co.uk/mundo/rss.xml"] }, { id: "rfi-es", nombre: "RFI Espa\xF1ol", dominio: "rfi.fr", paisPorDefecto: "FR", idioma: "es", color: "#e4022d", feeds: ["https://www.rfi.fr/es/rss"] }, { id: "euronews-es", nombre: "Euronews Espa\xF1ol", dominio: "euronews.com", paisPorDefecto: "FR", idioma: "es", color: "#003a70", feeds: ["https://www.euronews.com/rss?language=es"] }, { id: "telesur", nombre: "teleSUR", dominio: "telesurenglish.net", idioma: "es", color: "#007a3d", feeds: ["https://www.telesurenglish.net/rss"] }];
  var _ = new Map(y.map((o) => [o.id, o]));
  var k = (o) => o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  var P = (o) => o.toLowerCase();
  var e = (o, i, r, s, n = []) => ({ id: P(i), nombre: o, tipo: "pais", pais: i, lat: r, lon: s, alias: [o, ...n].map(k).filter(Boolean) });
  var c = (o, i, r, s, n = []) => ({ id: `${P(i)}-r-${k(o).replace(/\s+/g, "-")}`, nombre: o, tipo: "region", pais: i, lat: r, lon: s, alias: [o, ...n].map(k).filter(Boolean) });
  var a = (o, i, r, s, n = []) => ({ id: `${P(i)}-c-${k(o).replace(/\s+/g, "-")}`, nombre: o, tipo: "ciudad", pais: i, lat: r, lon: s, alias: [o, ...n].map(k).filter(Boolean) });
  var A = [e("Espa\xF1a", "ES", 40.4637, -3.7492, ["reino de espana", "estado espanol", "peninsula iberica", "espana"]), e("Portugal", "PT", 39.3999, -8.2245), e("Francia", "FR", 46.2276, 2.2137), e("M\xF3naco", "MC", 43.7333, 7.4167, ["monaco"]), e("Andorra", "AD", 42.5063, 1.5218, ["la massana", "andorra la vella"]), e("Reino Unido", "GB", 55.3781, -3.436, ["gran bretana", "reino unido", "inglaterra", "pais de gales", "gales", "irlanda del norte", "escocia"]), e("Irlanda", "IE", 53.4129, -8.2439, ["dublin", "republica de irlanda"]), e("B\xE9lgica", "BE", 50.5039, 4.4699, ["belgica", "bruselas"]), e("Pa\xEDses Bajos", "NL", 52.1326, 5.2913, ["paises bajos", "holanda", "amsterdam"]), e("Luxemburgo", "LU", 49.8153, 6.1296), e("Liechtenstein", "LI", 47.166, 9.5554, ["vaduz"]), e("Suiza", "CH", 46.8182, 8.2275, ["suizo"]), e("Austria", "AT", 47.5162, 14.5501, ["viena"]), e("Italia", "IT", 41.8719, 12.5674, ["italiano", "roma"]), e("Ciudad del Vaticano", "VA", 41.9029, 12.4534, ["vaticano", "santa sede"]), e("San Marino", "SM", 43.9424, 12.4578), e("Malta", "MT", 35.9375, 14.3754, ["valletta"]), e("Eslovenia", "SI", 46.1512, 14.9955, ["liubliana"]), e("Croacia", "HR", 45.1, 15.2, ["zagreb", "croata"]), e("Hungr\xEDa", "HU", 47.1625, 19.5033, ["hungria", "budapest", "hungaro"]), e("Eslovaquia", "SK", 48.669, 19.699, ["bratislava"]), e("Ruman\xEDa", "RO", 45.9432, 24.9668, ["rumania", "bucarest", "rumanos"]), e("Bulgaria", "BG", 42.7339, 25.4858, ["sofia", "b\xFAlgaro"]), e("Serbia", "RS", 44.0165, 21.0059, ["belgrado", "serbio"]), e("Bosnia y Herzegovina", "BA", 43.9159, 17.6791, ["bosnia", "herzegovina", "sarajevo"]), e("Montenegro", "ME", 42.7087, 19.3744, ["podgorica"]), e("Kosovo", "XK", 42.6026, 20.9022, ["kosovar", "pristina", "pri\u0161tina"]), e("Albania", "AL", 41.1533, 20.1683, ["tirana", "tiran\xEB", "alban\xE9s"]), e("Macedonia del Norte", "MK", 41.6086, 21.7453, ["macedonia", "skopje"]), e("Grecia", "GR", 39.0742, 21.8243, ["aten\xE1s", "griego"]), e("Turqu\xEDa", "TR", 38.9637, 32.9931, ["turquia", "estambul", "istanbul", "ankara", "turco"]), e("Chipre", "CY", 35.1264, 33.4299, ["nicosia", "limasol"]), e("Polonia", "PL", 51.9194, 19.1451, ["varsovia", "polaco"]), e("Alemania", "DE", 51.1657, 10.4515, ["alemania", "berl\xEDn", "berlin", "aleman"]), e("Su\xE9cia", "SE", 60.1282, 18.6435, ["suecia", "estocolmo", "sueco"]), e("Noruega", "NO", 60.472, 8.4689, ["oslo"]), e("Dinamarca", "DK", 56.2639, 9.5018, ["copenhague"]), e("Finlandia", "FI", 61.9241, 25.7482, ["helsinki"]), e("Islandia", "IS", 64.9631, -19.0208, ["reikiavik"]), e("Estonia", "EE", 58.5953, 25.0136, ["tallin", "tallinn"]), e("Letonia", "LV", 56.8796, 24.6032, ["riga"]), e("Lituania", "LT", 55.1694, 23.8813, ["vilnius"]), e("Bielorrusia", "BY", 53.7098, 27.9534, ["bi riusa", "minsk"]), e("Ucrania", "UA", 48.3794, 31.1656, ["ucrania", "kyiv", "kiev", "ucranianos", "odessa"]), e("Rusia", "RU", 61.524, 105.3188, ["rusia", "moscu", "mosc\xFA", "san petersburgo", "petrogrado", "kremlin", "ruso"]), e("Moldavia", "MD", 47.4116, 28.3699, ["chisinau", "moldavo"]), e("Georgia", "GE", 42.3154, 43.3569, ["tbilisi"]), e("Armenia", "AM", 40.0691, 45.0382, ["erevan", "yerevan"]), e("Azerbaiy\xE1n", "AZ", 40.1431, 47.5769, ["azerbaiyan", "baku"]), e("Israel", "IL", 31.0461, 34.8516, ["israeli", "jerusal\xE9n", "jerusalem", "tel aviv"]), e("Palestina", "PS", 31.9522, 35.2332, ["cisjordania", "gaza", "hamas", "palestino", "gaza strip", "franja de gaza"]), e("Jordania", "JO", 30.5852, 36.2384, ["amman"]), e("L\xEDbano", "LB", 33.8547, 35.8623, ["beirut", "libano"]), e("Siria", "SY", 34.8021, 38.9968, ["siria", "damasco", "sirio"]), e("Irak", "IQ", 33.2232, 43.6793, ["iraq", "baghdad"]), e("Ir\xE1n", "IR", 32.4279, 53.688, ["iran", "persia", "teher\xE1n", "teheran", "iranies"]), e("Arabia Saud\xED", "SA", 23.8859, 45.0792, ["arabia saudita", "arabia saudi", "riad", "riyad", "saudita", "jeddah"]), e("Yemen", "YE", 15.5527, 48.5164, ["sanaa", "yemeni", "yemen\xED", "arabia yemenita"]), e("Om\xE1n", "OM", 21.4735, 55.9754, ["oman", "om\xE1n", "muscat", "masqat"]), e("Emiratos \xC1rabes Unidos", "AE", 23.4241, 53.8478, ["emiratos", "emiratos arabes unidos", "emiratos arabes", "dubai", "abu dhabi"]), e("Qatar", "QA", 25.3548, 51.1839, ["doha"]), e("Kuwait", "KW", 29.3117, 47.4818, ["kuwait", "ciudad de kuwait"]), e("Bar\xE9in", "BH", 25.9304, 50.6378, ["barein", "manama"]), e("Afganist\xE1n", "AF", 33.9391, 67.71, ["afganistan", "kabul", "talibanes", "talib\xE1n"]), e("Pakist\xE1n", "PK", 30.3753, 69.3451, ["pakistan", "islamabad", "karachi", "lahore"]), e("India", "IN", 20.5937, 78.9629, ["indio", "india", "nueva delhi", "delhi", "mumbai", "bangalore", "chennai", "kolkata"]), e("Bangladesh", "BD", 23.685, 90.3563, ["dhaka"]), e("Sri Lanka", "LK", 7.8731, 80.7718, ["colombo"]), e("Nepal", "NP", 28.3949, 84.124, ["katmandu", "kathmandu"]), e("Birmania", "MM", 21.9139, 95.9562, ["myanmar", "rang\xFAn", "rangoon", "naipidaw", "birmania"]), e("Tailandia", "TH", 15.87, 100.9925, ["bangkok", "tailand\xE9s", "tailandes"]), e("Vietnam", "VN", 14.0583, 108.2772, ["vietnamita", "hanoi", "ho chi minh"]), e("Camboya", "KH", 12.5657, 104.991, ["nom penh", "phanom penh"]), e("Laos", "LA", 19.8563, 102.4955, ["vientiane"]), e("Malasia", "MY", 4.2105, 101.9758, ["kuala lumpur", "malayo"]), e("Singapur", "SG", 1.3521, 103.8198, ["singapur"]), e("Indonesia", "ID", -0.7893, 113.9213, ["jakarta", "indonesio"]), e("Filipinas", "PH", 12.8797, 121.774, ["manila", "filipino"]), e("Brun\xE9i", "BN", 4.5353, 114.7277, ["brunei"]), e("Timor Oriental", "TL", -8.8742, 125.7275, ["timoreste"]), e("China", "CN", 35.8617, 104.1954, ["chino", "china", "pekin", "beijing", "shanghai", "hong kong", "tibet", "xinjiang", "uighur", "macau", "macao", "shenzhen", "guangzhou"]), e("Jap\xF3n", "JP", 36.2048, 138.2529, ["japon", "tokio", "tokyo", "osaka", "japon\xE9s", "japonesa"]), e("Corea del Sur", "KR", 35.9078, 127.7669, ["corea", "se\xFAl", "seul", "coreano", "busan"]), e("Corea del Norte", "KP", 40.3399, 127.5106, ["piran", "pyongyang", "coreano del norte"]), e("Mongolia", "MN", 46.8625, 103.8467, ["ulaanbaatar", "ulaanbaatar"]), e("Kazajist\xE1n", "KZ", 48.0196, 66.9237, ["kazajistan", "nur sultan", "astana", "almaty"]), e("Uzbekist\xE1n", "UZ", 41.3775, 64.5853, ["uzbekistan", "tashkent"]), e("Kirguist\xE1n", "KG", 41.2044, 74.7661, ["kirguistan", "bishkek"]), e("Tayikist\xE1n", "TJ", 38.861, 71.2761, ["tayikistan", "duchanbe"]), e("Turkmenist\xE1n", "TM", 38.9697, 59.5561, ["turkmenistan", "askhabad"]), e("Marruecos", "MA", 31.7917, -7.0926, ["rabat", "marrakech", "marruecos"]), e("Argelia", "DZ", 28.0339, 1.6596, ["argel", "algeria"]), e("T\xFAnez", "TN", 33.8869, 9.5375, ["tunez", "t\xFAnez"]), e("Libia", "LY", 26.3351, 17.2283, ["libia", "tr\xEDpoli", "tripoli"]), e("Egipto", "EG", 26.8206, 30.8025, ["egipto", "el cairo", "cairo", "giza"]), e("Sud\xE1n", "SD", 12.8628, 30.2176, ["sudan", "jartum", "khartoum"]), e("Sud\xE1n del Sur", "SS", 6.877, 31.307, ["sudan del sur"]), e("Etiop\xEDa", "ET", 9.145, 40.4897, ["etiopia", "addis abeba"]), e("Somalia", "SO", 5.1521, 46.1996, ["somalia", "mogadishu", "somal\xED"]), e("Kenia", "KE", -0.0236, 37.9062, ["kenia", "nairobi"]), e("Uganda", "UG", 1.3733, 32.2903, ["kampala"]), e("Ruanda", "RW", -1.9403, 29.8739, ["kigali"]), e("Nigeria", "NG", 9.082, 8.6753, ["nigeria", "lagos", "abuja", "nigerianos"]), e("Ghana", "GH", 7.9465, -1.0232, ["ghana", "acra"]), e("Senegal", "SN", 14.4974, -14.4524, ["senegal", "dakar"]), e("Gambia", "GM", 13.4432, -15.3101, ["banjul"]), e("Guinea-Bissau", "GW", 11.8037, -15.1804, ["guinea bissau", "bissau"]), e("Guinea", "GN", 9.9456, -9.6966, ["conakry"]), e("Costa de Marfil", "CI", 7.54, -5.5471, ["abidjan"]), e("Burkina Faso", "BF", 12.2383, -1.5616, ["ouagadougou"]), e("Mal\xED", "ML", 17.5707, -4.0003, ["mali", "mal\xED", "bamako"]), e("N\xEDger", "NE", 13.5117, 2.1251, ["niger", "n\xEDger", "niamey"]), e("Chad", "TD", 15.4542, 18.7322, ["yamena", "ndjamena"]), e("Mauritania", "MR", 21.0079, -10.9408, ["nouakchott"]), e("Cabo Verde", "CV", 16.0021, -24.0132, ["cabo verde", "praia"]), e("Rep\xFAblica Centroafricana", "CF", 6.6111, 20.9394, ["bangui"]), e("Camer\xFAn", "CM", 7.3697, 12.3547, ["cameroon", "yaunde", "douala"]), e("Gab\xF3n", "GA", -0.8037, 11.6094, ["gabon", "libreville"]), e("Guinea Ecuatorial", "GQ", 1.6508, 10.2679, ["malabo", "bioko"]), e("Congo", "CG", -0.228, 15.8277, ["republica del congo", "brazaville"]), e("Rep\xFAblica Democr\xE1tica del Congo", "CD", -4.0383, 21.7587, ["kinshasa", "rdc", "congo"]), e("Angola", "AO", -11.2027, 17.8739, ["luanda"]), e("Namibia", "NA", -22.9576, 18.4904, ["windhoek"]), e("Botsuana", "BW", -22.3285, 24.6849, ["gaborone"]), e("Zimbabue", "ZW", -19.0154, 29.1549, ["zimbabue", "harare"]), e("Zambia", "ZM", -13.1339, 27.8493, ["lusaka"]), e("Mozambique", "MZ", -18.6657, 35.5296, ["mozambique", "maputo"]), e("Malaui", "MW", -13.2543, 34.3015, ["malawi", "lilongwe"]), e("Tanzania", "TZ", -6.369, 34.8888, ["tanzania", "dodoma", "darmania"]), e("Sud\xE1frica", "ZA", -30.5595, 22.9375, ["sudafrica", "pretoria", "johannesburgo", "ciudad del cabo", "durban"]), e("Lesoto", "LS", -29.6099, 28.2336, ["maseru"]), e("Esuatini", "SZ", -26.5225, 31.4659, ["mbabane"]), e("Madagascar", "MG", -18.7669, 46.8691, ["antananarivo"]), e("Mauricio", "MU", -20.3484, 57.5522, ["port louis"]), e("Seychelles", "SC", -4.6796, 55.492, ["victoria"]), e("Comoras", "KM", -11.875, 43.8721, ["moroni"]), e("Mayotte", "YT", -12.8275, 45.1662), e("Reuni\xF3n", "RE", -21.1151, 55.5364, ["reunion"]), e("M\xE9xico", "MX", 23.6345, -102.5528, ["mexico", "m\xE9jico", "estados mexicanos", "mexicano"]), e("Guatemala", "GT", 15.7835, -90.2308, ["guatemala", "guatemalteco"]), e("El Salvador", "SL", 13.7942, -88.8965, ["salvador", "salvadore\xF1o"]), e("Honduras", "HN", 15.1999, -86.2419, ["honduras", "hondure\xF1o"]), e("Nicaragua", "NI", 12.8654, -85.2072, ["nicaragua", "managua"]), e("Costa Rica", "CR", 9.7489, -83.7534, ["costa rica", "san jose"]), e("Panam\xE1", "PA", 8.538, -80.7821, ["panama", "panam\xE1"]), e("Cuba", "CU", 21.5218, -77.7812, ["cuba", "la habana", "habana", "cubano"]), e("Jamaica", "JM", 18.1096, -77.2975, ["kingston"]), e("Hait\xED", "HT", 18.9712, -72.2852, ["haiti", "port au principe"]), e("Rep\xFAblica Dominicana", "DO", 18.7357, -70.1627, ["dominicana", "santo domingo"]), e("Puerto Rico", "PR", 18.2208, -66.5901, ["puerto rico", "san juan"]), e("Bahamas", "BS", 25.0343, -77.3963, ["nassau"]), e("Barbados", "BB", 13.1939, -59.5431, ["bridgetown"]), e("Trinidad y Tobago", "TT", 10.6918, -61.2225, ["trinidad", "port of spain"]), e("Granada", "GD", 12.1165, -61.679, ["saint george"]), e("Santa Luc\xEDa", "LC", 13.9094, -60.9789, ["santa lucia", "castries"]), e("Antigua y Barbuda", "AG", 17.0606, -61.7968, ["saint johns"]), e("San Vicente y las Granadinas", "VC", 12.9843, -61.2872, ["kingstown"]), e("Dominica", "DM", 15.415, -61.3347, ["roseau"]), e("San Crist\xF3bal y N\xEDvis", "KN", 17.3578, -62.782998, ["basseterre"]), e("Belice", "BZ", 17.1899, -88.4976, ["belmopan"]), e("Colombia", "CO", 4.5709, -74.2973, ["colombia", "colombiano"]), e("Venezuela", "VE", 6.4238, -66.5897, ["venezuela", "venezolano"]), e("Guyana", "GY", 4.8604, -58.9302, ["georgetown guyana"]), e("Surinam", "SR", 3.9193, -56.0278, ["paramaribo"]), e("Ecuador", "EC", -1.8312, -78.1834, ["ecuador", "quito"]), e("Per\xFA", "PE", -9.19, -75.0152, ["peru", "peruano"]), e("Bolivia", "BO", -16.2902, -63.5887, ["bolivia", "boliviano"]), e("Brasil", "BR", -14.235, -51.9253, ["brasil", "brasile\xF1o", "brasileira", "sao paulo", "s\xE3o paulo", "rio de janeiro", "brasilia", "bras\xEDlia"]), e("Paraguay", "PY", -23.4425, -58.4438, ["paraguay", "paraguayo", "asuncion", "asunci\xF3n"]), e("Uruguay", "UY", -32.5228, -55.7658, ["uruguayo", "montevideo", "uruguay"]), e("Argentina", "AR", -38.4161, -63.6167, ["argentina", "argentino", "buenos aires"]), e("Islas Malvinas", "FK", -51.7963, -59.5236, ["malvinas", "falkland"]), e("Chile", "CL", -35.6751, -71.543, ["chile", "chileno", "santiago de chile", "santiago"]), e("Estados Unidos", "US", 37.0902, -95.7129, ["estados unidos", "eeuu", "ee uu", "usa", "washington", "nueva york", "california", "texas", "florida", "estadounidense", "washington dc", "canc\xFAn", "cancun", "san francisco", "los angeles", "chicago", "miami", "boston", "houston", "philadelphia", "atlanta", "las vegas", "seattle", "denver", "portland", "san diego", "san jose", "nashville", "detroit", "minneapolis", "charlotte", "orlando", "phoenix", "san francisco", "casa blanca", "capitolio", "silicon valley", "valle de silicon", "kansas city", "salt lake city", "pittsburgh", "houston", "baltimore", "st louis", "cincinnati", "cleveland", "milwaukee", "sacramento", "austin", "jacksonville", "columbus", "indianapolis", "charlotte"]), e("Canad\xE1", "CA", 56.1304, -106.3468, ["canada", "canadiense", "ottawa", "toronto", "montreal", "qu\xE9bec", "quebec", "vancouver", "calgary", "edmonton", "winnipeg", "halifax"]), e("Bermudas", "BM", 32.3214, -64.7574, ["bermuda", "hamilton bermudas"]), e("Groenlandia", "GL", 71.7069, -42.6043, ["groenlandia", "nuuk"]), e("Australia", "AU", -25.2744, 133.7751, ["australia", "australiano", "sydney", "melbourne", "canberra", "perth", "brisbane", "adelaide"]), e("Nueva Zelanda", "NZ", -40.9006, 174.886, ["nueva zelanda", "nueva zelandia", "nuevo zealand", "wellington", "christchurch"]), e("Pap\xFAa Nueva Guinea", "PG", -6.315, 143.9555, ["port moresby"]), e("Fiji", "FJ", -17.7134, 178.065, ["suva"]), e("Islas Salom\xF3n", "SB", -9.6457, 160.1562, ["honiara", "salomon"]), e("Vanuatu", "VU", -15.3767, 166.9592, ["port vila"]), e("Samoa", "WS", -13.7593, -172.1046, ["apia"]), e("Tonga", "TO", -21.1789, -175.1982, ["nuku alofa"]), e("Micronesia", "FM", 6.9248, 158.1611, ["palu", "micronesia federal"]), e("Islas Marshall", "MH", 7.1315, 171.1845, ["majuro"]), e("Palau", "PW", 7.5149, 134.5825, ["ngerulmud"]), e("Nauru", "NR", -0.5228, 166.9315), e("Tuvalu", "TV", -7.1095, 177.6493, ["funafuti"]), e("Kiribati", "KI", 1.4167, 173, ["tarawa"]), e("Islas Cook", "CK", -21.2367, -159.7777, ["avarua"]), e("Wallis y Futuna", "WF", -13.7688, -177.1561, ["mata uta"]), e("Nueva Caledonia", "NC", -20.9043, 165.618, ["noumea"]), e("Polinesia Francesa", "PF", -17.6795, -149.4068, ["tahiti", "papeete"]), e("Guayana Francesa", "GF", 3.9339, -53.1258, ["cayena", "guayana francesa"]), e("Ant\xE1rtida", "AQ", -82.8628, 135, ["antartida", "antarctica"])];
  var R = [c("Catalu\xF1a", "ES", 41.6, 1.8, ["catalan", "catalana", "girona", "lleida", "tarragona", "barcelona", "barcelona"]), c("Euskadi", "ES", 43.3, -2.5, ["pais vasco", "pa\xEDs vasco", "bilbao", "vizcaya", "guipuzcoa", "gipuzkoa", "san sebastian", "donostia", "euskadi", "vasco"]), c("Galicia", "ES", 42.9, -8.5, ["gallego", "santiago de compostela", "compostela", "vigo", "a coru\xF1a", "ourense"]), c("Comunidad Valenciana", "ES", 39.5, -0.5, ["valencia", "valenciano", "alicante"]), c("Andaluc\xEDa", "ES", 37.4, -5, ["andalucia", "andaluz", "sevilla", "malaga", "m\xE1laga", "granada", "cordoba", "c\xF3rdoba", "cadiz", "c\xE1diz"]), c("Navarra", "ES", 42.8, -1.6, ["pamplona", "iru\xF1a"]), c("Arag\xF3n", "ES", 41.3, -0.5, ["aragon", "aragonesa", "zaragoza", "huesca"]), c("Asturias", "ES", 43.3, -5.8, ["oviedo", "asturiano"]), c("Cantabria", "ES", 43.3, -4, ["santander", "cantabrico", "c\xE1ntabrico"]), c("Regi\xF3n de Murcia", "ES", 37.6, -1.3, ["murcia", "murciano"]), c("Castilla-La Mancha", "ES", 39.5, -2.5, ["toledo", "albacete", "ciudad real"]), c("Castilla y Le\xF3n", "ES", 41.5, -4.5, ["castilla y leon", "valladolid", "burgos", "leon", "le\xF3n"]), c("La Rioja", "ES", 42, -2.5, ["rioja", "logro\xF1o"]), c("Extremadura", "ES", 39, -6, ["badajoz", "caceres", "c\xE1ceres"]), c("Islas Baleares", "ES", 39.6, 3, ["baleares", "mallorca", "palma de mallorca", "ibiza", "menorca"]), c("Islas Canarias", "ES", 28.1, -15.4, ["canarias", "las palmas", "tenerife", "gran canaria", "lanzarote", "canario"]), c("Ceuta", "ES", 35.8894, -5.3213), c("Melilla", "ES", 35.2923, -2.9381), c("Baviera", "DE", 48.79, 11.25, ["munich", "m\xFAnich", "nuremberg", "n\xFAremberg", "bavaro", "b\xE1varo"]), c("Renania del Norte-Westfalia", "DE", 51.5136, 7.4653, ["dusseldorf", "d\xFCsseldorf", "colonia", "k\xF6ln"]), c("Catalu\xF1a del Norte", "FR", 42.5, 2.5, ["catalu\xF1a francesa"]), c("Breta\xF1a", "FR", 48.2, -2.9, ["breton"]), c("Cerde\xF1a", "IT", 40, 9.1, ["sardo", "cagliari", "sassari"]), c("Sicilia", "IT", 37.6, 14, ["palermo", "siciliano"]), c("Lombard\xEDa", "IT", 45.5, 9.5, ["milano", "italia"]), c("Flandes", "BE", 51, 3.5, ["flamencos", "gante", "bruselas"]), c("Wallonia", "BE", 50.4, 4.4, ["valonia", "lieja", "charleroi"]), c("Anaturolia", "TR", 39, 33, ["turquia asi\xE1tica"]), c("Chipre del Norte", "CY", 35.25, 33.4), c("Gaza", "PS", 31.5, 34.4667, ["franja de gaza", "strip de gaza"]), c("Cisjordania", "PS", 32, 35.3, ["palestina ocupada", "ramala", "nablus", "hebron"]), c("Kurdist\xE1n", "IQ", 35.5, 44, ["kurdo", "erbil"]), c("Dagestan", "RU", 42.4, 47, ["chechenia", "checania", "grozny", "grozn\xFD"]), c("Siberia", "RU", 62, 95, ["siberiano"]), c("Kashmir", "IN", 34.0836, 74.7973, ["cachemira", "srinagar"]), c("Nagorno-Karabakh", "AM", 39.8, 46.75, ["karabakh"]), c("S\xE1hara Occidental", "EH", 24.2155, -12.8858, ["polisario"]), c("Amazonas", "BR", -3, -60, ["amazonia", "regi\xF3n amaz\xF3nica"]), c("Patagonia", "AR", -45, -70, ["patag\xF3nico"]), c("Alta Blanch", "MX", 19, -99.5)];
  var D = [a("Madrid", "ES", 40.4168, -3.7038, ["madrileno", "madrilena"]), a("Barcelona", "ES", 41.3874, 2.1686, ["bar\xE7a", "barca", "cul\xE9", "cule"]), a("Valencia", "ES", 39.4699, -0.3763), a("Sevilla", "ES", 37.3891, -5.9845, ["sevillano"]), a("Zaragoza", "ES", 41.6488, -0.8891), a("Bilbao", "ES", 43.263, -2.935, ["bilba\xEDno"]), a("M\xE1laga", "ES", 36.7213, -4.4214, ["malaga", "malague\xF1o"]), a("Granada", "ES", 37.1773, -3.5986), a("Palma de Mallorca", "ES", 39.5696, 2.6502, ["palma"]), a("Las Palmas", "ES", 28.1235, -15.4363), a("Santa Cruz de Tenerife", "ES", 28.4636, -16.2518), a("Ciudad de M\xE9xico", "MX", 19.4326, -99.1332, ["cdmx", "distrito federal", "capital de mexico"]), a("Guadalajara", "MX", 20.6597, -103.3496, ["jalisco", "tapat\xEDo"]), a("Monterrey", "MX", 25.6866, -100.3161, ["nuevo leon", "nuevo le\xF3n"]), a("Tijuana", "MX", 32.5149, -117.0382), a("Ciudad Ju\xE1rez", "MX", 31.6904, -106.4245, ["juarez", "ju\xE1rez"]), a("Canc\xFAn", "MX", 21.1619, -86.8515, ["cancun"]), a("Mazatl\xE1n", "MX", 23.2494, -106.4111, ["mazatlan", "mazatl\xE1n"]), a("Puebla", "MX", 19.0414, -98.2063), a("Quer\xE9taro", "MX", 20.5888, -100.3899, ["queretaro"]), a("Oaxaca", "MX", 17.0732, -96.7266), a("Acapulco", "MX", 16.8531, -99.8237), a("Buenos Aires", "AR", -34.6037, -58.3816, ["porte\xF1o", "porte\xF1a", "porte\xF1o"]), a("C\xF3rdoba", "AR", -31.4201, -64.1888, ["cordoba argentino"]), a("Rosario", "AR", -32.9442, -60.6505), a("Mendoza", "AR", -32.8895, -68.8458), a("Bogot\xE1", "CO", 4.711, -74.0721, ["bogota", "capital de colombia", "bogotano"]), a("Medell\xEDn", "CO", 6.2442, -75.5812, ["medellin", "poblado"]), a("Cali", "CO", 3.4516, -76.532), a("Barranquilla", "CO", 10.9685, -74.7813), a("Cartagena", "CO", 10.391, -75.4794, ["cartagena de indias"]), a("Santiago", "CL", -33.4489, -70.6693, ["santiago de chile"]), a("Valpara\xEDso", "CL", -33.0472, -71.6127, ["valparaiso"]), a("Concepci\xF3n", "CL", -36.8201, -73.0444, ["concepcion"]), a("Antofagasta", "CL", -23.6509, -70.3975, ["antofagasta", "copiap\xF3"]), a("Lima", "PE", -12.0464, -77.0428, ["capital de peru", "capital del per\xFA", "lime\xF1o"]), a("Arequipa", "PE", -16.409, -71.5375), a("Cusco", "PE", -13.5319, -71.9675, ["cuzco"]), a("Trujillo", "PE", -8.109, -79.0215), a("Caracas", "VE", 10.4806, -66.9036, ["caraque\xF1o", "caraque\xF1a"]), a("Maracaibo", "VE", 10.6427, -71.6125), a("Valencia (Venezuela)", "VE", 10.162, -68.0077, ["valencia classy"]), a("Ciudad Guayana", "VE", 8.35, -62.65), a("Quito", "EC", -0.1807, -78.4678, ["quite\xF1o", "quite\xF1a"]), a("Guayaquil", "EC", -2.1894, -79.8891, ["guayaquile\xF1o"]), a("Cuenca", "EC", -2.9, -79.9), a("La Paz", "BO", -16.4897, -68.1193, ["la paz bolivia", "pace\xF1o"]), a("Santa Cruz de la Sierra", "BO", -17.7833, -63.1821, ["santa cruz", "cruzano"]), a("Cochabamba", "BO", -17.3895, -66.1568, ["cocha"]), a("Montevideo", "UY", -34.9011, -56.1645, ["montevideano"]), a("Asunci\xF3n", "PY", -25.2637, -57.5759, ["asuncion", "paraguayo"]), a("Ciudad del Este", "PY", -25.5095, -54.6112), a("San Jos\xE9", "CR", 9.9281, -84.0907, ["san jose de costa rica"]), a("Ciudad de Panam\xE1", "PA", 8.9824, -79.5199, ["ciudad de panama"]), a("La Habana", "CU", 23.1136, -82.3666, ["habana", "habano"]), a("Santiago de Cuba", "CU", 20.0217, -75.8292), a("Kingston", "JM", 17.9714, -76.7931, ["kingston jamaica"]), a("Santo Domingo", "DO", 18.4861, -69.9312, ["dominicano"]), a("Port-au-Prince", "HT", 18.5944, -72.3074, ["puerto principe"]), a("San Juan", "PR", 18.4655, -66.1057, ["san juan puerto rico"]), a("Nueva York", "US", 40.7128, -74.006, ["new york", "ny", "nueva york city"]), a("Washington", "US", 38.9072, -77.0369, ["washington dc", "washington d.c.", "casa blanca", "capitolio"]), a("Los \xC1ngeles", "US", 34.0522, -118.2437, ["los angeles", "hollywood"]), a("Chicago", "US", 41.8781, -87.6298), a("Houston", "US", 29.7604, -95.3698), a("Phoenix", "US", 33.4484, -112.074, ["fenix", "f\xE9nix"]), a("Philadelphia", "US", 39.9526, -75.1652, ["filadelfia"]), a("San Antonio", "US", 29.4241, -98.4936), a("San Diego", "US", 32.7157, -117.1611), a("Dallas", "US", 32.7767, -96.797), a("San Jos\xE9 (California)", "US", 37.3382, -121.8863, ["san jose california", "valle de silicon", "silicon valley", "san jose"]), a("Austin", "US", 30.2672, -97.7431), a("Jacksonville", "US", 30.3322, -81.6557), a("San Francisco", "US", 37.7749, -122.4194), a("Seattle", "US", 47.6062, -122.3321), a("Denver", "US", 39.7392, -104.9903), a("Boston", "US", 42.3601, -71.0589), a("Miami", "US", 25.7617, -80.1918, ["miami"]), a("Atlanta", "US", 33.749, -84.388), a("Las Vegas", "US", 36.1699, -115.1398), a("Detroit", "US", 42.3314, -83.0458), a("Minneapolis", "US", 44.9778, -93.265), a("Portland", "US", 45.5152, -122.6784), a("Nashville", "US", 36.1627, -86.7816), a("Orlando", "US", 28.5383, -81.3792), a("Charlotte", "US", 35.2271, -80.8431), a("Honolulu", "US", 21.3069, -157.8583, ["hawai", "hawa\xEF"]), a("Anchorage", "US", 61.2181, -149.9003), a("Ottawa", "CA", 45.4215, -75.6972), a("Toronto", "CA", 43.6532, -79.3832), a("Montreal", "CA", 45.5019, -73.5674, ["montreal", "montr\xE9al"]), a("Vancouver", "CA", 49.2827, -123.1207), a("Calgary", "CA", 51.0447, -114.0719), a("Edmonton", "CA", 53.5461, -113.4938), a("Halifax", "CA", 44.6488, -63.5752), a("Londres", "GB", 51.5074, -0.1278, ["london", "londinense"]), a("Manchester", "GB", 53.4808, -2.2426), a("Birmingham", "GB", 52.4862, -1.8904), a("Edimburgo", "GB", 55.9533, -3.1883, ["edinburgh", "edimburgo"]), a("Glasgow", "GB", 55.8642, -4.2518, ["glasgow"]), a("Dubl\xEDn", "IE", 53.3498, -6.2603, ["dublin", "dubl\xEDn"]), a("Bruselas", "BE", 50.8503, 4.3517, ["bruselas", "bruselense"]), a("Amsterdam", "NL", 52.3676, 4.9041, ["amsterdam", "holand\xE9s"]), a("La Haya", "NL", 52.0705, 4.3007), a("Par\xEDs", "FR", 48.8566, 2.3522, ["paris", "par\xEDs", "parisino", "frances"]), a("Marsella", "FR", 43.2965, 5.3698, ["marseille"]), a("Lyon", "FR", 45.764, 4.8357), a("Berl\xEDn", "DE", 52.52, 13.405, ["berlin", "berl\xEDn", "berlin\xE9s", "berlines"]), a("M\xFAnich", "DE", 48.1351, 11.582, ["munich", "m\xFAnich"]), a("Colonia", "DE", 50.9375, 6.9603, ["k\xF6ln", "colonia alemana"]), a("Hamburgo", "DE", 53.5511, 9.9937, ["hamburg"]), a("Fr\xE1ncfort", "DE", 50.1109, 8.6821, ["frankfurt"]), a("Viena", "AT", 48.2082, 16.3738, ["vien\xE9s", "vienna"]), a("Z\xFArich", "CH", 47.3769, 8.5417, ["zurich", "z\xFArich", "suizo"]), a("Ginebra", "CH", 46.2044, 6.1432, ["geneva", "ginebra"]), a("Roma", "IT", 41.9028, 12.4964, ["roman", "romano"]), a("Mil\xE1n", "IT", 45.4642, 9.19, ["milan", "mil\xE1n"]), a("N\xE1poles", "IT", 40.8518, 14.2681, ["napoles"]), a("Tur\xEDn", "IT", 45.0703, 7.6869, ["turin", "torino"]), a("Atenas", "GR", 37.9838, 23.7275, ["atenas", "atenienses"]), a("Lisboa", "PT", 38.7223, -9.1393, ["lisboa", "portugu\xE9s", "lisboeta"]), a("Oporto", "PT", 41.1579, -8.6291, ["porto", "oporto"]), a("Estambul", "TR", 41.0082, 28.9784, ["istanbul", "estambul", "constantinopla"]), a("Ankara", "TR", 39.9334, 32.8597, ["turco", "ankara"]), a("Varsovia", "PL", 52.2297, 21.0122, ["varsovia", "polaco"]), a("Cracovia", "PL", 50.0647, 19.945, ["cracovia", "krakow"]), a("Estocolmo", "SE", 59.3293, 18.0686, ["stocolmo", "sueco"]), a("Oslo", "NO", 59.9139, 10.7522, ["oslo", "noruego"]), a("Copenhague", "DK", 55.6761, 12.5683, ["copenhague", "dan\xE9s"]), a("Helsinki", "FI", 60.1699, 24.9384, ["helsinki", "fin\xE9s"]), a("Reikiavik", "IS", 64.1466, -21.9426, ["reykjavik", "reikiavik"]), a("Mosc\xFA", "RU", 55.7558, 37.6173, ["moscu", "mosc\xFA", "moscovita"]), a("San Petersburgo", "RU", 59.9311, 30.3609, ["san petersburgo", "petrogrado", "leningrado"]), a("Kiev", "UA", 50.4501, 30.5234, ["kyiv", "kiev", "kievita"]), a("Odesa", "UA", 46.4825, 30.7233, ["odessa", "odesa"]), a("Lviv", "UA", 49.8397, 24.0297, ["lviv", "leopolis"]), a("Minsk", "BY", 53.9006, 27.559, ["minsk", "bielorruso"]), a("Chisin\xE1u", "MD", 47.0105, 28.8638, ["chisinau", "moldavo"]), a("Tiflis", "GE", 41.7151, 44.8271, ["tbilisi", "tiflis"]), a("Erev\xE1n", "AM", 40.1792, 44.4991, ["erevan", "yerevan"]), a("Bak\xFA", "AZ", 40.4093, 49.8671, ["baku", "azerbaiyano"]), a("Belgrado", "RS", 44.7866, 20.4489, ["belgrado", "serbio"]), a("Zagreb", "HR", 45.815, 15.9819, ["zagreb", "croata"]), a("Ljubljana", "SI", 46.0569, 14.5058, ["liubliana", "esloveno"]), a("Sarajevo", "BA", 43.8563, 18.4131, ["sarajevo", "bosnio"]), a("Podgorica", "ME", 42.4304, 19.2594, ["podgorica"]), a("Skopje", "MK", 41.9973, 21.428, ["skopje", "macedonio"]), a("Tirana", "AL", 41.3275, 19.8187, ["tirana", "alban\xE9s"]), a("Praga", "CZ", 50.0755, 14.4378, ["praga", "checo"]), a("Bratislava", "SK", 48.1486, 17.1077, ["bratislava", "eslovaco"]), a("Budapest", "HU", 47.4979, 19.0402, ["budapest", "h\xFAngaro"]), a("Bucarest", "RO", 44.4268, 26.1025, ["bucarest", "bucuresti", "rumano"]), a("Sof\xEDa", "BG", 42.6977, 23.3219, ["sofia", "b\xFAlgaro"]), a("Jerusal\xE9n", "IL", 31.7683, 35.2137, ["jerusalem", "jerusalen"]), a("Tel Aviv", "IL", 32.0853, 34.7818, ["tel aviv"]), a("Haifa", "IL", 32.794, 34.9896, ["haifa", "haifa"]), a("Eilat", "IL", 29.5581, 34.9482, ["eilat", "eilat"]), a("Gaza", "PS", 31.5, 34.4667, ["gaza", "ham\xE1s"]), a("Ramala", "PS", 31.9038, 35.2034, ["ramala"]), a("Nablus", "PS", 32.2211, 35.2544, ["nablus", "nablus"]), a("Beirut", "LB", 33.8938, 35.5018, ["beirut", "beirut\xED"]), a("Damasco", "SY", 33.5138, 36.2765, ["damasco", "sirio"]), a("Aleppo", "SY", 36.2021, 37.1343, ["aleppo", "alepo"]), a("Baghdad", "IQ", 33.3152, 44.3661, ["baghdad", "iraqu\xED", "bagh\xE1n"]), a("Erbil", "IQ", 36.1911, 44.0092, ["erbil", "kurdo"]), a("Teher\xE1n", "IR", 35.6892, 51.389, ["teheran", "iran\xED", "persa"]), a("Riad", "SA", 24.7136, 46.6753, ["riad", "riyad", "saudita"]), a("Jedda", "SA", 21.4858, 39.1925, ["jeddah", "yeda"]), a("Sanaa", "YE", 15.3694, 44.191, ["sanaa", "yemen\xED"]), a("Dub\xE1i", "AE", 25.2048, 55.2708, ["dubai", "emirat\xED"]), a("Abu Dabi", "AE", 24.4539, 54.3773, ["abu dhabi"]), a("Doha", "QA", 25.2854, 51.531, ["doha", "qatari"]), a("Muscat", "OM", 23.588, 58.3829, ["masqat", "oman\xED"]), a("Kabul", "AF", 34.5553, 69.2075, ["kabul", "afgano"]), a("Karachi", "PK", 31.5204, 74.3587, ["karachi", "paquistani"]), a("Lahore", "PK", 31.5204, 74.3587, ["lahore"]), a("Islamabad", "PK", 33.6844, 73.0479, ["islamabad"]), a("Nueva Delhi", "IN", 28.6139, 77.209, ["delhi", "nueva delhi", "indio"]), a("Mumbai", "IN", 19.076, 72.8777, ["bombay", "bombay"]), a("Bangalore", "IN", 12.9716, 77.5946, ["bengaluru"]), a("Chennai", "IN", 13.0827, 80.2707, ["madras"]), a("Dhaka", "BD", 23.8103, 90.4125, ["dhaka", "bangladeshi"]), a("Colombo", "LK", 6.9271, 79.8612, ["colombo"]), a("Katmandu", "NP", 27.7172, 85.324, ["kathmandu", "katmandu"]), a("Rang\xFAn", "MM", 16.8409, 96.1735, ["yangon", "rangoon"]), a("Bangkok", "TH", 13.7563, 100.5018, ["bangkok", "tailand\xE9s"]), a("Han\xF3i", "VN", 21.0278, 105.8342, ["hanoi", "vietnamita"]), a("Ciudad de Ho Chi Minh", "VN", 10.8231, 106.6297, ["ho chi minh"]), a("Nom Penh", "KH", 11.5564, 104.9282, ["nom penh", "phanom penh", "camboyano"]), a("Vientiane", "LA", 17.9757, 102.6331, ["vientiane"]), a("Kuala Lumpur", "MY", 3.139, 101.6869, ["kuala lumpur", "malayo"]), a("Singapur", "SG", 1.3521, 103.8198, ["singapur", "singapur\xE9s"]), a("Yakarta", "ID", -6.2088, 106.8456, ["jakarta", "indonesio"]), a("Manila", "PH", 14.5995, 120.9842, ["manila", "filipino"]), a("Pek\xEDn", "CN", 39.9042, 116.4074, ["pekin", "beijing", "chino"]), a("Shangh\xE1i", "CN", 31.2304, 121.4737, ["shanghai"]), a("Hong Kong", "CN", 22.3193, 114.1694, ["hong kong"]), a("Cant\xF3n", "CN", 23.1291, 113.2644, ["guangzhou", "canton"]), a("Shenzhen", "CN", 22.5431, 114.0579), a("Hangzhou", "CN", 30.2741, 120.1551), a("Wuhan", "CN", 30.5928, 114.3055), a("Xi'an", "CN", 34.3416, 108.9398, ["xian", "sian"]), a("Urumqi", "CN", 43.8256, 87.6168, ["urumqi", "xinjiang"]), a("Lhasa", "CN", 29.65, 91.14, ["lhasa", "tibet"]), a("Tokio", "JP", 35.6762, 139.6503, ["tokio", "tokyo", "japon\xE9s", "japonesa"]), a("Kioto", "JP", 35.0116, 135.7681, ["kyoto"]), a("Osaka", "JP", 34.6937, 135.5023), a("Yokohama", "JP", 35.4437, 139.638), a("Se\xFAl", "KR", 37.5665, 126.978, ["seul", "coreano", "se\xFAl"]), a("Busan", "KR", 35.1796, 129.0756, ["pusan"]), a("Pyeongchang", "KR", 37.3727, 128.3901, ["corea 2018"]), a("Pyongyang", "KP", 39.0392, 125.7625, ["piran", "norcoreano"]), a("Ulaanbaatar", "MN", 47.8864, 106.9057, ["ulaanbaatar", "mongol"]), a("Almaty", "KZ", 43.222, 76.8512, ["almaty", "almat\xED", "kazajo"]), a("Astana", "KZ", 51.1694, 71.4491, ["nur sultan", "nur-sultan"]), a("Tashkent", "UZ", 41.2995, 69.2401, ["tashkent", "uzbeko"]), a("El Cairo", "EG", 30.0444, 31.2357, ["cairo", "egipcio"]), a("Giza", "EG", 30.0444, 31.2357), a("Alejandr\xEDa", "EG", 31.2001, 29.9187, ["alexandria"]), a("Tripoli", "LY", 32.8872, 13.1913, ["tr\xEDpoli"]), a("Bengasi", "LY", 32.1167, 20.0667, ["bengasi"]), a("T\xFAnez", "TN", 36.8065, 10.1815, ["tunez", "tunecino"]), a("Argel", "DZ", 36.7538, 3.0588, ["argel", "argelino"]), a("Rabat", "MA", 34.0209, -6.8416, ["rabat", "marroqu\xED"]), a("Casablanca", "MA", 33.5731, -7.5898, ["casa blanca", "casablanca"]), a("Jartum", "SD", 15.5007, 32.5599, ["khartoum"]), a("Addis Abeba", "ET", 9.032, 38.7469, ["addis abeba"]), a("Mogadishu", "SO", 2.0469, 45.3182, ["mogadishu"]), a("Nairobi", "KE", -1.2921, 36.8219, ["nairobi", "keniano"]), a("Abuja", "NG", 9.0765, 7.3986, ["abuja"]), a("Lagos", "NG", 6.5244, 3.3792, ["lagos", "nigeriano"]), a("Kano", "NG", 12.0022, 8.592, ["kano"]), a("Pretoria", "ZA", -25.7479, 28.2293, ["pretoria"]), a("Johannesburgo", "ZA", -26.2041, 28.0473, ["johannesburgo", "sudafricano"]), a("Ciudad del Cabo", "ZA", -33.9249, 18.4241, ["ciudad del cabo", "cape town"]), a("Durban", "ZA", -29.8587, 31.0218, ["durban"]), a("Kinshasa", "CD", -4.4419, 15.2663, ["kinshasa"]), a("Luanda", "AO", -8.839, 13.2894, ["luanda", "angolano"]), a("Maputo", "MZ", -25.9692, 32.5732, ["maputo"]), a("Harare", "ZW", -17.8252, 31.0335, ["harare", "zimbabue"]), a("Lusaka", "ZM", -15.3875, 28.3228, ["lusaka"]), a("Kampala", "UG", 0.3476, 32.5825, ["kampala"]), a("Kigali", "RW", -1.9441, 30.0619, ["kigali"]), a("Dakar", "SN", 14.7167, -17.4677, ["dakar", "senegal\xE9s"]), a("Conakry", "GN", 9.6412, -13.5784, ["conakry"]), a("Abidjan", "CI", 5.36, -4.0083, ["abidjan"]), a("Ouagadougou", "BF", 12.3714, -1.5197, ["ouagadougou"]), a("Bamako", "ML", 12.6392, -8.0029, ["bamako"]), a("Niamey", "NE", 13.5116, 2.1254, ["niamey"]), a("Dodoma", "TZ", -6.163, 35.7516, ["dodoma"]), a("Dar es Salaam", "TZ", -6.7924, 39.2083, ["dar es salaam"]), a("Antananarivo", "MG", -18.8792, 47.5079, ["antananarivo", "malagasy"]), a("S\xEDdney", "AU", -33.8688, 151.2093, ["sydney", "australiano"]), a("Melbourne", "AU", -37.8136, 144.9631, ["melbourne"]), a("Canberra", "AU", -35.2809, 149.13, ["canberra"]), a("Perth", "AU", -31.9523, 115.8613, ["perth"]), a("Brisbane", "AU", -27.4698, 153.0251, ["brisbane"]), a("Adelaida", "AU", -34.9285, 138.6007, ["adelaide"]), a("Auckland", "NZ", -36.8485, 174.7633, ["auckland"]), a("Wellington", "NZ", -41.2865, 174.7762, ["wellington"]), a("Christchurch", "NZ", -43.5321, 172.6362, ["christchurch"]), a("Suva", "FJ", -18.1416, 178.4419, ["suva"]), a("Port Moresby", "PG", -9.4438, 147.1803, ["port moresby"])];
  var j = (() => {
    let o = /* @__PURE__ */ new Map();
    for (let i of [...A, ...R, ...D]) for (let r of i.alias) {
      if (r.length < 4) continue;
      let s = o.get(r) ?? [];
      s.some((n) => n.id === i.id) || s.push(i), o.set(r, s);
    }
    for (let i of o.values()) i.sort((r, s) => S(r) - S(s));
    return o;
  })();
  function S(o) {
    return o.tipo === "pais" ? 3 : o.tipo === "ciudad" ? 2 : 1;
  }
  var x = [...A, ...R, ...D];
  var $ = new Map(x.map((o) => [o.id, o]));
  var C = (o) => o.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
  function q(o, i) {
    return new RegExp(`(?<![a-z0-9])${i.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![a-z0-9])`).test(o);
  }
  function B(o, i) {
    let r = C(o), s = C(i), n = new Set(r.split(" ").filter(Boolean)), l = new Set(s.split(" ").filter(Boolean)), g = /* @__PURE__ */ new Map(), f = (t, m, d, p) => {
      for (let [b, v] of j) {
        if (!(m.has(b) || q(t, b))) continue;
        let K = 4 * d * S(v[0]);
        for (let E of v) {
          let z = K * (S(E) / S(v[0])), w = g.get(E.id);
          w ? (w.puntuacion += z, w.enTitulo = w.enTitulo || p, w.coincidencias.includes(b) || w.coincidencias.push(b)) : g.set(E.id, { lugar: E, puntuacion: z, coincidencias: [b], enTitulo: p, donde: p ? "titulo" : "resumen" });
        }
      }
    };
    f(r, n, 3, true), f(s, l, 1, false);
    let u = [...g.values()].filter((t) => {
      let m = t.coincidencias.length + (t.enTitulo ? 0 : 1);
      return t.enTitulo || t.puntuacion >= 6;
    });
    return u.sort((t, m) => m.puntuacion - t.puntuacion), u.map((t) => t.lugar.tipo !== "region" ? { lugar: t.lugar, puntuacion: t.puntuacion, coincidencias: t.coincidencias, donde: t.donde } : { lugar: u.find((d) => d.lugar.tipo === "pais" && d.lugar.pais === t.lugar.pais)?.lugar ?? t.lugar, puntuacion: t.puntuacion, coincidencias: t.coincidencias, donde: t.donde });
  }
  function N(o, i) {
    let r = B(o, "");
    if (r.length > 0) return r[0];
    let s = B("", i);
    return s.length > 0 ? s[0] : null;
  }
  function G(o, i, r) {
    let s = N(o, i);
    if (s) return { ...s, inferida: false };
    if (r) {
      let n = A.find((l) => l.pais.toUpperCase() === r.toUpperCase());
      if (n) return { lugar: n, puntuacion: 0, coincidencias: [], donde: "resumen", inferida: true };
    }
    return null;
  }
  function I(o, i) {
    let r = 0;
    for (let s of o.keys()) i.has(s) && (r += o.get(s));
    return r;
  }
  function T(o, i) {
    let r = 0;
    for (let [s, n] of o) s.includes(" ") && i.includes(s) && (r += n * 1.5);
    return r;
  }
  function H() {
    let o = /* @__PURE__ */ new Map();
    for (let [i, r] of L2) for (let { categoria: s, peso: n } of r) {
      let l = o.get(s) ?? /* @__PURE__ */ new Map();
      l.set(i, (l.get(i) ?? 0) + n), o.set(s, l);
    }
    return o;
  }
  var U = H();
  function O(o, i, r = []) {
    let s = C(o), n = C(i), l = new Set(s.split(" ").filter(Boolean)), g = new Set(n.split(" ").filter(Boolean)), f = /* @__PURE__ */ new Map();
    for (let [d, p] of U) {
      let b = I(p, l) * 3 + T(p, s) * 3, v = I(p, g) + T(p, n), h = b + v;
      h > 0 && f.set(d, h);
    }
    let u = r.map(C).filter(Boolean);
    if (u.length) for (let [d, p] of U) {
      let b = C(d);
      u.some((h) => h === b || h.startsWith(b + " ") || b.startsWith(h + " ")) && f.set(d, (f.get(d) ?? 0) + 5);
    }
    let t = [...f.entries()].map(([d, p]) => ({ categoria: d, puntuacion: Math.round(p * 10) / 10 })).sort((d, p) => p.puntuacion - d.puntuacion), m = t[0];
    return { categoria: m?.categoria ?? "sociedad", puntuacion: m?.puntuacion ?? 0, todas: t };
  }
  function V(o, i = {}) {
    let r = (i.q ?? "").toLowerCase().trim(), s = i.categorias ?? [], n = i.lugares ?? [], l = i.fuentes ?? [], g = i.horas ?? 0, f = Math.min(Math.max(Number(i.limite ?? 500) || 500, 1), 2500), u = o;
    if (r && (u = u.filter((t) => (t.titulo + " " + t.descripcion + " " + t.fuenteNombre).toLowerCase().includes(r))), s.length && (u = u.filter((t) => t.categorias.some((m) => s.includes(m)))), n.length && (u = u.filter((t) => n.includes(t.lugarNombre))), l.length && (u = u.filter((t) => l.includes(t.fuenteId))), g > 0) {
      let t = Date.now() - g * 36e5;
      u = u.filter((m) => {
        let d = Date.parse(m.fecha ?? m.fechaRecopilacion);
        return Number.isFinite(d) ? d >= t : false;
      });
    }
    if (i.inferidas === "solo" && (u = u.filter((t) => !t.ubicacionInferida)), i.inferidas === "no" && (u = u.filter((t) => t.ubicacionInferida)), i.orden === "relevancia") {
      let t = /* @__PURE__ */ new Map();
      for (let m of u) t.set(m.lugarId, (t.get(m.lugarId) ?? 0) + 1);
      u = [...u].sort((m, d) => {
        let p = (t.get(d.lugarId) ?? 0) - (t.get(m.lugarId) ?? 0);
        return p !== 0 ? p : F(d) - F(m);
      });
    }
    return { total: u.length, noticias: u.slice(0, f) };
  }
  function F(o) {
    let i = Date.parse(o.fecha ?? o.fechaRecopilacion);
    return Number.isFinite(i) ? i : 0;
  }
  function Z(o) {
    let i = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (let n of o) i.set(n.categoria, (i.get(n.categoria) ?? 0) + 1), r.set(n.lugarNombre, (r.get(n.lugarNombre) ?? 0) + 1), s.set(n.fuenteId, (s.get(n.fuenteId) ?? 0) + 1);
    return { categorias: M.map((n) => ({ ...n, total: i.get(n.id) ?? 0 })), lugares: [...r.entries()].map(([n, l]) => ({ nombre: n, total: l })).sort((n, l) => l.total - n.total), fuentes: y.map((n) => ({ id: n.id, nombre: n.nombre, color: n.color, pais: n.paisPorDefecto ?? "", total: s.get(n.id) ?? 0 })).sort((n, l) => l.total - n.total) };
  }
  function Y() {
    return x.map((o) => ({ id: o.id, nombre: o.nombre, tipo: o.tipo, lat: o.lat, lon: o.lon, pais: o.pais }));
  }
  function J(o, i, r = "") {
    let s = O(o, i), n = N(o, i), l = G(o, i, r || void 0);
    return { categoria: s.categoria, puntuacion: s.puntuacion, alternativas: s.todas.slice(0, 4), toponimo: n ? { nombre: n.lugar.nombre, tipo: n.lugar.tipo, lat: n.lugar.lat, lon: n.lugar.lon, donde: n.donde, coincidencias: n.coincidencias } : null, final: l ? { nombre: l.lugar.nombre, lat: l.lugar.lat, lon: l.lugar.lon, inferida: l.inferida } : null };
  }

  // public/app.js
  var CAT_COLORES = {
    politica: "#7c5cff",
    economia: "#00c48c",
    conflicto: "#ff4d4d",
    deportes: "#ffa500",
    ciencia: "#00b8ff",
    salud: "#2ecc71",
    clima: "#22c1c3",
    tecnologia: "#4dd0e1",
    cultura: "#ff6ec7",
    sociedad: "#9b8cff",
    deportes_olimpicos: "#ffd700"
  };
  var CAT_EMOJI = {
    politica: "\u{1F3DB}\uFE0F",
    economia: "\u{1F4C8}",
    conflicto: "\u2694\uFE0F",
    deportes: "\u26BD",
    ciencia: "\u{1F52C}",
    salud: "\u{1F3E5}",
    clima: "\u{1F30D}",
    tecnologia: "\u{1F4BB}",
    cultura: "\u{1F3AD}",
    sociedad: "\u{1F465}",
    deportes_olimpicos: "\u{1F3C5}"
  };
  var estado = {
    noticias: [],
    facetas: null,
    cats: /* @__PURE__ */ new Set(),
    lugares: /* @__PURE__ */ new Set(),
    fuentes: /* @__PURE__ */ new Set(),
    q: "",
    horas: 24,
    /** "todas" | "no" (sólo topónimos explícitos) | "solo" (sólo inferidas) */
    inferidas: "todas",
    /** Capa de fronteras de países, apagada por defecto sobre las teselas */
    fronteras: false
  };
  var TODAS = [];
  var hayServidor = false;
  var estadoServidor = null;
  var $2 = (s) => document.querySelector(s);
  var el = {
    mapa: $2("#mapa"),
    cats: $2("#filtro-cats"),
    lugares: $2("#filtro-lugares"),
    fuentes: $2("#filtro-fuentes"),
    q: $2("#q"),
    horas: $2("#horas"),
    btnRefrescar: $2("#btn-refrescar"),
    btnTema: $2("#btn-tema"),
    btnLimpiar: $2("#btn-limpiar"),
    carga: $2("#cargando"),
    inferidas: $2("#filtro-inferidas"),
    capas: $2("#filtro-capas"),
    dlgProbar: $2("#dlg-probar"),
    pTitulo: $2("#p-titulo"),
    pDesc: $2("#p-desc"),
    pResultado: $2("#p-resultado"),
    tira: $2("#tira"),
    tiraInfo: $2("#tira-info"),
    subtitulo: $2("#subtitulo"),
    estadoFuentes: $2("#estado-fuentes")
  };
  var mapa = L.map("mapa", {
    worldCopyJump: true,
    minZoom: 2,
    maxZoom: 12,
    zoomControl: true
  }).setView([22, -10], 2);
  var teselasOSM = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19,
    // Si no hay red, el mar del contenedor hace de fondo en lugar de un square roto
    errorTileUrl: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  }).addTo(mapa);
  var paisesBase = /* @__PURE__ */ new Map();
  var nombrePorIso = /* @__PURE__ */ new Map();
  var paisesCargados = false;
  function resaltarPaises() {
    if (!paisesCargados) return;
    for (const { capa, nombre } of paisesBase.values()) {
      capa.getElement()?.classList.toggle("elegido", estado.lugares.has(nombre));
    }
  }
  function cargarPaises() {
    return fetch("vendor/paises-mundo.geojson").then((r) => {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    }).then((geo) => {
      capaPaises = L.geoJSON(geo, {
        className: "pais",
        onEachFeature: (f, l) => {
          const nombre = f.properties?.nombre;
          const iso = f.properties?.iso;
          if (!nombre) return;
          l.bindTooltip(nombre, { sticky: true, className: "pista-pais" });
          if (!iso || !nombrePorIso.has(iso)) return;
          paisesBase.set(iso, { capa: l, nombre: nombrePorIso.get(iso) });
          l.on("click", () => {
            alternar(estado.lugares, paisesBase.get(iso).nombre);
            refrescar();
          });
        }
      });
      paisesCargados = true;
      if (estado.fronteras) alternarFronteras(true);
      mapa.invalidateSize();
    }).catch((e2) => console.warn("Capa de fronteras no disponible:", e2.message));
  }
  var capaPaises = null;
  function alternarFronteras(encender) {
    if (!capaPaises) return;
    if (encender) {
      if (!mapa.hasLayer(capaPaises)) capaPaises.addTo(mapa);
      resaltarPaises();
    } else {
      mapa.removeLayer(capaPaises);
    }
  }
  Y().forEach((l) => {
    if (l.tipo === "pais" && l.pais) nombrePorIso.set(l.pais.toUpperCase(), l.nombre);
  });
  cargarPaises();
  L.control.scale({ imperial: false }).addTo(mapa);
  mapa.attributionControl.addAttribution(
    'Fronteras: <a href="https://www.naturalearthdata.com/">Natural Earth</a>'
  );
  var paramsUrl = new URLSearchParams(location.search);
  if (paramsUrl.get("lat") && paramsUrl.get("lon")) {
    mapa.setView([Number(paramsUrl.get("lat")), Number(paramsUrl.get("lon"))], Number(paramsUrl.get("z") ?? 5));
  }
  var capaMarcadores = L.layerGroup().addTo(mapa);
  var mapaCalor = null;
  var CAT_NOMBRES = {};
  function catNombre(id) {
    return CAT_NOMBRES[id] ?? id;
  }
  function esc(s) {
    return String(s ?? "").replace(
      /[&<>"']/g,
      (c2) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c2]
    );
  }
  function haceCuanto(iso) {
    const t = Date.parse(iso);
    if (!Number.isFinite(t)) return "";
    const min = Math.round((Date.now() - t) / 6e4);
    if (min < 1) return "ahora";
    if (min < 60) return `hace ${min} min`;
    const h = Math.round(min / 60);
    if (h < 24) return `hace ${h} h`;
    const d = Math.round(h / 24);
    if (d < 7) return `hace ${d} d`;
    return new Date(t).toLocaleDateString("es", { day: "numeric", month: "short" });
  }
  function imgSegura(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      return u.protocol === "https:" ? url : null;
    } catch {
      return null;
    }
  }
  async function pedir(url, opts) {
    const res = await fetch(url, opts);
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      throw new Error(`${res.status} ${res.statusText} ${t.slice(0, 120)}`);
    }
    return res.json();
  }
  async function cargarFacetas() {
    estado.facetas = Z(TODAS);
    for (const c2 of estado.facetas.categorias) CAT_NOMBRES[c2.id] = c2.nombre;
    pintarFiltros();
  }
  var cargando = false;
  async function cargarNoticias() {
    const p = {
      q: estado.q,
      categorias: estado.cats.size ? [...estado.cats] : void 0,
      lugares: estado.lugares.size ? [...estado.lugares] : void 0,
      fuentes: estado.fuentes.size ? [...estado.fuentes] : void 0,
      horas: estado.horas || 0,
      inferidas: estado.inferidas !== "todas" ? estado.inferidas : void 0,
      orden: void 0,
      limite: 1500
    };
    const datos = V(TODAS, p);
    estado.noticias = datos.noticias;
    pintarMapa();
    pintarTira();
    el.subtitulo.textContent = `${datos.total.toLocaleString("es")} noticias` + (estado.cats.size ? ` \xB7 ${estado.cats.size} tem\xE1ticas` : " \xB7 todas las tem\xE1ticas") + (estado.inferidas === "no" ? " \xB7 s\xF3lo top\xF3nimos" : estado.inferidas === "solo" ? " \xB7 s\xF3lo deducidas" : "");
  }
  function pintarFiltros() {
    const f = estado.facetas;
    el.cats.innerHTML = "";
    for (const c2 of f.categorias) {
      if (!c2.total) continue;
      const chip = document.createElement("button");
      chip.className = "chip" + (estado.cats.has(c2.id) ? " activa" : "");
      chip.innerHTML = `<span class="punto" style="background:${c2.color}"></span>${CAT_EMOJI[c2.id] ?? ""} ${esc(c2.nombre)} <span class="n">${c2.total}</span>`;
      chip.onclick = () => {
        alternar(estado.cats, c2.id);
        refrescar();
      };
      el.cats.append(chip);
    }
    el.lugares.innerHTML = "";
    const maxL = f.lugares[0]?.total || 1;
    for (const l of f.lugares.slice(0, 80)) {
      const fila = document.createElement("div");
      fila.className = "fila" + (estado.lugares.has(l.nombre) ? " activa" : "");
      fila.innerHTML = `<span>${esc(l.nombre)}</span><span class="barra-mini"><i style="width:${l.total / maxL * 100}%"></i></span><span class="n">${l.total}</span>`;
      fila.onclick = () => {
        alternar(estado.lugares, l.nombre);
        refrescar();
      };
      el.lugares.append(fila);
    }
    $2("#cont-lugares").textContent = f.lugares.length ? `(${f.lugares.length})` : "";
    el.fuentes.innerHTML = "";
    const maxF = f.fuentes[0]?.total || 1;
    for (const s of f.fuentes) {
      if (!s.total) continue;
      const fila = document.createElement("div");
      fila.className = "fila" + (estado.fuentes.has(s.id) ? " activa" : "");
      fila.innerHTML = `<span class="punto" style="background:${s.color}"></span><span>${esc(s.nombre)}</span><span class="barra-mini"><i style="width:${s.total / maxF * 100}%"></i></span><span class="n">${s.total}</span>`;
      fila.onclick = () => {
        alternar(estado.fuentes, s.id);
        refrescar();
      };
      el.fuentes.append(fila);
    }
    $2("#cont-fuentes").textContent = `(${f.fuentes.filter((s) => s.total).length})`;
    el.inferidas.innerHTML = "";
    const opciones = [
      ["todas", "Todas"],
      ["no", "S\xF3lo top\xF3nimos"],
      ["solo", "S\xF3lo deducidas"]
    ];
    for (const [valor, texto] of opciones) {
      const chip = document.createElement("button");
      chip.className = "chip" + (estado.inferidas === valor ? " activa" : "");
      chip.textContent = texto;
      chip.title = valor === "todas" ? "Mostrar todas las noticias" : valor === "no" ? "Ocultar las noticias sin top\xF3nimo en el texto, cuya ubicaci\xF3n se dedujo del portal" : "Mostrar s\xF3lo las noticias cuya ubicaci\xF3n se dedujo del portal";
      chip.onclick = () => {
        estado.inferidas = valor;
        pintarFiltros();
        cargarNoticias();
      };
      el.inferidas.append(chip);
    }
    el.capas.innerHTML = "";
    const chipCapa = document.createElement("button");
    chipCapa.className = "chip" + (estado.fronteras ? " activa" : "");
    chipCapa.textContent = "Fronteras de pa\xEDses";
    chipCapa.title = estado.fronteras ? "Ocultar las fronteras y dejar s\xF3lo el mapa de OpenStreetMap" : "Superponer las fronteras para ver los pa\xEDses resaltados y filtrar al pulsarlos";
    chipCapa.onclick = () => {
      estado.fronteras = !estado.fronteras;
      alternarFronteras(estado.fronteras);
      pintarFiltros();
    };
    el.capas.append(chipCapa);
  }
  function alternar(set, valor) {
    set.has(valor) ? set.delete(valor) : set.add(valor);
  }
  var temporizador;
  function refrescar() {
    pintarFiltros();
    resaltarPaises();
    clearTimeout(temporizador);
    temporizador = setTimeout(cargarNoticias, 180);
  }
  function agruparPorLugar(noticias) {
    const mapa2 = /* @__PURE__ */ new Map();
    for (const n of noticias) {
      const arr = mapa2.get(n.lugarId);
      if (arr) arr.push(n);
      else mapa2.set(n.lugarId, [n]);
    }
    return [...mapa2.entries()].sort(
      (a2, b) => b[1].length - a2[1].length || Date.parse(b[1][0].fecha ?? 0) - Date.parse(a2[1][0].fecha ?? 0)
    );
  }
  function pintarMapa() {
    capaMarcadores.clearLayers();
    if (mapaCalor) {
      mapa.removeLayer(mapaCalor);
      mapaCalor = null;
    }
    const grupos = agruparPorLugar(estado.noticias);
    const maxN = grupos[0]?.[1].length || 1;
    for (const [lugarId, noticias] of grupos) {
      const catPrincipal = contarCategorias(noticias)[0] ?? "sociedad";
      const color = CAT_COLORES[catPrincipal] ?? "#4c8dff";
      const primero = noticias[0];
      const radio = 6 + Math.min(16, Math.log2(1 + noticias.length / maxN) * 14 + noticias.length * 0.7);
      const todoInferido = noticias.every((n) => n.ubicacionInferida);
      const marcador = L.circleMarker([primero.lat, primero.lon], {
        radius: radio,
        color,
        weight: 2,
        dashArray: todoInferido ? "3 3" : void 0,
        fillColor: color,
        fillOpacity: 0.45,
        className: "marcador-" + lugarId
      });
      marcador.bindPopup(popupHtml(lugarId, primero, noticias), {
        maxWidth: 340,
        minWidth: 260,
        className: "popup-noticia"
      });
      marcador.on("click", () => destacarMarcador(lugarId));
      capaMarcadores.addLayer(marcador);
    }
    if (grupos.length > 3) {
      mapaCalor = L.layerGroup();
      for (const [, noticias] of grupos) {
        const p = noticias[0];
        const c2 = L.circle([p.lat, p.lon], {
          radius: 9e4 + noticias.length * 3e4,
          color: "#ffffff",
          weight: 0,
          opacity: 0.06,
          fillOpacity: 0.06,
          interactive: false
        });
        mapaCalor.addLayer(c2);
      }
      mapaCalor.addTo(mapa);
    }
  }
  function destacarMarcador(lugarId) {
    document.querySelectorAll(".marcador-hl").forEach((n) => n.classList.remove("marcador-hl"));
    capaMarcadores.eachLayer((l) => {
      if (l.options?.className === "marcador-" + lugarId) {
        l.getElement?.()?.classList.add("marcador-hl");
      }
    });
    document.querySelectorAll(".tarjeta").forEach((t) => {
      t.style.outline = t.dataset.lugar === lugarId ? "2px solid var(--acento)" : "";
    });
  }
  function contarCategorias(noticias) {
    const c2 = /* @__PURE__ */ new Map();
    for (const n of noticias) c2.set(n.categoria, (c2.get(n.categoria) ?? 0) + 1);
    return [...c2.entries()].sort((a2, b) => b[1] - a2[1]);
  }
  function popupHtml(lugarId, primero, noticias) {
    const cats = contarCategorias(noticias);
    const cat = cats[0][0];
    const color = CAT_COLORES[cat] ?? "#4c8dff";
    const img = imgSegura(primero.imagen);
    const catTags = cats.slice(0, 3).map(
      ([id, n]) => `<span class="etiqueta-cat" style="background:${CAT_COLORES[id] ?? "#4c8dff"}">${CAT_EMOJI[id] ?? ""} ${esc(catNombre(id))} ${n}</span>`
    ).join(" ");
    const lista = noticias.slice(0, 12).map(
      (n) => `<li style="margin:5px 0"><a href="${esc(n.enlace)}" target="_blank" rel="noopener">${esc(n.titulo)}</a>
      <div style="font-size:11px;color:#667">${esc(n.fuenteNombre)} \xB7 ${haceCuanto(n.fecha ?? n.fechaRecopilacion)}${n.ubicacionInferida ? " \xB7 \u{1F4CD} deducida" : ""}</div></li>`
    ).join("");
    const inferidas = noticias.filter((n) => n.ubicacionInferida).length;
    return `
    ${img ? `<img class="img" src="${esc(img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[cat] ?? ""} ${esc(catNombre(cat))}</span>
      <span style="font-size:11px;color:#667">${esc(primero.lugarNombre)} \xB7 ${noticias.length} noticia${noticias.length === 1 ? "" : "s"}</span>
    </div>
    ${inferidas ? `<p class="ubica" title="En ${inferidas} de estas noticias no aparece ning\xFAn top\xF3nimo en el texto, as\xED que el marcador se ha situado en el pa\xEDs del portal.">\u{1F4CD} ${inferidas} situadas por el pa\xEDs del portal, sin top\xF3nimo en el texto</p>` : ""}
    <div style="margin-top:8px">${catTags}</div>
    <ul style="margin:10px 0 0;padding-left:18px;max-height:260px;overflow:auto">${lista}</ul>
    ${noticias.length > 12 ? `<p class="ubica">+${noticias.length - 12} m\xE1s en esta zona</p>` : ""}
    <div class="ubica">Coordenadas: ${primero.lat.toFixed(2)}, ${primero.lon.toFixed(2)}</div>
    <div style="margin-top:8px">
      <button onclick="window.__marcar('${esc(lugarId)}')" style="font-size:11px;padding:4px 8px">Ver en la tira de noticias</button>
    </div>`;
  }
  function pintarTira() {
    el.tira.innerHTML = "";
    const lista = estado.noticias.slice(0, 200);
    for (const n of lista) {
      const color = CAT_COLORES[n.categoria] ?? "#4c8dff";
      const card = document.createElement("article");
      card.className = "tarjeta";
      card.style.setProperty("--cat-color", color);
      card.dataset.lugar = n.lugarId;
      card.innerHTML = `
      <div class="et">
        <span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[n.categoria] ?? ""} ${esc(catNombre(n.categoria))}</span>
        <span>${n.ubicacionInferida ? "\u{1F4CD} " : ""}${esc(n.lugarNombre)}</span>
      </div>
      <h3>${esc(n.titulo)}</h3>
      <div class="pie">
        <span>${esc(n.fuenteNombre)}</span>
        <span>\xB7</span>
        <span>${haceCuanto(n.fecha ?? n.fechaRecopilacion)}</span>
      </div>`;
      card.onclick = () => {
        mapa.setView([n.lat, n.lon], Math.max(mapa.getZoom(), 4), { animate: true });
        capaMarcadores.eachLayer((l) => {
          if (l.options?.className === "marcador-" + n.lugarId) l.openPopup();
        });
        destacarMarcador(n.lugarId);
      };
      el.tira.append(card);
    }
    el.tiraInfo.textContent = `${lista.length} visibles`;
  }
  window.__marcar = (lugarId) => {
    el.tira.scrollIntoView({ behavior: "smooth", block: "nearest" });
    destacarMarcador(lugarId);
    const primero = el.tira.querySelector(`.tarjeta[data-lugar="${CSS.escape(lugarId)}"]`);
    primero?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };
  el.btnRefrescar.onclick = async () => {
    if (!hayServidor) return;
    el.btnRefrescar.disabled = true;
    el.btnRefrescar.textContent = "Actualizando\u2026";
    el.carga.classList.remove("oculto");
    try {
      await pedir("/api/recopilar", { method: "POST" });
      const r = await fetch("datos/noticias.json", { cache: "no-store" });
      if (r.ok) {
        const d = await r.json();
        TODAS = Array.isArray(d.noticias) ? d.noticias : [];
      }
      await cargarFacetas();
      await cargarNoticias();
    } catch (e2) {
      alert("No se pudo actualizar: " + e2.message);
    } finally {
      el.carga.classList.add("oculto");
      el.btnRefrescar.disabled = false;
      el.btnRefrescar.textContent = "Actualizar";
    }
  };
  el.btnLimpiar.onclick = () => {
    estado.cats.clear();
    estado.lugares.clear();
    estado.fuentes.clear();
    estado.q = "";
    el.q.value = "";
    estado.horas = 0;
    el.horas.value = "0";
    estado.inferidas = "todas";
    pintarFiltros();
    cargarNoticias();
  };
  $2("#btn-probar").onclick = () => el.dlgProbar.showModal();
  $2("#p-ejecutar").onclick = async (ev) => {
    ev.preventDefault();
    const titulo = el.pTitulo.value.trim();
    if (!titulo) {
      el.pResultado.innerHTML = `<p class="muestreo">Escribe un titular.</p>`;
      return;
    }
    try {
      const r = J(titulo, el.pDesc.value.trim());
      const cat = r.categoria;
      const color = CAT_COLORES[cat] ?? "#4c8dff";
      el.pResultado.innerHTML = `
      <p><span class="etiqueta-cat" style="background:${color}">${CAT_EMOJI[cat] ?? ""} ${esc(catNombre(cat))}</span>
         <span class="muestreo">puntuaci\xF3n ${r.puntuacion}</span></p>
      ${r.toponimo ? `<p>\u{1F4CD} Top\xF3nimo detectado: <strong>${esc(r.toponimo.nombre)}</strong>
             <span class="muestreo">(${r.toponimo.tipo}, en el ${r.toponimo.donde})</span></p>` : `<p class="muestreo">Sin top\xF3nimo en el texto.</p>`}
      ${r.final && r.final.inferida ? `<p class="muestreo">Se situar\xEDa en ${esc(r.final.nombre)} por el pa\xEDs del portal.</p>` : ""}
      <p class="muestreo">Otras: ${r.alternativas.slice(1).map((a2) => `${esc(catNombre(a2.categoria))} (${a2.puntuacion})`).join(", ") || "\u2014"}</p>`;
    } catch (e2) {
      el.pResultado.innerHTML = `<p class="muestreo">Error: ${esc(e2.message)}</p>`;
    }
  };
  el.btnTema.onclick = () => {
    const html = document.documentElement;
    const nuevo = html.dataset.tema === "claro" ? "oscuro" : "claro";
    html.dataset.tema = nuevo;
    el.btnTema.textContent = nuevo === "claro" ? "\u2600\uFE0F" : "\u{1F319}";
    localStorage.setItem("tema", nuevo);
  };
  var temaGuardado = localStorage.getItem("tema");
  if (temaGuardado === "claro") el.btnTema.click();
  var qTimer;
  el.q.oninput = () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      estado.q = el.q.value.trim();
      refrescar();
    }, 300);
  };
  el.horas.onchange = () => {
    estado.horas = Number(el.horas.value);
    cargarNoticias();
  };
  $2("#btn-tira-mas").onclick = () => el.tira.scrollBy({ left: 620, behavior: "smooth" });
  $2("#btn-tira-menos").onclick = () => el.tira.scrollBy({ left: -620, behavior: "smooth" });
  async function refrescarEstado() {
    if (!hayServidor) return;
    try {
      const e2 = await pedir("/api/estado");
      estadoServidor = e2;
      const cuando = e2.ultimaExitosa ? new Date(e2.ultimaExitosa).toLocaleString("es") : "nunca";
      el.estadoFuentes.textContent = `${e2.total} noticias \xB7 ${e2.feedsOk}/${e2.feedsTotales} feeds OK \xB7 ${e2.ubicacionesInferidas ?? 0} de pa\xEDs deducido \xB7 \xFAltima actualizaci\xF3n: ${cuando}${e2.enCurso ? " \xB7 recopilando\u2026" : ""}`;
    } catch {
      el.estadoFuentes.textContent = "Servidor local no disponible";
    }
  }
  (async function inicio() {
    cargando = true;
    try {
      const r = await fetch("datos/noticias.json", { cache: "no-cache" });
      if (r.ok) {
        const d = await r.json();
        TODAS = Array.isArray(d.noticias) ? d.noticias : [];
      } else {
        TODAS = [];
      }
    } catch {
      TODAS = [];
    }
    try {
      const s = await fetch("api/salud", { cache: "no-store" });
      hayServidor = s.ok;
    } catch {
      hayServidor = false;
    }
    if (hayServidor) {
      el.btnRefrescar.style.display = "";
      el.btnRefrescar.onclick = async () => {
        el.btnRefrescar.disabled = true;
        el.btnRefrescar.textContent = "Actualizando\u2026";
        el.carga.classList.remove("oculto");
        try {
          await pedir("api/recopilar", { method: "POST" });
          const r2 = await fetch("datos/noticias.json", { cache: "no-store" });
          if (r2.ok) {
            const d = await r2.json();
            TODAS = Array.isArray(d.noticias) ? d.noticias : [];
          }
          await cargarFacetas();
          await cargarNoticias();
        } catch (e2) {
          alert("No se pudo actualizar: " + e2.message);
        } finally {
          el.carga.classList.add("oculto");
          el.btnRefrescar.disabled = false;
          el.btnRefrescar.textContent = "Actualizar";
        }
      };
    } else {
      el.btnRefrescar.style.display = "none";
      el.btnRefrescar.onclick = null;
    }
    await refrescarEstado();
    if (!TODAS.length && hayServidor) {
      const datos = await pedir("api/noticias?limite=1500");
      TODAS = datos.noticias;
    }
    cargando = false;
    el.subtitulo.textContent = "Datos cargados";
    pintarFiltros();
    pintarMapa();
    pintarTira();
    el.subtitulo.textContent = `${TODAS.length.toLocaleString("es")} noticias` + (estado.inferidas === "no" ? " \xB7 s\xF3lo top\xF3nimos" : estado.inferidas === "solo" ? " \xB7 s\xF3lo deducidas" : " \xB7 todas las tem\xE1ticas");
  })();
  mapa.on("moveend zoomend", () => {
    const c2 = mapa.getCenter();
    const p = new URLSearchParams(location.search);
    p.set("lat", c2.lat.toFixed(3));
    p.set("lon", c2.lng.toFixed(3));
    p.set("z", mapa.getZoom());
    history.replaceState(null, "", "?" + p);
  });
})();
