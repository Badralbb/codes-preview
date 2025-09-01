import { Editor } from "@monaco-editor/react";
import { LucideProps } from "lucide-react";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";

export const EditorSection = ({
  setCodes,
  codes,
  technologies,
  paramTechnology,
}: {
  setCodes: Dispatch<SetStateAction<Record<string, string>>>;
  codes: Record<string, string>;
  technologies: {
    name: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    color: string;
  }[];
  paramTechnology: string;
}) => {
  const handleCode = (value: string | undefined, technology: string) => {
    if (!value) return;
    const id = technology.toLowerCase();
    setCodes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <div className="flex-1 relative">
      {technologies.map((tech) => (
        <div
          key={tech.name}
          data-is-show={tech.name === paramTechnology}
          className="absolute inset-0 data-[is-show=false]:hidden"
        >
          <Editor
            defaultLanguage={
              tech.name.toLowerCase() === "javascript"
                ? "javascript"
                : tech.name.toLowerCase()
            }
            theme="vs-dark"
            value={codes[tech.name.toLowerCase()]}
            onChange={(value) => handleCode(value, tech.name)}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: "on",
              fontFamily:
                "var(--font-mono), 'Fira Code', 'Consolas', monospace",
              padding: { top: 16, bottom: 16 },
            }}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};
