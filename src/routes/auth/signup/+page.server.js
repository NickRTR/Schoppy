import supabase from "$lib/supabase";
import { invalid } from "@sveltejs/kit";

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get("email");
		const password = form.get("password");

		if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
			return invalid(403, { error: "Enter a valid email and password." });
		}

		const response = await supabase.auth.signUp({ email, password });

		if (response.error) {
			return invalid(403, { error: response.error.message });
		}

		cookies.set("auth", response.session.access_token, {
			path: "/",
			// server side only cookie so you can"t use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// and serves to protect from CSRF
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: "strict",
			// only sent over HTTPS
			secure: process.env.NODE_ENV === "production",
			// set cookie to expire after two weeks
			maxAge: 60 * 60 * 24 * 12
		});
		return {
			user: {
				id: response.user.id
			}
		};
	}
};