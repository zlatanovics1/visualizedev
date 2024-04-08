import { cookies } from "next/headers";
import { createClient } from "../../database/supabase/server";
import { getServerUser } from "./getServerUser";

export async function getServerUserData() {
  const supabase = createClient(cookies());
  const user = await getServerUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();
  if (error) throw new Error("Failed to get user data!");

  return data;
}
