"use client";

import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import SideBarLinks from "./SideBarLinks";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e: React.MouseEvent<HTMLUListElement>) {
    if (e.target != e.currentTarget) setIsOpen(false);
  }

  return (
    <>
      <button
        className="mr-auto md:hidden"
        type="button"
        aria-label="menu button open"
        onClick={() => setIsOpen(true)}
      >
        <BiMenu />
      </button>
      {isOpen && (
        <aside className="md:hidden absolute inset-0 animate-in backdrop-blur-sm z-50 py-12 px-8">
          <button
            className="text-xl"
            aria-label="menu button close"
            onClick={() => setIsOpen(false)}
          >
            <BiMenu />
          </button>
          <ul
            className="flex items-center flex-col gap-12 mt-20"
            onClick={handleClick}
          >
            <SideBarLinks />
          </ul>
        </aside>
      )}
    </>
  );
}
