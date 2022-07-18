import supabase from "$lib/supabase";

export async function get({ params }) {
    const { title, category } = params;

    console.log(supabase.auth.user().id);

    const { data, error } = await supabase.from("products").insert([{title, uuid: supabase.auth.user().id}]);

    if (error) {
        return {
            status: error.status,
            body: {
                error: error.message
            }
        }
    }

    return {
        status: 200,
        body: {
            data
        }
    }
}