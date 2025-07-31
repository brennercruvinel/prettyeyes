# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
- Refactored all modals to use Mantine components
- Improved code organization and removed redundant comments
- Updated dependencies to latest versions
- Enhanced TypeScript type safety
- Import/export buttons now follow monochrome design system

### Fixed
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