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
	let mounted = false;

	onMount(() => {
		$products = data.products ?? [];
		mounted = true;
		getProducts(data.user.id);

		const refreshProducts = () => {
			if (document.visibilityState === "visible") {
				getProducts(data.user.id);
			}
		};

		document.addEventListener("visibilitychange", refreshProducts);

		return () => {
			document.removeEventListener("visibilitychange", refreshProducts);
		};
	});

	let input = "";
	// Reactive flags/derivations to minimize repeated work
	$: isIdle = input.length === 0;
	$: normalizedInput = input.trim().toLocaleLowerCase();
	$: allProducts = mounted ? $products : data.products ?? [];
	$: visibleProducts =
		normalizedInput.length < 2
			? allProducts
			: allProducts.filter((product) =>
					product.title.toLocaleLowerCase().includes(normalizedInput)
			  );
	$: uncheckedProducts = visibleProducts.filter((p) => !p.checked);
	$: checkedProducts = visibleProducts.filter((p) => p.checked);

	function clearSearch() {
		input = "";
	}

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
				clearSearch();
				await getProducts(data.user.id);
				return;
			}
		}

		const category = await getCategory(input);

		await supabase.from("products").insert([{ title: input, uuid: data.user.id, category }]);
		toast.success($_("pages.home.added", { values: { product: input } }));
		await getProducts(data.user.id);
		clearSearch();
	}
</script>

<div class="page">
	<form on:submit|preventDefault={addProduct}>
		<input
			bind:value={input}
			use:autoselect
			autocorrect="off"
			autocomplete="off"
			spellcheck="false"
		/>
		<button type="submit">{$_("pages.home.add")}</button>
	</form>

	<div class="products">
		{#each uncheckedProducts as product (product.id)}
			<div
				animate:flip={{ duration: isIdle ? 300 : 0 }}
				in:fade|local={{ duration: isIdle ? 120 : 0 }}
				out:fly|local={{ x: isIdle ? 100 : 0, duration: isIdle ? 120 : 0 }}
			>
				<ProductCard {product} on:toggle={clearSearch} />
			</div>
		{/each}
	</div>

	{#if checkedProducts.length > 0}
		<div class="checkedProducts">
			<p class="divider"><span>{$_("pages.home.divider")}</span></p>
			{#each checkedProducts as product (product.id)}
				<div
					in:fade|local={{ duration: isIdle ? 120 : 0 }}
					out:fly|local={{ x: isIdle ? 100 : 0, duration: isIdle ? 120 : 0 }}
				>
					<ProductCard {product} on:toggle={clearSearch} />
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.page {
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
