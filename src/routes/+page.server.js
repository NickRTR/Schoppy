import { redirect } from "@sveltejs/kit";
import { sortProducts } from "$lib/api";
import { fetchProducts } from "$lib/productQueries";

export async function load({ locals: { getUser, supabase } }) {
	const user = await getUser();

	if (!user) {
		redirect(303, "/login");
	}

	const { data: products, error } = await fetchProducts(supabase, user.id);

	if (error) {
		console.error("Error fetching products:", error);
		return;
	}

	const sortedProducts = await sortProducts(products, user.id, supabase);

	const { data: categories } = await supabase.from("categories").select("category");

	return {
		products: sortedProducts ?? [],
		categories: categories ?? []
	};
}
