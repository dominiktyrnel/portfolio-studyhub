# 🎓 Study Hub & Portfolio

A modern web application combining a **professional portfolio** with a **real-time Korean study tracking platform**.

**🌐 Live Demo: [dominik.tyrnel.com](https://dominik.tyrnel.com)**

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)

---

## ✨ Features

### 📄 Portfolio Section
- **Multilingual** - Korean, English, Czech
- **Project Gallery** - Filterable portfolio with image lightbox
- **Professional CV** - Print-friendly layout
- **Contact Form** - Firebase-powered messaging

### 📚 Study Hub
- **Live Tracking** - Real-time study sessions via YouTube bot
- **Statistics** - Daily/monthly heatmaps and progress charts
- **Pomodoro Timer** - Focus/break cycle integration
- **User Profiles** - Custom handles, badges, study stats
- **PWA Support** - Installable on mobile devices

### ⚙️ Admin Panel
- **Content Management** - Full CRUD for all sections
- **Bot Monitoring** - Real-time health dashboard
- **Data Tools** - Import/export, backup management

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, TypeScript, Vite 7 |
| **Styling** | Tailwind CSS 4, CSS Variables |
| **Backend** | Firebase (Firestore, Auth, Storage) |
| **Hosting** | Firebase Hosting |
| **Bot** | Node.js on Cloud Run |
| **PWA** | Service Worker, Web App Manifest |

---

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/yourusername/study-hub.git
cd study-hub

# Install dependencies
npm install

# Configure environment
cp .env.example .env.development
# Edit .env.development with your Firebase config

# Start development server
npm run dev
```

Visit `http://localhost:5173`

---

## 📁 Project Structure

```
├── src/
│   ├── pages/
│   │   ├── admin/      # Admin CRUD pages
│   │   └── study/      # Study Hub pages
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Firebase, utilities
├── study_bot/          # YouTube Live Chat bot
├── functions/          # Cloud Functions
├── public/             # Static assets, PWA
└── docs/               # Documentation
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [QUICKSTART](./docs/QUICKSTART.md) | 15-minute setup guide |
| [DATA_MODEL](./docs/DATA_MODEL.md) | Firestore schema reference |
| [VISION](./docs/VISION.md) | Project architecture & design |
| [CHANGELOG](./docs/CHANGELOG.md) | Version history |

---

## 🔧 Key Features Implementation

### Dark Theme
Consistent dark mode across all sections using CSS custom properties and Tailwind tokens.

### PWA
Full Progressive Web App support with offline capability, install prompts, and push-ready architecture.

### Real-time Updates
Firebase Firestore listeners for live study session tracking and bot status monitoring.

### Internationalization
Dual language system - separate providers for Portfolio (KR/EN/CZ) and Study Hub (KR/EN).

---

## 📄 License

This project is private. All rights reserved.

---

**Built with ❤️ by Dominik Tyrnel**  
**December 2025**
