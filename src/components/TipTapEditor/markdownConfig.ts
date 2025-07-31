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
    filter: (node) => {
      return (
        node.nodeName === "LI" &&
        ((node as HTMLElement).getAttribute("data-type") === "taskItem" ||
          (node as HTMLElement).querySelector('input[type="checkbox"]') !== null)
      );
    },
    replacement: (content: string, node) => {
      const checkbox = (node as HTMLElement).querySelector('input[type="checkbox"]') as HTMLInputElement | null;
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
    filter: (node) => {
      return (
        node.nodeName === "PRE" &&
        ((node as HTMLElement).querySelector("code") !== null || (node as HTMLElement).classList.contains("hljs"))
      );
    },
    replacement: (content: string, node) => {
      const codeEl = (node as HTMLElement).querySelector("code") || node;
      const classNames = (codeEl as HTMLElement).className || "";
      const languageMatch = classNames.match(/language-(\w+)/);
      const language =
        (codeEl as HTMLElement).getAttribute("data-language") ||
        (languageMatch ? languageMatch[1] : "") ||
        "";

      const code = (codeEl as HTMLElement).textContent || content.replace(/<[^>]*>/g, "");
      return "\n```" + language + "\n" + code.trimEnd() + "\n```\n\n";
    },
  });

  turndownService.addRule("preserveImages", {
    filter: "img",
    replacement: (_content: string, node) => {
      const alt = (node as HTMLElement).getAttribute("alt") || "";
      const src = (node as HTMLElement).getAttribute("src") || "";
      const title = (node as HTMLElement).getAttribute("title");
      return `![${alt}](${src}${title ? ` "${title}"` : ""})`;
    },
  });

  return turndownService;
};

export const isHTML = (str: string): boolean => {
  const htmlRegex = /<[a-z][\s\S]*>/i;
  return htmlRegex.test(str);
};