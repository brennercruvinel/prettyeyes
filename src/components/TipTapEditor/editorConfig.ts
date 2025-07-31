import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import bash from "highlight.js/lib/languages/bash";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import rust from "highlight.js/lib/languages/rust";
import go from "highlight.js/lib/languages/go";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";

export const createHighlighter = () => {
  const lowlight = createLowlight();
  
  const languages = {
    javascript,
    typescript,
    python,
    bash,
    json,
    markdown,
    html: xml,
    xml,
    css,
    rust,
    go,
    java,
    cpp,
    js: javascript,
    ts: typescript,
    py: python,
    sh: bash,
  };
  
  Object.entries(languages).forEach(([name, language]) => {
    lowlight.register(name, language);
  });
  
  return lowlight;
};

export const EDITOR_PLACEHOLDER = "Start typing here...";
export const DEFAULT_FILE_NAME = "README.md";