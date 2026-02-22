export type CardState = 'idle' | 'revealed' | 'exiting';

export const DURATIONS = {
	/** Card exit animation before re-draw (ms) */
	exit: 300
} as const;
