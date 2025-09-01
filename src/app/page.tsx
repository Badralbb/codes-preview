"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [codes, setCodes] = useState<Record<string, string>>({
    js: "",
    html: "",
    css: "",
  });

  const technologies = ["HTML", "JS", "CSS"];

  const router = useRouter();

  const searchParams = useSearchParams();

  const paramTechnology = searchParams.get("technology") ?? "HTML";

  const handleCode = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const id = e.target.id.toLowerCase();
    const value = e.target.value;
    setCodes((prev) => {
      const newValue = { ...prev };
      newValue[id] = value;
      return newValue;
    });
  };

  const generatePreview = (html: string, css: string, js: string) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;
  };

  return (
    <div>
      <div className="flex">
        {technologies.map((technology) => (
          <div
            onClick={() => router.push(`?technology=${technology}`)}
            data-is-selected={technology === paramTechnology}
            className="flex-1 hover:bg-slate-300 data-[is-selected=true]:hover:bg-slate-200 hover:cursor-pointer data-[is-selected=true]:border text-center py-2 rounded-md bg-slate-200"
            key={technology}
          >
            {technology}
          </div>
        ))}
      </div>
      <div className="flex">
        <div className="w-[45%]">
          <p>Code</p>
          {technologies.map((technology) => (
            <textarea
              data-is-show={technology === paramTechnology}
              key={technology}
              id={technology}
              onChange={handleCode}
              className="w-full min-h-[calc(100vh-100px)] data-[is-show=false]:hidden"
            ></textarea>
          ))}
        </div>
        <div className="flex-1">
          <p>Preview</p>

          <iframe
            srcDoc={generatePreview(codes.html, codes.css, codes.js)}
            sandbox="allow-scripts"
            className="w-full h-[calc(100vh-100px)]"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
