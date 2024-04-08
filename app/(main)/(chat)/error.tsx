"use client";

import { usePathname, useRouter } from "next/navigation";

export default function ErrorPage({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
      <h1 className="text-xl text-center font-semibold m-10">
        {error.message}
      </h1>
      <button
        className="px-3 py-1 rounded-md text-indigo-500 border-0 ring-2 ring-indigo-500 hover:text-indigo-600 hover:ring-indigo-600 transition-all duration-300"
        onClick={() => router.back()}
      >
        &larr; Back
      </button>
    </div>
  );
}
