import { describe, it, expect } from 'vitest';
import {
	classify,
	computeMonthlyIrmc,
	labelForType,
	normalizeType,
	parseEvents,
	resolveTypes,
	SEVERITY,
	severityOf,
	TYPE_LABELS,
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

	it('aplica el repesado de la metodología actualizada', () => {
		// Tipos que ya existían pero cambiaron de peso.
		expect(severityOf('rescate')).toBe(3); // antes 2
		expect(severityOf('secuestro')).toBe(3); // antes 2
		expect(severityOf('intercepción')).toBe(1); // antes 2
		expect(severityOf('deportación')).toBe(2); // antes 1
	});

	it('asigna severidad a las categorías nuevas', () => {
		// Alta (3)
		expect(severityOf('trata de personas')).toBe(3);
		expect(severityOf('violencia sexual')).toBe(3);
		// Media (2)
		expect(severityOf('condiciones de detención')).toBe(2);
		expect(severityOf('vulneración de la integridad')).toBe(2);
		// Baja (1)
		expect(severityOf('autodeportación')).toBe(1);
		expect(severityOf('asentamiento')).toBe(1);
		expect(severityOf('conflictos de integración')).toBe(1);
		expect(severityOf('desamparo institucional')).toBe(1);
	});
});

describe('resolveTypes (eventos compuestos)', () => {
	it('reconoce ; , y salto de línea como separadores', () => {
		expect(resolveTypes('muerte; desaparición').map((t) => t.type)).toEqual([
			'muerte',
			'desaparicion'
		]);
		expect(resolveTypes('detención, muerte').map((t) => t.s)).toEqual([2, 3]);
		expect(resolveTypes('desaparición\nrescate').map((t) => t.type)).toEqual([
			'desaparicion',
			'rescate'
		]);
	});

	it('ignora sub-tipos no mapeados y deduplica', () => {
		expect(resolveTypes('muerte; foo').map((t) => t.type)).toEqual(['muerte']);
		expect(resolveTypes('muerte; muerte').map((t) => t.type)).toEqual(['muerte']);
		expect(resolveTypes('foo; bar')).toEqual([]);
		expect(resolveTypes('')).toEqual([]);
		expect(resolveTypes(null)).toEqual([]);
	});

	it('severityOf de un compuesto es el máximo de sus tipos', () => {
		expect(severityOf('muerte; desaparición')).toBe(3);
		expect(severityOf('detención, muerte')).toBe(3);
		expect(severityOf('detención; deportación')).toBe(2);
		expect(severityOf('foo; bar')).toBeNull();
	});
});

describe('labelForType', () => {
	it('devuelve la etiqueta canónica con acentos', () => {
		expect(labelForType('desaparicion')).toBe('Desaparición');
		expect(labelForType('muerte')).toBe('Muerte');
		expect(labelForType('trata de personas')).toBe('Trata de personas');
		expect(labelForType('vulneracion de la integridad')).toBe('Vulneración de la integridad');
	});

	it('capitaliza como respaldo si el tipo no está mapeado', () => {
		expect(labelForType('foo')).toBe('Foo');
	});

	it('cubre todos los tipos de SEVERITY (sin quedar sin etiqueta canónica)', () => {
		for (const key of Object.keys(SEVERITY)) {
			expect(TYPE_LABELS[key], `falta etiqueta para "${key}"`).toBeDefined();
		}
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

describe('computeMonthlyIrmc (categorías nuevas)', () => {
	const d = (day: number) => new Date(Date.UTC(2026, 1, day, 12));

	it('integra los tipos nuevos en las tres severidades', () => {
		// 1 violencia sexual (S=3), 1 vulneración de la integridad (S=2),
		// 1 asentamiento (S=1). N=3, cada fᵢ=1/3.
		// IRMC bruto = 1/3·3 + 1/3·2 + 1/3·1 = 2 ; normalizado = 2/3 ≈ 0.667 -> alto.
		const events: MigrationEvent[] = [
			makeEvent(d(1), 'violencia sexual'),
			makeEvent(d(2), 'vulneración de la integridad'),
			makeEvent(d(3), 'asentamiento')
		];
		const m = computeMonthlyIrmc(events)[0];
		expect(m.n).toBe(3);
		expect(m.excludedCount).toBe(0);
		expect(m.irmcBruto).toBeCloseTo(2, 5);
		expect(m.irmc).toBeCloseTo(2 / 3, 5);
		expect(m.classification.level).toBe('alto');
	});
});

describe('computeMonthlyIrmc (eventos compuestos)', () => {
	const d = (day: number) => new Date(Date.UTC(2026, 2, day, 12));

	it('un incidente compuesto cuenta en cada tipo (equivale a filas separadas)', () => {
		// Un mes con «muerte; desaparición» + «detención» debe dar exactamente lo
		// mismo que tener esas filas ya separadas: muerte + desaparición + detención.
		const compound = computeMonthlyIrmc([
			makeEvent(d(1), 'muerte; desaparición'),
			makeEvent(d(2), 'detención')
		])[0];
		const separated = computeMonthlyIrmc([
			makeEvent(d(1), 'muerte'),
			makeEvent(d(1), 'desaparición'),
			makeEvent(d(2), 'detención')
		])[0];

		expect(compound.n).toBe(3); // 2 del compuesto + 1 detención
		expect(compound.excludedCount).toBe(0);
		expect(compound.n).toBe(separated.n);
		expect(compound.irmcBruto).toBeCloseTo(separated.irmcBruto, 10);
		expect(compound.irmc).toBeCloseTo(separated.irmc, 10);
	});

	it('excluye sólo los incidentes sin ningún tipo reconocido', () => {
		const m = computeMonthlyIrmc([
			makeEvent(d(1), 'muerte; desaparición'), // 2 ocurrencias
			makeEvent(d(2), 'sin información') // excluido
		])[0];
		expect(m.n).toBe(2);
		expect(m.excludedCount).toBe(1);
		// bruto = 1/2·3 + 1/2·3 = 3 ; irmc = 1 -> extremo
		expect(m.irmc).toBeCloseTo(1, 5);
		expect(m.classification.level).toBe('extremo');
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
