<script lang="ts">
	type CardState = 'idle' | 'drawing' | 'revealed' | 'exiting';

	let {
		strategy = '',
		state = 'idle' as CardState,
		onDraw = () => {}
	}: {
		strategy: string;
		state: CardState;
		onDraw: () => void;
	} = $props();
</script>

<div class="card-container">
	{#if state === 'idle'}
		<button class="deck" onclick={onDraw} aria-label="Draw a card">
			<div class="deck-stack">
				<div class="deck-card deck-card-3"></div>
				<div class="deck-card deck-card-2"></div>
				<div class="deck-card deck-card-1">
					<span class="deck-symbol">&#10038;</span>
				</div>
			</div>
			<p class="deck-hint">Draw a card</p>
		</button>
	{:else if state === 'drawing'}
		<div class="card card-drawing" aria-live="polite">
			<div class="card-inner">
				<span class="card-symbol">&#10038;</span>
			</div>
		</div>
	{:else if state === 'revealed'}
		<div class="card card-revealed" aria-live="polite">
			<div class="card-inner">
				<p class="card-text">{strategy}</p>
			</div>
			<button class="draw-again" onclick={onDraw} aria-label="Draw another card">
				Draw again
			</button>
		</div>
	{:else if state === 'exiting'}
		<div class="card card-exiting" aria-hidden="true">
			<div class="card-inner">
				<p class="card-text">{strategy}</p>
			</div>
		</div>
	{/if}
</div>

<style>
	.card-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 420px;
		position: relative;
	}

	/* --- Deck (idle state) --- */
	.deck {
		position: relative;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 28px;
	}

	.deck:hover .deck-card-1 {
		transform: translateY(-4px) rotate(-0.5deg);
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
	}

	.deck:hover .deck-card-2 {
		transform: translate(3px, 2px) rotate(2.5deg);
	}

	.deck:hover .deck-card-3 {
		transform: translate(-3px, 4px) rotate(-3deg);
	}

	.deck:active .deck-card-1 {
		transform: translateY(-2px) rotate(-0.5deg) scale(0.98);
		transition-duration: 0.1s;
	}

	.deck-stack {
		position: relative;
		width: 280px;
		height: 380px;
	}

	.deck-card {
		position: absolute;
		inset: 0;
		background: var(--color-surface);
		border-radius: 12px;
		transition: transform 0.5s var(--ease-out-expo), box-shadow 0.5s var(--ease-out-expo);
	}

	.deck-card-3 {
		transform: translate(-2px, 4px) rotate(-2deg);
		opacity: 0.4;
	}

	.deck-card-2 {
		transform: translate(2px, 2px) rotate(1.5deg);
		opacity: 0.7;
	}

	.deck-card-1 {
		transform: translateY(0);
		box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.deck-symbol {
		font-size: 3rem;
		color: var(--color-text-light);
		opacity: 0.4;
	}

	.deck-hint {
		font-size: 0.9rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-light);
		opacity: 0;
		animation: hint-fade-in 1s 0.5s var(--ease-out-expo) forwards;
	}

	/* --- Card (shared) --- */
	.card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 28px;
	}

	.card-inner {
		width: 280px;
		height: 380px;
		background: var(--color-surface);
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 36px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
	}

	.card-symbol {
		font-size: 3rem;
		color: var(--color-text-light);
		animation: symbol-pulse 1.2s var(--ease-in-out) infinite;
	}

	.card-text {
		font-family: var(--font-serif);
		font-size: 1.5rem;
		line-height: 1.45;
		color: var(--color-text);
		text-align: center;
		font-weight: 400;
		letter-spacing: -0.01em;
	}

	/* --- Drawing animation --- */
	.card-drawing {
		animation: card-lift 0.6s var(--ease-out-expo) forwards;
	}

	.card-drawing .card-inner {
		animation: card-float 2s var(--ease-in-out) infinite 0.6s;
	}

	/* --- Revealed animation --- */
	.card-revealed .card-inner {
		animation: card-reveal 0.8s var(--ease-out-back) forwards;
	}

	.card-revealed .card-text {
		opacity: 0;
		animation: text-reveal 0.6s 0.3s var(--ease-out-expo) forwards;
	}

	/* --- Exiting animation --- */
	.card-exiting {
		animation: card-exit 0.5s var(--ease-in-out) forwards;
	}

	/* --- Draw again button --- */
	.draw-again {
		font-size: 0.9rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-light);
		padding: 8px 16px;
		border-radius: 6px;
		transition: color 0.3s ease, background 0.3s ease;
		opacity: 0;
		animation: hint-fade-in 0.6s 0.8s var(--ease-out-expo) forwards;
	}

	.draw-again:hover {
		color: var(--color-surface);
		background: rgba(255, 255, 255, 0.08);
	}

	/* --- Keyframes --- */
	@keyframes hint-fade-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes card-lift {
		0% {
			opacity: 0;
			transform: translateY(20px) scale(0.95) rotate(-1deg);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1) rotate(0deg);
		}
	}

	@keyframes card-float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	@keyframes card-reveal {
		0% {
			transform: scale(0.96) rotateY(8deg);
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
		}
		60% {
			transform: scale(1.02) rotateY(-2deg);
		}
		100% {
			transform: scale(1) rotateY(0deg);
			box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
		}
	}

	@keyframes text-reveal {
		from {
			opacity: 0;
			transform: translateY(10px);
			filter: blur(4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	@keyframes card-exit {
		0% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		100% {
			opacity: 0;
			transform: translateY(-30px) scale(0.92);
		}
	}

	@keyframes symbol-pulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(1.05);
		}
	}

	/* --- Responsive --- */
	@media (max-width: 400px) {
		.deck-stack,
		.card-inner {
			width: 240px;
			height: 330px;
		}

		.card-text {
			font-size: 1.3rem;
		}
	}
</style>
