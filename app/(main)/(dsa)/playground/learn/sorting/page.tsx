import DefinitionCodeEditor from "@/components/ui/playground/DefinitionCodeEditor";
import SortingVisualizer from "./SortingVisualizer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorting algorithms",
};

export default function SortingPage() {
  return (
    <>
      <DefinitionCodeEditor section="sorting" />
      <section className="dotted rounded-xl p-6 flex flex-col justify-between">
        <SortingVisualizer />
      </section>
    </>
  );
}
