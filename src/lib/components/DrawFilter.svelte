<script lang="ts">
	export type FilterMode = 'all' | 'original' | 'community';

	export let mode: FilterMode = 'all';
	export let communityCount = 0;
	export let onChange: (mode: FilterMode) => void = () => {};

	const options: { value: FilterMode; label: string }[] = [
		{ value: 'all', label: 'All' },
		{ value: 'original', label: 'Original' },
		{ value: 'community', label: 'Community' }
	];
</script>

<div class="filter">
	{#each options as option}
		<button
			class="pill"
			class:active={mode === option.value}
			class:disabled={option.value === 'community' && communityCount === 0}
			disabled={option.value === 'community' && communityCount === 0}
			on:click={() => onChange(option.value)}
		>
			{option.label}
			{#if option.value === 'community' && communityCount > 0}
				<span class="count">{communityCount}</span>
			{/if}
		</button>
	{/each}
</div>

<style>
	.filter {
		position: fixed;
		bottom: 108px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		gap: 4px;
		background: rgba(12, 12, 12, 0.75);
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 9999px;
		padding: 4px;
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
	}

	.pill {
		font-family: var(--font-sans);
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.35);
		padding: 5px 12px;
		border-radius: 9999px;
		transition: color 0.2s ease, background 0.2s ease;
		display: flex;
		align-items: center;
		gap: 5px;
		white-space: nowrap;
	}

	.pill:hover:not(.disabled) {
		color: rgba(255, 255, 255, 0.7);
	}

	.pill.active {
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 0.9);
	}

	.pill.disabled {
		opacity: 0.25;
		cursor: not-allowed;
	}

	.count {
		font-size: 0.6rem;
		background: rgba(255, 255, 255, 0.15);
		border-radius: 9999px;
		padding: 1px 5px;
		color: rgba(255, 255, 255, 0.6);
	}
</style>
