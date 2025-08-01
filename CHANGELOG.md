# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Dual Sidebar System** for enhanced productivity
  - **Left Sidebar**: Real-time document structure visualization with drag-and-drop reordering
  - **Right Sidebar**: Quick template insertion with categorized README sections
- Interactive document navigation - click any block to jump to it
- Template library with 18+ pre-built sections (Installation, Usage, Contributing, etc.)
- Advanced templates including API Reference, Tech Stack, and Roadmap
- Collapsible sections support for better content organization
- Real-time synchronization between editor and document structure
- @dnd-kit integration for smooth drag-and-drop experience
- useEditorState hook for robust editor state management
- Markdown to HTML processor with GitHub-flavored markdown support
- Mantine UI integration for improved modal UX/UI
- Drag and drop functionality for block reordering
- Dark theme optimizations for GitHub-style appearance
- Enhanced table creation with interactive grid selector
- Badge creation modal with live preview
- Image upload support with file input
- Command palette improvements
- Professional documentation (CONTRIBUTING.md, LICENSE)
- GitHub workflows for CI/CD
- Issue and PR templates

### Changed
- Enhanced editor architecture to support multiple synchronized views
- Improved content detection and insertion with debounced updates
- Optimized performance with efficient block tracking algorithms
- Refactored all modals to use Mantine components
- Improved code organization and removed redundant comments
- Updated dependencies to latest versions
- Enhanced TypeScript type safety
- Import/export buttons now follow monochrome design system

### Fixed
- Editor synchronization issues between sidebars
- TipTap v3 compatibility with duplicate extension errors
- "Editor view is not available" errors with safe state management
- Template insertion not triggering document structure updates
- TypeScript errors with proper timer type definitions
- Modal positioning and responsiveness issues
- Drag handle visibility and interaction bugs
- Import/export functionality edge cases
- All TypeScript compilation errors
- ESLint warnings and unused imports
- Variable hoisting issues in components
- Mantine theme compatibility issues

## [1.0.0] - 2024-01-31

### Added
- Initial release of PrettyEyes
- WYSIWYG Markdown editor with GitHub-accurate rendering
- Real-time preview functionality
- Command palette with slash commands
- Support for GitHub Flavored Markdown
- Export to .md, .html, and .txt formats
- Syntax highlighting for code blocks
- Table editor with visual interface
- Image insertion via URL
- Link management with auto-detection
- Keyboard shortcuts for common actions
- Smart content detection for paste operations

### Technical Features
- Built with React 19 and TypeScript
- TipTap editor as core engine
- Vite for fast development and builds
- TailwindCSS 4 for styling
- DOMPurify for XSS protection
- Marked for Markdown parsing
- Lowlight for syntax highlighting

[Unreleased]: https://github.com/brennercruvinel/prettyeyes/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/brennercruvinel/prettyeyes/releases/tag/v1.0.0