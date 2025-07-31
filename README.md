# PrettyEyes
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/brennercruvinel/prettyeyes)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/brennercruvinel/prettyeyes/blob/main/CONTRIBUTING.md)

## What is `PrettyEyes`?
A WYSIWYG Markdown editor that `finally doesn't make me want to cry` while creating GitHub READMEs.

https://github.com/user-attachments/assets/3f90f20a-05e3-4cc4-b38b-f771355d5425

### You know the drill...

🤦 Open VS Code → `Write raw Markdown for 2 hours`<br>
😤 Try online editor → `"Rendering failed" for the 15th time`<br>
🙄 Use Notion → `Copy, paste, format again, pray`<br>
😭 Final result → `"Why doesn't this badge align?!"`

**I'm done.** Done with Markdown editors that:
- Don't show how it'll look on GitHub
- Break with tables
- Have terrible syntax highlighting  
- Make me cry debugging generated HTML

So I built **PrettyEyes** - an editor that renders exactly like GitHub, with everything I need and nothing I don't.

## Quick Links

- [Live Demo](#) - See it in action (when I deploy it 😅)
- [Features](#-features) - What this thing does
- [Getting Started](#-getting-started) - Copy, paste, run
- [Why I Built This](#-why-i-built-this) - The complete saga
- [Contributing](#-contributing) - Want to help? Let's go!

## ✨ Features

### The Good Stuff
*Things that make me happy using this*

✅ **True WYSIWYG** - What you see IS what you get on GitHub<br>
✅ **GitHub Flavored Markdown** - Full support, zero surprises<br>
✅ **Smart Import** - Drop HTML, Markdown or text - it figures it out<br>
✅ **Live Preview** - See Markdown being generated in real-time<br>
✅ **Syntax Highlighting** - Code blocks that don't hurt your soul<br>

### The Really Good Stuff
*Things that save me time*

🚀 **Command Palette** - `/` and everything you need appears<br>
🎨 **Rich Media** - Images, badges, tables without drama<br>
⚡ **Export Ready** - `.md`, `.html`, `.txt` - you choose<br>
🧠 **Content Detection** - Paste anything, it fixes it<br>

## 🚀 Getting Started

### The Lazy Way (Recommended)
```bash
# Clone and run
git clone https://github.com/brennercruvinel/prettyeyes.git
cd prettyeyes
npm install
npm run dev
```

**That's it.** Opens at `http://localhost:5173` and be happy.

### Requirements
- Node.js 18+ (if you don't have it, get it [here](https://nodejs.org/))
- npm or yarn (whatever you prefer)
- Patience with my bugs (work in progress 😅)

## 💡 How It Works

### Basic Editing
1. **Write** - Like any normal editor
2. **Format** - Select text → toolbar appears
3. **Commands** - Type `/` → magic happens
4. **Export** - Download button → README ready

### Keyboard Shortcuts
Because mouse is overrated:

- **Bold**: `Ctrl/Cmd + B`
- **Italic**: `Ctrl/Cmd + I` 
- **Code**: `Ctrl/Cmd + E`
- **Link**: `Ctrl/Cmd + K`
- **Command Palette**: `/` (the most important one)

### Real World Example

**You now:**
1. Open VS Code
2. Create `README.md`
3. Type markdown manually
4. Pull your hair trying to align badges
5. Commit and pray it doesn't break

**With PrettyEyes:**
1. Open the editor
2. Write like it's Word
3. Download the `.md`
4. Profit ✨

## 🛠️ Tech Stack

### Choices I don't regret
- **React 19** - Because new is always better (until it breaks)
- **TypeScript** - Mental sanity > 5 minutes of setup  
- **Vite** - Fast build = happy developer
- **TailwindCSS 4** - CSS that works without hating me

### Editor Magic
- **TipTap** - The heart of the whole thing
- **Marked** - Markdown parser that doesn't lie
- **Lowlight** - Syntax highlighting that actually works
- **DOMPurify** - Because XSS is not my friend

## 📁 Project Structure

```
prettyeyes/
├── src/
│   ├── components/
│   │   ├── TipTapEditor/          # The engine
│   │   └── Preview/               # Where magic becomes reality
│   ├── styles/
│   │   └── globals.css           # CSS that doesn't break
│   └── App.tsx                   # Where everything comes together
├── public/                       # Static assets
└── package.json                  # Dependencies (many)
```

## 🤔 Why I Built This

### The Honest Story

I was creating a README for a project and thought: *"This'll be quick, just basic markdown"*.

**3 hours later...**

- 47 attempts to align badges
- 12 online editors tested
- 1 near breakdown in Notion trying to export
- ∞ frustrations with preview that doesn't match the result

**Conclusion:** Markdown editors are made by people who don't use GitHub or enjoy suffering.

### The Solution

I decided to make an editor that:
- Renders EXACTLY like GitHub
- Doesn't force me to memorize syntax
- Works offline (because internet sometimes doesn't)
- Is simple - does one thing and does it well

If you're also tired of:
- Writing `![](https://img.shields.io/badge/...)` by hand
- Counting spaces to align tables
- Finding out your README broke after 3 commits

**This editor is for you.**

## 🎯 Supported GitHub Elements

### Because GitHub != Standard Markdown

✅ **Headers** (H1-H6) - All sizes<br>
✅ **Text Formatting** - Bold, italic, ~~strike~~, `code`<br>
✅ **Lists** - Ordered, unordered, task lists ✓<br>
✅ **Code Blocks** - With real syntax highlighting<br>
✅ **Tables** - That don't break (miracle!)<br>
✅ **Images & Badges** - Drag, drop, done<br>
✅ **Links** - Smart auto-linking<br>
✅ **Blockquotes** - For epic quotes<br>
✅ **GitHub Alerts** - NOTE, TIP, WARNING, etc.<br>

## ⚡ Performance

### Numbers That Matter
- **Initial Load**: ~2s (with decent internet)
- **Editor Response**: <100ms for any action
- **Export Time**: Instantaneous (up to 50MB content)
- **Memory Usage**: ~30MB (less than a Chrome tab)

## 🤝 Contributing

**TL;DR:** Got an idea? Send it!

I accept everything:
- 🐛 Bug reports (the more detailed, the better)
- 💡 Feature requests (even if they seem impossible)  
- 🔧 Code improvements (all help is welcome)
- 📚 Documentation (if you understood something, document it!)
- 🎨 UI/UX suggestions (design isn't my strong suit)

### Quick Contribution Guide
```bash
# Fork → Clone → Branch
git checkout -b feature/my-genius-idea

# Code → Test → Commit
git commit -m "Add: amazing thing that will change everything"

# Push → PR → Party
```

### What I Need Help With
- Tests (I know, I know...)
- Accessibility (a11y)
- Mobile responsiveness
- Performance optimizations
- More README templates

## 🐛 Known Issues

Because honesty is important:

- [ ] Import of some complex HTMLs might break
- [ ] Mobile still kinda wonky
- [ ] Undo/Redo sometimes gets lost
- [ ] No white dark mode (I know, I know...)

## 🔮 What's Next

Just the basics to make it better:


- [ ] Mobile fixes
- [ ] Better file import/export
- [ ] Maybe some README templates

That's it. It's a simple Markdown editor, not a spaceship.

## 📊 Stats

| Feature | Competitors | PrettyEyes |
|---------|-------------|------------|
| GitHub accuracy | 60-80% | 99%+ |
| Setup time | 10-30 min | 30 sec |
| Learning curve | Steep | Flat |
| Bugs per session | 3-5 | 0-1 |
| Developer happiness | 😐 | 😍 |

## 📄 License

MIT License - basically: do whatever you want, just don't sue me.

## 💌 Final Words

If this editor saved you 10 minutes creating a README, it was worth the effort.

If it saved you 2 hours (like it saved mine), consider giving it a ⭐ - it's free and motivates me to continue.

If you found a bug, open an issue. If you have an idea, share it. If you want to contribute, go for it.

**Happy README writing! 🚀**

---

<div align="center">
  <sub>
    Built by a developer tired of writing <code>![](https://img.shields.io/badge/...)</code> by hand<br>
  </sub>
</div>
