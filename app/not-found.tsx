import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function notfound() {
  return (
    <main className="w-full h-dvh flex flex-col gap-20 items-center justify-center px-10">
      <h1 className="text-4xl text-center font-semibold">
        <span className=" text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">
          Oops...
        </span>
        <br />
        <br />
        we can not find the page you are looking for :(
      </h1>

      <Link href="/" className="text-indigo-600 text-xl hover:underline">
        &larr; Go back
      </Link>
    </main>
  );
}
