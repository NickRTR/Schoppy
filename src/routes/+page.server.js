import { error, redirect } from "@sveltejs/kit";
import { fetchSortedProducts } from "$lib/productQueries";

export async function load({ locals: { getUser, supabase } }) {
	const user = await getUser();

	if (!user) {
		redirect(303, "/login");
	}

	const productsResult = await fetchSortedProducts(supabase, user.id);

	if (productsResult.error) {
		console.error("Error fetching products:", productsResult.error);
		error(500, "Products could not be loaded");
	}

	return {
		products: productsResult.data
	};
}
