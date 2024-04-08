import { createClient } from "../../database/supabase/client";

export async function getClientUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
