"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { HiAnnotation, HiBookOpen } from "react-icons/hi";
import { HiCodeBracket, HiOutlineBookOpen } from "react-icons/hi2";

export default function ToggleDefinition() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("window");

  function handleToggle(query: string) {
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    urlSearchParams.set("window", query);
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }
  return (
    <>
      <button
        onClick={() => handleToggle("def")}
        className={`flex items-center gap-1 px-4 py-1 border-r-2 ${
          query === "def" || !query ? "bg-indigo-600 text-white" : "bg-gray-100"
        } rounded-bl-md rounded-sm border-2 border-transparent  hover:text-indigo-500 transition-all duration-300 hover:bg-white hover:border-indigo-600`}
      >
        <HiOutlineBookOpen />
        <span>Defintion</span>
      </button>
      <button
        onClick={() => handleToggle("code")}
        className={`flex items-center gap-1 px-5 py-1 ${
          query === "code" ? "bg-indigo-600 text-white" : "bg-gray-100"
        } rounded-l-sm rounded-r-md border-2 border-transparent  hover:text-indigo-500 transition-all duration-300 hover:bg-white hover:border-indigo-600`}
      >
        <HiCodeBracket />
        <span>Code</span>
      </button>
    </>
  );
}
