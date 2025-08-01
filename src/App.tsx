import { useState, useEffect, useCallback } from "react";
import "./styles/globals.css";
import TipTapEditor from "./components/TipTapEditor/TipTapEditor";
import { FiEye, FiDownload, FiUpload, FiCopy } from "react-icons/fi";
import { toast, Toaster } from "sonner";
import { LeftSidebar } from "./components/Sidebar/LeftSidebar";
import { RightSidebar } from "./components/Sidebar/RightSidebar";
import { useEditorState } from "./hooks/useEditorState";

function App() {
  const [fileName, setFileName] = useState("README.md");
  const [content, setContent] = useState("");
  const { editor, isEditorReady, setEditor, executeCommand } = useEditorState();

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

  const handleCopyMarkdown = useCallback(() => {
    navigator.clipboard.writeText(content).then(() => {
      toast.success("Markdown copied to clipboard!");
    }).catch(() => {
      toast.error("Failed to copy markdown");
    });
  }, [content]);

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
            className="px-3 py-1.5 text-sm bg-github-bg border border-github-border rounded-lg text-github-text w-48 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-colors"
            placeholder="README.md"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyMarkdown}
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-github-border bg-github-bg text-github-muted hover:bg-github-surface hover:text-github-text transition-colors"
            title="Copy Markdown to Clipboard"
          >
            <FiCopy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>
          <button
            onClick={handleImportFile}
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-github-border bg-github-bg text-github-muted hover:bg-github-surface hover:text-github-text transition-colors"
            title="Import File (Ctrl+O)"
          >
            <FiUpload className="w-4 h-4" />
            <span className="hidden sm:inline">Import</span>
          </button>
          <button
            onClick={handleExportMarkdown}
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border border-github-border bg-github-bg text-github-muted hover:bg-github-surface hover:text-github-text transition-colors"
            title="Export Markdown (Ctrl+S)"
          >
            <FiDownload className="w-4 h-4" />
            Export
          </button>
        </div>
      </header>

      {/* Main Content with Sidebars */}
      <main className="flex-1 flex overflow-hidden bg-github-bg">
        {/* Left Sidebar */}
        <LeftSidebar editor={editor} isEditorReady={isEditorReady} />
        
        {/* Editor */}
        <div className="flex-1 overflow-hidden">
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
            onEditorReady={(editorInstance) => {
              setEditor(editorInstance);
            }}
          />
        </div>
        
        {/* Right Sidebar */}
        <RightSidebar editor={editor} isEditorReady={isEditorReady} executeCommand={executeCommand} />
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
