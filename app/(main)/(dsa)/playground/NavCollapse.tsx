"use client";

import { MutableRefObject, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiChevronUpDown, HiMiniCheck } from "react-icons/hi2";
import { learnRoutes } from "@/client-config/learn-routes";
import { useCloseModal } from "@/hooks/useCloseModal";

export default function NavCollapse() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const learnValue = pathname.split("learn/").at(1);
  const collapseRef = useCloseModal(
    () => setOpen(false),
    true,
    true
  ) as MutableRefObject<HTMLUListElement>;

  return (
    <div
      className="w-full max-w-lg border-[1px] rounded-xl relative cursor-pointer"
      onClick={() => setOpen((open) => !open)}
    >
      <p className="py-2 px-6 flex items-center justify-between ">
        {learnRoutes.find((route) => route.value === learnValue)?.label}
        <HiChevronUpDown className="w-6 h-6" />
      </p>
      {open && (
        <ul
          ref={collapseRef}
          className={`absolute right-0 left-0 border-[1px] rounded-xl translate-y-2  animate-in bg-gray-50 divide-y-2 divide-gray-200 cursor-pointer z-40 `}
        >
          {learnRoutes.map((lecture) => (
            <li
              key={lecture.label}
              className={`p-2 pl-4 flex items-center  gap-2 ${
                learnValue === lecture.value ? "text-indigo-600" : "pl-10"
              }`}
            >
              {learnValue === lecture.value && <HiMiniCheck />}
              <Link
                href={`/playground/learn/${lecture.value}`}
                className="w-full"
              >
                {lecture.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
