<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Particles from '$lib/components/Particles.svelte';
	import { drawRandomStrategy } from '$lib/strategies';
	import { DURATIONS, type CardState } from '$lib/types';

	let cardState: CardState = $state('idle');
	let currentStrategy = $state('');
	let drawCount = $state(0);

	function revealAfterDraw() {
		setTimeout(() => {
			cardState = 'revealed';
		}, DURATIONS.draw);
	}

	function handleDraw() {
		if (cardState === 'drawing') return;

		if (cardState === 'revealed') {
			cardState = 'exiting';
			setTimeout(() => {
				currentStrategy = drawRandomStrategy(currentStrategy);
				drawCount++;
				cardState = 'drawing';
				revealAfterDraw();
			}, DURATIONS.exit);
		} else {
			currentStrategy = drawRandomStrategy();
			drawCount++;
			cardState = 'drawing';
			revealAfterDraw();
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) return;
		if (e.code === 'Space' || e.code === 'Enter') {
			e.preventDefault();
			handleDraw();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<Particles />

<main class="app">
	<header class="header" class:faded={cardState === 'revealed'}>
		<h1 class="title">Oblique Strategies</h1>
		<p class="subtitle">Over one hundred worthwhile dilemmas</p>
	</header>

	<section class="stage">
		<Card strategy={currentStrategy} state={cardState} onDraw={handleDraw} />
	</section>

	<footer class="footer" class:faded={cardState === 'revealed'}>
		{#if drawCount > 0}
			<p class="counter">{drawCount} {drawCount === 1 ? 'card' : 'cards'} drawn</p>
		{:else}
			<p class="counter">Press space or click to draw</p>
		{/if}
	</footer>
</main>

<style>
	.app {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		height: 100dvh;
		padding: 40px 24px;
		gap: 0;
	}

	.header {
		text-align: center;
		transition: opacity 0.8s var(--ease-out-expo);
	}

	.header.faded {
		opacity: 0.3;
	}

	.title {
		font-family: var(--font-serif);
		font-size: 1.1rem;
		font-weight: 400;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--color-text-light);
	}

	.subtitle {
		font-size: 0.8rem;
		font-style: italic;
		color: var(--color-text-light);
		opacity: 0.5;
		margin-top: 6px;
		letter-spacing: 0.05em;
	}

	.stage {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.footer {
		text-align: center;
		transition: opacity 0.8s var(--ease-out-expo);
	}

	.footer.faded {
		opacity: 0.3;
	}

	.counter {
		font-size: 0.75rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-text-light);
		opacity: 0.5;
	}
</style>
