"use server";
import { getServerUser } from "@/utils/auth/getServerUser";
import { createClient } from "@/database/supabase/server";
import { cookies } from "next/headers";

export async function sendMessage(formData: FormData) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  if (!user) return;
  const file = formData.get("file") as File;
  const fileName = file.size
    ? `${user?.id}-${file.name}-${Math.random()}`
    : null;
  const channelId = formData.get("channelId");
  const message = {
    author_id: user!.id,
    channel_id: channelId ? Number(channelId) : null,
    file:
      fileName &&
      (channelId
        ? process.env.NEXT_PUBLIC_CHANNELS_BUCKET_URL!
        : process.env.NEXT_PUBLIC_UPLOAD_BUCKET_URL!) + fileName,
    is_edited: false,
    text: formData.get("message") as string,
  };
  const { error: insertError } = await supabase
    .from("messages")
    .insert(message);
  if (insertError) {
    throw new Error("Could not upload message");
  }
  if (!fileName) return;
  const { error: bucketError } = await supabase.storage
    .from(`${channelId ? "channels" : "uploads"}`)
    .upload(`public/${fileName}`, file);
  if (bucketError) {
    throw new Error("Could not upload message");
  }
}
