import { cookies } from "next/headers";
import { createClient } from "../../database/supabase/server";

export async function getServerUser() {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
