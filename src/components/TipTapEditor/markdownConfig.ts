import TurndownService from "turndown";
import { marked } from "marked";

export const configureMarked = () => {
  marked.setOptions({
    gfm: true,
    breaks: true,
    pedantic: false,
  });
};

export const createTurndownService = () => {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
    strongDelimiter: "**",
    emDelimiter: "*",
    hr: "---",
    fence: "```",
  });

  turndownService.addRule("taskListItem", {
    filter: (node: any) => {
      return (
        node.nodeName === "LI" &&
        (node.getAttribute("data-type") === "taskItem" ||
          node.querySelector('input[type="checkbox"]'))
      );
    },
    replacement: (content: string, node: any) => {
      const checkbox = node.querySelector('input[type="checkbox"]');
      const isChecked = checkbox?.checked || false;
      return `- [${isChecked ? "x" : " "}] ${content.trim()}\n`;
    },
  });

  turndownService.addRule("strikethrough", {
    filter: ["del", "s"],
    replacement: (content: string) => `~~${content}~~`,
  });

  turndownService.addRule("underline", {
    filter: ["u"],
    replacement: (content: string) => `<u>${content}</u>`,
  });

  turndownService.addRule("lineBreak", {
    filter: "br",
    replacement: () => "  \n",
  });

  turndownService.addRule("fencedCodeBlock", {
    filter: (node: any) => {
      return (
        node.nodeName === "PRE" &&
        (node.querySelector("code") || node.classList.contains("hljs"))
      );
    },
    replacement: (content: string, node: any) => {
      const codeEl = node.querySelector("code") || node;
      const classNames = codeEl.className || "";
      const languageMatch = classNames.match(/language-(\w+)/);
      const language =
        codeEl.getAttribute("data-language") ||
        (languageMatch ? languageMatch[1] : "") ||
        "";

      const code = codeEl.textContent || content.replace(/<[^>]*>/g, "");
      return "\n```" + language + "\n" + code.trimEnd() + "\n```\n\n";
    },
  });

  turndownService.addRule("preserveImages", {
    filter: "img",
    replacement: (_content: string, node: any) => {
      const alt = node.getAttribute("alt") || "";
      const src = node.getAttribute("src") || "";
      const title = node.getAttribute("title");
      return `![${alt}](${src}${title ? ` "${title}"` : ""})`;
    },
  });

  return turndownService;
};

export const isHTML = (str: string): boolean => {
  const htmlRegex = /<[a-z][\s\S]*>/i;
  return htmlRegex.test(str);
};