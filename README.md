<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=NoteCode&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Write%20·%20Customize%20·%20Share%20Code%20Instantly&descAlignY=60&descSize=18" width="100%" />

<br/>

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-State_Mgmt-FF9900?style=for-the-badge)](https://zustand-demo.pmnd.rs/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)]()

<br/>

> **NoteCode** is a lightning-fast, developer-friendly code sharing platform.  
> Write beautiful code, pick your theme, and share it with the world — in seconds.

<br/>

**[🚀 Live Demo](https://notecode.app)** · **[📖 Docs](https://notecode.app/docs)** · **[🐛 Report Bug](https://github.com/yourusername/notecode/issues)** · **[✨ Request Feature](https://github.com/yourusername/notecode/issues)**

</div>

---

## 📸 Preview

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════╗
║  🌙 NoteCode  [HTML ▾]  [VS Dark ▾]       [Share ⇗]  [Copy 📋]     ║
╠══════════════════════════════════════════════════════════════════════╣
║  1  │  <!DOCTYPE html>                    ║  LIVE PREVIEW           ║
║  2  │  <html lang="en">                   ║ ┌─────────────────────┐ ║
║  3  │    <head>                           ║ │                     │ ║
║  4  │      <title>Hello World</title>     ║ │   Hello, World! 👋  │ ║
║  5  │    </head>                          ║ │                     │ ║
║  6  │    <body>                           ║ └─────────────────────┘ ║
║  7  │      <h1>Hello, World!</h1>         ║                         ║
║  8  │    </body>                          ║  📊 Views: 142          ║
║  9  │  </html>                            ║  🕐 Expires: 7 days     ║
╚══════════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✨ Features

<div align="center">

| 🎯 Feature | 📝 Description |
|-----------|---------------|
| ⚡ **Monaco Editor** | Full VS Code experience — syntax highlight, IntelliSense, multi-cursor |
| 🎨 **10+ Themes** | VS Dark, Dracula, Monokai, GitHub Light & more. Saved to localStorage |
| 🔗 **Instant Share** | Unique nanoid link generated in `<200ms`. One click to copy |
| 👁️ **Live Preview** | Real-time HTML/CSS/JS output in a split-panel view |
| 🤖 **AI Assistant** | Claude-powered inline AI to explain, refactor, or generate code |
| 👥 **Live Collab** | Real-time cursor presence via Yjs + WebSocket |
| 🔒 **Privacy Control** | Public / Unlisted snippets + expiry (1h / 24h / 7d / forever) |
| 📊 **Analytics** | Per-snippet view count, unique visitors, last accessed |
| 🌐 **Public Gallery** | Browse, filter, star & fork community snippets |
| ⌨️ **Command Palette** | `Cmd+K` for everything — share, fork, change language, themes |
| 📋 **Embed Widget** | Generate `<iframe>` embed code for any snippet |
| 💾 **Auto-Save** | Drafts auto-saved every 3s with full version history |

</div>

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A([👤 User]) --> B[React UI Layer]

    B --> C[Editor View\nHome.jsx]
    B --> D[Snippet View\nSnippetView.jsx]
    B --> E[Gallery\nGallery.jsx]

    C --> F[Monaco Editor\nCodeEditor.jsx]
    C --> G[Control Panel\nControlPanel.jsx]
    C --> H[Live Preview\nLivePreview.jsx]
    C --> I[AI Panel\nAIPanel.jsx]

    G --> J[Share Action]
    J --> K{Zustand Store\nsnippetStore}

    K --> L[Axios API Client]
    L --> M[(Backend\nNode.js API)]

    M --> N[(Database\nMongoDB / Redis)]
    M --> O[Claude API\nAI Assistant]

    I --> O

    style A fill:#7F77DD,color:#fff,stroke:none
    style B fill:#534AB7,color:#fff,stroke:none
    style K fill:#1D9E75,color:#fff,stroke:none
    style M fill:#0F6E56,color:#fff,stroke:none
    style N fill:#085041,color:#fff,stroke:none
    style O fill:#D85A30,color:#fff,stroke:none
```

---

## 🔄 User Flow

```mermaid
flowchart LR
    A([Open App]) --> B[Default HTML\nloaded in editor]
    B --> C{Edit Code}
    C --> D[Select Language\n& Theme]
    D --> E[Click Share ⇗]
    E --> F{Snippet\nSaved?}
    F -->|✅ Success| G[Unique Link\nGenerated]
    F -->|❌ Error| H[Toast Error\nShown]
    G --> I[Copy Link\nto Clipboard]
    I --> J[Share via\nChat / Email / Docs]
    J --> K([Recipient Opens\nRead-Only View])
    C --> L[Auto-save\nevery 3s]
    L --> M[(localStorage\nDraft History)]

    style A fill:#534AB7,color:#fff,stroke:none
    style G fill:#1D9E75,color:#fff,stroke:none
    style H fill:#D85A30,color:#fff,stroke:none
    style K fill:#7F77DD,color:#fff,stroke:none
    style M fill:#3B6D11,color:#fff,stroke:none
```

---

## 🧩 Component Architecture

```mermaid
graph TD
    App["⚛️ App.jsx\nRouting + Providers"] --> Home
    App --> SnippetView
    App --> Gallery
    App --> NotFound

    Home["🏠 Home.jsx"] --> Navbar
    Home --> ControlPanel
    Home --> CodeEditor
    Home --> LivePreview
    Home --> AIPanel
    Home --> ShareModal
    Home --> CommandPalette
    Home --> Toast

    SnippetView["📄 SnippetView.jsx\nRead-only"] --> CodeEditor
    SnippetView --> Navbar
    SnippetView --> AnalyticsCard

    Gallery["🌐 Gallery.jsx"] --> SnippetCard
    Gallery --> FilterBar

    subgraph State ["🗄️ Zustand Stores"]
        editorStore["editorStore\ncode · language · theme"]
        snippetStore["snippetStore\nid · url · status"]
        uiStore["uiStore\nmodals · toasts · palette"]
    end

    Home -.-> State
    SnippetView -.-> State

    style App fill:#534AB7,color:#fff,stroke:none
    style State fill:#1a1a2e,color:#aaa,stroke:#534AB7
    style editorStore fill:#3c3c5a,color:#AFA9EC,stroke:none
    style snippetStore fill:#3c3c5a,color:#5DCAA5,stroke:none
    style uiStore fill:#3c3c5a,color:#EF9F27,stroke:none
```

---

## 📁 Project Structure

```
notecode/
├── 📂 public/
│   └── favicon.svg
├── 📂 src/
│   ├── 📂 components/
│   │   ├── Navbar.jsx            ← Top bar with branding + actions
│   │   ├── ControlPanel.jsx      ← Language / theme dropdowns
│   │   ├── CodeEditor.jsx        ← Monaco editor wrapper
│   │   ├── LivePreview.jsx       ← Real-time HTML output panel
│   │   ├── ShareModal.jsx        ← Link generation + copy UI
│   │   ├── AIPanel.jsx           ← Claude API chat sidebar
│   │   ├── CommandPalette.jsx    ← Cmd+K overlay
│   │   ├── Toast.jsx             ← Notification system
│   │   ├── SnippetCard.jsx       ← Gallery snippet card
│   │   └── FilterBar.jsx         ← Gallery filters
│   │
│   ├── 📂 pages/
│   │   ├── Home.jsx              ← Editor + share page
│   │   ├── SnippetView.jsx       ← Read-only shared snippet
│   │   ├── Gallery.jsx           ← Public snippet browser
│   │   └── NotFound.jsx          ← 404 page
│   │
│   ├── 📂 store/
│   │   ├── editorStore.js        ← code, language, theme state
│   │   ├── snippetStore.js       ← snippet ID, URL, status
│   │   └── uiStore.js            ← modals, toasts, palette
│   │
│   ├── 📂 hooks/
│   │   ├── useAutoSave.js        ← 3s debounce + history
│   │   ├── useShare.js           ← POST snippet + get link
│   │   ├── useKeyboard.js        ← Cmd+K and shortcut map
│   │   └── useCollaboration.js   ← Yjs + WebSocket sync
│   │
│   ├── 📂 utils/
│   │   ├── api.js                ← Axios instance + endpoints
│   │   ├── themes.js             ← Monaco theme configs
│   │   ├── languages.js          ← Language definitions
│   │   └── generateId.js         ← nanoid wrapper
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🔌 API Reference

```mermaid
sequenceDiagram
    participant U as 👤 User (React)
    participant A as ⚛️ App
    participant B as 🔧 Backend API
    participant D as 🗄️ Database

    U->>A: Clicks "Share"
    A->>B: POST /api/snippets {code, lang, theme, expiry}
    B->>D: Save snippet
    D-->>B: Stored ✅
    B-->>A: { id: "x7kR2p", url: "notecode.app/s/x7kR2p" }
    A-->>U: Show link + disable Share btn

    U->>A: Opens shared link
    A->>B: GET /api/snippets/x7kR2p
    B->>D: Fetch by ID
    D-->>B: Snippet data
    B-->>A: { code, language, theme, views }
    A-->>U: Read-only editor view
```

---

## 🚀 Getting Started

### Prerequisites

```bash
node >= 18.x
npm >= 9.x
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/notecode.git

# 2. Navigate to project directory
cd notecode

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
```

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_ANTHROPIC_API_KEY=your_claude_api_key_here
VITE_APP_URL=http://localhost:5173
```

### Run Development Server

```bash
npm run dev
```

> App will be live at **http://localhost:5173** 🎉

### Build for Production

```bash
npm run build
npm run preview
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd + K` | Open Command Palette |
| `Cmd + S` | Save / Share snippet |
| `Cmd + Shift + C` | Copy share link |
| `Cmd + Shift + P` | Toggle Live Preview |
| `Cmd + Shift + A` | Open AI Assistant |
| `Cmd + /` | Toggle line comment |
| `Cmd + Z` | Undo |
| `Cmd + Shift + Z` | Redo |

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + Vite |
| **Editor** | Monaco Editor |
| **Styling** | Tailwind CSS |
| **State** | Zustand |
| **Animation** | Framer Motion |
| **Routing** | React Router v6 |
| **HTTP** | Axios |
| **IDs** | nanoid |
| **Collab** | Yjs + WebSocket |
| **AI** | Claude API (Anthropic) |
| **Deploy** | Vercel |

</div>

---

## 🤝 Contributing

Contributions are what make the open source community amazing. Any contributions you make are **greatly appreciated**!

```bash
# 1. Fork the Project
# 2. Create your Feature Branch
git checkout -b feature/AmazingFeature

# 3. Commit your Changes
git commit -m 'feat: add AmazingFeature'

# 4. Push to the Branch
git push origin feature/AmazingFeature

# 5. Open a Pull Request
``
<div align="center">

### ⭐ Star this repo if you found it useful!

<br/>

**Built with ❤️ by developers, for developers.**

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer" width="100%" />

</div>
