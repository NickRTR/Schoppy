import { error, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { getUser, supabase } }) => {
	const user = await getUser();

	if (!user) {
		redirect(303, "/login");
	}

	const [categoriesResult, prioritiesResult] = await Promise.all([
		supabase.from("categories").select("id, category"),
		supabase.from("userdata").select("priorities").eq("uuid", user.id).maybeSingle()
	]);

	if (categoriesResult.error) {
		console.error("Error fetching categories:", categoriesResult.error);
		error(500, "Categories could not be loaded");
	}

	const priorities = prioritiesResult.data?.priorities ?? {};
	const categories = (categoriesResult.data ?? [])
		.sort(
			(a, b) =>
				(priorities[a.id] ?? Number.MAX_SAFE_INTEGER) -
				(priorities[b.id] ?? Number.MAX_SAFE_INTEGER)
		)
		.map(({ category }) => category);

	return { categories };
};
