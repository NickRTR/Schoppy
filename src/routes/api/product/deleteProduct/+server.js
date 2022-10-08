import supabase from "$lib/supabase";

export async function DELETE({ request }) {
	let { id } = await request.json();

	const { error } = await supabase.from("products").delete().eq("id", id);

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ success: "success" }));
}