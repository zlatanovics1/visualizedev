import Link from "next/link";

import DarkModeToggle from "../DarkModeToggle";
import UserHeader from "./UserHeader";
import HeaderLogin from "../HeaderLogin";
import { getServerUserData } from "@/utils/auth/getServerUserData";
import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export default async function Header() {
  const user = await getServerUserData();
  return (
    <header className="border-b-2 bg-gray-50 py-4 px-6 gap-6 flex justify-end items-center">
      <HamburgerMenu />
      <Link
        href="/playground"
        className="rounded-xl hidden md:block mr-auto px-4 py-2 border-2 shadow-md hover:border-indigo-400 transition-all duration-300"
      >
        <span className="text-transparent tracking-wider bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-400">
          Playground
        </span>
      </Link>
      {user ? <UserHeader user={user} /> : <HeaderLogin />}
      <DarkModeToggle />
    </header>
  );
}
