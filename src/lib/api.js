import toast from "svelte-french-toast";
import { _ } from "svelte-i18n";
import { supabase } from "$lib/supabase";
import { get } from "svelte/store";
import { products } from "$lib/products";
import { fetchSortedProducts } from "$lib/productQueries";

const categoryList = {
	choose: 0,
	cooled: 1,
	meat: 2,
	frozen: 3,
	fruits: 4,
	vegetables: 5,
	pantry: 6,
	beverages: 7,
	household: 8,
	sweets: 9
};

export async function getProducts(userId) {
	const { data, error } = await fetchSortedProducts(supabase, userId);
	if (error) {
		toast.error(error.message);
		return false;
	}

	products.set(data);
	return true;
}

async function updateProduct(id, userId, changes) {
	const { error } = await supabase.from("products").update(changes).eq("id", id);
	if (error) {
		toast.error(error.message);
		return false;
	}

	await getProducts(userId);
	return true;
}

export async function editTitle(id, uuid, oldTitle, newTitle) {
	newTitle = newTitle.trim();
	if (oldTitle === newTitle || newTitle.length <= 1) {
		await getProducts(uuid);
		return;
	}

	const category = await getCategory(newTitle, uuid);

	await updateProduct(id, uuid, { title: newTitle, category });
}

export async function editAmount(id, uuid, oldAmount, newAmount) {
	if (String(oldAmount) === newAmount) return;

	await updateProduct(id, uuid, { amount: newAmount });
}

export async function editUnit(id, uuid, oldUnit, newUnit) {
	if (oldUnit === newUnit) return;

	await updateProduct(id, uuid, { unit: newUnit });
}

export async function toggleChecked(id, uuid, checked) {
	return updateProduct(id, uuid, { checked: !checked });
}

export async function deleteProduct(id, uuid) {
	if (confirm(get(_)("pages.home.deleteConfirm"))) {
		const { error } = await supabase.from("products").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}

		toast.success(get(_)("pages.home.deleteSuccess"));
		await getProducts(uuid);
	}
}

export async function getCategory(title, userId) {
	title = title.trim().toLowerCase();

	const { data, error } = await supabase
		.from("user_dictionary")
		.select()
		.eq("title", title)
		.eq("uuid", userId);
	if (error) {
		toast.error(error.message);
		return 0;
	}

	if (data?.length) {
		return data[0].category;
	}

	const language = localStorage.getItem("lang");
	const { data: dictionary, error: dictionaryError } = await supabase
		.from("dictionary")
		.select()
		.eq("language", language);

	if (dictionaryError) {
		toast.error(dictionaryError.message);
		return 0;
	}

	return dictionary.find((entry) => title.includes(entry.title))?.category ?? 0;
}

export async function changeCategory(id, userId, title, oldCategory, newCategory) {
	newCategory = categoryList[newCategory];
	if (Number(oldCategory) === newCategory) return;

	const normalizedTitle = title.trim().toLowerCase();

	const { count } = await supabase
		.from("user_dictionary")
		.select("*", { count: "exact", head: true })
		.eq("title", normalizedTitle)
		.eq("uuid", userId);

	if (count === 0) {
		const { error } = await supabase
			.from("user_dictionary")
			.insert([{ uuid: userId, title: normalizedTitle, category: newCategory }]);
		if (error) toast.error(error.message);
	} else {
		const { error } = await supabase
			.from("user_dictionary")
			.update({ category: newCategory })
			.eq("uuid", userId)
			.eq("title", normalizedTitle);
		if (error) toast.error(error.message);
	}

	await updateProduct(id, userId, { category: newCategory });
}

export async function updatePriorities(priorities, uuid) {
	const p = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9 };
	for (let i = 0; i < priorities.length; i++) {
		if (priorities[i] === "choose") continue;
		const category = categoryList[priorities[i]];
		p[category] = i;
	}
	const { error } = await supabase.from("userdata").update({ priorities: p }).eq("uuid", uuid);
	if (error) {
		toast.error(error.message);
		return;
	}

	toast.success(get(_)("pages.settings.categories.prioritiesUpdated"));
}
