import { Tables } from "@/database/types/supabase";

export type User = Tables<"users">;
export type MessageType = Tables<"messages"> & { users: User | null };

export type Likes = Tables<"likes">;
