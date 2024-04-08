"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { defaultCodes } from "@/client-config/codeEditorDefaultValues";
import { Editor } from "@monaco-editor/react";

import Loader from "../Loader";
import ToggleDefinition from "./ToggleDefinition";
import Definition from "./Definition";

const editorOptions = {
  minimap: {
    enabled: false,
  },
};

export default function DefinitionCodeEditor({ section }: { section: string }) {
  const [code, setCode] = useState(defaultCodes.cpp[section]?.text || "");
  const [lang, setLang] = useState("cpp");
  const searchParams = useSearchParams();
  const query = searchParams.get("window");

  return (
    <div className="flex flex-col  shadow-lg border-2 overflow-hidden overflow-y-scroll rounded-3xl rounded-tl-sm bg-gray-50 lg:resize-x">
      <div className="rounded-tr-3xl bg-gray-50 flex">
        <ToggleDefinition />
      </div>

      {query === "code" ? (
        <div className="rounded-b-3xl overflow-hidden grow editor-section">
          <Editor
            height="100%"
            theme="vs-dark"
            language={lang}
            value={code}
            options={editorOptions}
            loading={<Loader />}
          />
        </div>
      ) : (
        <Definition section={section} />
      )}
    </div>
  );
}
