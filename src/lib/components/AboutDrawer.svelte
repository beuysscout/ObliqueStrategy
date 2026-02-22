<script lang="ts">
	export let open = false;
	export let onClose: () => void = () => {};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="backdrop" class:visible={open} on:click={onClose}></div>

<aside class="drawer" class:open>
	<button class="close-btn" on:click={onClose} aria-label="Close">✕</button>

	<div class="content">
		<h2 class="heading">What are<br />Oblique Strategies?</h2>

		<p class="body">
			Oblique Strategies is a deck of cards created by musician <strong>Brian Eno</strong> and
			artist <strong>Peter Schmidt</strong> in 1975. Each card carries a cryptic instruction,
			constraint, or question — over one hundred of them — designed to help artists break through
			creative deadlocks.
		</p>

		<p class="body">
			When you're stuck, a strategy gives you a lateral nudge. Prompts like
			<em>"Use an old idea"</em> or <em>"What would your closest friend do?"</em> aren't meant to be
			followed literally. They're invitations to shift perspective, to disturb the comfortable grooves
			of habit.
		</p>

		<p class="body">
			Musicians, designers, writers, filmmakers — anyone wrestling with a creative problem — have
			used the cards to challenge assumptions and find unexpected directions.
		</p>

		<p class="body pull">
			Draw a card when you feel stuck.<br />
			Let the prompt disturb your process.<br />
			Follow where it leads.
		</p>
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

	/* Desktop: slide in from right */
	@media (min-width: 640px) {
		.drawer {
			top: 0;
			right: 0;
			bottom: 0;
			width: min(420px, 90vw);
			border-left: 1px solid rgba(255, 255, 255, 0.08);
			border-top: none;
			border-right: none;
			border-bottom: none;
			transform: translateX(100%);
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
			max-height: 80dvh;
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
		margin-bottom: 8px;
	}

	.body {
		font-size: 0.95rem;
		line-height: 1.75;
		color: rgba(255, 255, 255, 0.6);
	}

	.body strong {
		color: rgba(255, 255, 255, 0.9);
		font-weight: 600;
	}

	.body em {
		color: rgba(255, 255, 255, 0.8);
		font-style: italic;
	}

	.pull {
		margin-top: 12px;
		padding-top: 24px;
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		font-style: italic;
		line-height: 2;
		color: rgba(255, 255, 255, 0.45);
	}
</style>
