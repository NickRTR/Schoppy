import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	await locals.supabase.auth.signOut();
	locals.session = null;
	redirect(303, "/");
};
