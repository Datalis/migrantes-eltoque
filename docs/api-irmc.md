# API del Índice de Riesgo Migratorio Cubano (IRMC)

API JSON que expone los datos del **Índice de Riesgo Migratorio Cubano (IRMC)**, calculado mes a mes a partir de la hoja `Todos los eventos` del proyecto *La Travesía* / *Incidentes de La Travesía*. Pensada para ser consumida por herramientas externas (automatizaciones, LLMs, dashboards de terceros).

## URL base

| Entorno | Base URL |
|---|---|
| Local (dev) | `http://localhost:5173` |
| Producción | `https://latravesia.eltoque.com` |

## Autenticación y CORS

- **Sin autenticación**: la API es pública (los datos lo son).
- **CORS abierto**: `Access-Control-Allow-Origin: *` en todas las respuestas (admite `GET` y `OPTIONS`).
- **Cache HTTP**: `Cache-Control: public, max-age=300` (5 minutos).

## Resumen de endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | [`/api/irmc/latest`](#get-apiirmclatest) | Reporte completo del último mes con datos. |
| `GET` | [`/api/irmc/{year}/{month}`](#get-apiirmcyearmonth) | Reporte completo de un mes específico. |
| `GET` | [`/api/irmc/series`](#get-apiirmcseries) | Serie mensual ligera (para tendencias). |

---

## `GET /api/irmc/latest`

Devuelve el reporte completo del **último mes con datos** disponibles. Equivale a llamar a `/api/irmc/{year}/{month}` con el mes más reciente con eventos clasificados en la hoja.

**Ejemplo**

```http
GET /api/irmc/latest
```

Devuelve el mismo esquema que [`/api/irmc/{year}/{month}`](#get-apiirmcyearmonth).

---

## `GET /api/irmc/{year}/{month}`

Devuelve el reporte completo de un mes específico (`year` >= 2021, `month` entre 1 y 12). Incluye comparación con el mes anterior, desglose por tipo, demografía y geografía.

**Ejemplo**

```http
GET /api/irmc/2026/4
```

### Respuesta `200 OK`

```json
{
  "period": {
    "year": 2026,
    "month": 4,
    "monthName": "Abril",
    "monthLabel": "abril de 2026"
  },
  "irmc": {
    "value": 0.85,
    "valueFormatted": "0,85",
    "raw": 2.55,
    "level": "extremo",
    "levelLabel": "Extremo",
    "color": "#3b5bdb"
  },
  "totals": {
    "events": 20,
    "people": 43,
    "excludedEvents": 1
  },
  "previous": {
    "period": {
      "year": 2026,
      "month": 3,
      "monthName": "Marzo",
      "monthLabel": "marzo de 2026"
    },
    "irmc": {
      "value": 0.65,
      "valueFormatted": "0,65",
      "level": "alto",
      "levelLabel": "Alto"
    },
    "totals": { "events": 18, "people": 175 }
  },
  "trend": {
    "irmc": "aumentó",
    "irmcDelta": 0.20,
    "events": "aumentó",
    "eventsDelta": 2,
    "people": "disminuyó",
    "peopleDelta": -132,
    "peopleVarPercent": -75,
    "peopleVarPercentFormatted": "-75 %"
  },
  "byType": [
    { "type": "detencion", "label": "Detención", "severity": 2, "severityLevel": "media", "events": 9, "people": 32 },
    { "type": "muerte", "label": "Muerte", "severity": 3, "severityLevel": "alta", "events": 8, "people": 8 },
    { "type": "desaparicion", "label": "Desaparición", "severity": 3, "severityLevel": "alta", "events": 3, "people": 3 }
  ],
  "demographics": {
    "men": 19,
    "women": 4,
    "minors": 0,
    "totalIdentified": 23
  },
  "geography": {
    "countries": [
      { "name": "México", "events": 9, "people": 9 },
      { "name": "Estados Unidos", "events": 5, "people": 9 },
      { "name": "Brasil", "events": 1, "people": 20 }
    ],
    "topByEvents": { "name": "México", "events": 9 },
    "topByPeople": { "name": "Brasil", "people": 20 },
    "divergentTops": true,
    "locations": ["Boa Vista", "Bogotá", "Buenos Aires", "Cancún", "..."],
    "deathCountries": ["Colombia", "Estados Unidos", "Guyana", "México", "Uruguay"],
    "missingCountries": ["Argentina", "México"]
  },
  "classification": {
    "ranges": [
      { "level": "bajo", "label": "Bajo", "min": 0.0, "max": 0.25 },
      { "level": "moderado", "label": "Moderado", "min": 0.26, "max": 0.5 },
      { "level": "alto", "label": "Alto", "min": 0.51, "max": 0.75 },
      { "level": "extremo", "label": "Extremo", "min": 0.76, "max": 1.0 }
    ]
  },
  "excluded": {
    "count": 1,
    "events": [
      {
        "id": 1465,
        "date": "2026-04-01",
        "type": "detención; deportación",
        "country": "Guyana",
        "location": "Lethem",
        "name": "Migrante cubano cruza ilegalmente a Guyana y es deportado",
        "description": "Un ciudadano cubano identificado como Yosbani Suárez Areces..."
      }
    ]
  },
  "meta": {
    "source": "Google Sheets: \"Todos los eventos\" (Incidentes de La Travesía)",
    "generatedAt": "2026-06-22T19:30:20.422Z",
    "spreadsheetId": "1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ"
  }
}
```

### Campos

#### `period`
| Campo | Tipo | Notas |
|---|---|---|
| `year` | number | Año (>= 2021). |
| `month` | number | Mes 1–12. |
| `monthName` | string | "Abril" (capitalizado). |
| `monthLabel` | string | "abril de 2026" (para uso en texto). |

#### `irmc`
| Campo | Tipo | Notas |
|---|---|---|
| `value` | number | IRMC normalizado en `[0, 1]`, redondeado a 2 decimales. |
| `valueFormatted` | string | Misma cifra con **coma decimal** en formato es-ES (ej: `"0,85"`). Listo para publicación. |
| `raw` | number | IRMC bruto (antes de dividir por 3). |
| `level` | `"bajo" \| "moderado" \| "alto" \| "extremo"` | Clave del nivel. |
| `levelLabel` | string | Capitalizado para texto ("Extremo"). |
| `color` | string | Color hex del semáforo. |

#### `totals`
| Campo | Tipo | Notas |
|---|---|---|
| `events` | number | Eventos **clasificados** del mes (usados para el IRMC). |
| `people` | number | Suma de personas involucradas en esos eventos. |
| `excludedEvents` | number | Eventos del mes excluidos del cálculo (tipo vacío o no mapeado). El detalle viene en `excluded.events`. |

#### `previous` y `trend`

- `previous`: mismo esquema (versión reducida) para el mes anterior con datos. `null` si no hay mes anterior (primer mes de la serie).
- `trend`: dirección y delta del IRMC, eventos y personas vs. el mes anterior. Direcciones en **pretérito** (`"aumentó" | "disminuyó" | "se mantuvo"`), listas para texto. `peopleVarPercentFormatted` ya viene con signo (`"+12 %"` o `"-75 %"`). `null` si no hay mes anterior.

#### `byType`

Array ordenado por **eventos descendente**, solo incluye tipos presentes en el mes (no hay entradas con `events: 0`).

| Campo | Tipo | Notas |
|---|---|---|
| `type` | string | Clave normalizada (minúsculas sin acentos): `detencion`, `muerte`, etc. |
| `label` | string | Etiqueta para mostrar (capitalizada, con acentos). |
| `severity` | `1 \| 2 \| 3` | Peso de severidad (baja/media/alta). |
| `severityLevel` | `"baja" \| "media" \| "alta"` | Nombre del nivel de severidad. |
| `events` | number | Eventos de este tipo en el mes. |
| `people` | number | Personas involucradas en esos eventos. |

#### `demographics`

Suma de `Mujeres`, `Hombres` y `Menores de edad` de los eventos clasificados del mes. `totalIdentified = men + women + minors` (puede ser menor a `totals.people` si no se identificó a todas las personas).

#### `geography`

| Campo | Tipo | Notas |
|---|---|---|
| `countries[]` | `{name, events, people}` | Ordenado por `events` descendente. |
| `topByEvents` | `{name, events}` o `null` | País con más eventos del mes. |
| `topByPeople` | `{name, people}` o `null` | País con más personas afectadas. |
| `divergentTops` | boolean | `true` si `topByEvents.name !== topByPeople.name` (la plantilla cambia de redacción). |
| `locations[]` | string | Localidades únicas (ordenadas alfabéticamente, es). |
| `deathCountries[]` | string | Países donde hubo eventos de muerte/naufragio. |
| `missingCountries[]` | string | Países donde hubo desapariciones. |

#### `excluded`

Detalle de eventos del mes que **no entran al cálculo** porque su `Tipo de evento` no está mapeado en el catálogo de severidad (o está vacío). Útil para editorial: hay que normalizar esos tipos en la hoja o ampliar el mapa.

#### `classification.ranges`

Rangos fijos del IRMC para mapear `value` → `level` (definidos en el documento metodológico).

---

## `GET /api/irmc/series`

Serie mensual ligera, pensada para gráficos de tendencia y comparaciones intermensuales. Cada item tiene `period`, `irmc`, `totals` y `byType` (sin demografía ni geografía — para eso, llamá al endpoint del mes específico).

### Parámetros (opcionales)

| Param | Tipo | Descripción |
|---|---|---|
| `from` | `YYYY-MM` | Mes inicial (inclusive). |
| `to` | `YYYY-MM` | Mes final (inclusive). |
| `last` | number | Devuelve solo los últimos N meses. Se aplica **después** de `from`/`to`. |

**Ejemplos**

```http
GET /api/irmc/series                               # serie completa (desde 2021)
GET /api/irmc/series?last=6                        # últimos 6 meses
GET /api/irmc/series?from=2024-01&to=2024-12       # año 2024 completo
GET /api/irmc/series?from=2024-01&last=12          # los primeros 12 desde 2024-01
```

### Respuesta

```json
{
  "range": { "from": "2026-01", "to": "2026-06" },
  "count": 6,
  "items": [
    {
      "period": { "year": 2026, "month": 1, "monthName": "Enero", "monthLabel": "enero de 2026", "key": "2026-01" },
      "irmc": { "value": 0.75, "valueFormatted": "0,75", "level": "alto", "levelLabel": "Alto", "color": "#e23b3b" },
      "totals": { "events": 17, "people": 56, "excludedEvents": 0 },
      "byType": [ /* mismo shape que en el endpoint mensual */ ]
    }
  ]
}
```

---

## Errores

Todas las respuestas de error siguen este esquema:

```json
{ "error": "Mensaje legible", "...": "campo adicional opcional" }
```

| HTTP | Cuándo |
|---|---|
| `400` | Parámetros inválidos (`/api/irmc/abc/13`). Incluye `usage`. |
| `404` | Periodo fuera del rango válido (antes de 2021 o futuro), o no hay eventos clasificables ese mes. Incluye `validRange` o `error`. |

---

## Notas metodológicas (relevantes para los datos)

- **Origen único**: Google Sheets, pestaña `Todos los eventos`. ID `1rb96kgAuMVclENWvoZTXtXfN1pqWYdT8EifWkprBMMQ`. Una cuenta de servicio con acceso de lectura debe estar compartida en el documento.
- **Rango temporal**: solo se consideran eventos desde **2021-01** y hasta el **último día del mes en curso** (los meses futuros cargados en la hoja se descartan).
- **Tipos clasificados**: cada evento se mapea a una severidad fija (baja=1, media=2, alta=3). Eventos con tipo vacío, "sin información" o con un valor compuesto (p. ej. `"detención; deportación"`) **se excluyen del cálculo** y se reportan en `excluded.events` para transparencia.
- **IRMC**: es la severidad promedio (ponderada por frecuencia) de los eventos clasificados del mes, dividida entre 3 para normalizarla en `[0, 1]`. Por construcción, el índice mide **composición de gravedad**, no volumen — agregar eventos puede subir o bajar el valor según su severidad relativa al promedio.

---

## Versionado y estabilidad

- Esquema considerado estable; cualquier cambio incompatible se anunciará y, si aplica, se versionará la ruta (`/api/v2/...`).
- Los campos pueden recibir **adiciones retro-compatibles** sin previo aviso.
