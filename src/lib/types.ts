export type CardState = 'idle' | 'drawing' | 'revealed' | 'exiting';

export const DURATIONS = {
	/** Card exit animation before re-draw (ms) */
	exit: 450,
	/** Drawing/lift animation before reveal (ms) */
	draw: 800
} as const;
