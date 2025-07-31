import { useState, useEffect, useCallback } from "react";
import "./styles/globals.css";
import TipTapEditor from "./components/TipTapEditor/TipTapEditor";
import { FiMenu, FiDownload, FiUpload, FiFileText, FiSettings, FiChevronRight } from "react-icons/fi";
import { toast, Toaster } from "sonner";

function App() {
  const [fileName, setFileName] = useState("Untitled");
  const [content, setContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleExportMarkdown = useCallback(() => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = `${fileName}.md`;
    downloadLink.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${fileName}.md`);
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
        setFileName(file.name.replace(/\.(md|markdown|txt)$/, ''));
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
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault();
        setSidebarOpen(!sidebarOpen);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [content, fileName, sidebarOpen, handleExportMarkdown]);

  return (
    <div className="flex h-screen bg-[var(--notion-bg)]">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-200 bg-[var(--notion-bg-secondary)] border-r border-[var(--notion-border)] overflow-hidden`}>
        <div className="p-4">
          {/* Workspace Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                P
              </div>
              <span className="font-semibold text-[var(--notion-text)]">PrettyEyes</span>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="notion-btn-icon"
            >
              <FiChevronRight className={`transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} size={16} />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="space-y-1 mb-6">
            <button
              onClick={handleImportFile}
              className="notion-btn w-full justify-start"
            >
              <FiUpload size={16} />
              <span>Import</span>
            </button>
            <button
              onClick={handleExportMarkdown}
              className="notion-btn w-full justify-start"
            >
              <FiDownload size={16} />
              <span>Export</span>
            </button>
          </div>

          {/* Documents */}
          <div className="mb-6">
            <div className="text-xs font-semibold text-[var(--notion-text-tertiary)] uppercase tracking-wider mb-2">
              Documents
            </div>
            <div className="space-y-1">
              <div className="notion-btn w-full justify-start bg-[var(--notion-bg-hover)]">
                <FiFileText size={16} />
                <span className="truncate">{fileName}</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="mt-auto pt-4 border-t border-[var(--notion-border)]">
            <button className="notion-btn w-full justify-start">
              <FiSettings size={16} />
              <span>Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-12 flex items-center justify-between px-6 border-b border-[var(--notion-border)] bg-[var(--notion-bg)]">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="notion-btn-icon"
              >
                <FiMenu size={18} />
              </button>
            )}
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="bg-transparent border-none outline-none text-lg font-semibold text-[var(--notion-text)] placeholder-[var(--notion-text-tertiary)]"
              placeholder="Untitled"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--notion-text-tertiary)]">
              {content.length} characters
            </span>
          </div>
        </header>

        {/* Editor */}
        <main className="flex-1 overflow-hidden">
          <TipTapEditor
            content={content}
            onChange={(html) => {
              setContent(html);
            }}
            onMarkdownChange={(markdown) => {
              setContent(markdown);
            }}
          />
        </main>
      </div>

      <Toaster 
        position="bottom-right" 
        theme="dark"
        toastOptions={{
          style: {
            background: 'var(--notion-bg-secondary)',
            color: 'var(--notion-text)',
            border: '1px solid var(--notion-border)',
            borderRadius: '6px',
            fontSize: '14px',
          },
        }}
      />
    </div>
  );
}

export default App;