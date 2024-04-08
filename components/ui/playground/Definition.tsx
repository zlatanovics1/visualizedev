import GraphDefinition from "@/app/(main)/(dsa)/playground/learn/definitons/GraphDefintion";
import RecursionDefinition from "@/app/(main)/(dsa)/playground/learn/definitons/RecursionDefinition";
import SortingDefinition from "@/app/(main)/(dsa)/playground/learn/definitons/SortingDefinition";
import StackDefinition from "@/app/(main)/(dsa)/playground/learn/definitons/StackDefinition";

const definitions = {
  graph: <GraphDefinition />,
  recursion: <RecursionDefinition />,
  stack: <StackDefinition />,
  sorting: <SortingDefinition />,
};

export default function Definition({ section }: { section: string }) {
  return (
    <section className="p-4 bg-gray-50 grow rounded-b-3xl overflow-y-scroll">
      {definitions[section as keyof typeof definitions]}
    </section>
  );
}
