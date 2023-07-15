import supabase from "$lib/supabase";

export async function GET() {
	let { data: priorities, error } = await supabase.from("userdata").select("priorities");

	if (error) {
		return new Response(JSON.stringify({ error: error.message }));
	}

	return new Response(JSON.stringify({ priorities: priorities[0].priorities }));
}
