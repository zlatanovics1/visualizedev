// import AnimateButton from "@/components/ui/playground/AnimateButton";
import Link from "next/link";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground | Develop & Visualize",
  description:
    "Learn various <b>data structures and algorithms</b> with awesome <b>visualization tool</b> and integrated code editor",
};

export default function PlaygroundPage() {
  return (
    <main className="px-10 md:px-20 lg:px-32 h-full flex items-center justify-center flex-col gap-16">
      <h1 className="lg:text-5xl text-2xl md:text-3xl font-semibold leading-normal hidden sm:block">
        <span className="inline-block mb-2">
          Use awesome visualization tool to learn
        </span>
        <br />
        <span className="bg-clip-text  font-bold text-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500">
          data structures and algorithms
        </span>
        <br />
        <span className="inline-block mt-2">with integrated code editor</span>
      </h1>
      <h1 className="sm:hidden font-semibold text-2xl">
        Please use a larger device. Visualization tools and code editor do not
        allow responsive interface!
      </h1>
      <div className="space-x-8">
        <Link href={"/"}>
          <button className="px-8 py-3 text-violet-600 border-2 border-violet-600 hover:bg-violet-600 hover:text-white bg-gray-100 rounded-xl ">
            &larr; Back to chat
          </button>
        </Link>
        <Link href={"/playground/learn/sorting"}>
          <button className="px-8 py-3 text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-600 hover:text-white bg-gray-100 rounded-xl ">
            Start today
          </button>
        </Link>
      </div>
    </main>
  );
}
