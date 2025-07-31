import { useState, useEffect, useCallback } from "react";
import "./styles/globals.css";
import TipTapEditor from "./components/TipTapEditor/TipTapEditor";
import { FiEye, FiDownload, FiUpload } from "react-icons/fi";
import { toast, Toaster } from "sonner";

function App() {
  const [fileName, setFileName] = useState("README.md");
  const [content, setContent] = useState("");

  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    downloadLink.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${fileName}`);
  }, [content, fileName]);

  const handleImportFile = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".md,.markdown,.txt";
    fileInput.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const fileContent = await file.text();
        setContent(fileContent);
        setFileName(file.name);
        toast.success(`Imported ${file.name}`);
      }
    };
    fileInput.click();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleExportMarkdown();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'o') {
        e.preventDefault();
        handleImportFile();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [content, fileName, handleExportMarkdown]);


  return (
    <div className="flex flex-col h-screen bg-github-bg">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-github-surface border-b border-github-border">
        <div className="flex items-center gap-6">
          <h1 className="flex items-center gap-2 text-xl font-semibold text-github-text">
            <FiEye className="text-2xl" />
            PrettyEyes
          </h1>
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="px-3 py-1.5 bg-github-bg border border-github-border rounded text-github-text text-sm w-48 focus:outline-none focus:border-github-accent"
            placeholder="README.md"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleImportFile}
            className="flex items-center gap-2 px-4 py-2 bg-github-surface border border-github-border rounded-md text-github-text text-sm font-medium hover:bg-github-bg transition-all duration-200 shadow-sm hover:shadow"
            title="Import File (Ctrl+O)"
          >
            <FiUpload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={handleExportMarkdown}
            className="flex items-center gap-2 px-4 py-2 bg-github-text hover:bg-gray-100 text-github-bg rounded-md text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            title="Export Markdown (Ctrl+S)"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden bg-github-bg">
        <TipTapEditor
          content={content}
          onChange={(html) => {
            // For now we're storing HTML, but we can convert to markdown later
            setContent(html);
          }}
          onMarkdownChange={(markdown) => {
            // This gives us the markdown version
            setContent(markdown);
          }}
        />
      </main>

      <Toaster 
        position="top-center" 
        theme="dark"
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
      />

      {/* Status Bar */}
      <footer className="flex items-center justify-between px-6 py-2 bg-github-surface border-t border-github-border text-sm text-github-muted">
        <span>Press / for commands</span>
        <span>{content.length} characters</span>
      </footer>
    </div>
  );
}

export default App;
