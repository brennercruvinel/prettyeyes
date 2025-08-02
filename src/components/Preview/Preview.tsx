import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import DOMPurify from "dompurify";
import type { PreviewProps } from "../../types/editor.types";

export default function Preview({ markdown, className = "" }: PreviewProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    const processMarkdown = async () => {
      try {
        const result = await unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkHtml, { sanitize: true })
          .process(markdown);

        setHtml(result.toString());
      } catch {
        setHtml("<p>Error rendering markdown</p>");
      }
    };

    processMarkdown();
  }, [markdown]);

  return (
    <div className={`h-full bg-[#0d1117] overflow-hidden ${className}`}>
      <div className="h-full overflow-y-auto">
        <div className="px-8 py-6 max-w-4xl mx-auto">
          <div
            className="markdown-body prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
            style={{
              color: "#c9d1d9",
              fontSize: "16px",
              lineHeight: "1.8",
            }}
          />
        </div>
      </div>
    </div>
  );
}
