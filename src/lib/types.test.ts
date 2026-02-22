import { describe, it, expect } from 'vitest';
import { DURATIONS } from './types';

describe('DURATIONS', () => {
	it('exit duration is a positive number', () => {
		expect(DURATIONS.exit).toBeGreaterThan(0);
	});
});
