# ISKCON Kolhapur — Full Stack Devotee Management Ecosystem

A complete full-stack web application designed for ISKCON Kolhapur. It includes devotee authentication, profile management, daily darshan scheduling, a festival and fasting calendar, and a devotional marketplace storefront.

## Features

### Authentication Portal (`Login.jsx`)
- Dual-mode panel for devotee login and registration.
- Supports login using either email or phone number.
- Clean and responsive authentication flow.

### User Dashboard (`Users.jsx`)
- Admin console to view live database accounts.
- Real-time textual fuzzy search.
- Manual credential creation.
- Document deletion support.

### Darshan Gallery (`DarshanGallery.jsx`)
- Visual schedules for daily sringar styles.
- Time block tracking for temple deity darshan.
- Calendar-based filtering and sorting.

### Devotional Calendar (`Callender.jsx`)
- Monthly tracking system for fasts and holy days.
- Ekadashi tracking with Parana breaking hours.
- Local temple activity planning.

### Spiritual Bookstore (`BookStore.jsx`)
- E-commerce style storefront for devotional literature and items.
- Live category filters.
- Interactive cart counter.

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Inline custom styling

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Dotenv
- CORS

## Project Structure

```text
├── iskcon-backend/             # Express API server
│   ├── config/
│   │   └── db.js               # MongoDB connection config
│   ├── models/
│   │   └── User.js             # Mongoose devotee schema
│   ├── routes/
│   │   └── Auth.js             # API routes
│   ├── .env                    # Environment variables
│   └── server.js               # Server entry point
│
└── iskcon-frontend/            # React SPA frontend
    └── src/
        ├── App.jsx             # Main routing layout
        ├── Sidebar.jsx         # Global sidebar menu
        ├── Login.jsx           # Authentication and registration
        ├── Users.jsx           # Admin management panel
        ├── DarshanGallery.jsx  # Deity sringar schedule panel
        ├── Callender.jsx       # Ekadashi and festival tracking
        └── BookStore.jsx       # Storefront and cart
```

## Getting Started

### 1. Database Setup
1. Launch MongoDB Compass.
2. Connect to your local MongoDB instance:

```txt
mongodb://127.0.0.1:27017
```

3. Create a database named:

```txt
iskcon_kolhapur
```

### 2. Run the Backend
Open a terminal in the backend directory and run:

```bash
cd iskcon-backend
npm install
npm run dev
```

The Express API server will start on port `5000` and connect to MongoDB.

### 3. Run the Frontend
Open a second terminal in the frontend directory and run:

```bash
cd iskcon-frontend
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal, usually:

```txt
http://localhost:5173
```

## Environment Variables

Create a `.env` file inside the `iskcon-backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/iskcon_kolhapur
```

## Module Overview

| Module | Description |
|---|---|
| Authentication System | Devotee login and registration workflow |
| User Management | CRUD-based administrative user controls |
| Darshan Gallery | Daily deity dress schedule and display |
| Festival Calendar | Ekadashi tracking and devotional events |
| Spiritual Bookstore | Devotional literature storefront UI |

## Future Improvements

- JWT authentication and session security.
- Role-based admin authorization.
- Cloud MongoDB deployment with MongoDB Atlas.
- Online donation gateway integration.
- Responsive mobile UI optimization.
- Devotional event notification system.

## Developed For

Designed and developed as a modern devotional management ecosystem for ISKCON Kolhapur, combining spirituality with scalable full-stack web technologies.