<script lang="ts">
	import { Motion, useSpring, useTransform } from 'svelte-motion';

	export let mouseX: any;
	export let containerX: any;

	let ref: HTMLDivElement;

	const distance = useTransform(
		[mouseX, containerX],
		([mx, cx]: number[]) => {
			if (!ref) return Infinity;
			const bounds = ref.getBoundingClientRect();
			return mx - (bounds.x - cx) - bounds.width / 2;
		}
	);

	const sizeSync = useTransform(distance, [-120, 0, 120], [44, 72, 44]);
	const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });
</script>

<Motion style={{ width: size, height: size }} let:motion>
	<div use:motion bind:this={ref} class="dock-item">
		<slot />
	</div>
</Motion>

<style>
	.dock-item {
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.07);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: background 0.2s ease;
	}

	.dock-item:hover {
		background: rgba(255, 255, 255, 0.13);
	}
</style>
