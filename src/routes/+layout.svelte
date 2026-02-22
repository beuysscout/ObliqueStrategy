<script lang="ts">
	import '$lib/app.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Oblique Strategies — Break through creative friction</title>
	<meta name="description" content="A creative prompt experience inspired by Brian Eno and Peter Schmidt's Oblique Strategies. Draw a card, break through creative blocks." />
	<meta name="theme-color" content="#0a0a0a" />
</svelte:head>

{@render children()}
