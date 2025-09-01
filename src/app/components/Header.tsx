import { Code2, Play } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent">
            <Code2 className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              CodeEditor
            </h1>
            <p className="text-sm text-muted-foreground">
              Live HTML, CSS & JavaScript Editor
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Play className="w-4 h-4" />
          <span>Live Preview</span>
        </div>
      </div>
    </header>
  );
};
