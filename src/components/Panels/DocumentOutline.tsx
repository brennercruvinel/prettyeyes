import { useState, useEffect } from "react";
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiFileTextLine,
  RiH1,
  RiH2,
  RiH3,
} from "react-icons/ri";

interface DocumentOutlineProps {
  markdown: string;
}

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function DocumentOutline({ markdown }: DocumentOutlineProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const lines = markdown.split("\n");
    const newHeadings: Heading[] = [];

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        newHeadings.push({
          id: `heading-${index}`,
          text,
          level,
        });
      }
    });

    setHeadings(newHeadings);
    // Expand all sections by default
    setExpandedSections(new Set(newHeadings.map((h) => h.id)));
  }, [markdown]);

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const getHeadingIcon = (level: number) => {
    switch (level) {
      case 1:
        return RiH1;
      case 2:
        return RiH2;
      case 3:
        return RiH3;
      default:
        return RiFileTextLine;
    }
  };

  if (headings.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="px-4 py-3 border-b border-[#30363d]">
          <h3 className="text-sm font-semibold text-[#c9d1d9]">
            Estrutura do Documento
          </h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center text-[#6e7681]">
            <RiFileTextLine className="text-4xl mx-auto mb-3 opacity-50" />
            <p className="text-sm">Nenhum título encontrado</p>
            <p className="text-xs mt-2 opacity-70">
              Adicione títulos (H1, H2, H3) para ver a estrutura
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-[#30363d]">
        <h3 className="text-sm font-semibold text-[#c9d1d9]">
          Estrutura do Documento
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          {headings.map((heading, index) => {
            const Icon = getHeadingIcon(heading.level);
            const isExpanded = expandedSections.has(heading.id);
            const hasChildren =
              index < headings.length - 1 &&
              headings[index + 1].level > heading.level;

            return (
              <div key={heading.id}>
                <button
                  onClick={() => hasChildren && toggleSection(heading.id)}
                  className={`
                    w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left
                    hover:bg-[#30363d] transition-colors group
                    ${heading.level === 1 ? "font-semibold" : ""}
                  `}
                  style={{ paddingLeft: `${(heading.level - 1) * 16 + 8}px` }}
                >
                  {hasChildren && (
                    <span className="text-[#6e7681] group-hover:text-[#8b949e] transition-colors">
                      {isExpanded ? (
                        <RiArrowDownSLine />
                      ) : (
                        <RiArrowRightSLine />
                      )}
                    </span>
                  )}

                  <Icon
                    className={`
                      flex-shrink-0 transition-colors
                      ${
                        heading.level === 1
                          ? "text-[#58a6ff]"
                          : heading.level === 2
                            ? "text-[#a371f7]"
                            : "text-[#6e7681]"
                      }
                    `}
                    size={16}
                  />

                  <span
                    className={`
                      text-sm truncate flex-1
                      ${
                        heading.level === 1
                          ? "text-[#c9d1d9]"
                          : "text-[#8b949e] group-hover:text-[#c9d1d9]"
                      }
                    `}
                  >
                    {heading.text}
                  </span>
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="px-4 py-2 border-t border-[#30363d] text-xs text-[#6e7681]">
        {headings.length} {headings.length === 1 ? "título" : "títulos"}
      </div>
    </div>
  );
}
