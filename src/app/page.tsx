"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FileText, Braces, Palette } from "lucide-react";
import { Header } from "./components/Header";
import { EditorSection } from "./components/Editor";
import { PreviewSection } from "./components/Preview";

export default function Home() {
  const [codes, setCodes] = useState<Record<string, string>>({
    javascript:
      "// Write your JavaScript code here\nconsole.log('Hello World!');",
    html: " Write your HTML code here \n<h1>Hello World!</h1>\n<p>Start coding to see the magic happen!</p>",
    css: "/* Write your CSS code here */\nbody {\n  font-family: 'Arial', sans-serif;\n  margin: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\nh1 {\n  color: #fff;\n  text-align: center;\n}",
  });

  const technologies = [
    { name: "HTML", icon: FileText, color: "text-orange-500" },
    { name: "CSS", icon: Palette, color: "text-blue-500" },
    { name: "JAVASCRIPT", icon: Braces, color: "text-yellow-500" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();
  const paramTechnology = searchParams.get("technology") ?? "HTML";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex h-[calc(100vh-89px)]">
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="flex border-b border-border bg-card/30">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <button
                  key={tech.name}
                  onClick={() => router.push(`?technology=${tech.name}`)}
                  data-is-selected={tech.name === paramTechnology}
                  className="flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 hover:bg-secondary/80 data-[is-selected=true]:bg-accent data-[is-selected=true]:text-accent-foreground data-[is-selected=true]:shadow-sm border-b-2 border-transparent data-[is-selected=true]:border-accent"
                >
                  <Icon
                    className={`w-4 h-4 ${
                      tech.name === paramTechnology
                        ? "text-accent-foreground"
                        : tech.color
                    }`}
                  />
                  {tech.name}
                </button>
              );
            })}
          </div>
          <EditorSection
            paramTechnology={paramTechnology}
            technologies={technologies}
            codes={codes}
            setCodes={setCodes}
          />
        </div>
        <PreviewSection codes={codes} />
      </div>
    </div>
  );
}
