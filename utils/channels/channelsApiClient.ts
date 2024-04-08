import { createClient } from "@/database/supabase/client";

import { v4 as uuidv4 } from "uuid";

export async function getChannelInviteLink(channelid: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("channels")
    .select("invite_link,link_expire_date")
    .eq("id", channelid)
    .single();

  if (error) throw new Error("Could not get invite link");
  return data;
}

export async function createChannelInviteLink(channelId: number) {
  const supabase = createClient();
  const link = "invite/" + channelId + "-" + uuidv4();
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const expire = date.toISOString();
  const { data, error } = await supabase
    .from("channels")
    .update({ invite_link: link, link_expire_date: expire })
    .eq("id", channelId)
    .select("invite_link")
    .single();
  if (error) throw new Error("Could not set invite link");

  return data;
}
