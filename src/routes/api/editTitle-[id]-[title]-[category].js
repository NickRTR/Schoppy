import supabase from "$lib/supabase";

export async function GET({ params }) {
  let { id, title, category } = params;

  const { error } = await supabase.from("products").update({ title, category }).eq("id", id);

  if (error) {
    console.error(error.message);
    return {
      status: error.status,
      body: {
        error: error.message,
      },
    };
  }

  return {
    status: 200,
  };
}
