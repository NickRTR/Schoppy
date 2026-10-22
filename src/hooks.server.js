import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from "$env/static/public";
import { createServerClient } from "@supabase/ssr";

export const handle = async ({ event, resolve }) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			/**
			 * Note: You have to add the `path` variable to the
			 * set and remove method due to sveltekit's cookie API
			 * requiring this to be set, setting the path to an empty string
			 * will replicate previous/standard behaviour (https://kit.svelte.dev/docs/types#public-types-cookies)
			 */
			set: (key, value, options) => {
				event.cookies.set(key, value, { ...options, path: "/" });
			},
			remove: (key, options) => {
				event.cookies.delete(key, { ...options, path: "/" });
			}
		}
	});

	let userPromise;
	event.locals.getUser = async () => {
		userPromise ??= event.locals.supabase.auth.getUser();
		const {
			data: { user },
			error
		} = await userPromise;

		return error ? null : user;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === "content-range";
		}
	});
};
