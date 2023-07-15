import supabase from "$lib/supabase";

export async function PATCH({ request }) {
	let { id, sort } = request.json();

	const { error } = await supabase.from("products").update({ sort }).eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}
