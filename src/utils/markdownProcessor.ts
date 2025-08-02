import { marked } from "marked";
import DOMPurify from "dompurify";

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true,
  pedantic: false,
});

export const processMarkdownToHTML = (markdown: string): string => {
  try {
    let processedMarkdown = markdown;

    // Pre-processar alinhamentos
    processedMarkdown = processedMarkdown.replace(
      /<div\s+align=["']center["']>/gi,
      '<div style="text-align: center">'
    );

    // Processar linhas para lidar com checkboxes
    const lines = processedMarkdown.split("\n");
    const processedLines = lines.map((line) => {
      // Substituir checkboxes por elementos HTML
      if (line.trim().match(/^-\s*\[\s*\]/)) {
        return line.replace(
          /^(\s*)-\s*\[\s*\]/,
          '$1- <input type="checkbox" disabled />'
        );
      }
      if (line.trim().match(/^-\s*\[[xX]\]/)) {
        return line.replace(
          /^(\s*)-\s*\[[xX]\]/,
          '$1- <input type="checkbox" checked disabled />'
        );
      }
      return line;
    });

    processedMarkdown = processedLines.join("\n");

    // Converter markdown para HTML
    const html = marked(processedMarkdown) as string;

    // Criar um elemento temporário para processar o HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Processar badges para garantir que fiquem inline
    tempDiv.querySelectorAll("p.badge-container").forEach((p) => {
      const span = document.createElement("span");
      span.className = "badge-container";
      span.innerHTML = p.innerHTML;
      p.replaceWith(span);
    });

    // Processar links para abrir em nova aba se externos
    tempDiv.querySelectorAll("a").forEach((link) => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("http")) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
      }
    });

    // Processar blocos de código
    tempDiv.querySelectorAll("pre").forEach((pre) => {
      pre.style.backgroundColor = "#161b22";
      pre.style.padding = "16px";
      pre.style.borderRadius = "6px";
      pre.style.overflow = "auto";
    });

    const processedHtml = tempDiv.innerHTML;

    return DOMPurify.sanitize(processedHtml, {
      ALLOWED_TAGS: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "br", "hr",
        "ul", "ol", "li",
        "blockquote",
        "strong", "b", "em", "i", "u", "s", "del", "strike",
        "code", "pre",
        "a", "img",
        "table", "thead", "tbody", "tr", "th", "td",
        "div", "span",
        "input", // Para checkboxes
        "kbd", "sup", "sub",
        "details", "summary" // Para collapsible sections
      ],
      ALLOWED_ATTR: [
        "href", "src", "alt", "title",
        "class", "id", "target", "rel",
        "type", "checked", "disabled",
        "data-language", "style", "align"
      ],
      ALLOW_DATA_ATTR: true,
    });
  } catch (error) {
    console.error("Error processing markdown:", error);
    return markdown; // Retorna o markdown original em caso de erro
  }
};