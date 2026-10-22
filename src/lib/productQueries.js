const PRODUCT_PAGE_SIZE = 1000;

export async function fetchProducts(supabase, userId, filters = {}) {
	const products = [];
	let total = null;

	while (total === null || products.length < total) {
		const from = products.length;
		let query = supabase
			.from("products")
			.select("*, categories(category)", total === null ? { count: "exact" } : {})
			.eq("uuid", userId)
			.order("id", { ascending: true });

		if (typeof filters.checked === "boolean") {
			query = query.eq("checked", filters.checked);
		}

		const { data, error, count } = await query.range(from, from + PRODUCT_PAGE_SIZE - 1);

		if (error) return { data: null, error };

		const page = data ?? [];
		products.push(...page);
		total ??= count;

		if (page.length === 0) break;
	}

	return { data: products, error: null };
}

export function sortProducts(products, priorities = {}) {
	priorities ??= {};
	const priority = (category) => priorities[category] ?? Number.MAX_SAFE_INTEGER;
	const createdAt = (product) =>
		Date.parse(product.created_at ?? product.createdAt ?? product.created ?? "") || 0;

	return [...products].sort(
		(a, b) => priority(a.category) - priority(b.category) || createdAt(a) - createdAt(b)
	);
}

export async function fetchSortedProducts(supabase, userId) {
	const [productsResult, prioritiesResult] = await Promise.all([
		fetchProducts(supabase, userId),
		supabase.from("userdata").select("priorities").eq("uuid", userId).maybeSingle()
	]);

	if (productsResult.error) return productsResult;

	return {
		data: sortProducts(productsResult.data, prioritiesResult.data?.priorities),
		error: null
	};
}
