<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Dock from '$lib/components/Dock.svelte';
	import Particles from '$lib/components/Particles.svelte';
	import AboutDrawer from '$lib/components/AboutDrawer.svelte';
	import AddStrategyDrawer, { type CustomStrategy } from '$lib/components/AddStrategyDrawer.svelte';
	import DrawFilter, { type FilterMode } from '$lib/components/DrawFilter.svelte';
	import { drawRandomStrategy } from '$lib/strategies';
	import { DURATIONS, type CardState } from '$lib/types';

	const STORAGE_KEY = 'oblique-custom-strategies';

	let cardState: CardState = $state('idle');
	let currentStrategy = $state('');
	let currentAttribution: { author: string; year: string } | null = $state(null);
	let drawCount = $state(0);
	let aboutOpen = $state(false);
	let addOpen = $state(false);
	let filterMode: FilterMode = $state('all');
	let customStrategies: CustomStrategy[] = $state(
		JSON.parse(typeof localStorage !== 'undefined' ? (localStorage.getItem(STORAGE_KEY) ?? '[]') : '[]')
	);

	function handleCustomUpdate(updated: CustomStrategy[]) {
		customStrategies = updated;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
	}

	function applyDraw(exclude?: string) {
		let drawn: string;
		let match: CustomStrategy | undefined;

		if (filterMode === 'original') {
			drawn = drawRandomStrategy(exclude, []);
			match = undefined;
		} else if (filterMode === 'community') {
			const pool = customStrategies.filter((s) => s.text !== exclude);
			const item = pool.length > 0 ? pool[Math.floor(Math.random() * pool.length)] : customStrategies[0];
			drawn = item.text;
			match = item;
		} else {
			drawn = drawRandomStrategy(exclude, customStrategies.map((s) => s.text));
			match = customStrategies.find((s) => s.text === drawn);
		}

		currentStrategy = drawn;
		currentAttribution = match ? { author: match.author, year: match.year } : null;
		drawCount++;
	}

	function handleDraw() {
		if (cardState === 'revealed') {
			cardState = 'exiting';
			setTimeout(() => {
				applyDraw(currentStrategy);
				cardState = 'revealed';
			}, DURATIONS.exit);
		} else {
			applyDraw();
			cardState = 'revealed';
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
		<Card strategy={currentStrategy} state={cardState} attribution={currentAttribution} />
	</section>

	<footer class="footer" class:faded={cardState === 'revealed'}>
		{#if drawCount > 0}
			<p class="counter">{drawCount} {drawCount === 1 ? 'draw' : 'draws'}</p>
		{/if}
	</footer>
</main>

<DrawFilter mode={filterMode} communityCount={customStrategies.length} onChange={(m) => (filterMode = m)} />
<Dock onDraw={handleDraw} onAbout={() => (aboutOpen = true)} onAdd={() => (addOpen = true)} />
<AboutDrawer open={aboutOpen} onClose={() => (aboutOpen = false)} />
<AddStrategyDrawer
	open={addOpen}
	onClose={() => (addOpen = false)}
	{customStrategies}
	onUpdate={handleCustomUpdate}
/>

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
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 900;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--color-text-light);
	}

	.subtitle {
		font-size: 12px;
		font-style: italic;
		font-weight: 900;
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
		padding-bottom: 80px;
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
