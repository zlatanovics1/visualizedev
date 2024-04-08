import { createClient } from "@/database/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createClient(cookies());
  const { user_id, friend_id } = await req.json();

  const { error } = await supabase
    .from("friends")
    .insert({ user_id, friend_id });

  if (error) return NextResponse.json({ error: error }, { status: 500 });
  return NextResponse.json({});
  //   const { searchParams } = new URL(req.url);
  //   const query = searchParams.get("userQuery");
}
