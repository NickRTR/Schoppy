import { supabase } from "$lib/supabase";
import { redirect } from "@sveltejs/kit";
import { sortProducts } from "$lib/api";

export async function load({ locals }) {
	const session = await locals.getSession();

	if (!session) {
		redirect(303, "/login");
	}

	const { data: products, error } = await supabase
		.from("products")
		.select(`*, categories(category)`)
		.eq("uuid", session.user.id);

	if (error) {
		console.error("Error fetching products:", error);
		return;
	}

	const sortedProducts = await sortProducts(products, session.user.id);

	const { data: categories } = await supabase.from("categories").select("category");

	return {
		products: sortedProducts ?? [],
		categories: categories ?? []
	};
}
