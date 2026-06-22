/**
 * Índice de Riesgo Migratorio Cubano (IRMC).
 *
 * Implementación de la metodología propuesta por la Fundación 4Metrica:
 * índice compuesto mensual que combina la frecuencia relativa de cada tipo de
 * evento con un peso de severidad fijo, normalizado al intervalo [0–1] y
 * clasificado en cuatro niveles de riesgo.
 *
 * Secciones referidas a la propuesta metodológica:
 *  - 4a: pesos de severidad por tipo de evento (juicio experto).
 *  - 4b: frecuencia relativa mensual  fᵢ = nᵢ / N.
 *  - 4c: integración frecuencia–severidad  Cᵢ = fᵢ × Sᵢ.
 *  - 4d: IRMC bruto = Σ Cᵢ.
 *  - 4e: normalización  IRMC = IRMC bruto / 3.
 *  - 4f: clasificación en bajo / moderado / alto / extremo.
 */

export type Severity = 1 | 2 | 3;

export type RiskLevel = 'bajo' | 'moderado' | 'alto' | 'extremo';

/** Evento ya parseado desde la hoja `Todos los eventos`. */
export interface MigrationEvent {
	id: number | null;
	date: Date | null;
	name: string | null;
	description: string | null;
	eventType: string | null;
	migrationType: string | null;
	country: string | null;
	location: string | null;
	coordenates: string | null;
	names: string | null;
	personsNo: number;
	womenNo: number;
	menNo: number;
	childrenNo: number;
	deaths: number;
	missingsNo: number;
	links: string | null;
}

/**
 * Pesos de severidad por tipo de evento (Tabla 1 de la propuesta).
 * Las claves están normalizadas con `normalizeType`.
 *   Alta (3): daño grave o letal.
 *   Media (2): afectación o riesgo serio a la integridad física.
 *   Baja (1): impactos administrativos sin daño físico.
 */
export const SEVERITY: Record<string, Severity> = {
	// Alta
	muerte: 3,
	muertes: 3,
	desaparicion: 3,
	desapariciones: 3,
	naufragio: 3,
	'hallazgo de cadaver': 3,
	'violencia letal': 3,
	// Media
	rescate: 2,
	rescates: 2,
	secuestro: 2,
	deteneccion: 2, // tolerancia a typo
	detencion: 2,
	detenciones: 2,
	intercepcion: 2,
	intercepciones: 2,
	heridos: 2,
	// Baja
	repatriacion: 1,
	repatriaciones: 1,
	deportacion: 1,
	expulsion: 1,
	devolucion: 1,
	retorno: 1,
	transferencia: 1,
	transferencias: 1,
	traslado: 1,
	traslados: 1,
	llegada: 1,
	llegadas: 1
};

/** Peso máximo de severidad: define el techo teórico del IRMC bruto (sección 4e). */
export const MAX_SEVERITY: Severity = 3;

/**
 * Normaliza el texto del tipo de evento: minúsculas, sin acentos y sin espacios
 * sobrantes, para hacer coincidir variantes con el mapa de severidad.
 */
export function normalizeType(raw: string | null | undefined): string {
	if (!raw) return '';
	return raw
		.toString()
		.trim()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '') // quita acentos (marcas diacríticas combinantes)
		.replace(/\s+/g, ' ');
}

/** Devuelve el peso de severidad de un tipo de evento, o `null` si no está mapeado. */
export function severityOf(eventType: string | null | undefined): Severity | null {
	const key = normalizeType(eventType);
	return SEVERITY[key] ?? null;
}

export interface RiskClassification {
	level: RiskLevel;
	label: string;
	/** Color asociado a la clasificación (sección 4.4 de la propuesta). */
	color: string;
}

/**
 * Clasifica un valor IRMC normalizado [0–1] en uno de los cuatro niveles de
 * riesgo, con rangos fijos (sección 4f) y el color del semáforo (sección 4.4).
 */
export function classify(irmc: number): RiskClassification {
	if (irmc <= 0.25) return { level: 'bajo', label: 'Bajo', color: '#f1f0fb' };
	if (irmc <= 0.5) return { level: 'moderado', label: 'Moderado', color: '#f5c518' };
	if (irmc <= 0.75) return { level: 'alto', label: 'Alto', color: '#e23b3b' };
	return { level: 'extremo', label: 'Extremo', color: '#3b5bdb' };
}

/** Contribución de un tipo de evento al índice del mes (secciones 4b–4c). */
export interface TypeContribution {
	type: string;
	n: number;
	f: number;
	s: Severity;
	c: number;
}

/** Resultado del IRMC para un mes concreto. */
export interface MonthlyIrmc {
	key: string; // 'YYYY-MM'
	year: number;
	month: number; // 1–12
	label: string; // 'MM/YYYY'
	byType: TypeContribution[];
	/** Total de eventos válidos (con severidad conocida) del mes. */
	n: number;
	/** Eventos excluidos del cálculo por tipo vacío / no mapeado. */
	excludedCount: number;
	irmcBruto: number;
	irmc: number;
	classification: RiskClassification;
}

/**
 * Parsea una fecha en formato `DD/MM/YYYY` a un `Date` (UTC, mediodía para
 * evitar desfases por zona horaria). Misma lógica que `section-timeline.svelte`.
 */
export function parseSheetDate(value: string | null | undefined): Date | null {
	if (!value) return null;
	const parts = value.toString().split('/');
	if (parts.length !== 3) return null;
	const [day, month, year] = parts.map((p) => parseInt(p, 10));
	if (!day || !month || !year) return null;
	const d = new Date(Date.UTC(year, month - 1, day, 12));
	return isNaN(d.getTime()) ? null : d;
}

const toNumber = (v: unknown): number => {
	const n = parseFloat((v ?? '').toString().replace(',', '.'));
	return isNaN(n) ? 0 : n;
};

const emptyToNull = (v: unknown): string | null => {
	const s = (v ?? '').toString().trim();
	return s === '' ? null : s;
};

/**
 * Convierte las filas crudas de la hoja `Todos los eventos` en objetos
 * `MigrationEvent`. Los índices de columna coinciden con los usados en
 * `section-timeline.svelte`. Las filas sin fecha válida se descartan.
 */
export function parseEvents(rows: unknown[][] | null | undefined): MigrationEvent[] {
	if (!rows) return [];
	const events: MigrationEvent[] = [];
	for (const value of rows) {
		const date = parseSheetDate(value[1] as string);
		if (!date) continue;
		events.push({
			id: value[0] != null ? parseInt(value[0] as string, 10) : null,
			date,
			name: emptyToNull(value[2]),
			description: emptyToNull(value[3]),
			eventType: emptyToNull(value[4]),
			migrationType: emptyToNull(value[5]),
			country: emptyToNull(value[6]),
			location: emptyToNull(value[7]),
			coordenates: emptyToNull(value[8]),
			names: emptyToNull(value[9]),
			personsNo: toNumber(value[10]),
			womenNo: toNumber(value[11]),
			menNo: toNumber(value[12]),
			childrenNo: toNumber(value[13]),
			deaths: toNumber(value[14]),
			missingsNo: toNumber(value[15]),
			links: emptyToNull(value[19])
		});
	}
	return events;
}

const MONTH_KEY = (d: Date) =>
	`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;

/**
 * Calcula la serie mensual del IRMC a partir de los eventos parseados.
 * Devuelve un arreglo ordenado cronológicamente (un punto por mes con datos).
 *
 * Los eventos sin fecha válida, o cuyo tipo no tiene severidad asignada
 * (incluido «sin información»), se excluyen del cálculo y se contabilizan en
 * `excludedCount` para transparencia.
 */
export function computeMonthlyIrmc(events: MigrationEvent[]): MonthlyIrmc[] {
	// Agrupa por mes.
	const buckets = new Map<string, { year: number; month: number; events: MigrationEvent[] }>();

	for (const ev of events) {
		if (!ev.date || isNaN(ev.date.getTime())) continue;
		const key = MONTH_KEY(ev.date);
		if (!buckets.has(key)) {
			buckets.set(key, {
				year: ev.date.getUTCFullYear(),
				month: ev.date.getUTCMonth() + 1,
				events: []
			});
		}
		buckets.get(key)!.events.push(ev);
	}

	const result: MonthlyIrmc[] = [];

	for (const [key, bucket] of buckets) {
		// Cuenta por tipo solo los eventos con severidad conocida.
		const counts = new Map<string, { n: number; s: Severity }>();
		let n = 0;
		let excludedCount = 0;

		for (const ev of bucket.events) {
			const s = severityOf(ev.eventType);
			if (s === null) {
				excludedCount++;
				continue;
			}
			const type = normalizeType(ev.eventType);
			const entry = counts.get(type) ?? { n: 0, s };
			entry.n += 1;
			counts.set(type, entry);
			n += 1;
		}

		const byType: TypeContribution[] = [];
		let irmcBruto = 0;

		for (const [type, { n: ni, s }] of counts) {
			const f = n > 0 ? ni / n : 0;
			const c = f * s;
			irmcBruto += c;
			byType.push({ type, n: ni, f, s, c });
		}

		byType.sort((a, b) => b.c - a.c);

		const irmc = irmcBruto / MAX_SEVERITY;

		result.push({
			key,
			year: bucket.year,
			month: bucket.month,
			label: `${String(bucket.month).padStart(2, '0')}/${bucket.year}`,
			byType,
			n,
			excludedCount,
			irmcBruto,
			irmc,
			classification: classify(irmc)
		});
	}

	result.sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0));
	return result;
}
