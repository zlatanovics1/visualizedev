import DefinitionCodeEditor from "@/components/ui/playground/DefinitionCodeEditor";
import RecursionVisualizator from "./RecursionVisualizator";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recursion",
};

export default function Recursion() {
  return (
    <>
      <DefinitionCodeEditor section="recursion" />
      <section className="dotted rounded-xl p-6">
        <RecursionVisualizator />
      </section>
    </>
  );
}
