"use server";

import { LoginData, loginSchema } from "@/types/form-validation-types";
import { createClient } from "@/database/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signupUser(formData: LoginData) {
  const result = loginSchema.safeParse(formData);

  if (!result.success) {
    const formatted = result.error.format();

    return { success: false };
  }

  const supabase = createClient(cookies());
  const { email, password, username } = result.data;
  const {
    data: { user },
    error: signupError,
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (signupError || !user) {
    return { success: false };
  }

  const { data } = await supabase.auth.signInWithPassword({ email, password });

  // const { error: userError } = await supabase
  //   .from("users")
  //   .update({ username })
  //   .eq("id", user.id);

  // if (userError) {
  //   console.log(userError);
  //   return { success: false };
  // }

  revalidatePath("/", "layout");

  redirect("/");
}

export async function loginUser(formData: LoginData) {
  const result = loginSchema.safeParse(formData);
  if (!result.success) {
    const formatted = result.error.format();
    return { success: false };
  }
  const supabase = createClient(cookies());
  const { email, password } = result.data;
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false };
  }

  revalidatePath("/", "layout");
  redirect("/");
}
