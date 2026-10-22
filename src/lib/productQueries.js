const PRODUCT_PAGE_SIZE = 1000;

export async function fetchProducts(supabase, uuid) {
	const products = [];
	let total = null;

	while (total === null || products.length < total) {
		const from = products.length;
		const { data, error, count } = await supabase
			.from("products")
			.select("*, categories(category)", { count: "exact" })
			.eq("uuid", uuid)
			.order("id", { ascending: true })
			.range(from, from + PRODUCT_PAGE_SIZE - 1);

		if (error) return { data: null, error };

		const page = data ?? [];
		products.push(...page);
		total = count ?? products.length;

		// Avoid retrying forever if the backend returns an incomplete count.
		if (page.length === 0) break;
	}

	return { data: products, error: null };
}
