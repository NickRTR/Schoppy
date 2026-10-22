<script>
	import { Toaster } from "svelte-french-toast";
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";

	import Nav from "$lib/components/Nav.svelte";

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate("supabase:auth");
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Schoppy</title>
</svelte:head>

<body>
	<Toaster />
	<header>
		<h1>Schoppy</h1>
		{#if data.session}
			<Nav />
		{/if}
	</header>
	<main><slot /></main>
</body>

<style>
	* {
		font-family: Arial, Helvetica, sans-serif;
	}

	body {
		max-width: 700px;
		margin: auto;
	}

	header {
		text-align: center;
		padding-block: 1rem;
		color: var(--background);
		background-color: var(--text);
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	header h1 {
		margin: 0;
		color: var(--background);
	}

	main {
		padding-inline: 0.4rem;
	}

	:global(button) {
		background-color: var(--accent);
		color: var(--background);
		font-weight: bold;
		border: 1px solid var(--accent);
		border-radius: 1rem;
		padding: 0.5rem 0.7rem;
		margin-block: 0.5rem;
		outline: none;
		cursor: pointer;
	}

	:global(button:hover, button:focus) {
		border-color: var(--background);
	}

	:global(:root) {
		--background: white;
		--text: black;
		--accent: #0047ff;
	}
</style>
