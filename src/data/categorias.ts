/**
 * Taxonomía de temáticas y palabras clave para la clasificación automática.
 *
 * El peso de cada término se suma cuando aparece en el titular (peso mayor) o
 * en el resumen (peso menor). El término con mayor puntuación decide la
 * temática; los marcadores en mayúsculas / entrecomillados cuentan triple.
 */

export interface Categoria {
  id: string;
  nombre: string;
  color: string;
  emoji: string;
  /** Términos en español (y alguns en inglés) con su peso. */
  terminos: Record<string, number>;
}

export const CATEGORIAS: Categoria[] = [
  {
    id: "politica",
    nombre: "Política",
    color: "#7c5cff",
    emoji: "🏛️",
    terminos: {
      "elecciones": 4, "election": 3, "voto": 2, "votan": 2, "votos": 2,
      "electoral": 3, "campaña": 2, "candidato": 3, "candidata": 3,
      "candidatos": 3, "partido": 2, "coalición": 2, "coalicion": 2,
      "congreso": 3, "diputado": 3, "diputada": 3, "diputados": 3,
      "parlamento": 3, "parlamentario": 3, "senado": 3, "legislatura": 3,
      "ley": 2, "reforma": 3, "gobierno": 3, "gobierno de": 4,
      "legislación": 3, "legislacion": 3, "proyecto de ley": 4,
      "normativa": 2, "decreto": 2, "decreto-ley": 4,
      "presidente": 3, "presidenta": 3, "presidencia": 3,
      "ministro": 3, "ministra": 3, "ministros": 3, "ministra de": 4,
      "primer ministro": 4, "ministraancell": 4, "canciller": 3,
      "oposición": 3, "oposicion": 3, "mayoría": 2, "mayoria": 2,
      "alcalde": 3, "alcaldesa": 3, "ayuntamiento": 3, "referéndum": 3,
      "referendun": 3, "amnistía": 3, "amnistia": 3,
      "destitución": 3, "destitucion": 3, "renuncia": 2, "dimision": 3,
      "investidura": 3, "debate": 1, "votación": 3, "votacion": 3,
      "premier": 3, "gobierno britanico": 5, "white house": 4,
      "casa blanca": 4, "congreso de los diputados": 5, "capitolio": 4,
    },
  },
  {
    id: "economia",
    nombre: "Economía",
    color: "#00c48c",
    emoji: "📈",
    terminos: {
      "inflación": 5, "inflacion": 5, "inflation": 4, "ipc": 3,
      "pib": 4, "economía": 4, "economia": 4, "economico": 3,
      "económico": 3, "recesion": 4, "recesión": 4, "deficit": 3,
      "deuda": 3, "presupuesto": 3, "impuesto": 3, "impuestos": 3,
      "fiscal": 3, "banco central": 5, "bce": 4, "fed": 4, "reserva federal": 5,
      "tipos de interés": 4, "tasa de interés": 4, "tipos de interes": 4,
      "mercado": 2, "mercados": 2, "bolsa": 3, "bolsa de valores": 4,
      "índice": 1, "ibex": 4, "dow jones": 4, "nasdaq": 4,
      "petróleo": 4, "petroleo": 4, "oil": 3, "brent": 4, "wti": 4,
      "gasolina": 3, "carburante": 3, "electricidad": 3,
      "café": 2, "cafe": 2, "puerto": 1, "pérdidas": 3, "perdidas": 3,
      "ganancias": 3, "beneficios": 2, "pérdida": 3, "perdida": 3,
      "bono": 3, "bonos": 3, "deuda pública": 4, "consumo": 2,
      "euribor": 4, "divisa": 3, "divisas": 3, "moneda": 2, "euro": 2,
      "dolar": 2, "dólar": 2, "devaluación": 4, "devaluacion": 4,
      "empleo": 3, "paro": 4, "desempleo": 4,
      "salario": 3, "salarios": 3, "pension": 2, "pensiones": 2,
      "pymes": 3, "empresa": 2, "empresas": 2, "startup": 3,
      "banco": 2, "bancos": 2, "banca": 3, "crédito": 3, "credito": 3,
      "hipoteca": 3, "alquiler": 2, "vivienda": 2, "inversión": 2,
      "inversion": 2, "inversores": 2, "tarifa": 2, "tarifas": 2,
      "comercial": 1, "exportaciones": 3, "importaciones": 3,
      "turismo": 3, "turista": 3, "turistas": 3, "viajes": 2,
    },
  },
  {
    id: "conflicto",
    nombre: "Conflictos",
    color: "#ff4d4d",
    emoji: "⚔️",
    terminos: {
      "guerra": 5, "guerra de": 6, "conflicto": 4, "conflicto armado": 6,
      "ataque": 4, "ataques": 4, "atropello": 4, "bombardeo": 5,
      "bombardeos": 5, "misil": 4, "misiles": 4, "cohete": 3,
      "munición": 3, "municion": 3, "explosión": 4, "explosion": 4,
      "ejército": 4, "ejercito": 4, "militar": 3, "militares": 3,
      "soldado": 3, "soldados": 3, "ofensiva": 4, "contraofensiva": 4,
      "invasion": 5, "invasión": 5, "ocupación": 4, "ocupacion": 4,
      "frontera": 3, "ceasefire": 5, "alto el fuego": 5, "tregua": 4,
      "negociaciones de paz": 5, "genocidio": 5, "crisis de refugiados": 5,
      "refugiados": 4, "desplazados": 4, "hambruna": 4,
      "rebelión": 4, "rebelion": 4,
      "insurrección": 5, "golpe de estado": 6, "terrorismo": 5,
      "atentado": 5, "atentados": 5, "secuestro": 4, "coup": 3,
      "tensión": 2, "tension": 2, "escalada": 3, "violencia": 3,
      "manifestantes": 3, "protestas": 3, "protesta": 3,
      "oposición armada": 5, "coup d'etat": 5,
    },
  },
  {
    id: "deportes",
    nombre: "Deportes",
    color: "#ffa500",
    emoji: "⚽",
    terminos: {
      "fútbol": 5, "futbol": 5, "football": 4, "liga": 2, "la liga": 4,
      "real madrid": 4, "barça": 4, "barcelona": 2, "atletico": 3,
      "atlético de madrid": 4, "juventus": 4, "bayern": 4, "manchester": 3,
      "champions": 4, "champions league": 5,
      "liga mx": 5, "mundial": 3, "copa": 2, "torneo": 3, "partido": 3,
      "goles": 4, "gol": 3, "entrenador": 3, "entrenadora": 3,
      "jugador": 2, "jugadores": 2, "transferencia": 3, "fichaje": 4,
      "lesión": 3, "lesion": 3, "lesionado": 3, "recuperación": 1,
      "basketball": 4, "básquetbol": 4, "tenis": 4, "grand slam": 4,
      "atletismo": 4, "olimpiadas": 5, "olímpicas": 5, "juegos Olímpicos": 6,
      "mundial de": 3, "olympic games": 4, "ciclismo": 4, "ciclista": 4,
      "formula 1": 4, "fórmula 1": 4, "grand prix": 3,
      "motor": 2, "boxeo": 4, "pádel": 3, "beisbol": 3, "béisbol": 3,
      "rugby": 4, "golf": 3, "gimnasia": 4, "natación": 4, "remo": 3,
      "deportista": 3, "deporte": 2, "deportes": 2,
      "estadio": 3, "estadio azteca": 4, "mundial de fútbol": 5,
    },
  },
  {
    id: "ciencia",
    nombre: "Ciencia",
    color: "#00b8ff",
    emoji: "🔬",
    terminos: {
      "ciencia": 4, "científico": 3, "cientifico": 3, "científicos": 3,
      "investigación": 3, "investigacion": 3, "investigadores": 3,
      "estudio": 2, "estudios": 2, "hallazgo": 3, "hallazgos": 3,
      "descubrimiento": 4, "descubren": 3, "nasa": 4, "espacio": 3,
      "astronomía": 4, "astronomia": 4, "astrónomo": 3, "satelite": 3,
      "satélite": 3, "cohete espacial": 3, "marte": 4, "luna": 3,
      "planeta": 3, "universo": 3, "galaxia": 4, "telescopio": 4,
      "física": 4, "química": 4, "quimica": 4, "biología": 4, "biologia": 4,
      "genética": 4, "genetica": 4, "genoma": 4, "dna": 3, "rna": 2,
      "inteligencia artificial": 4, "algoritmo": 2, "algoritmos": 2,
      "investigadores de": 3, "premio nobel": 5, "nobel": 4,
      "fusión nuclear": 4, "fusion nuclear": 4, "eclipse": 4, "meteorito": 4,
      "c dinosaurio": 1, "dinosaurio": 4, "fósil": 4, "fosil": 4,
      "arqueología": 4, "arqueologia": 4, "arqueólogo": 4, "arqueologo": 4,
      "hallan": 2, "demuestran": 2, "teoría": 2, "teoria": 2,
      "cerebro": 3, "neuronas": 3, "consciente": 2,
      "investigación científica": 5, "célula": 2, "celula": 2,
    },
  },
  {
    id: "salud",
    nombre: "Salud",
    color: "#2ecc71",
    emoji: "🏥",
    terminos: {
      "salud": 4, "sanitario": 3, "sanitarios": 3, "médico": 4, "medico": 4,
      "médica": 4, "medica": 4, "médicos": 4, "medicos": 4,
      "hospital": 4, "hospitales": 4, "paciente": 3, "pacientes": 3,
      "enfermedad": 4, "enfermedades": 4, "virus": 3, "bacterias": 3,
      "vacuna": 3, "vacunas": 3, "vacunación": 4, "inmunización": 4,
      "pandemia": 5, "epidemia": 5, "brotes": 3, "contagio": 4,
      "oms": 4, "organización mundial de la salud": 6, "who": 2,
      "cáncer": 4, "cancer": 4, "oncología": 4, "diabetes": 4,
      "obesidad": 3, "cardíaco": 4, "cardiaco": 4, "infarto": 4,
      "alzheimer": 4, "demencia": 4, "depresión": 3, "depresion": 3,
      "salud mental": 5, "bienestar": 2, "nutrición": 3, "nutricion": 3,
      "diet": 2, "cirugía": 4, "cirugia": 4, "trasplante": 4,
      "medicamento": 3, "medicamentos": 3, "tratamiento": 2,
      "sida": 3, "hiv": 3, "tuberculosis": 4, "malaria": 4,
      "dengue": 4, "covid": 4, "sarampión": 4, "sarampion": 4,
      "embarazo": 3, "mortalidad": 3, "muerte": 1, "fallece": 2,
    },
  },
  {
    id: "clima",
    nombre: "Clima",
    color: "#22c1c3",
    emoji: "🌍",
    terminos: {
      "clima": 4, "climático": 3, "climatico": 3, "climática": 3,
      "climatica": 3, "medio ambiente": 4, "ecológico": 3, "ecologico": 3,
      "ecológica": 3, "ecologica": 3, "contaminación": 4, "contaminacion": 4,
      "emisiones": 3, "emision": 3, "carbono": 3, "co2": 3,
      "efecto invernadero": 5, "calentamiento global": 6,
      "temperatura": 3, "temperaturas": 3, "ola de calor": 5, "ola calor": 5,
      "sequía": 4, "sequia": 4, "sequías": 4, "sequias": 4,
      "inundación": 4, "inundacion": 4, "inundaciones": 4,
      "huracán": 5, "huracan": 5, "huracanes": 5, "ciclón": 5, "ciclon": 5,
      "tifón": 5, "tifon": 5, "tornado": 4, "tormenta": 3,
      "tormenta tropical": 5, "depresión tropical": 4, "depresion tropical": 4,
      "alerta": 1, "evacuados": 3, "evacuación": 3, "evacuacion": 3,
      "desastre": 3, "desastres": 3, "catástrofe": 4, "catastrofe": 4,
      "erupción": 4, "erupcion": 4, "volcán": 4, "volcan": 4,
      "terremoto": 4, "sismo": 3, "incendio": 3, "incendios": 3,
      "bombero": 3, "bomberos": 3, "protección civil": 4,
      "reciclaje": 3, "renovable": 3, "renovables": 3, "solar": 2,
      "eólica": 3, "eolica": 3, "sostenible": 3, "sostenibilidad": 4,
      "acuerdo de paris": 5, "cop28": 5, "cop29": 5, "cop30": 5,
      "cambio climático": 6, "cambio climatico": 6,
    },
  },
  {
    id: "tecnologia",
    nombre: "Tecnología",
    color: "#4dd0e1",
    emoji: "💻",
    terminos: {
      "tecnología": 4, "tecnologia": 4, "tecnológico": 3, "tecnologico": 3,
      "tech": 3, "aplicación": 2, "aplicacion": 2, "app": 2, "apps": 2,
      "software": 3, "hardware": 3, "internet": 3, "redes sociales": 4,
      "red social": 4, "facebook": 3, "instagram": 3, "twitter": 2, "x.com": 2,
      "tiktok": 3, "youtube": 3, "whatsapp": 3, "telegram": 2,
      "inteligencia artificial": 4, "machine learning": 4, "aprendizaje automático": 4,
      "chatgpt": 4, "openai": 4, "google": 2, "microsoft": 2, "apple": 2,
      "amazon": 2, "meta": 2, "chip": 3, "chips": 3, "semiconductor": 4,
      "semiconductores": 4, "intel": 2, "nvidia": 2, "smartphone": 3,
      "móvil": 2, "movil": 2, "teléfono": 2, "telefono": 2, "smart": 2,
      "autonomous": 1, "autónomo": 3, "autonomo": 3, "robot": 3, "robots": 3,
      "ciberseguridad": 4, "ciberataque": 5, "hackeo": 4, "hack": 3,
      "hacker": 3, "ciberdelito": 4, "ransomware": 4, "filtración de datos": 4,
      "privacidad": 3, "datos personales": 1, "regulación digital": 4,
      "startup": 3, "emprendimiento": 2, "app store": 3, "nube": 2,
      "internet de las cosas": 5, "blockchain": 3, "criptomoneda": 3,
      "bitcoin": 3, "cripto": 2, "inteligencia": 2, "robotica": 4,
      "nasa": 4, "spacex": 4, "tesla": 2, "samsung": 1, "sony": 1, "huawei": 1,
    },
  },
  {
    id: "cultura",
    nombre: "Cultura",
    color: "#ff6ec7",
    emoji: "🎭",
    terminos: {
      "cultura": 4, "cultural": 3, "arte": 3, "artista": 3, "artistas": 3,
      "museo": 3, "museos": 3, "exposición": 3, "exposicion": 3,
      "pintura": 3, "cuadro": 2, "escultura": 3, "mural": 3,
      "teatro": 3, "obra de teatro": 4, "cine": 3, "película": 3, "pelicula": 3,
      "director": 2, "directora": 2, "actor": 2, "actriz": 2, "actores": 2,
      "actrices": 2, "serie": 2, "series": 2, "televisión": 3, "television": 3,
      "netflix": 3, "hbo": 3, "streaming": 3, "disney": 2,
      "premio": 2, "premios": 2, "gana el": 1, "nominado": 2, "oscar": 4,
      "goya": 4, "grammy": 4, "grammys": 4, "festival": 3, "festivales": 3,
      "libro": 2, "libros": 2, "novela": 3, "escritor": 3, "escritora": 3,
      "poeta": 3, "poesía": 3, "musica": 3, "música": 3, "concierto": 3,
      "cantante": 3, "banda": 2, "álbum": 3, "album": 3, "cancion": 2,
      "canción": 2, "pop": 1, "rock": 2, "reguetón": 3, "flamenco": 4,
      "tango": 3, "folclore": 4, "gastronomía": 3, "gastronomia": 3,
      "restaurante": 2, "cocina": 1, "receta": 2, "artefactos": 1,
      "arquitectura": 2, "monumento": 2, "patrimonio": 2, "patrimonio de la humanidad": 4,
      "efemérides": 2, "aniversario": 2, "conmemoración": 2,
    },
  },
  {
    id: "sociedad",
    nombre: "Sociedad",
    color: "#9b8cff",
    emoji: "👥",
    terminos: {
      "sociedad": 3, "ciudadanos": 2, "ciudadana": 2, "habitantes": 2,
      "vecinos": 2, "vecino": 2, "comunidad": 2, "población": 2,
      "migra": 3, "migración": 3, "migracion": 3, "migrante": 3,
      "migrantes": 3, "inmigración": 3, "inmigracion": 3, "asilo": 4,
      "tráfico": 3, "accidente": 3, "accidentes": 3, "choque": 3,
      "incendio": 3, "robo": 3, "hurto": 3, "delito": 3, "delitos": 3,
      "policía": 3, "policia": 3, "detenido": 3, "detencion": 3, "detención": 3,
      "detenciones": 3, "juez": 3, "jueza": 3, "tribunal": 3, "fiscal": 2,
      "cárcel": 4, "carcel": 4, "prisión": 4, "prision": 4, "condena": 3,
      "condenado": 3, "condenada": 3, "juicio": 3, "investiga": 2,
      "violencia de género": 5, "machismo": 3, "feminicidio": 4,
      "hambre": 3, "pobreza": 3, "pobres": 2, "desigualdad": 3,
      "educacion": 3, "educación": 3, "colegio": 2, "escuela": 2,
      "universidad": 2, "estudiante": 2, "estudiantes": 2, "profesores": 2,
      "bombas": 2, "explosión": 3, "desaparecido": 3, "desaparecida": 3,
      "rescate": 3, "salvamento": 3, "búsqueda": 3, "busqueda": 3,
      "mujeres": 2, "hombres": 2, "niños": 2, "ninos": 2, "adolescentes": 2,
      "personas mayores": 3, "discapacidad": 3, "lgbt": 3, "lgbtq": 3,
    },
  },
  {
    id: "deportes_olimpicos",
    nombre: "Olímpicos",
    color: "#ffd700",
    emoji: "🏅",
    terminos: {
      "olímpico": 4, "olimpico": 4, "olímpica": 4, "olimpica": 4,
      "olímpicos": 4, "olimpicos": 4, "juegos olímpicos": 6,
      "medalla de oro": 5, "medalla de plata": 5, "medalla de bronce": 5,
      "medallas": 4, "olimpiadas": 5, "atleta": 3, "atletas": 3,
      "récord": 3, "record": 3, "récord olympico": 5, "paralímpico": 5,
      "paralimpico": 5, "comité olímpico": 5, "committee olimpico": 1,
    },
  },
];

/** Índice término normalizado -> { categoriaId, peso } */
export const INDICE_TERMINOS: Map<string, Array<{ categoria: string; peso: number }>> = (() => {
  const norm = (s: string) =>
    s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const m = new Map<string, Array<{ categoria: string; peso: number }>>();
  for (const cat of CATEGORIAS) {
    for (const [termino, peso] of Object.entries(cat.terminos)) {
      const k = norm(termino);
      if (!k) continue;
      const arr = m.get(k) ?? [];
      arr.push({ categoria: cat.id, peso });
      m.set(k, arr);
    }
  }
  return m;
})();

export const CATEGORIA_POR_ID = new Map(CATEGORIAS.map((c) => [c.id, c]));