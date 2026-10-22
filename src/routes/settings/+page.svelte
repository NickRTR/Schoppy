<script>
	import { _, locale, locales } from "svelte-i18n";
	import { updatePriorities, getProducts } from "$lib/api";
	import { products } from "$lib/products";
	import { slide } from "svelte/transition";
	import { supabase } from "$lib/supabase";
	import toast from "svelte-french-toast";
	import Feedback from "$lib/components/Feedback.svelte";
	import DragDropList from "$lib/components/DragDropList.svelte";

	export let data;

	let showSort = false;
	let categories = data.categories;

	function changeLanguage(event) {
		locale.set(event.target.value);
		localStorage.setItem("lang", event.target.value);
	}

	async function shareList() {
		let list = "Schoppy\n\n";

		const { data: products, error } = await supabase
			.from("products")
			.select()
			.eq("uuid", data.session.user.id)
			.eq("checked", false);

		if (error) toast.error(error.message);

		for (let i = 0; i < products.length; i++) {
			let product = products[i];
			list += `◯ ${product.title} (${product.amount} ${product.unit}) (${$_(
				"pages.home.productCard.categories." + product.category
			)}) \n`;
		}

		if (navigator.share) {
			navigator
				.share({
					title: `Schoppy`,
					text: list
				})
				.catch((error) => {
					toast.error(error);
				});
		} else {
			toast.error($_("pages.settings.list.shareError"));
		}
	}

	async function deleteAll() {
		if (confirm($_("pages.settings.list.deleteAllConfirm"))) {
			const { error } = await supabase.from("products").delete().eq("uuid", data.session.user.id);

			if (error) {
				toast.error($_("pages.settings.list.deleteAllError") + error.message);
			} else {
				toast.success($_("pages.settings.list.deleteAllSuccess"));
				$products = getProducts(data.session.user.id);
			}
		}
	}

	function sortCategories() {
		updatePriorities(categories, data.session.user.id);
		showSort = false;
	}

	async function resetCategories() {
		if (confirm($_("pages.settings.categories.resetCategoriesConfirm"))) {
			const { error } = await supabase
				.from("user_dictionary")
				.delete()
				.eq("uuid", data.session.user.id);

			if (error) {
				toast.error($_("pages.settings.categories.resetCategoriesError") + error.message);
			} else {
				toast.success($_("pages.settings.categories.resetCategoriesSuccess"));
			}
		}
	}
</script>

<svelte:head>
	<title>{$_("pages.settings.title")}</title>
</svelte:head>

<body>
	<div class="grid">
		<section class="account">
			<h2>{data.session.user.email}</h2>
			<a href="/logout"><button>{$_("pages.settings.logout")}</button></a>
		</section>

		<section class="language">
			<h2>{$_("pages.settings.language")}</h2>
			<select
				value={$locale}
				on:change={() => {
					changeLanguage(event);
				}}
			>
				{#each $locales as locale}
					<option value={locale}>{$_("pages.settings.languages." + locale)}</option>
				{/each}
			</select>
		</section>

		<section class="list">
			<h2>{$_("pages.settings.list.title")}</h2>
			<button on:click={shareList}>{$_("pages.settings.list.share")}</button>
			<button on:click={deleteAll}>{$_("pages.settings.list.deleteAll")}</button>
		</section>

		<section class="units">
			<h2>{$_("pages.settings.units.title")}</h2>
			<strong>Work in progress 🚧</strong>
		</section>

		<section class="categories">
			<h2>{$_("pages.settings.categories.title")}</h2>
			<button
				on:click={() => {
					showSort = !showSort;
				}}>{$_("pages.settings.categories.categoryList")}</button
			>
			{#if showSort}
				<div transition:slide|local={{ duration: 800 }}>
					<DragDropList bind:data={categories} />
					<button on:click={sortCategories}>{$_("pages.settings.categories.sortCategories")}</button
					>
				</div>
			{/if}
			<button on:click={resetCategories}>{$_("pages.settings.categories.resetCategories")}</button>
		</section>

		<section class="feedback">
			<h2>{$_("pages.settings.feedback.title")}</h2>
			<Feedback />
		</section>
	</div>
</body>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
		margin-top: 1rem;
	}

	select {
		border-radius: 1rem;
		background-color: var(--background);
		border: 2px solid var(--background);
		outline: none;
		padding: 0.2rem 0.5rem;
		font-weight: bold;
		transition: all 0.3s ease-in-out;
	}

	select:focus,
	select:hover {
		border-color: var(--accent);
	}

	h2 {
		margin-top: 0.5rem;
		margin-bottom: 1rem;
	}

	button {
		display: block;
		margin-inline: auto;
		cursor: pointer;
	}

	a {
		text-decoration: none;
	}

	.grid > section {
		text-align: center;
		padding: 1rem;
		border-radius: 1rem;
		background-color: #0047ff1f;
	}

	.account {
		grid-column: span 2;
	}

	.list {
		grid-row: span 2;
	}

	.categories {
		grid-row: span 2;
	}

	.units {
		grid-row: span 3;
	}

	.feedback {
		grid-column: span 2;
	}

	@media only screen and (max-width: 450px) {
		.grid {
			grid-template-columns: 1fr;
		}

		.account {
			grid-column: span 1;
		}

		.feedback {
			grid-column: span 1;
		}
	}
</style>
