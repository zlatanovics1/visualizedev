import Image from "next/image";
import Link from "next/link";

export default function RecursionDefinition() {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-10">Recursion</h1>
      <p className="leading-relaxed text-gray-500">
        Recursion is the technique of making a function call itself. This
        technique provides a way to break complicated problems down into simple
        problems which are easier to solve.
      </p>
      <p className="mt-5 text-gray-500 leading-relaxed">
        The recursion continues until some condition is met.
        <br />
        To prevent infinite recursion,{" "}
        <span className="text-indigo-600">if...else statement</span> (or similar
        approach) can be used where one branch makes the recursive call and the
        other doesn't.
      </p>
      <div className="relative rounded-xl h-80 mt-5">
        <Image
          fill
          //   src="https://www.programiz.com/sites/tutorial2program/files/cpp-function-recursion-working.png"
          src="/images/recursion.png"
          className="object-cover brightness-125"
          alt="Adjacency list"
        />
      </div>
      <h4 className="text-xl mt-10 mb-5 font-semibold">How does it work?</h4>
      <p className="text-gray-500 leading-relaxed">
        Recursion is using <span className="text-indigo-600">stack</span> which
        is executing the last recursive function called.
        <br />
        <Link
          href="/playground/learn/stack"
          className="text-indigo-600 hover:underline"
        >
          Learn more about stack &rarr;
        </Link>
      </p>
      <h4 className="font-semibold mt-10">1. Advantages of using recursion</h4>
      <ul className="space-y-4 mt-5 leading-relaxed text-gray-500">
        <li className="ml-5">It makes our code shorter and cleaner.</li>
        <li className="ml-5">
          Recursion is required in problems concerning data structures and
          advanced algorithms, such as Graph and Tree Traversal.
        </li>
      </ul>
      <h4 className="font-semibold mt-10">
        2. Disadvantages of using recursion
      </h4>
      <ul className="space-y-5 mt-5 leading-relaxed text-gray-500">
        <li className="ml-5">
          It takes a lot of stack space compared to an iterative program.
        </li>
        <li className="ml-5">It uses more processor time.</li>
        <li className="ml-5">
          It can be more difficult to debug compared to an equivalent iterative
          program.
        </li>
      </ul>
    </>
  );
}
