"use client";

import { useDarkMode } from "@/context/DarkModeProvider";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";

export default function DarkModeToggle() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return !darkMode ? (
    <HiOutlineMoon
      className="w-5 h-5 hover:cursor-pointer"
      onClick={toggleDarkMode}
    />
  ) : (
    <HiOutlineSun
      className="w-5 h-5 hover:cursor-pointer"
      onClick={toggleDarkMode}
    />
  );
}
