<script lang="ts">
	import TextGenerate from './TextGenerate.svelte';
	import type { CardState } from '$lib/types';

	let {
		strategy = '',
		state = 'idle' as CardState,
		attribution = null as { author: string; year: string } | null
	}: {
		strategy: string;
		state: CardState;
		attribution?: { author: string; year: string } | null;
	} = $props();
</script>

<div class="stage">
	{#if state === 'revealed'}
		<div class="revealed" aria-live="polite">
			<p class="strategy-text">
				<TextGenerate text={strategy} duration={0.4} />
			</p>
			{#if attribution}
				<p class="attribution">{attribution.author}, {attribution.year}</p>
			{/if}
		</div>
	{:else if state === 'exiting'}
		<div class="exiting" aria-hidden="true">
			<p class="strategy-text exiting-text">{strategy}</p>
		</div>
	{/if}
</div>

<style>
	.stage {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.revealed {
		animation: fade-up 0.4s var(--ease-out-expo) forwards;
	}

	.exiting {
		animation: fade-out 0.3s var(--ease-in-out) forwards;
	}

	.strategy-text {
		font-family: var(--font-sans);
		font-size: clamp(1.6rem, 5vw, 2.4rem);
		line-height: 1.4;
		text-align: center;
		font-weight: 300;
		max-width: 800px;
		width: 90vw;
	}

	.attribution {
		font-size: 8px;
		text-align: center;
		color: rgba(255, 255, 255, 0.35);
		letter-spacing: 0.08em;
		margin-top: 16px;
		text-transform: uppercase;
	}

	.exiting-text {
		background: linear-gradient(to right, #acacac, #363636, #acacac);
		background-size: 200% auto;
		background-clip: text;
		-webkit-background-clip: text;
		color: transparent;
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fade-out {
		from { opacity: 1; }
		to { opacity: 0; }
	}
</style>
