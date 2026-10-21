// To add a project, copy a block and change the text.
// titulo: name | texto: one-line summary | detalle: longer story | funciones: feature list
// stack: tools used | estado: status | imagen: optional screenshot | enlace: optional link
const PROYECTOS = [
  {
    titulo: "FerNote",
    texto: "A native Mac notes app inspired by Apple Notes.",
    detalle: "I wanted an app that works like Apple Notes but that I fully control. I studied how Notes is built, then wrote my own version from scratch and kept adding the features I use every day.",
    funciones: ["Folders, subfolders and #hashtag tags", "Rich text: styles, lists, clickable checklists, block quotes, links and attachments", "Tables (Tab moves between cells)", "Smart Folders that fill themselves from rules", "Password-locked notes with real encryption", "Voice recording attached to a note", "Quick note from anywhere with a global shortcut", "Links between notes", "Sync across devices through iCloud Drive", "Recently Deleted with 30-day recovery, export to PDF, print"],
    stack: "Swift, SwiftUI, AppKit",
    estado: "Working. Used daily on my Mac.",
    enlace: ""
  },
  {
    titulo: "LoRiNote",
    texto: "A handwriting notebook app for Mac inspired by Goodnotes.",
    detalle: "A notebook app where you write and draw by hand, annotate PDFs and keep everything organized in a library. I took Goodnotes apart to learn how it works and built my own take on it.",
    funciones: ["Library with folders, favorites and a trash bin", "Continuous scrolling pages with zoom", "Pen, pencil, highlighter, eraser, lasso, shapes, text, sticky notes and images", "Page templates: ruled, squared, dotted, Cornell and music", "Import, annotate and export PDFs", "Search that also finds your handwriting (on-device text recognition)", "Password-protected notebooks", "Audio recording synced with your strokes, so you can replay what was said while you wrote"],
    stack: "Swift, SwiftUI, AppKit, Vision",
    estado: "Working on Mac. Audio sync still needs more testing with a real microphone.",
    enlace: ""
  },
  {
    titulo: "ZeroDay",
    texto: "A custom Matrix-style terminal emulator for Mac.",
    detalle: "My own terminal app with a hacker look: a Matrix code-rain intro, glowing green text and custom themes. It runs a real shell, just like Terminal. There is also a companion SSH client for iPhone.",
    funciones: ["Real terminal emulator with its own rendering engine", "Matrix code-rain intro screen", "Custom color themes with glow effects", "Companion iPhone app for SSH connections"],
    stack: "Swift, SwiftUI, AppKit",
    estado: "Mac app working. The iPhone version is built but not yet tested on a device.",
    imagen: "img/zeroday.png",
    enlace: ""
  },
  {
    titulo: "FingLocal",
    texto: "A self-hosted network scanner inspired by Fing.",
    detalle: "Fing is a popular app that shows what is connected to your Wi-Fi. I built my own version that runs on a small always-on computer at home and watches the network all day.",
    funciones: ["Discovers every device on the home network", "Keeps a history of when devices appear and disappear", "Sends an instant Telegram alert when an unknown device joins", "Password-protected web dashboard", "A Mac app that is just a window onto the always-on server"],
    stack: "Node.js, Raspberry Pi, Telegram bot",
    estado: "Running 24/7 at home.",
    enlace: ""
  },
  {
    titulo: "GitScout",
    texto: "A local search tool that finds the best GitHub repositories.",
    detalle: "Searching GitHub gives you thousands of results and no easy way to tell which are good. GitScout searches for a topic and ranks the repositories so the best ones come first.",
    funciones: ["Search any topic", "Ranks repositories by quality signals", "Runs locally in the browser, nothing to sign up for"],
    stack: "Node.js, GitHub API",
    estado: "Working.",
    enlace: ""
  },
  {
    titulo: "PromptWrangler",
    texto: "A Mac app that turns lazy prompts into great ones.",
    detalle: "You type a rough idea and the app rewrites it into a clear, detailed prompt for an AI assistant. It can use several AI providers and switches to another one automatically if the first fails. This very website started from a prompt improved with it.",
    funciones: ["Standard prompts and reusable prompt templates", "Seven AI providers with automatic fallback", "Library to save your best prompts", "Memories: facts about you it can reuse", "One-click copy of the improved prompt"],
    stack: "Swift, SwiftUI",
    estado: "Working.",
    enlace: ""
  },
  {
    titulo: "Pluma",
    texto: "A private, local Grammarly-style writing assistant.",
    detalle: "Pluma checks your spelling and grammar in English and Spanish in any app, without sending your text to the cloud. It lives in the menu bar.",
    funciones: ["Grammar and spelling checks in English and Spanish", "Works across apps from the menu bar", "100% local: your text never leaves the Mac"],
    stack: "Swift, LanguageTool, macOS Accessibility",
    estado: "Working.",
    enlace: ""
  },
  {
    titulo: "FeRTv",
    texto: "An IPTV player ported from Fire TV to Samsung smart TVs.",
    detalle: "I had a TV player app for Amazon Fire TV and wanted the same experience on my Samsung TV, so I ported it to Samsung's Tizen platform.",
    funciones: ["Channel list and playback with the TV remote", "Designed for the big screen"],
    stack: "JavaScript, HTML, Tizen",
    estado: "Tested in the browser. Not yet installed on the TV.",
    enlace: ""
  },
  {
    titulo: "FeRHome",
    texto: "An Apple TV-style launcher for a Samsung TV.",
    detalle: "A home screen for my Samsung TV that looks like Apple TV, with big tiles for my apps. It can even switch the TV to other devices such as a game console.",
    funciones: ["Big tile launcher controlled by the remote", "Opens my own TV apps", "Switches to other HDMI devices through a small helper"],
    stack: "JavaScript, HTML, Tizen, Raspberry Pi",
    estado: "Working.",
    enlace: ""
  },
  {
    titulo: "VidGrab",
    texto: "A Mac app and Chrome extension for saving videos from the web.",
    detalle: "Similar to Video DownloadHelper. Paste a link or click the Chrome extension on a page and VidGrab saves the video. It does not bypass DRM, so it only works with content you have the right to save.",
    funciones: ["Paste several links at once", "Quality choice up to 1080p, or MP3 only", "Up to four downloads at a time with a queue", "Chrome extension that detects videos on the page", "Can use your browser login for videos that need it"],
    stack: "Swift, SwiftUI, Python, yt-dlp, Chrome extension",
    estado: "Working.",
    imagen: "img/vidgrab.png",
    enlace: ""
  },
  {
    titulo: "PhotoNAS",
    texto: "An iPhone app that backs up photos to my home server.",
    detalle: "It uploads my iPhone photos to my own storage server at home, and only while I am on my home Wi-Fi, so nothing goes through anyone else's cloud.",
    funciones: ["Automatic photo upload to my own server", "Only runs on the home Wi-Fi", "A Shortcut that triggers it when I get home"],
    stack: "Swift, SwiftUI, iOS",
    estado: "Finished and working.",
    enlace: ""
  },
  {
    titulo: "FerFTP",
    texto: "A two-pane FTP, FTPS and SFTP client for Mac.",
    detalle: "A file transfer app with your computer on the left and the server on the right. Drag or press Upload and Download to move files.",
    funciones: ["FTP, FTPS and SFTP support", "Two-pane browser with sizes and dates", "Saved connections", "Connection log"],
    stack: "Swift, SwiftUI",
    estado: "Working.",
    enlace: ""
  }
];

const ACTIVIDADES = [
  { fecha: "2026-10-21", texto: "Published this personal site." },
  { fecha: "2026-10-20", texto: "Built FerFTP." },
  { fecha: "2026-10-20", texto: "Built PhotoNAS." },
  { fecha: "2026-10-20", texto: "Built VidGrab." },
  { fecha: "2026-10-19", texto: "Built FeRHome." },
  { fecha: "2026-10-19", texto: "Built FeRTv." },
  { fecha: "2026-10-18", texto: "Built Pluma." },
  { fecha: "2026-10-17", texto: "Built PromptWrangler." },
  { fecha: "2026-10-15", texto: "Built GitScout." },
  { fecha: "2026-10-14", texto: "Built FingLocal." },
  { fecha: "2026-10-14", texto: "Built ZeroDay, a Matrix-style terminal." },
  { fecha: "2026-10-14", texto: "Built LoRiNote, my own handwriting notebook app." },
  { fecha: "2026-10-14", texto: "Built FerNote, my own notes app for Mac." }
];
