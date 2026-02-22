import { describe, it, expect } from 'vitest';
import { DURATIONS } from './types';

describe('DURATIONS', () => {
	it('exit duration is a positive number', () => {
		expect(DURATIONS.exit).toBeGreaterThan(0);
	});

	it('draw duration is a positive number', () => {
		expect(DURATIONS.draw).toBeGreaterThan(0);
	});

	it('draw duration is longer than exit duration', () => {
		expect(DURATIONS.draw).toBeGreaterThan(DURATIONS.exit);
	});
});
