"use server";
import { createClient } from "@/database/supabase/server";
import {
  EditEmailData,
  EditPasswordData,
  editEmailSchema,
  editPasswordSchema,
  editSettingsSchema,
} from "@/types/form-validation-types";
import { getServerUser } from "@/utils/auth/getServerUser";
import { getServerUserData } from "@/utils/auth/getServerUserData";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function editUserData(formData: FormData) {
  const supabase = createClient(cookies());
  const user = await getServerUserData();
  if (!user) return { success: false };
  const username = formData.get("username") as string;
  const description = formData.get("usersdesc") as string | null;
  const unchangedDesc = description === user.description;
  const file = formData.get("usersImage") as File;
  if (!file.size && unchangedDesc && username === user.username) return;
  const ext = file.name;
  const fileName =
    file?.size &&
    process.env.NEXT_PUBLIC_AVATARS_BUCKET_URL + `${user.id}-${ext}`;
  const editData = {
    username,
    ...(description && !unchangedDesc && { description }),
    ...(fileName && { avatar: fileName }),
  };
  const result = editSettingsSchema.safeParse(editData);
  if (!result.success) return { success: false };
  const { error } = await supabase
    .from("users")
    .update(editData)
    .eq("id", user.id);
  if (error) throw new Error("Could not update user info");
  if (!fileName) {
    revalidatePath("/settings");
    return;
  }
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(`public/${user.id}-${ext}`, file, { upsert: true });

  if (storageError) throw new Error("Could not update user avatar");

  revalidatePath("/settings");
}

export async function updateEmail(data: EditEmailData) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  if (!user) redirect("/signup");
  if (data.email === user?.user_metadata.email) return;

  const result = editEmailSchema.safeParse(data);
  if (!result.success) return { success: false };

  const { error } = await supabase.auth.updateUser({ email: data.email });

  if (error) throw new Error("Could not update user email...");
  revalidatePath("/", "layout");
}

export async function updatePassword(data: EditPasswordData) {
  const supabase = createClient(cookies());
  const user = await getServerUser();
  if (!user) redirect("/signup");
  const result = editPasswordSchema.safeParse(data);
  if (!result.success) return { success: false };

  const { error } = await supabase.auth.updateUser({ password: data.password });
  if (error) throw new Error("Could not update user password...");
}
