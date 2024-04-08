import { createClient } from "@/database/supabase/server";
import { cookies } from "next/headers";
import { getServerUser } from "../auth/getServerUser";
import { redirect } from "next/navigation";

export async function validateChannel(channelId: string) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  if (!user) return redirect("/signup");
  const { data, error } = await supabase
    .from("channels_users")
    .select("*")
    .eq("channel_id", channelId);
  if (error)
    return {
      message: error.message,
    };
  if (!data)
    return {
      message: "Page not found...",
    };
  const isMember = data.some((channel) => channel.user_id === user.id);
  if (isMember) return { message: "success" };
  else redirect("/channels");
}

export async function getChannels() {
  const user = await getServerUser();
  if (!user) return null;
  const supabase = createClient(cookies());
  const { data: memberData, error: memberError } = await supabase
    .from("channels_users")
    .select("*")
    .eq("user_id", user!.id);
  if (memberError) throw new Error("Could not load channels");
  if (!memberData.length) return null;
  const channelIds = memberData.map((row) => row.channel_id);
  const { data: channelsData, error: channelsError } = await supabase
    .from("channels")
    .select("*,users!public_channels_creator_fkey(*)")
    .in("id", channelIds);
  if (channelsError) throw new Error("Could not load channels");
  return { memberData, channelsData };
}

export async function validateInviteLink(link: string) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("channels")
    .select("*")
    .eq("invite_link", link)
    .single();
  if (error) throw new Error("Could not load invite link...");
  return data;
}

export async function addChannelMember(channel_id: number) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  const insertData = {
    user_id: user!.id,
    channel_id,
    role: "member",
    is_muted: false,
  };
  const { data: isMember, error: checkError } = await supabase
    .from("channels_users")
    .select("*")
    .eq("channel_id", channel_id)
    .eq("user_id", user!.id);

  if (checkError) throw new Error("Could not add channel member");
  if (isMember.length) return null;

  const { data, error } = await supabase
    .from("channels_users")
    .insert(insertData)
    .select();

  if (error) throw new Error("Could not add channel member");

  return data;
}
