# Automatización mensual: nota IRMC a Slack

Pipeline para que una herramienta de automatización (Make.com, n8n, Zapier, Pipedream, GitHub Actions + script, etc.) construya y publique en Slack la nota mensual del **Índice de Riesgo Migratorio Cubano (IRMC)** al inicio de cada mes.

## Visión general del flujo

```
┌──────────────┐   1) cron mensual    ┌──────────────────┐
│  Scheduler   ├─────────────────────►│  Compute period   │
│  (día 1, 9h) │                      │  (mes anterior)   │
└──────────────┘                      └────────┬──────────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │  GET /api/irmc/  │
                                      │  {year}/{month}  │
                                      └────────┬──────────┘
                                                │  JSON
                                                ▼
                                      ┌──────────────────┐
                                      │  LLM (prompt)    │
                                      │  → mrkdwn Slack  │
                                      └────────┬──────────┘
                                                │
                                                ▼
                                      ┌──────────────────┐
                                      │  POST Slack       │
                                      │  Incoming Webhook │
                                      └──────────────────┘
```

## 1) Programación

Al **inicio de cada mes** (por ejemplo, día 1 a las 9:00 hora de La Habana, `0 9 1 * *` en cron) la automatización debe:

- Calcular el **mes anterior** (`year`, `month`) — el que acaba de terminar.
- Llamar a `GET https://latravesia.eltoque.com/api/irmc/{year}/{month}`.

> Alternativa más perezosa: usar `GET /api/irmc/latest`, que devuelve el último mes con datos en la hoja. Tiene el riesgo de que si ya se cargaron eventos del mes en curso, devolverá ese mes (incompleto). Para el reporte mensual, **es preferible la ruta explícita** con `year`/`month` del mes anterior.

### Snippet para calcular el mes anterior (JavaScript)

```js
const now = new Date();
let y = now.getUTCFullYear(), m = now.getUTCMonth(); // 0–11 -> mes anterior
if (m === 0) { y -= 1; m = 12; } else { /* m queda 1–12 */ }
const url = `https://latravesia.eltoque.com/api/irmc/${y}/${m}`;
```

## 2) Llamada a la API

```http
GET https://latravesia.eltoque.com/api/irmc/2026/5
Accept: application/json
```

Sin autenticación. CORS abierto. Cache 5 minutos.

Si responde `404` con `"No hay eventos clasificables para ese mes"`, abortar el envío y notificar al equipo editorial (probablemente la hoja no se actualizó a tiempo).

Esquema completo en [`api-irmc.md`](./api-irmc.md).

## 3) Prompt del LLM

Pasarle al modelo el **system prompt** + el **JSON** de respuesta de la API como user message. El modelo devolverá el cuerpo del mensaje listo para Slack (mrkdwn).

### System prompt (copiar/pegar tal cual)

```
Eres el asistente editorial de "La Travesía" (elTOQUE) encargado de redactar la nota mensual del Índice de Riesgo Migratorio Cubano (IRMC) y publicarla en Slack.

Recibes un objeto JSON con todos los datos del mes (esquema documentado en api-irmc.md). Tu única tarea es producir el cuerpo del mensaje de Slack siguiendo la plantilla fija de abajo, sustituyendo las variables por los valores del JSON. NO redactes nada más, ni introducciones, ni interpretaciones causales, ni recomendaciones, ni comparaciones cualitativas entre meses.

REGLAS GENERALES
- Idioma: español. Tono informativo, neutral, periodístico.
- Numeración: usa siempre los formatos del JSON ya preparados para texto:
  * IRMC: usa `irmc.valueFormatted` y `previous.irmc.valueFormatted` (vienen con coma decimal, p. ej. "0,85").
  * Variación de personas: usa `trend.peopleVarPercentFormatted` (ya viene con signo, p. ej. "-75 %" o "+12 %").
  * Direcciones del índice y de personas: usa `trend.irmc` y `trend.people` en pretérito ("aumentó", "disminuyó", "se mantuvo").
- Nivel del IRMC: usa `irmc.levelLabel` (capitalizado, p. ej. "Extremo").
- Mes y año: usa `period.monthLabel` (p. ej. "abril de 2026") salvo donde la plantilla pida el nombre suelto: ahí usa `period.monthName` en minúsculas.
- Mes anterior: usa `previous.period.monthName` en minúsculas (p. ej. "marzo").
- Listas de países y localidades: enumera con comas y "y" antes del último ("A, B, C y D"). Si solo hay uno, no uses enumeración.
- Concordancia: si una cifra es 1, usa singular ("1 evento", "1 persona"); si es N>1, plural.

QUÉ NO HACER (importante)
- No expliques POR QUÉ subió o bajó el índice.
- No atribuyas causas estructurales ni geopolíticas.
- No clasifiques territorios por su rol funcional ("países de tránsito", "destinos", etc.).
- No formules recomendaciones ni juicios.
- No inventes datos: si un campo no está o es null, omite el bloque correspondiente.

FORMATO PARA SLACK (mrkdwn)
- Negrita con asteriscos simples: *texto* (no **texto**).
- Itálica con guiones bajos: _texto_.
- Listas: usa "• " al principio de cada ítem.
- Enlaces: <https://url|texto>.
- Saltos de párrafo: una línea en blanco.

PLANTILLA (sustituye los marcadores {{...}} con los valores del JSON; las líneas con [[si ...]] solo van si la condición se cumple)

*{{TITULAR}}*

El Índice de Riesgo Migratorio Cubano (IRMC) correspondiente a {{period.monthLabel}} se ubicó en *{{irmc.valueFormatted}}*, valor que el informe clasifica como nivel de riesgo *{{irmc.levelLabel}}*. En el período se registraron *{{totals.events}}* {{evento|eventos según totals.events}} que involucraron a *{{totals.people}}* {{persona|personas según totals.people}}.

[[si previous != null]]
Respecto a {{previous.period.monthName en minúsculas}}, el índice {{trend.irmc}} desde {{previous.irmc.valueFormatted}} (rango {{previous.irmc.levelLabel}}). El número total de personas involucradas {{trend.people}} de {{previous.totals.people}} a {{totals.people}} ({{trend.peopleVarPercentFormatted}}), mientras el número de eventos pasó de {{previous.totals.events}} a {{totals.events}}.
[[/si]]

*Composición por tipo de evento*
{{para cada t en byType}}
• *{{t.label}}*: {{t.events}} {{evento|eventos}}, {{t.people}} {{persona|personas}} afectadas.
{{/para}}

[[si demographics.totalIdentified > 0]]
*Composición demográfica*
Entre las personas cuya identificación demográfica fue posible, se registraron {{demographics.men}} {{hombre|hombres}}, {{demographics.women}} {{mujer|mujeres}} y {{demographics.minors}} {{menor|menores}} de edad.
[[/si]]

[[si geography.countries.length > 0]]
*Distribución territorial*
Los registros del mes se distribuyeron en los siguientes países: {{lista de geography.countries[].name}}.

[[si geography.divergentTops == false]]
{{geography.topByEvents.name}} concentró tanto la mayor cantidad de eventos del período ({{geography.topByEvents.events}} {{registro|registros}}) como el mayor número de personas afectadas ({{geography.topByPeople.people}}).
[[si geography.divergentTops == true]]
{{geography.topByEvents.name}} concentró la mayor cantidad de eventos del período, con {{geography.topByEvents.events}} {{registro|registros}}. En términos de personas afectadas, sin embargo, {{geography.topByPeople.name}} reunió la cifra más alta del mes, con {{geography.topByPeople.people}} {{persona|personas}} involucradas.
[[/si]]

[[si geography.locations.length > 0]]
Las localidades específicas mencionadas en los eventos incluyen: {{lista de geography.locations}}.
[[/si]]
[[si geography.deathCountries.length > 0]]
Los registros de muerte se ubicaron en: {{lista de geography.deathCountries}}.
[[/si]]
[[si geography.missingCountries.length > 0]]
Los registros de desaparición se ubicaron en: {{lista de geography.missingCountries}}.
[[/si]]
[[/si]]

_El IRMC mide cada mes la intensidad y la geografía del riesgo que enfrentan las personas cubanas durante su trayecto migratorio. Combina la frecuencia de los eventos registrados con la gravedad del impacto humano de cada uno, y los expresa en un valor entre 0 y 1, clasificado en cuatro rangos: bajo, moderado, alto y extremo. Más en <https://latravesia.eltoque.com/riesgo|/riesgo>._

CÓMO CONSTRUIR EL TITULAR (variable {{TITULAR}})
- Si trend == null (primer mes de la serie): "El riesgo migratorio cubano en {{period.monthLabel}}: nivel {{irmc.levelLabel}}"
- Si trend.irmc == "aumentó": "El riesgo migratorio cubano sube a {{irmc.valueFormatted}} en {{period.monthLabel}}: nivel {{irmc.levelLabel}}"
- Si trend.irmc == "disminuyó": "El riesgo migratorio cubano desciende a {{irmc.valueFormatted}} en {{period.monthLabel}}: nivel {{irmc.levelLabel}}"
- Si trend.irmc == "se mantuvo": "El riesgo migratorio cubano se mantiene en {{irmc.valueFormatted}} en {{period.monthLabel}}: nivel {{irmc.levelLabel}}"

DEVUELVE SOLO EL TEXTO DEL MENSAJE LISTO PARA SLACK. Sin envoltorios JSON, sin comentarios, sin explicaciones de tu proceso.
```

### Mensaje del usuario (al LLM)

Pasa el JSON crudo de la API tal cual:

```
Datos del mes:

{ ... pegar el JSON de /api/irmc/{year}/{month} ... }
```

### Ejemplo de salida esperada (con datos de abril 2026)

```
*El riesgo migratorio cubano sube a 0,85 en abril de 2026: nivel Extremo*

El Índice de Riesgo Migratorio Cubano (IRMC) correspondiente a abril de 2026 se ubicó en *0,85*, valor que el informe clasifica como nivel de riesgo *Extremo*. En el período se registraron *20* eventos que involucraron a *43* personas.

Respecto a marzo, el índice aumentó desde 0,65 (rango Alto). El número total de personas involucradas disminuyó de 175 a 43 (-75 %), mientras el número de eventos pasó de 18 a 20.

*Composición por tipo de evento*
• *Detención*: 9 eventos, 32 personas afectadas.
• *Muerte*: 8 eventos, 8 personas afectadas.
• *Desaparición*: 3 eventos, 3 personas afectadas.

*Composición demográfica*
Entre las personas cuya identificación demográfica fue posible, se registraron 19 hombres, 4 mujeres y 0 menores de edad.

*Distribución territorial*
Los registros del mes se distribuyeron en los siguientes países: México, Estados Unidos, Brasil, Argentina, Panamá, Colombia, Uruguay y Guyana.

México concentró la mayor cantidad de eventos del período, con 9 registros. En términos de personas afectadas, sin embargo, Brasil reunió la cifra más alta del mes, con 20 personas involucradas.

Las localidades específicas mencionadas en los eventos incluyen: Boa Vista, Bogotá, Buenos Aires, Cancún, Condado de Williamson Texas, Georgetown, Hialeah, Miami, Montevideo, Stewart Detention Center, Tabasco, Tapachula, Tocumen y Villahermosa.

Los registros de muerte se ubicaron en: Colombia, Estados Unidos, Guyana, México y Uruguay.
Los registros de desaparición se ubicaron en: Argentina y México.

_El IRMC mide cada mes la intensidad y la geografía del riesgo que enfrentan las personas cubanas durante su trayecto migratorio. Combina la frecuencia de los eventos registrados con la gravedad del impacto humano de cada uno, y los expresa en un valor entre 0 y 1, clasificado en cuatro rangos: bajo, moderado, alto y extremo. Más en <https://latravesia.eltoque.com/riesgo|/riesgo>._
```

## 4) Envío a Slack

Crear un **Incoming Webhook** en el workspace y pegar la URL como secreto en la herramienta de automatización. El payload mínimo:

```http
POST https://hooks.slack.com/services/T.../B.../...
Content-Type: application/json

{
  "text": "<aquí el texto devuelto por el LLM>",
  "unfurl_links": false,
  "unfurl_media": false
}
```

`unfurl_*` en `false` evita que Slack genere previews automáticos cuando aparezca el enlace a `/riesgo`.

### Recomendaciones

- **Canal**: dedicar uno específico, p. ej. `#irmc-mensual`, para que el equipo editorial pueda revisar antes de difundir si así lo deciden.
- **Revisión humana**: aunque la nota es automática, conviene que una persona editora la revise (concordancia gramatical en bloques condicionales, casos límite).
- **Notificación de fallos**: si la llamada a la API falla o devuelve `404`, posteá un mensaje de error en otro canal (`#alertas-bot` p. ej.) en vez de en `#irmc-mensual`.
- **Idempotencia**: incluí en algún metadato (no en el body visible) la combinación `period.key` para detectar dobles publicaciones si el cron se dispara dos veces.

## 5) Datos faltantes y casos límite

| Situación | Cómo manejarlo |
|---|---|
| El mes no tiene datos en la hoja | La API responde `404`. Abortar el envío y avisar a editorial. |
| Primer mes de la serie (no hay `previous`) | El prompt ya omite el párrafo comparativo y usa el titular sin tendencia. |
| `totals.events` muy bajo (p. ej. < 5) | El índice es poco representativo; opcionalmente, agregar una nota *"El bajo número de eventos registrados hace que el índice de este mes sea más sensible a casos individuales."* (la decisión es editorial; no la incluí en el prompt por defecto). |
| `excludedEvents > 0` | No mencionar en la nota pública; es información para editorial — conviene revisar `excluded.events[]` y normalizar el campo "Tipo de evento" en la hoja (p. ej. `"detención; deportación"` debería ser una sola categoría). |
| `topByEvents.name == topByPeople.name` | El prompt usa la rama no-divergente del template automáticamente. |
| `geography.locations` muy largo | Aceptable para Slack; si quisieras truncar, hacelo en la automatización antes de pasar al LLM (`locations.slice(0, 15)`). |
