import { createClient } from "@/database/supabase/client";

export async function loginWithOAuth(provider: "google" | "github") {
  try {
    const isLocal = process.env.NODE_ENV === "development";
    const redirectUrl = isLocal
      ? "http://localhost:3000"
      : "https://visualizedev.app";
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
