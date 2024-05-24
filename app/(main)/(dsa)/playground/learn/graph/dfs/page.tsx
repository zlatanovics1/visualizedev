import DefinitionCodeEditor from "@/components/ui/playground/DefinitionCodeEditor";
import GraphStructure from "@/app/(main)/(dsa)/playground/learn/graph/GraphStructure";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Depth-first-search (DFS) algorithm",
};

export default function GraphPage() {
  return (
    <>
      <DefinitionCodeEditor section="graphbfs" />
      <div className="hidden sm:block dotted rounded-xl h-full row-span-2  ">
        <GraphStructure dfsOn />
      </div>
    </>
  );
}
