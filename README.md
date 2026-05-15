# ISKCON Kolhapur — Devotee Portal

A simple React admin UI for ISKCON Kolhapur with a sidebar layout.

## Pages

- **Login** — Devotee sign-in form (email, phone, password)
- **Users** — View, search, add, and delete users with role badges

## Stack

- React (functional components + hooks)
- Inline styles (no CSS framework)
- Google Fonts — Cinzel + Inter

## Getting Started

```bash
npm install
npm run dev
```

Render `<App />` from `ISKCONApp.jsx` as your root component.

## Structure

```
ISKCONApp.jsx
├── App          → shell (sidebar + page router)
├── Sidebar      → navigation
├── LoginPage    → sign-in form
└── UsersPage    → user management table
```