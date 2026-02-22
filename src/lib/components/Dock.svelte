<script lang="ts">
	import { Motion, useMotionValue } from 'svelte-motion';
	import DockItem from './DockItem.svelte';
	import { Shuffle } from 'lucide-svelte';

	export let onDraw: () => void = () => {};

	const mouseX = useMotionValue(Infinity);
	const containerX = useMotionValue(0);

	let containerRef: HTMLDivElement;
</script>

<div class="dock-wrapper">
	<Motion let:motion>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			use:motion
			bind:this={containerRef}
			class="dock"
			on:mouseleave={() => mouseX.set(Infinity)}
			on:mousemove={(e) => {
				const rect = containerRef.getBoundingClientRect();
				mouseX.set(e.clientX - rect.left);
				containerX.set(rect.x);
			}}
		>
			<DockItem {mouseX} {containerX}>
				<button class="dock-btn" on:click={onDraw} aria-label="Draw a strategy">
					<Shuffle size={20} strokeWidth={1.5} />
				</button>
			</DockItem>
		</div>
	</Motion>
</div>

<style>
	.dock-wrapper {
		position: fixed;
		bottom: 28px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.dock {
		display: flex;
		align-items: flex-end;
		gap: 8px;
		background: rgba(12, 12, 12, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 9999px;
		padding: 10px 14px;
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.dock-btn {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.7);
		border-radius: 50%;
		transition: color 0.2s ease;
	}

	.dock-btn:hover {
		color: rgba(255, 255, 255, 1);
	}
</style>
