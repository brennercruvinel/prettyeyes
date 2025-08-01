import { Editor } from "@tiptap/react";
import { 
  FiFileText, FiList, FiCode, FiImage, FiTable, 
  FiAlertCircle, FiChevronDown, FiHash, FiCheckSquare,
  FiTerminal, FiPackage, FiGitBranch, FiLink,
  FiLayout, FiUsers, FiTool, FiBook
} from "react-icons/fi";
import { processMarkdownToHTML } from "../../utils/markdownProcessor";

interface Template {
  id: string;
  name: string;
  category: string;
  icon: any;
  content: string;
  description?: string;
}

interface RightSidebarProps {
  editor: Editor | null;
  isEditorReady: boolean;
  executeCommand: (callback: (editor: Editor) => void) => void;
}

const templates: Template[] = [
  // Basics
  {
    id: "heading",
    name: "Heading",
    category: "Basics",
    icon: FiHash,
    content: "# Project Title",
    description: "Add a heading"
  },
  {
    id: "paragraph",
    name: "Paragraph",
    category: "Basics",
    icon: FiFileText,
    content: "A brief description of what this project does and who it's for",
    description: "Add a paragraph"
  },
  {
    id: "bullet-list",
    name: "Bullet List",
    category: "Basics",
    icon: FiList,
    content: `- First item
- Second item
- Third item`,
    description: "Add a bullet list"
  },
  {
    id: "task-list",
    name: "Task List",
    category: "Basics",
    icon: FiCheckSquare,
    content: `- [ ] First task
- [ ] Second task
- [x] Completed task`,
    description: "Add a task list"
  },
  {
    id: "code-block",
    name: "Code Block",
    category: "Basics",
    icon: FiCode,
    content: `\`\`\`javascript
// Your code here
console.log("Hello, World!");
\`\`\``,
    description: "Add a code block"
  },
  {
    id: "table",
    name: "Table",
    category: "Basics",
    icon: FiTable,
    content: `| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |`,
    description: "Add a table"
  },

  // README Sections
  {
    id: "installation",
    name: "Installation",
    category: "README Sections",
    icon: FiTerminal,
    content: `## Installation

\`\`\`bash
npm install package-name
\`\`\``,
    description: "Installation instructions"
  },
  {
    id: "usage",
    name: "Usage/Examples",
    category: "README Sections",
    icon: FiCode,
    content: `## Usage/Examples

\`\`\`javascript
import Component from 'my-project'

function App() {
  return <Component />
}
\`\`\``,
    description: "Usage examples"
  },
  {
    id: "features",
    name: "Features",
    category: "README Sections",
    icon: FiPackage,
    content: `## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform`,
    description: "List project features"
  },
  {
    id: "contributing",
    name: "Contributing",
    category: "README Sections",
    icon: FiGitBranch,
    content: `## Contributing

Contributions are always welcome!

See \`contributing.md\` for ways to get started.

Please adhere to this project's \`code of conduct\`.`,
    description: "Contributing guidelines"
  },
  {
    id: "license",
    name: "License",
    category: "README Sections",
    icon: FiBook,
    content: `## License

[MIT](https://choosealicense.com/licenses/mit/)`,
    description: "License information"
  },
  {
    id: "acknowledgements",
    name: "Acknowledgements",
    category: "README Sections",
    icon: FiUsers,
    content: `## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)`,
    description: "Credits and acknowledgements"
  },

  // Advanced
  {
    id: "api-reference",
    name: "API Reference",
    category: "Advanced",
    icon: FiLink,
    content: `## API Reference

#### Get all items

\`\`\`http
  GET /api/items
\`\`\`

| Parameter | Type     | Description                |
|:----------|:---------|:---------------------------|
| \`api_key\` | \`string\` | **Required**. Your API key |`,
    description: "API documentation"
  },
  {
    id: "tech-stack",
    name: "Tech Stack",
    category: "Advanced",
    icon: FiTool,
    content: `## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express`,
    description: "Technology stack"
  },
  {
    id: "screenshots",
    name: "Screenshots",
    category: "Advanced",
    icon: FiImage,
    content: `## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)`,
    description: "Add screenshots"
  },
  {
    id: "roadmap",
    name: "Roadmap",
    category: "Advanced",
    icon: FiLayout,
    content: `## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document`,
    description: "Project roadmap"
  },
  {
    id: "alert",
    name: "Alert/Note",
    category: "Advanced",
    icon: FiAlertCircle,
    content: `> [!NOTE]
> Useful information that users should know, even when skimming content.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.`,
    description: "Add alert boxes"
  },
  {
    id: "collapsible",
    name: "Collapsible Section",
    category: "Advanced",
    icon: FiChevronDown,
    content: `<details>
<summary>Click to expand!</summary>

This content is hidden by default and can be expanded.

\`\`\`javascript
console.log("Hidden code!");
\`\`\`
</details>`,
    description: "Expandable content"
  }
];

const groupedTemplates = templates.reduce((acc, template) => {
  if (!acc[template.category]) {
    acc[template.category] = [];
  }
  acc[template.category].push(template);
  return acc;
}, {} as Record<string, Template[]>);

export function RightSidebar({ isEditorReady, executeCommand }: RightSidebarProps) {
  const handleTemplateClick = (template: Template) => {
    if (!isEditorReady) return;

    // Convert markdown to HTML and insert
    const htmlContent = processMarkdownToHTML(template.content);
    
    // Use executeCommand to safely run editor commands
    executeCommand((ed) => {
      // Inserir conteúdo
      ed.chain()
        .focus()
        .insertContent(htmlContent)
        .run();
    });
  };

  return (
    <div className="w-64 bg-github-surface border-l border-github-border h-full flex flex-col">
      <div className="p-4 border-b border-github-border">
        <h2 className="text-sm font-semibold text-github-text">Sections</h2>
        <p className="text-xs text-github-muted mt-1">Click to insert templates</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category} className="border-b border-github-border">
            <div className="px-4 py-2 bg-github-bg">
              <h3 className="text-xs font-semibold text-github-muted uppercase tracking-wider">
                {category}
              </h3>
            </div>
            <div className="p-2 space-y-1">
              {categoryTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateClick(template)}
                  className="w-full flex items-center gap-3 p-2 rounded-lg text-sm text-left
                    bg-github-bg border border-github-border
                    hover:bg-github-surface hover:border-github-muted
                    transition-colors group"
                  title={template.description}
                >
                  <template.icon className="w-4 h-4 text-github-muted group-hover:text-github-text" />
                  <span className="text-github-text">{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}