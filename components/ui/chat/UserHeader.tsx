"use client";

import { Tables } from "@/database/types/supabase";
import { useAppDispatch } from "@/hooks/storeHooks";
import { setUser } from "@/store/slices/userSlice";
import { createClient } from "@/database/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

type User = Tables<"users">;

export default function UserHeader({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClient();
  const dispatch = useAppDispatch();
  dispatch(setUser(user));
  return (
    <>
      <span>{user.username || "User"}</span>
      <Link href="/settings">
        <HiOutlineUser className="w-5 h-5 hover:cursor-pointer" />
      </Link>
      <HiOutlineArrowRightOnRectangle
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/login");
        }}
        className="w-5 h-5 hover:cursor-pointer"
      />
    </>
  );
}
