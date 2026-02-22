<script lang="ts">
	import TextGenerate from './TextGenerate.svelte';

	type CardState = 'idle' | 'revealed' | 'exiting';

	let {
		strategy = '',
		state = 'idle' as CardState
	}: {
		strategy: string;
		state: CardState;
	} = $props();
</script>

<div class="stage">
	{#if state === 'revealed'}
		<div class="revealed" aria-live="polite">
			<p class="strategy-text">
				<TextGenerate text={strategy} duration={0.4} />
			</p>
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
