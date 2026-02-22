import { describe, it, expect } from 'vitest';
import { strategies, drawRandomStrategy } from './strategies';

describe('strategies', () => {
	it('contains at least 100 strategies', () => {
		expect(strategies.length).toBeGreaterThanOrEqual(100);
	});

	it('contains no duplicates', () => {
		const unique = new Set(strategies);
		expect(unique.size).toBe(strategies.length);
	});

	it('contains no empty strings', () => {
		for (const s of strategies) {
			expect(s.trim().length).toBeGreaterThan(0);
		}
	});
});

describe('drawRandomStrategy', () => {
	it('returns a strategy from the list', () => {
		const result = drawRandomStrategy();
		expect(strategies).toContain(result);
	});

	it('excludes the provided strategy', () => {
		const exclude = strategies[0];
		for (let i = 0; i < 50; i++) {
			expect(drawRandomStrategy(exclude)).not.toBe(exclude);
		}
	});

	it('returns a string', () => {
		expect(typeof drawRandomStrategy()).toBe('string');
	});
});
