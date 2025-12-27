# Dominik Tyrnel - Portfolio & Study Hub

## Complete Project Documentation

**Version**: 3.0  
**Last Updated**: December 27, 2024  
**Status**: Production Deployed ✅

---

## 📖 Documentation Index

This directory contains the **complete, structured documentation** for the Dominik Tyrnel Portfolio & Study Hub project. If you're looking for information, start here.

### 🚀 Getting Started

| Document                            | Purpose                                    | Audience                          |
| ----------------------------------- | ------------------------------------------ | --------------------------------- |
| **[QUICKSTART →](./QUICKSTART.md)** | 15-minute setup guide                      | New developers                    |
| **[AI GUIDE →](./AI_GUIDE.md)**     | Complete source of truth for AI assistants | AI agents working on this project |

### 🏗 Architecture & Technical

| Document                            | Purpose                                       |
| ----------------------------------- | --------------------------------------------- |
| **[DATA MODEL →](./DATA_MODEL.md)** | Firestore collections, schemas, relationships |
| **[VISION →](./VISION.md)**         | High-level project vision and requirements    |
| **[BOT →](./BOT.md)**               | YouTube Study Bot architecture                |

### 🚢 Deployment & Operations

| Document                                      | Purpose                          |
| --------------------------------------------- | -------------------------------- |
| **[TROUBLESHOOTING →](./TROUBLESHOOTING.md)** | Common issues and solutions      |
| **[CHANGELOG →](./CHANGELOG.md)**             | Version history and recent fixes |

---

## 🎯 Project Overview

### What is This?

A **dual-purpose web application**:

1. **Professional Portfolio** (CV Section)
   - Korean/English/Czech multilingual support
   - Project showcase, documents, contact form
   - PDF-friendly CV printing

2. **Study Hub** (Korean Learning Platform)
   - Real-time study tracking via YouTube bot
   - Study records heatmap & statistics
   - FAQ system, study planner, quiet inbox
   - User Profile System (@handle, badges, stats)
   - Separate Korean/English language system

3. **Admin Panel** (100% Czech UI)
   - Full CRUD for all content (19 admin pages)
   - Bot health monitoring + status dashboard
   - Bulk operations (FAQ, Inbox, Plan templates)
   - Data import/export (JSON/CSV)

### Tech Stack

| Technology   | Version | Usage                     |
| ------------ | ------- | ------------------------- |
| React        | 19.2    | Frontend framework        |
| TypeScript   | 5.9     | Type safety               |
| Vite         | 7.2     | Build tool                |
| Tailwind CSS | 4.1     | Styling                   |
| Firebase     | 12.7    | Backend (Firestore, Auth) |
| YouTube Bot  | -       | Cloud Run (study_bot/)    |

### Live URLs

- **Production**: https://dominik-tyrnel.web.app
- **Bot Health**: https://study-bot-940573639306.europe-west1.run.app/health
- **Firebase Console**: https://console.firebase.google.com/project/tyrnel-web-portfolio

---

## 📂 Directory Structure

```
tyrnel_site/
├── src/
│   ├── components/        # Reusable components (admin/, study/, sections/)
│   ├── pages/
│   │   ├── admin/        # 19 admin CRUD pages
│   │   └── study/        # 12 Study Hub pages
│   ├── layouts/          # AdminLayout, StudyLayout
│   ├── hooks/            # 13 custom React hooks
│   └── lib/              # Firebase, auth, utilities
├── public/
│   ├── sw.js            # Service Worker (CRITICAL)
│   └── img/             # Static images
├── study_bot/           # YouTube Live Chat bot (TypeScript)
│   ├── src/core/        # Core managers (stats, youtube, obs, stream)
│   └── dist/            # Compiled JavaScript
├── functions/           # Cloud Functions
└── docs/               # ✅ You are here
```

---

## 🎓 Key Concepts

### 1. Two Separate Language Systems

- **CV_LANG** (Korean/English/Czech) - for Portfolio/CV section
- **STUDY_LANG** (Korean/English) - for Study Hub section
- These are **completely independent** (design decision in vision.md)

### 2. Study Hub is a "Sub-App"

- Study Hub (`/study/*`) is lazy-loaded
- Has its own providers (`StudyThemeProvider`, `StudyLanguageProvider`)
- Isolated CSS scope (`.study-scope`)
- Own theme system (Day/Night)

### 3. Bot Integration (v3.0)

- YouTube Live Chat bot (`study_bot/`) writes to Firestore
- Bot uses **Admin SDK** (not web client)
- Bot collections: `bot_status`, `stream_stats`, `study_sessions`, `active_sessions`
- **Cloud Run Multi-Instance**: Uses `active_sessions` for robustness

### 4. Admin Panel

- Requires Firebase Auth (email/password)
- User must exist in `admins/{uid}` with `isAdmin: true`
- **All UI in Czech** (per vision.md)

---

## 🚨 Critical Information

### Service Worker

The app uses a Service Worker (`public/sw.js`) with **specific cache rules**:

❌ **NEVER cache**: `/index.html`, `/`  
✅ **Cache forever**: Hashed JS/CSS/images

**Why?** Caching index.html causes stale chunk errors after deployment.

### Auto-Reload Mechanism

On new deployments:

1. `index.html` has `<meta name="app-version" content="TIMESTAMP">`
2. Inline script checks version vs localStorage
3. If mismatch → auto-reload
4. `GlobalErrorFallback` catches chunk errors → auto-reload

---

## 📞 Support & Contact

- **Project Owner**: Dominik Tyrnel
- **Repository**: https://github.com/animat12356/personal_site
- **AI assistants**: Read [AI_GUIDE.md](./AI_GUIDE.md) first

---

**You are in**: `docs/README.md`  
**Last Updated**: December 27, 2024 (v3.0)
