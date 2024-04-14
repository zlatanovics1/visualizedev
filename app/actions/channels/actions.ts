"use server";

import { createClient } from "@/database/supabase/server";
import { Tables } from "@/database/types/supabase";
import { getServerUser } from "@/utils/auth/getServerUser";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type UserChannelRelation = Tables<"channels_users">;

export async function createChannel(formData: FormData) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  if (!user) return;
  const channelName = formData.get("channelName") as string;
  const file = formData.get("channelPhoto") as File;

  const fileName = file.size ? `${channelName}-photo-${user.id}` : null;

  const newChannel = {
    creator: user.id,
    name: channelName,
    description: formData.get("channelDesc") as string,
    type: formData.get("channelType") as string,
    num_members: 0,
    photo: fileName && process.env.NEXT_PUBLIC_CHANNELS_BUCKET_URL! + fileName,
  };

  const { data, error: insertError } = await supabase
    .from("channels")
    .insert(newChannel)
    .select();

  if (insertError) throw new Error("Could not create channel");

  const userChannelRelationData: UserChannelRelation = {
    channel_id: data[0].id,
    user_id: user.id,
    role: "admin",
    is_muted: false,
  };
  const { error: relationError } = await supabase
    .from("channels_users")
    .insert(userChannelRelationData);
  if (relationError) throw new Error("Could not create channel");
  if (fileName) {
    const { error: bucketError } = await supabase.storage
      .from("channels")
      .upload(`/public/${fileName}`, file);

    if (bucketError) throw new Error("Coult not upload channel photo");
  }

  redirect(`/channels/${data[0].id}`);
}
