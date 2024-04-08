import Image from "next/image";

export default function SortingDefinition() {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-10">Sorting algorithms</h1>
      <p className="leading-relaxed text-gray-500">
        Various sorting algorithms are used for ordering elements in the array.
        <br />
        <br />
        In this lecture, the basic bubble sort is visualized. The time
        complexity of this algorithm is O(n<sup>2</sup>), but more efficient
        ones run in O(nlogn).
        <br />
        <a
          href="https://www.geeksforgeeks.org/understanding-time-complexity-simple-examples/"
          target="_blank"
          className="text-indigo-600 hover:underline"
        >
          Check out time complexity
        </a>
      </p>

      <div className="relative rounded-xl h-80 mt-8">
        <Image
          fill
          src="/images/sorting.png"
          className="object-cover brightness-1"
          alt="Sorting algorithms"
        />
      </div>
    </>
  );
}
