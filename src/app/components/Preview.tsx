export const PreviewSection = ({
  codes,
}: {
  codes: Record<string, string>;
}) => {
  const generatePreview = (html: string, css: string, js: string) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>${css}</style>
      </head>
      <body>
        ${html}
        <script>
          try {
            ${js}
          } catch (error) {
            console.error('JavaScript Error:', error);
          }
        </script>
      </body>
    </html>
  `;
  };

  return (
    <div className="w-1/2 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/30">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Live Preview
        </span>
        <div className="w-16"></div>
      </div>

      <div className="flex-1 bg-card">
        <iframe
          srcDoc={generatePreview(codes.html, codes.css, codes.javascript)}
          sandbox="allow-scripts allow-same-origin"
          className="w-full h-full border-0"
          title="Live Preview"
        />
      </div>
    </div>
  );
};
