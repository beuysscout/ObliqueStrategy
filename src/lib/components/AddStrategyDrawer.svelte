<script lang="ts">
	import { Trash2 } from 'lucide-svelte';

	export type CustomStrategy = { text: string; author: string; year: string };

	export let open = false;
	export let onClose: () => void = () => {};
	export let customStrategies: CustomStrategy[] = [];
	export let onUpdate: (strategies: CustomStrategy[]) => void = () => {};

	let text = '';
	let author = '';
	let error = '';

	function add() {
		const trimmedText = text.trim();
		const trimmedAuthor = author.trim();
		if (!trimmedText) {
			error = 'Write a strategy first.';
			return;
		}
		if (!trimmedAuthor) {
			error = 'Add your name.';
			return;
		}
		if (customStrategies.some((s) => s.text === trimmedText)) {
			error = 'That one already exists.';
			return;
		}
		onUpdate([...customStrategies, { text: trimmedText, author: trimmedAuthor, year: String(new Date().getFullYear()) }]);
		text = '';
		author = '';
		error = '';
	}

	function remove(strategy: CustomStrategy) {
		onUpdate(customStrategies.filter((s) => s !== strategy));
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			add();
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="backdrop" class:visible={open} on:click={onClose}></div>

<aside class="drawer" class:open>
	<button class="close-btn" on:click={onClose} aria-label="Close">✕</button>

	<div class="content">
		<h2 class="heading">Your<br />Strategies</h2>
		<p class="description">Add your own prompts to the draw pool.</p>

		<div class="form">
			<input
				class="input"
				type="text"
				placeholder="Write a strategy…"
				bind:value={text}
				on:keydown={handleKeydown}
			/>
			<input
				class="input"
				type="text"
				placeholder="Your name"
				bind:value={author}
				on:keydown={handleKeydown}
			/>
			<button class="add-btn" on:click={add}>Add</button>
		</div>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		{#if customStrategies.length > 0}
			<ul class="list">
				{#each customStrategies as strategy}
					<li class="list-item">
						<div class="list-body">
							<span class="list-text">{strategy.text}</span>
							<span class="list-meta">{strategy.author}, {strategy.year}</span>
						</div>
						<button
							class="delete-btn"
							on:click={() => remove(strategy)}
							aria-label="Remove strategy"
						>
							<Trash2 size={14} strokeWidth={1.5} />
						</button>
					</li>
				{/each}
			</ul>
		{:else}
			<p class="empty">Nothing added yet.</p>
		{/if}
	</div>
</aside>

<style>
	.backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0);
		z-index: 20;
		pointer-events: none;
		transition: background 0.4s ease;
	}

	.backdrop.visible {
		background: rgba(0, 0, 0, 0.5);
		pointer-events: all;
	}

	.drawer {
		position: fixed;
		z-index: 30;
		background: rgba(10, 10, 10, 0.97);
		border: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		overflow-y: auto;
		transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* Desktop: slide in from left */
	@media (min-width: 640px) {
		.drawer {
			top: 0;
			left: 0;
			bottom: 0;
			width: min(420px, 90vw);
			border-right: 1px solid rgba(255, 255, 255, 0.08);
			border-top: none;
			border-left: none;
			border-bottom: none;
			transform: translateX(-100%);
		}

		.drawer.open {
			transform: translateX(0);
		}
	}

	/* Mobile: slide in from bottom */
	@media (max-width: 639px) {
		.drawer {
			left: 0;
			right: 0;
			bottom: 0;
			max-height: 85dvh;
			border-radius: 20px 20px 0 0;
			border-top: 1px solid rgba(255, 255, 255, 0.08);
			border-left: none;
			border-right: none;
			border-bottom: none;
			transform: translateY(100%);
		}

		.drawer.open {
			transform: translateY(0);
		}
	}

	.close-btn {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.4);
		font-size: 0.85rem;
		border-radius: 50%;
		transition: color 0.2s ease, background 0.2s ease;
	}

	.close-btn:hover {
		color: rgba(255, 255, 255, 0.9);
		background: rgba(255, 255, 255, 0.08);
	}

	.content {
		padding: 56px 36px 48px;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.heading {
		font-family: var(--font-sans);
		font-size: 2rem;
		font-weight: 900;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--color-text-light);
		margin-bottom: 4px;
	}

	.description {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.4);
		margin-top: -8px;
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-top: 4px;
	}

	.input {
		width: 100%;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		padding: 10px 14px;
		font-family: var(--font-sans);
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.9);
		outline: none;
		transition: border-color 0.2s ease;
	}

	.input::placeholder {
		color: rgba(255, 255, 255, 0.25);
	}

	.input:focus {
		border-color: rgba(255, 255, 255, 0.3);
	}

	.add-btn {
		padding: 10px 18px;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.12);
		border-radius: 8px;
		font-family: var(--font-sans);
		font-size: 0.875rem;
		font-weight: 600;
		color: rgba(255, 255, 255, 0.8);
		transition: background 0.2s ease, color 0.2s ease;
		align-self: flex-end;
		padding: 10px 24px;
	}

	.add-btn:hover {
		background: rgba(255, 255, 255, 0.18);
		color: rgba(255, 255, 255, 1);
	}

	.error {
		font-size: 0.8rem;
		color: rgba(255, 120, 120, 0.8);
		margin-top: -8px;
	}

	.list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 4px;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		padding-top: 16px;
	}

	.list-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 8px;
		transition: background 0.15s ease;
	}

	.list-item:hover {
		background: rgba(255, 255, 255, 0.04);
	}

	.list-body {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}

	.list-text {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.65);
		line-height: 1.4;
	}

	.list-meta {
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.3);
		letter-spacing: 0.03em;
	}

	.delete-btn {
		flex-shrink: 0;
		color: rgba(255, 255, 255, 0.2);
		transition: color 0.2s ease;
		display: flex;
		align-items: center;
	}

	.delete-btn:hover {
		color: rgba(255, 100, 100, 0.8);
	}

	.empty {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.2);
		font-style: italic;
		padding-top: 8px;
	}
</style>
