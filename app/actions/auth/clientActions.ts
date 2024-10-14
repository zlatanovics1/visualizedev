import { createClient } from "@/database/supabase/client";

export async function loginWithOAuth(provider: "google" | "github") {
  try {
    const client = createClient();
    const res = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });
  } catch (e) {
    return { success: false };
  }
}
