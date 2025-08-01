# Contributing to PrettyEyes

Thank you for your interest in contributing to PrettyEyes! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

1. **Search existing issues** - Check if the issue has already been reported
2. **Create a detailed report** - Include:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, browser, Node.js version)
   - Screenshots if applicable

### Suggesting Features

1. **Check the roadmap** - Review existing feature requests and planned features
2. **Open a discussion** - Create an issue with:
   - Clear use case description
   - Proposed implementation approach
   - Alternative solutions considered

### Contributing Code

#### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/prettyeyes.git
   cd prettyeyes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

#### Development Workflow

1. **Make your changes** - Follow the existing code style and patterns
2. **Test your changes** - Ensure the editor works as expected
3. **Run linting** - Check for code quality issues:
   ```bash
   npm run lint
   ```
4. **Build the project** - Verify production build:
   ```bash
   npm run build
   ```
5. **Commit your changes** - Use clear, descriptive commit messages:
   ```bash
   git commit -m "Add: feature description"
   ```

#### Commit Message Guidelines

Use the following format for commit messages:
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for improvements to existing features
- `Remove:` for removed features or code
- `Refactor:` for code restructuring
- `Docs:` for documentation changes

#### Submitting Pull Requests

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Create a pull request with:
   - Clear title describing the change
   - Detailed description of what was changed and why
   - Reference to any related issues
   - Screenshots for UI changes

### Code Style Guidelines

#### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type
- Use meaningful variable and function names

#### React

- Use functional components with hooks
- Keep components focused and reusable
- Extract complex logic into custom hooks
- Follow React best practices

#### Styling

- Use TailwindCSS utility classes
- Follow the existing design system
- Maintain consistency with GitHub's dark theme
- Ensure responsive design

### Testing

While we don't have formal tests yet, please:
- Manually test all changes thoroughly
- Test in different browsers
- Verify mobile responsiveness
- Check for console errors

### Documentation

- Update README.md if adding new features
- Add inline comments for complex logic
- Update CHANGELOG.md following Keep a Changelog format

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Environment Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

### Project Structure

```
prettyeyes/
   src/
      components/     # React components
      stores/         # State management
      styles/         # Global styles
      App.tsx         # Main application
   public/             # Static assets
   package.json        # Dependencies
```

## Areas Needing Help

### High Priority

- **Testing infrastructure** - Set up testing framework and write tests
- **Accessibility** - Improve keyboard navigation and screen reader support
- **Performance** - Optimize rendering and memory usage
- **Mobile experience** - Fix responsive issues

### Medium Priority

- **Documentation** - Improve inline documentation and API docs
- **Error handling** - Better error messages and recovery
- **Internationalization** - Support for multiple languages
- **Browser compatibility** - Test and fix cross-browser issues

### Nice to Have

- **Theme support** - Light theme option
- **Plugin system** - Extensibility for custom features
- **Collaboration** - Real-time editing capabilities
- **Cloud sync** - Save documents to cloud services

## Questions?

Feel free to:
- Open an issue for questions
- Start a discussion for ideas
- Reach out to maintainers

Thank you for contributing to PrettyEyes!