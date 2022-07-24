import supabase from "$lib/supabase";

export async function POST({ request }) {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");

  if (typeof email !== "string" || typeof password !== "string") {
    return {
      status: 400,
      body: {
        error: "Enter a valid email and password.",
      },
    };
  }

  if (!email || !password) {
    return {
      status: 400,
      body: {
        error: "Email and password are required.",
      },
    };
  }

  let { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    return {
      status: error.status,
      body: {
        error: error.message,
      },
    };
  }

  return {
    status: 200,
    body: {
      user,
      success: "Success.",
    },
  };
}
