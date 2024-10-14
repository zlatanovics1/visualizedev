import { createClient } from "@/database/supabase/client";

export async function loginWithOAuth(provider: "google" | "github") {
  try {
    const redirectUrl = "https://visualizedev.app";
    const client = createClient();
    const res = await client.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${redirectUrl}/auth/callback`,
      },
    });
  } catch (e) {
    return { success: false };
  }
}
