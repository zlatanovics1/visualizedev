import { createClient } from "@/database/supabase/client";

export async function getLikes(channelId: string) {
  const supabase = createClient();
  let query = supabase.from("likes").select("*");
  if (channelId) {
    query = query.eq("channel_id", Number(channelId));
  } else {
    query = query.is("channel_id", null);
  }
  const { data, error } = await query.order("message_id", { ascending: false });
  if (error) throw new Error("Could not load likes...");

  return data;
}
