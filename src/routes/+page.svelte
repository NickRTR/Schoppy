<script>
	import { flip } from "svelte/animate";
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabase";
	import { getProducts } from "$lib/api";
	import { products } from "$lib/products";
	import { toast } from "svelte-french-toast";
	import { getCategory } from "$lib/api";
	import { _ } from "svelte-i18n";

	import ProductCard from "$lib/components/ProductCard.svelte";
	import autoselect from "svelte-autoselect";

	export let data;

	onMount(() => {
		$products = data.products;

		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				getProducts(data.session.user.id);
			}
		});
	});

	let input = "";

	async function addProduct() {
		input = input.trim();
		if (input === "") return;

		for (let product of $products) {
			if (product.title === input) {
				if (product.checked) {
					await supabase
						.from("products")
						.update({ checked: false, amount: 1, unit: "pcs" })
						.eq("id", product.id);
					toast.success($_("pages.home.added", { values: { product: product.title } }));
				} else {
					toast($_("pages.home.alreadyAdded"), { icon: "👍" });
				}
				input = "";
				await getProducts(data.session.user.id);
				return;
			}
		}

		const category = await getCategory(input);

		await supabase
			.from("products")
			.insert([{ title: input, uuid: data.session.user.id, category }]);
		toast.success($_("pages.home.added", { values: { product: input } }));
		await getProducts(data.session.user.id);
		input = "";
	}

	let searchTimeout;
	async function search() {
		clearTimeout(searchTimeout);

		if (input === "") {
			$products = data.products;
			return;
		}
		
		searchTimeout = setTimeout(async () => {
			const { data: res, error } = await supabase
				.from("products")
				.select(`*, categories(category)`)
				.eq("uuid", data.session.user.id)
				.ilike("title", "%" + input + "%");
			if (error) toast.error(error.message);
			else $products = res;
		}, 400);
	}
</script>

<body>
	<form>
		<input type="text" bind:value={input} on:input={search} use:autoselect />
		<button type="submit" on:click={addProduct}>{$_("pages.home.add")}</button>
	</form>

	<div class="products">
		{#each $products as product (product.id)}
			<div animate:flip={{ duration: 1000 }} in:fade|local out:fly|local={{ x: 100 }}>
				{#if !product.checked}
					<ProductCard {product} />
				{/if}
			</div>
		{/each}
	</div>

	{#if $products.filter((product) => product.checked).length > 0}
		<div class="checkedProducts">
			<p class="divider"><span>{$_("pages.home.divider")}</span></p>
			{#each $products as product (product.id)}
				<div in:fade|local out:fly|local={{ x: 100 }}>
					{#if product.checked}
						<ProductCard {product} on:toggle={() => { input = ""; }} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</body>

<style>
	body {
		padding-bottom: 0.5rem;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
	}

	input {
		width: 55%;
		padding: 0.25rem 0.5rem;
		font-size: 1.25rem;
		border-radius: 0.75rem;
		border: 3px solid var(--text);
		background-color: var(--background);
		outline: none;
	}

	input:hover,
	input:focus {
		border-color: var(--accent);
	}

	input::placeholder {
		font-weight: normal;
	}

	button {
		height: 2.2rem;
	}

	.divider {
		text-align: center;
		border-bottom: 5px solid var(--accent);
		border-top: 5px solid var(--accent);
		border-radius: 0.5rem;
		line-height: 0;
		margin: 1rem 0.7rem;
	}

	.divider span {
		background-color: var(--background);
		padding: 0 7px;
	}

	.checkedProducts div {
		filter: opacity(80%);
	}
</style>
