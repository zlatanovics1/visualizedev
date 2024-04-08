import Image from "next/image";

export default function StackDefinition() {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-10">Stack data structure</h1>
      <p className="leading-relaxed text-gray-500">
        A stack is a linear data structure that follows the principle of Last In
        First Out (<span className="text-indigo-600">LIFO</span>). This means
        the last element inserted inside the stack is removed first.
        <br />
        <br />
        You can think of the stack data structure as the pile of plates on top
        of another.
      </p>
      <h4 className="mt-8 mb-5">On that pile of plates you can:</h4>
      <ul className="space-y-4 text-gray-500">
        <li className="ml-5">
          Add plate on top of the pile -{" "}
          <span className="text-violet-600">push</span>
        </li>
        <li className="ml-5">
          Remove the last plate - <span className="text-violet-600">pop</span>
        </li>
      </ul>
      <div className="relative rounded-xl h-80 mt-5">
        <Image
          fill
          //   src="https://www.programiz.com/sites/tutorial2program/files/cpp-function-recursion-working.png"
          src="https://www.programiz.com/sites/tutorial2program/files/cpp-stack.png"
          className="object-cover brightness-150"
          alt="Stack data structure"
        />
      </div>
    </>
  );
}
