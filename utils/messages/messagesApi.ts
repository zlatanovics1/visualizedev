"use client";

import { type useQueryClient } from "@tanstack/react-query";
import { createClient } from "../../database/supabase/client";
import { Likes, MessageType, User } from "@/types/db-derivated-types";
import { MESSAGES_PER_PAGE } from "@/client-config/contants";
import { QueryData } from "@/types/react-query-types";
import { setQueryClientData } from "./setQueryClientData";
const supabase = createClient();

export async function getMessages({
  pageParam = 0,
  channelId,
}: {
  pageParam: unknown;
  channelId: string;
}) {
  const rangeValue = (pageParam as number) * MESSAGES_PER_PAGE;
  let query = supabase
    .from("messages")
    .select("*,users!public_messages_author_id_fkey(*)", { count: "exact" });

  if (channelId) {
    query = query.eq("channel_id", Number(channelId));
  } else {
    query = query.is("channel_id", null);
  }
  const { data, error, count } = await query
    .range(rangeValue, rangeValue + MESSAGES_PER_PAGE - 1)
    .order("created_at", { ascending: false });
  if (error) throw new Error("Could not fetch messages");

  return { data, count };
}

export function subscribeToChannel(
  channelName: string,
  queryClient: ReturnType<typeof useQueryClient>,
  user: User
) {
  const channelMessage = supabase.channel(`${channelName} messages`);
  channelMessage
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      async (payload) => {
        if (payload.new.author_id === user.id) return;

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", payload.new.author_id)
          .single();

        if (error) throw new Error("Realtime error");

        const newMessage = {
          ...payload.new,
          users: data,
        };

        setQueryClientData(queryClient, newMessage as MessageType, channelName);
      }
    )
    // .on("presence", { event: "sync" }, async () => {
    //   console.log(await channelMessage.presenceState());
    // })
    // .on("presence", { event: "join" }, ({ key, newPresences }) => {
    //   console.log("join", key, newPresences);
    // })
    // .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
    //   console.log("leave", key, leftPresences);
    // })
    .subscribe();

  const channelLikes = supabase
    .channel(`${channelName} likes`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "likes",
      },
      async (payload) => {
        if (payload.eventType === "DELETE") {
          queryClient.setQueryData([`${channelName} likes`], (data: Likes[]) =>
            data.filter(
              (like) =>
                !(
                  like.message_id === payload.old.message_id &&
                  like.user_id === payload.old.user_id
                )
            )
          );
        }
        if (payload.eventType === "INSERT") {
          queryClient.setQueryData(
            [`${channelName} likes`],
            (data: Likes[]) => [...data, payload.new]
          );
        }
      }
    )
    .subscribe();
  return { channelMessage, channelLikes };
}

export async function updateLikes(
  channel_id: number | null,
  user_id: string,
  message_id: number,
  isLiked: boolean
) {
  let query;
  if (isLiked) {
    query = supabase
      .from("likes")
      .delete()
      .eq("message_id", message_id)
      .eq("user_id", user_id);
    query = channel_id
      ? query.eq("channel_id", channel_id)
      : query.is("channel_id", null);
  } else {
    query = supabase.from("likes").insert({ channel_id, message_id, user_id });
  }
  const { error } = await query;

  if (error) throw new Error("Could not update likes");
}
