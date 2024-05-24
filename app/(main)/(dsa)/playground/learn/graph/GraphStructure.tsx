"use client";

import { useEffect, useRef, useState } from "react";
import { IdType, Network } from "vis-network";
import "vis-network/styles/vis-network.css";
import { graphOptions } from "@/client-config/graphOptions";
import toast from "react-hot-toast";
import { HiPencil, HiPlus } from "react-icons/hi2";
import vis from "vis-network/declarations/index-legacy-bundle";
import { Play } from "lucide-react";
import { bfs, dfs } from "@/utils/algorithms";

type id = number | string;

type Node = {
  id: id;
  label: string;
  color?: string;
};

type Edge = {
  from: id;
  to: id;
};

const defaultNodes: Node[] = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
];

const defaultEdges: Edge[] = [
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
];

function parseNodes(nodesInput: string) {
  const nodes: Node[] = nodesInput.split(" ").map((node: string) => ({
    id: Number(node.trim()),
    label: node.trim(),
  }));

  return nodes;
}

function parseEdges(edgesInput: string) {
  const edges: Edge[] = edgesInput.split(" ").map((edge: string) => ({
    from: +edge.split("-")[0],
    to: +edge.split("-")[1],
  }));

  return edges;
}

export default function GraphStructure({ bfsOn = false, dfsOn = false }) {
  const [nodes, setNodes] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);
  const graphRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network>();
  const [nodesInput, setNodesInput] = useState("1 2 3 4 5");
  const [startFrom, setStartFrom] = useState(1);
  const [edgesInput, setEdgesInput] = useState("1-3 1-2 2-4 2-5 3-3");

  // Start BFS from node 1

  useEffect(
    function () {
      if (!graphRef.current) return;
      networkRef.current = new Network(
        graphRef.current,
        { nodes, edges },
        graphOptions
      );
      //   networkRef.current?.selectNodes([1], true);
    },
    [nodes, edges]
  );

  function handleAnimate() {
    const nodesRegex = /^\d+(\s+\d+)*$|^\d+$/;
    const edgesRegex = /^(\d+-\d+)?(\s+\d+-\d+)*$/;
    const validInput =
      nodesRegex.test(nodesInput) && edgesRegex.test(edgesInput || "");
    if (!validInput)
      return toast.error("Please enter nodes and edges in valid format!");
    const newNodes = parseNodes(nodesInput);
    const newEdges = parseEdges(edgesInput);
    setNodes(newNodes);
    setEdges(newEdges);
    // alert(networkRef.current?.getConnectedNodes(1));
  }

  function handleBFS() {
    bfs(startFrom, networkRef.current!);
  }
  function handleDFS() {
    dfs(startFrom, networkRef.current!);
  }

  function handleAddRandomNode() {
    let value = Math.floor(Math.random() * 100 + 1);
    while (!nodes.every((node) => node.id !== value))
      value = Math.floor(Math.random() * 100 + 1);
    const randomIndex = Math.floor(Math.random() * nodes.length);
    const newNode: Node = { id: value, label: value.toString() };
    const newEdge: Edge = { from: value, to: nodes[randomIndex].id };
    setNodesInput((input) => input + " " + newNode.id);
    setEdgesInput((input) => input + ` ${newEdge.from}-${newEdge.to}`);
    setNodes((nodes) => [...nodes, newNode]);
    setEdges((edges) => [...edges, newEdge]);
  }

  return (
    <section className="h-full relative">
      <div className="absolute top-2 left-2 z-30 flex items-center gap-3">
        {bfsOn && (
          <button
            className="flex items-center gap-2 bg-indigo-600 rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-indigo-600 border-2 hover:border-indigo-600 transition-all duration-300"
            onClick={handleBFS}
          >
            <Play />
            <span>Animate BFS</span>
          </button>
        )}
        {dfsOn && (
          <button
            className="flex items-center gap-2 bg-indigo-600 rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-indigo-600 border-2 hover:border-indigo-600 transition-all duration-300"
            onClick={handleDFS}
          >
            <Play />
            <span>Animate DFS</span>
          </button>
        )}

        <button
          className="flex items-center gap-2 bg-gray-100 rounded-xl border-2 px-3 py-1  cursor-pointer hover:text-indigo-600 transition-all duration-300"
          onClick={handleAnimate}
        >
          <HiPencil className=" w-4 h-4" />
          <span> Redraw</span>
        </button>
        <button
          className="flex items-center gap-2 bg-gray-100 rounded-xl border-2 px-3 py-1  cursor-pointer hover:text-indigo-600 transition-all duration-300"
          onClick={handleAddRandomNode}
        >
          <HiPlus className="w-4 h-4" />
          <span> Add random node</span>
        </button>
      </div>
      <div className="h-[80%]" ref={graphRef} />
      <div className="px-3 space-y-4 -translate-y-5">
        {bfsOn ||
          (dfsOn && (
            <div className="relative max-w-36">
              <input
                className="w-full  rounded-md text-gray-400 bg-white px-4 py-2 border-2 focus:outline-indigo-500 peer"
                id="startfrom"
                type="text"
                value={startFrom}
                onChange={(e) => setStartFrom(+e.currentTarget.value)}
              />
              <label
                htmlFor="startfrom"
                className={`absolute   bg-white -top-3 text-gray-300 left-3  transition-all duration-300 peer-focus:left-2  peer-focus:text-indigo-500`}
              >
                Start from
              </label>
            </div>
          ))}
        <div className="relative  max-w-[30rem]">
          <input
            id="nodes"
            className="w-full rounded-md bg-white text-gray-400 px-4 py-2 border-2 focus:outline-indigo-500 peer"
            type="text"
            value={nodesInput}
            onChange={(e) => setNodesInput(e.currentTarget.value)}
          />
          <label
            htmlFor="nodes"
            className={`absolute   bg-white -top-3 text-gray-300 left-3  transition-all duration-300 peer-focus:left-2  peer-focus:text-indigo-500`}
          >
            Nodes
          </label>
        </div>
        <div className="relative max-w-[30rem]">
          <input
            className="w-full  rounded-md text-gray-400 bg-white px-4 py-2 border-2 focus:outline-indigo-500 peer"
            id="edges"
            type="text"
            value={edgesInput}
            onChange={(e) => setEdgesInput(e.currentTarget.value)}
          />
          <label
            htmlFor="edges"
            className={`absolute   bg-white -top-3 text-gray-300 left-3  transition-all duration-300 peer-focus:left-2  peer-focus:text-indigo-500`}
          >
            Edges
          </label>
        </div>
      </div>
    </section>
  );
}
