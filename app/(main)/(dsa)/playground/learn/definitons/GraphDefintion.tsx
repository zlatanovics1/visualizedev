import Image from "next/image";

export default function GraphDefinition() {
  return (
    <>
      <h1 className="text-2xl font-bold mt-8 mb-10">Graph data structures</h1>
      <p className="leading-relaxed text-gray-500">
        A Graph Data Structure is a collection of nodes connected by edges.
        It&apos;s used to represent relationships between different entities.
        Graph algorithms are methods used to manipulate and analyze graphs,
        solving various problems like finding the shortest path or detecting
        cycles.
      </p>
      <h3 className="font-semibold text-xl mt-5 mb-4">Graph representation</h3>
      <ul className="space-y-10 mt-5">
        <li>
          <h4 className="font-semibold">1. Adjacency matrix</h4>
          <p className="text-gray-500 leading-relaxed mt-3">
            An adjacency matrix is a 2D array of V x V vertices. Each row and
            column represent a vertex.
            <br />
            If the value of any element a[i][j] is 1, it represents that there
            is an edge connecting vertex i and vertex j.
          </p>
          <div className="relative rounded-xl h-36 mt-8">
            <Image
              fill
              src="https://cdn.programiz.com/sites/tutorial2program/files/adjacency-matrix_1.png"
              className="object-cover brightness-125"
              alt="Adjacency matrix"
            />
          </div>
        </li>
        <li>
          <h4 className="font-semibold">2. Adjacency list</h4>
          <p className="text-gray-500 leading-relaxed mt-3">
            An adjacency list represents a graph as an array of linked lists.
            <br />
            The index of the array represents a vertex and each element in its
            linked list represents the other vertices that form an edge with the
            vertex.
          </p>
          <div className="relative rounded-xl h-36 mt-8">
            <Image
              fill
              //   src="/images/adjacency-list.wepb"
              src="https://cdn.programiz.com/sites/tutorial2program/files/adjacency-list.png"
              className="object-cover brightness-125"
              alt="Adjacency list"
            />
          </div>
        </li>
      </ul>
    </>
  );
}
