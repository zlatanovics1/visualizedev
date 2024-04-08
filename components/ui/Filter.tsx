"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import FilterButton from "./FilterButton";

export default function Filter({
  searchParam,
  options,
}: {
  searchParam: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const activeParam = params.get("explore_filter") || "all";

  function handleClick(value: string) {
    params.set(searchParam, value);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <ul className="flex gap-4">
      {options.map((option) => (
        <FilterButton
          key={option.label + option.value}
          active={activeParam === option.value}
          label={option.label}
          onClick={() => handleClick(option.value)}
        />
      ))}
    </ul>
  );
}
