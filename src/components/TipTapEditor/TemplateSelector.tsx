import { useState } from 'react';
import { FiFileText, FiPackage, FiGithub, FiBook, FiCode, FiServer } from 'react-icons/fi';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  content: string;
}

const templates: Template[] = [
  {
    id: 'basic',
    name: 'Basic README',
    description: 'Simple project documentation',
    icon: FiFileText,
    content: `# Project Name

Brief description of what this project does and who it's for

## Features

- Feature 1
- Feature 2
- Feature 3

## Installation

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`javascript
const example = require('example');
example.doSomething();
\`\`\`

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

[MIT](https://choosealicense.com/licenses/mit/)`,
  },
  {
    id: 'awesome',
    name: 'Awesome README',
    description: 'Comprehensive with badges and sections',
    icon: FiGithub,
    content: `<div align="center">

# 🚀 Awesome Project Name

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/username/repo/releases)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/username/repo/actions)

<p align="center">
  <strong>A brief description of what makes your project awesome</strong>
</p>

[Demo](https://demo.example.com) • [Documentation](https://docs.example.com) • [Report Bug](https://github.com/username/repo/issues)

</div>

## ✨ Features

- 🎯 **Feature 1** - Description of feature 1
- 🚀 **Feature 2** - Description of feature 2
- 💡 **Feature 3** - Description of feature 3
- 🔧 **Feature 4** - Description of feature 4

## 📦 Installation

### Prerequisites

- Node.js >= 14.0.0
- npm >= 6.0.0

### Install

\`\`\`bash
# Clone the repository
git clone https://github.com/username/repo.git

# Navigate to project directory
cd repo

# Install dependencies
npm install
\`\`\`

## 🚀 Quick Start

\`\`\`bash
npm start
\`\`\`

## 📖 Documentation

Check out our [full documentation](https://docs.example.com) for detailed information.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

See [CONTRIBUTING.md](CONTRIBUTING.md) for ways to get started.

## 📝 License

This project is [MIT](LICENSE) licensed.

## 💖 Support

Give a ⭐️ if this project helped you!

---

<p align="center">Made with ❤️ by <a href="https://github.com/username">Your Name</a></p>`,
  },
  {
    id: 'api',
    name: 'API Documentation',
    description: 'REST API or library documentation',
    icon: FiServer,
    content: `# API Name

> Brief API description

## Base URL

\`\`\`
https://api.example.com/v1
\`\`\`

## Authentication

This API uses API keys for authentication. Include your API key in the header:

\`\`\`bash
Authorization: Bearer YOUR_API_KEY
\`\`\`

## Endpoints

### Get All Items

\`\`\`http
GET /items
\`\`\`

#### Response

\`\`\`json
{
  "items": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "Description of item 1"
    }
  ],
  "total": 100,
  "page": 1
}
\`\`\`

### Get Single Item

\`\`\`http
GET /items/:id
\`\`\`

#### Parameters

| Name | Type | Description |
|------|------|-------------|
| id | string | **Required**. Item ID |

### Create Item

\`\`\`http
POST /items
\`\`\`

#### Request Body

\`\`\`json
{
  "name": "New Item",
  "description": "Item description"
}
\`\`\`

## Error Responses

| Status Code | Description |
|-------------|-------------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Internal Server Error |

## Rate Limiting

API calls are limited to 1000 requests per hour per API key.`,
  },
  {
    id: 'npm-package',
    name: 'NPM Package',
    description: 'For JavaScript/TypeScript packages',
    icon: FiPackage,
    content: `# package-name

> Brief package description

[![NPM Version](https://img.shields.io/npm/v/package-name.svg)](https://www.npmjs.com/package/package-name)
[![Downloads](https://img.shields.io/npm/dm/package-name.svg)](https://www.npmjs.com/package/package-name)
[![License](https://img.shields.io/npm/l/package-name.svg)](https://github.com/username/package-name/blob/master/LICENSE)

## Installation

\`\`\`bash
npm install package-name
# or
yarn add package-name
\`\`\`

## Usage

### Basic Example

\`\`\`javascript
const package = require('package-name');

// Example usage
const result = package.doSomething({
  option1: 'value1',
  option2: 'value2'
});
\`\`\`

### TypeScript

\`\`\`typescript
import { doSomething } from 'package-name';

const result = doSomething({
  option1: 'value1',
  option2: 'value2'
});
\`\`\`

## API Reference

### \`doSomething(options)\`

Does something useful.

#### Parameters

- \`options\` (Object)
  - \`option1\` (string) - Description of option1
  - \`option2\` (string) - Description of option2

#### Returns

- (Promise<Result>) - Description of return value

## Examples

See [examples](./examples) directory for more usage examples.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Your Name](https://github.com/username)`,
  },
  {
    id: 'tutorial',
    name: 'Tutorial/Guide',
    description: 'Step-by-step tutorial format',
    icon: FiBook,
    content: `# Tutorial: How to Build X

> A step-by-step guide to building X from scratch

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setting Up](#setting-up)
3. [Step 1: Initial Setup](#step-1-initial-setup)
4. [Step 2: Core Implementation](#step-2-core-implementation)
5. [Step 3: Testing](#step-3-testing)
6. [Conclusion](#conclusion)

## Prerequisites

Before starting this tutorial, you should have:

- Basic knowledge of JavaScript
- Node.js installed (v14 or higher)
- A text editor (VS Code recommended)

## Setting Up

First, create a new directory for our project:

\`\`\`bash
mkdir my-project
cd my-project
npm init -y
\`\`\`

## Step 1: Initial Setup

### 1.1 Install Dependencies

\`\`\`bash
npm install express
npm install -D nodemon
\`\`\`

### 1.2 Create Basic Structure

Create the following file structure:

\`\`\`
my-project/
├── src/
│   └── index.js
├── package.json
└── README.md
\`\`\`

## Step 2: Core Implementation

Let's start building our application:

\`\`\`javascript
// src/index.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

> **Note:** Make sure to save the file before proceeding.

## Step 3: Testing

Run your application:

\`\`\`bash
npm start
\`\`\`

Visit http://localhost:3000 in your browser.

## Conclusion

Congratulations! You've successfully built X. 

### What's Next?

- Try adding more routes
- Implement middleware
- Connect a database

### Resources

- [Official Documentation](https://example.com)
- [Community Forum](https://forum.example.com)
- [Video Tutorial](https://youtube.com/example)`,
  },
  {
    id: 'cli-tool',
    name: 'CLI Tool',
    description: 'Command-line tool documentation',
    icon: FiCode,
    content: `# cli-tool-name

> Brief description of your CLI tool

## Installation

### Global Installation

\`\`\`bash
npm install -g cli-tool-name
\`\`\`

### Local Installation

\`\`\`bash
npm install --save-dev cli-tool-name
\`\`\`

## Usage

### Basic Command

\`\`\`bash
cli-tool [options] <command>
\`\`\`

### Commands

#### \`init\`

Initialize a new project

\`\`\`bash
cli-tool init [project-name]
\`\`\`

Options:
- \`--template, -t\` - Project template (default: "default")
- \`--skip-install\` - Skip dependency installation

#### \`build\`

Build the project

\`\`\`bash
cli-tool build [options]
\`\`\`

Options:
- \`--watch, -w\` - Watch for changes
- \`--production, -p\` - Build for production
- \`--output, -o\` - Output directory (default: "./dist")

#### \`serve\`

Start development server

\`\`\`bash
cli-tool serve [options]
\`\`\`

Options:
- \`--port, -p\` - Port number (default: 3000)
- \`--host, -h\` - Host address (default: "localhost")

### Global Options

- \`--version, -v\` - Show version number
- \`--help, -h\` - Show help
- \`--verbose\` - Verbose output
- \`--quiet, -q\` - Suppress output

## Configuration

Create a \`cli-tool.config.js\` file in your project root:

\`\`\`javascript
module.exports = {
  input: './src',
  output: './dist',
  plugins: [],
  // Other options...
};
\`\`\`

## Examples

### Basic Example

\`\`\`bash
# Initialize a new project
cli-tool init my-app

# Build the project
cd my-app
cli-tool build

# Start dev server
cli-tool serve --port 8080
\`\`\`

### Advanced Example

\`\`\`bash
# Build with custom config
cli-tool build --config custom.config.js --production

# Watch mode with verbose output
cli-tool build --watch --verbose
\`\`\`

## Troubleshooting

### Common Issues

**Issue: Command not found**
Solution: Make sure the package is installed globally

**Issue: Permission denied**
Solution: Run with sudo or fix npm permissions

## License

MIT`,
  },
];

interface TemplateSelectorProps {
  onSelectTemplate: (content: string) => void;
  onClose: () => void;
}

export default function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const handleUseTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate.content);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-github-surface border border-github-border rounded-lg w-full max-w-4xl max-h-[80vh] flex">
        <div className="w-1/3 border-r border-github-border p-4">
          <h3 className="text-lg font-semibold mb-4">README Templates</h3>
          <div className="space-y-2">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`w-full text-left p-3 rounded transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'bg-github-accent text-white'
                      : 'hover:bg-github-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      <Icon size={20} />
                    </div>
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className={`text-sm ${
                        selectedTemplate?.id === template.id
                          ? 'text-gray-200'
                          : 'text-github-muted'
                      }`}>
                        {template.description}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            {selectedTemplate ? (
              <div>
                <h4 className="text-lg font-semibold mb-2">{selectedTemplate.name}</h4>
                <div className="bg-github-bg rounded p-4 overflow-x-auto">
                  <pre className="text-sm whitespace-pre-wrap font-mono text-gray-300">
                    {selectedTemplate.content}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-github-muted">
                Select a template to preview
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-github-border flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-github-bg border border-github-border rounded hover:bg-github-border transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUseTemplate}
              disabled={!selectedTemplate}
              className="px-4 py-2 text-sm bg-github-accent text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Use Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}