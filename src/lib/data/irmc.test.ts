import { describe, it, expect } from 'vitest';
import {
	classify,
	computeMonthlyIrmc,
	normalizeType,
	parseEvents,
	severityOf,
	type MigrationEvent
} from './irmc';

const makeEvent = (date: Date, eventType: string): MigrationEvent => ({
	id: null,
	date,
	name: null,
	description: null,
	eventType,
	migrationType: null,
	country: null,
	location: null,
	coordenates: null,
	names: null,
	personsNo: 0,
	womenNo: 0,
	menNo: 0,
	childrenNo: 0,
	deaths: 0,
	missingsNo: 0,
	links: null
});

describe('normalizeType / severityOf', () => {
	it('quita acentos y mayúsculas', () => {
		expect(normalizeType('  Detención ')).toBe('detencion');
		expect(severityOf('Detención')).toBe(2);
		expect(severityOf('MUERTE')).toBe(3);
		expect(severityOf('Repatriación')).toBe(1);
	});

	it('devuelve null para tipos no mapeados', () => {
		expect(severityOf('sin información')).toBeNull();
		expect(severityOf('')).toBeNull();
		expect(severityOf(null)).toBeNull();
	});
});

describe('classify', () => {
	it('aplica los rangos fijos de la propuesta', () => {
		expect(classify(0.1).level).toBe('bajo');
		expect(classify(0.25).level).toBe('bajo');
		expect(classify(0.4).level).toBe('moderado');
		expect(classify(0.6).level).toBe('alto');
		expect(classify(0.9).level).toBe('extremo');
	});
});

describe('computeMonthlyIrmc (ejemplo del documento)', () => {
	// 8 detenciones (S=2), 5 repatriaciones (S=1), 2 muertes (S=3) en un mismo mes.
	const d = (day: number) => new Date(Date.UTC(2026, 0, day, 12));
	const events: MigrationEvent[] = [
		...Array.from({ length: 8 }, (_, i) => makeEvent(d(i + 1), 'detención')),
		...Array.from({ length: 5 }, (_, i) => makeEvent(d(i + 1), 'repatriación')),
		...Array.from({ length: 2 }, (_, i) => makeEvent(d(i + 1), 'muerte'))
	];

	it('IRMC bruto = 1.8, normalizado = 0.60, nivel Alto', () => {
		const series = computeMonthlyIrmc(events);
		expect(series).toHaveLength(1);
		const m = series[0];
		expect(m.n).toBe(15);
		expect(m.irmcBruto).toBeCloseTo(1.8, 5);
		expect(m.irmc).toBeCloseTo(0.6, 5);
		expect(m.classification.level).toBe('alto');
	});

	it('excluye eventos sin tipo clasificable del conteo', () => {
		const withNoise = [...events, makeEvent(d(9), 'sin información'), makeEvent(d(10), '')];
		const m = computeMonthlyIrmc(withNoise)[0];
		expect(m.n).toBe(15);
		expect(m.excludedCount).toBe(2);
		expect(m.irmc).toBeCloseTo(0.6, 5);
	});
});

describe('parseEvents', () => {
	it('parsea filas crudas y descarta fechas inválidas', () => {
		const rows = [
			['1', '15/01/2026', 'Evento A', 'desc', 'muerte', '', 'Cuba', '', '23,-82', '', '3'],
			['2', 'fecha-mala', 'Evento B', '', 'rescate']
		];
		const events = parseEvents(rows);
		expect(events).toHaveLength(1);
		expect(events[0].eventType).toBe('muerte');
		expect(events[0].personsNo).toBe(3);
	});
});
