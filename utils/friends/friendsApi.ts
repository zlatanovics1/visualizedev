import { createClient } from "@/database/supabase/client";
import { User } from "@/types/db-derivated-types";
const randomIndex = Math.trunc(Math.random() * 4);

// const getFriendsQuery = `
//     SELECT * FROM users WHERE id NOT IN (
//         SELECT friend_id FROM friends
//         WHERE user_id=auth.uid()
//         ) OR
//         id NOT IN (
//         SELECT user_id FROM friends
//         WHERE friend_id=auth.uid()
//         )
// `;

const supabase = createClient();
export async function getFriends(query: string) {
  const { data, error } = await supabase.rpc("select_non_friends", {
    start_index: randomIndex,
    username_pattern: query === "default" ? "" : query,
  });

  if (error) throw new Error("Could not fetch users...");

  return data as User[];
}

export async function loadFriends() {
  const { data, error } = await supabase.rpc("select_friends");
  if (error) throw new Error("Could not fetch users...");
  return data;
}

export async function removeFriend(id: string) {
  // const { error } = await supabase.rpc("remove_friend", {
  //   remove_friend_id: id,
  // });
  // if (error) throw new Error("Could not remove friend!");
}
