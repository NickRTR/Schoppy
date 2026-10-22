import { redirect } from "@sveltejs/kit";

export const load = async ({ parent }) => {
	const { supabase } = await parent();
	const session = await supabase.auth.getSession();
	if (session.data.session) {
		redirect(303, "/");
	}
};
