import { supabase } from "$lib/supabase";
import { redirect } from "@sveltejs/kit";
import { sortCategories } from "$lib/api.js";

export const load = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		redirect(303, "/login");
	}

	const { data, error } = await supabase.from("categories").select("id, category");
	if (error) {
		console.error("Error fetching categories:", error);
		return;
	}

	const categories = await sortCategories(data, user.id);

	return { categories };
};
