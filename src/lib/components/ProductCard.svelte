<script>
	import { slide } from "svelte/transition";
	import { _ } from "svelte-i18n";
	import { page } from "$app/stores";
	import autoselect from "svelte-autoselect";
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	import {
		editTitle,
		editAmount,
		editUnit,
		toggleChecked,
		deleteProduct,
		changeCategory
	} from "$lib/api";

	export let product;

	let showChangeCategory = false;

	const categories = [
		"vegetables",
		"fruits",
		"pantry",
		"meat",
		"frozen",
		"cooled",
		"household",
		"sweets",
		"beverages"
	];
</script>

<div class="container">
	<div class="Card">
		<div class="ImageTitleQuantity">
			<img
				type="image"
				src="/category/{product.categories.category}.svg"
				alt={$_(`pages.home.productCard.categories.${product.categories.category}`)}
				title={$_(`pages.home.productCard.categories.${product.categories.category}`)}
				on:click={() => {
					showChangeCategory = !showChangeCategory;
				}}
			/>
			<div class="TitleAndQuantity">
				<div
					id="title"
					contenteditable="true"
					on:blur={(event) => {
						editTitle(
							product.id,
							$page.data.session.user.id,
							product.title,
							event.target.innerText
						);
					}}
				>
					{product.title}
				</div>
				<div class="quantity">
					<input
						use:autoselect
						type="text"
						class="amount"
						style="width: 4ch"
						maxlength="4"
						value={product.amount}
						on:blur={(event) => {
							editAmount(
								product.id,
								$page.data.session.user.id,
								product.amount,
								event.target.value
							);
						}}
					/>
					<select
						value={product.unit}
						on:change={(event) => {
							editUnit(product.id, $page.data.session.user.id, product.unit, event.target.value);
						}}
					>
						<option value="pcs">{$_("pages.home.productCard.quantities.pcs")}</option>
						<option value="gr">{$_("pages.home.productCard.quantities.gr")}</option>
						<option value="kg">{$_("pages.home.productCard.quantities.kg")}</option>
						<option value="ml">{$_("pages.home.productCard.quantities.ml")}</option>
						<option value="l">{$_("pages.home.productCard.quantities.l")}</option>
					</select>
				</div>
			</div>
		</div>
		<div class="stats">
			<div class="status">
				<input
					type="checkbox"
					checked={product.checked}
					on:click={() => {
						dispatch('toggle')
						toggleChecked(product.id, $page.data.session.user.id, product.checked);
					}}
				/>
				<input
					type="image"
					src="/delete.svg"
					alt="delete"
					on:click={() => {
						deleteProduct(product.id, $page.data.session.user.id);
					}}
				/>
			</div>
		</div>
	</div>
	{#if showChangeCategory}
		<div class="changeCategory" transition:slide>
			{#each categories as category}
				<div
					on:click={() => {
						showChangeCategory = !showChangeCategory;
						changeCategory(
							product.id,
							$page.data.session.user.id,
							product.title,
							product.category,
							category
						);
					}}
				>
					<p>{$_(`pages.home.productCard.categories.${category}`)}</p>
					<img
						src="/category/{category}.svg"
						alt={$_(`pages.home.productCard.categories.${category}`)}
						title={$_(`pages.home.productCard.categories.${category}`)}
					/>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.Card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.375rem;
		margin: 0.625rem 0;
		border-radius: 0.75rem;
		word-break: break-word;
		width: 100%;
	}

	.ImageTitleQuantity {
		display: flex;
		width: 100%;
	}

	img {
		height: 3.5rem;
		width: 3.5rem;
		cursor: pointer;
	}

	.TitleAndQuantity {
		margin-inline: 0.4rem;
		width: 100%;
	}

	#title {
		text-align: left;
		outline: none;
		font-size: 1.3rem;
		line-height: 1.5rem;
		font-weight: 500;
	}

	.quantity {
		display: flex;
	}

	.amount {
		margin: 0;
		outline: none;
		padding: 0.1rem 0.25rem;
		padding-left: 0;
		padding-top: 0.2rem;
		font-size: 1rem;
	}

	select {
		margin: 0;
		padding: 0.125rem 0.3rem;
		padding-left: 0;
		border-radius: 0.5rem;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
		font-size: 1rem;
		outline: none;
	}

	.amount:hover,
	.amount:focus,
	#title:hover,
	#title:focus,
	select:hover,
	select:focus {
		border-color: var(--accent);
	}

	.amount,
	#title,
	select {
		border: 3px solid transparent;
		border-radius: 5px;
		transition: 0.2s ease-in-out all;
	}

	.status {
		display: flex;
		margin-top: 0.25rem;
		align-items: center;
		margin-left: auto;
	}

	input[type="checkbox"] {
		margin-left: auto;
		margin-right: 0.25rem;
		width: 1.75rem;
		height: 1.75rem;
		outline-color: var(--accent);
	}

	input[type="image"] {
		margin-right: auto;
		height: 2rem;
	}

	.changeCategory {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-radius: 0.75rem;
		margin: 0 0.625rem;
		padding: 0.2rem;
		border: 4px solid var(--minor);
	}

	.changeCategory > div {
		margin: 0.2rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.changeCategory > div:hover p {
		color: var(--accent);
	}

	.changeCategory > div > p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
		font-weight: 600;
	}

	.changeCategory > div > img {
		height: 2.5rem;
	}
</style>
