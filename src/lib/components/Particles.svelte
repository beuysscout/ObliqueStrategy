<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null;
	let animationId: number;

	interface Particle {
		x: number;
		y: number;
		size: number;
		speed: number;
		opacity: number;
		drift: number;
	}

	let particles: Particle[] = [];

	function createParticles(width: number, height: number) {
		const count = Math.floor((width * height) / 25000);
		particles = Array.from({ length: count }, () => ({
			x: Math.random() * width,
			y: Math.random() * height,
			size: Math.random() * 1.5 + 0.5,
			speed: Math.random() * 0.15 + 0.05,
			opacity: Math.random() * 0.3 + 0.05,
			drift: (Math.random() - 0.5) * 0.3
		}));
	}

	function animate() {
		if (!ctx || !canvas) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (const p of particles) {
			p.y -= p.speed;
			p.x += p.drift;

			if (p.y < -10) {
				p.y = canvas.height + 10;
				p.x = Math.random() * canvas.width;
			}
			if (p.x < -10) p.x = canvas.width + 10;
			if (p.x > canvas.width + 10) p.x = -10;

			ctx.beginPath();
			ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
			ctx.fillStyle = `rgba(180, 170, 155, ${p.opacity})`;
			ctx.fill();
		}

		animationId = requestAnimationFrame(animate);
	}

	function resize() {
		if (!canvas) return;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		createParticles(canvas.width, canvas.height);
	}

	onMount(() => {
		ctx = canvas.getContext('2d');
		resize();
		animate();

		window.addEventListener('resize', resize);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', resize);
		};
	});
</script>

<canvas bind:this={canvas} class="particles"></canvas>

<style>
	.particles {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
	}
</style>
