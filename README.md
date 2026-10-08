# Noticias · mapa mundial

Mapa mundial interactivo con las noticias destacadas de la prensa en español.
Cada noticia aparece como un marcador en el lugar del que habla, con un pop-up
que enlaza al original. Todo es filtrable por temática, país y portal.

- **23 portales** en español · **58 feeds RSS** verificados
- **11 temáticas** clasificadas automáticamente
- **Geolocalización offline** con un gazetteer propio (197 países, 40 regiones, 263 ciudades)
- **Mapa de OpenStreetMap** sin clave de API ni registro: son las teselas
  públicas estándar, con su atribución. La librería Leaflet se sirve desde el
  propio servidor, así que no depende de ningún CDN.

## Puesta en marcha

```bash
npm install
npm start           # http://localhost:3000
```

Al arrancar hace una pasada por todos los feeds y luego se actualiza solo cada
hora. Los datos se guardan en `datos/noticias.json` (se conservan entre
reinicios, así que las siguientes ejecuciones arrancan con el mapa ya poblado).

### Variables de entorno

| Variable        | Por defecto | Para qué sirve                                        |
| --------------- | ----------- | ----------------------------------------------------- |
| `PORT`          | `3000`      | Puerto del servidor HTTP.                              |
| `INTERVALO_MIN` | `60`        | Minutos entre recopilaciones. `0` desactiva el cron.   |

```bash
PORT=8080 INTERVALO_MIN=15 npm start
```

## Comandos

| Comando                | Qué hace                                                     |
| ---------------------- | ------------------------------------------------------------ |
| `npm start`            | Servidor web + API + actualización automática.               |
| `npm run dev`          | Igual, pero reinicia al guardar cambios.                     |
| `npm run recopilar`    | Recopila una vez desde consola y resume por temática.        |
| `npm run mapa`        | Regenera el mapa base vectorial (ver más abajo).             |
| `npm run build`       | Compila TypeScript a `dist/`.                                |
| `npm run typecheck`   | Comprueba los tipos sin emitir nada.                          |

Pruebas y sondas:

```bash
npx tsx src/herramientas/pruebas.ts           # 33 casos de clasificación y geolocalización
npx tsx src/herramientas/sonda.ts             # comprueba qué feeds siguen vivos
npx tsx src/herramientas/sonda.ts --solo-ok   # sólo los que funcionan
npx tsx src/herramientas/sonda.ts infobae     # una fuente concreta
```

## Cómo funciona

```
feeds RSS ──▶ parsear ──▶ deduplicar ──▶ geolocalizar ──▶ clasificar ──▶ datos/noticias.json
                                                                              │
                                              Leaflet + filtros ◀── API REST ─┘
```

### 1. Fuentes

`src/data/fuentes.ts` contiene los portales con sus feeds, color de marca y
país por defecto. **Sólo se incluyen feeds verificados que devuelven noticias**;
los portales caídos están enumerados en la cabecera del propio archivo.

Cuando el texto no menciona ningún topónimo, la noticia no se descarta: se
coloca en el país del portal y se marca con `ubicacionInferida: true`. La
interfaz lo distingue con un borde discontinuo y un chip 📍, y se puede filtrar
con «Sólo topónimos» / «Sólo deducidas».

### 2. Geolocalización

`src/data/gazetteer.ts` es un índice de topónimos en español e inglés con sus
coordenadas, en tres niveles:

1. se buscan nombres de **ciudades** y **regiones** (más específicos);
2. si no hay ninguno, se usa un nombre de **país**;
3. si tampoco, se recurre al país del portal (marcado como inferido).

El texto se normaliza antes de buscar, y el lugar gana por número de
menciones y por especificidad (una ciudad pesa más que un país). Se ignoran los
alias de menos de 4 caracteres para que palabras como «de» o «la» no activen
Alemania o Laos.

### 3. Temáticas

`src/data/categorias.ts` define 11 taxonomías con sus términos y pesos:
Política, Economía, Conflictos, Deportes,Olympicos, Ciencia, Salud, Clima,
Tecnología, Cultura y Sociedad. Cada titular puntúa contra un índice invertido
de términos y se queda con la categoría de mayor puntuación; las que superan
el umbral se guardan también en `categorias[]` para poder combinar filtros.

Desde el pop-up se puede reetiquetar una noticia a mano (`PATCH /api/noticias/:id`).
Esa etiqueta se marca con `editada` y sobrevive a las siguientes recopilaciones.

## El mapa base

El fondo es el mapa de OpenStreetMap (`tile.openstreetmap.org`), que no pide
clave ni registro. Encima va una capa opcional de fronteras de países, que es lo
que permite filtrar pulsando un territorio.

| Pieza         | De dónde sale                                                 |
| ------------- | ------------------------------------------------------------- |
| Teselas       | `tile.openstreetmap.org/{z}/{x}/{y}.png` (servicio público)   |
| Leaflet 1.9.4 | `public/vendor/leaflet/` (copia local, 159 KB, sin CDN)       |
| Fronteras     | `public/vendor/paises-mundo.geojson` (170 KB, opcional)       |
| Colores       | variables CSS `--mar`, `--tierra`, `--tierra-borde`, …        |

El interruptor **«Fronteras de países»** de la barra lateral enciende y apaga esa
capa. Con ella encendida, **pulsar un país lo filtra** en la lista de la
izquierda y los países elegidos quedan resaltados. Apagada, sólo se ve el mapa
de OpenStreetMap.

Las fronteras vienen de [Natural Earth](https://www.naturalearthdata.com/)
110m (dominio público). `npm run mapa` las regenera: descarga el original a
`datos/cache/`, se queda con el código ISO y el nombre en español de cada país
y redondea las coordenadas a 2 decimales, lo que baja los 820 KB originales a
170 KB sin perder nada visible.

```bash
npm run mapa                # reutiliza la descarga de datos/cache
npm run mapa -- --descargar # vuelve a bajarla de Natural Earth
```

### Tema claro y oscuro

Las teselas de OSM son claras, así que en modo oscuro se invierte **sólo** el
panel de teselas:

```css
html:not([data-tema="claro"]) .leaflet-tile-pane { filter: invert(1) hue-rotate(180deg) … }
```

Los marcadores, los pop-ups y los controles se tiñen con variables CSS y
conservan sus colores reales. Antes se invertía el contenedor del mapa entero,
lo que además cambiaba el color de las categorías.

### Peticiones que hace el navegador

Ocho al propio servidor, más las teselas de OSM:

```
/vendor/leaflet/leaflet.css   /estilos.css        /vendor/leaflet/leaflet.js
/app.js                       /api/lugares        /api/facetas
/vendor/paises-mundo.geojson  /api/noticias       /api/estado
```

## API

| Método y ruta            | Qué devuelve                                              |
| ------------------------ | --------------------------------------------------------- |
| `GET /api/noticias`      | Noticias filtradas. Parámetros abajo.                      |
| `GET /api/facetas`       | Conteos por temática, país y portal.                       |
| `GET /api/estado`        | Última ejecución: feeds OK, artículos leídos, duración…     |
| `GET /api/lugares`       | Gazetteer completo (países, regiones, ciudades).           |
| `GET /api/salud`         | Sonda de vida del proceso.                                 |
| `POST /api/probar`       | Clasifica y geolocaliza un texto libre sin guardarlo.      |
| `POST /api/clasificar`   | Igual que el anterior, con menos detalle.                  |
| `POST /api/recopilar`    | Fuerza una recopilación (409 si ya hay una en curso).       |
| `PATCH /api/noticias/:id`| Reetiqueta una noticia a mano.                             |

Parámetros de `GET /api/noticias` (los de lista aceptan varios valores separados
por comas):

| Parámetro   | Ejemplo                    | Efecto                                        |
| ----------- | -------------------------- | --------------------------------------------- |
| `categoria` | `conflicto,clima`          | Filtra por temática.                          |
| `pais`      | `Ucrania,Rusia`             | Filtra por lugar.                             |
| `fuente`    | `elpais,bbc-mundo`         | Filtra por portal.                            |
| `q`         | `inflación`                 | Busca en titular, resumen y nombre del portal. |
| `horas`     | `24`                       | Sólo noticias de las últimas N horas.         |
| `inferidas` | `no` \| `solo`             | Sólo topónimos o sólo ubicaciones deducidas.   |
| `orden`     | `fecha` \| `relevancia`    | Más recientes, o primero las zonas con más noticias. |
| `limite`    | `500`                      | Máximo de elementos (máx. 2500).              |

```bash
curl "http://localhost:3000/api/noticias?categoria=economia&horas=12&limite=5"
```

## Notas de mantenimiento

- **`fast-xml-parser`** va con `processEntities: false` y decodificación propia de
  entidades. Con `processEntities: true` lanzaba `Entity expansion limit exceeded`
  en los feeds grandes (El País, La Vanguardia) y devolvía cero ítems sin avisar.
- Los feeds cambian de URL con frecuencia. Si un portal deja de dar noticias,
  lanza la sonda (`npx tsx src/herramientas/sonda.ts`), quita la fuente caída y
  deja nota en la cabecera de `fuentes.ts`.
- `datos/` está en `.gitignore`: es contenido generado, no código fuente. Ahí
  vive también la descarga original de Natural Earth; el `.geojson` ya reducido
  sí se versiona, porque sin él el mapa no arrancaría sin conexión.
- `public/vendor/` también se versiona a propósito: es lo que permite abrir la
  aplicación sin depender de ningún CDN.
- **Teselas de OSM.** `tile.openstreetmap.org` es el servidor estándar y es
  gratuito, pero su [política de uso](https://operations.osmfoundation.org/policies/tiles/)
  pide atribución (ya está en el mapa) y desaconseja el uso masivo o en
  segundo plano. Para este uso personal va sobrado. Si algún día se pide mucho
  tráfico, las alternativas son servir teselas desde tu propio servidor o
  contratar un proveedor con acuerdo.