import DefinitionCodeEditor from "@/components/ui/playground/DefinitionCodeEditor";
import StackVisualizator from "./StackVisualizator";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack data structure",
};

export default function StackPage() {
  return (
    <>
      <DefinitionCodeEditor section="stack" />
      <section className="dotted rounded-xl p-6 flex flex-col justify-between">
        <StackVisualizator />
      </section>
    </>
  );
}
