import { createClient } from "../../database/supabase/client";
import { getClientUser } from "./getClientUser";

export async function getClientUserData() {
  const supabase = createClient();
  const user = await getClientUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw new Error("Failed to get user data!");

  return data;
}
