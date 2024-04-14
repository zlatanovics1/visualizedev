"use client";

import Image from "next/image";
import SideBarLinks from "./SideBarLinks";

export default function Sidebar() {
  return (
    <aside className="p-6 pt-10 space-y-10 hidden md:block row-span-full bg-gray-50 border-r-2">
      <div className="h-24 mb-6 relative rounded-full overflow-hidden w-36 flex m-auto">
        {/* <Image
          fill
          loading="eager"
          priority
          src="/images/logocut.png"
          alt="App logo"
          className="object-cover brightness-90"
        /> */}
      </div>
      <SideBarLinks />
    </aside>
  );
}
