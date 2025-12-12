# Workspaces

_A lightweight collaborative note taking app with real-time updates._

---

## Overview

This is a full-stack note taking application which allows multiple users to connect to a "workspace" and edit and create notes all in real-time. Implements a WebSocket server using Socket.IO to facilitate broadcasting real-time updates to all users in a given workspace. The app is intended to be a lightweight alternative for quick collaborative note-taking tasks and can be used by students, professionals, or just about anyone.

---

## Live Demo

| Type                         | Link                                                                                                                                                                              |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [https://workspaces.harismehuljic.com](https://workspaces.harismehuljic.com/) (Also accessible through the [Netlify URL]())                                                       |
| **Backend (API Base URL)**   | [https://workspaces-api.harismehuljic.com](https://workspaces-api.harismehuljic.com/api/routes) (Also accessible through the [Render URL](https://workspaces-ajr3.onrender.com/)) |

---

## Features

Key features:

- Ability to create, read, update, and delete notes within workspaces.
- Responsive UI with reusable components and both desktop and mobile support.
- Backend API with full CRUD operations.
- Data saved in MongoDB.
- Real-time updates to notes in workspaces achieved through WebSockets using Socket.IO
- Full error handling for all API endpoints on the server and for various things on the client side.

### **Advanced Feature**

The app uses WebSockets implemented using the Socket.IO library in order to facilitate real-time updates to the notes in each workspace by connecting each client to a socket room for that specific workspace. Each time an event (note updated, deleted, created) occurs on a single client, that update is sent to the WebSocket server and broadcasted to all other clients connected to that workspace's socket room.

---

## Screenshots

> Include 2–4 screenshots of your app.
> Use relative paths (e.g., `/screenshots/home.png`) or full URLs.

---

## Project Architecture

Folder Structure:

```
/client
  /public
    /icons
    favicon.svg
  /src
    /api
    /components
    /hooks
    /pages
    App.jsx
    index.css
    main.jsx

/server
  /models
  /routes
  /sockets
  /utils
  server.js
```

The backend sets up both an Express server and a Socket.IO WebSocket server. Whenever a user connects to a workspace or interacts with notes in anyway, a request is made to the backend through HTTP API routes, and a WebSocket event is emitted to the Socket.IO server. Whenever the backend receives a request through the HTTP API routes, that data is saved to MongoDB using the Mongoose models defined in `/server/models`. Whenever the Socket.IO server receives an event, it broadcasts relevant information to all other clients connected to that socket room in order to update that note for everyone else connected to a workspace. Environment variables are used to store secrets and CORS/backend URLs.

---

## Installation & Setup

### **1. Clone the project**

```bash
git clone https://github.com/haris-hm/workspaces
cd workspaces
```

---

### **2. Environment Variables**

**Client `.env.example`:**

```
VITE_API_URL=http://localhost:3001/api
VITE_SOCKET_URL=http://localhost:3001
```

**Server `.env.example`:**

```
MONGODB_URI=mongodb+srv://<mongodb_url>
PORT=3001

CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

---

### **3. Install Dependencies**

#### Client:

```bash
cd client
npm install
npm run dev
```

#### Server:

```bash
cd server
npm install
npm run dev
```

---

### **4. Running Entire App Locally**

1. Start server on `http://localhost:3001`
2. Serve client on `http://localhost:5173`
3. Confirm CORS + API requests are working

---

## API Documentation

Document the **main 3–5 routes**:

### **GET /api/resource**

Returns all resources.

### **POST /api/resource**

Creates a new resource.
Body example:

```json
{
  "name": "Example",
  "description": "Text here"
}
```

### **PATCH /api/resource/:id**

Updates a resource.

### **DELETE /api/resource/:id**

Deletes a resource.

> Add additional routes if needed (auth, file uploads, WebSockets, etc.).

---

## Deployment Notes

Document where/how you deployed:

### **Frontend**

- Vercel / Netlify
- Explain build command if different (`npm run build`)

### **Backend**

- Render / Railway
- Note environment variable setup

---

## Video Walkthrough

**Link to Loom/YouTube:**
[https://your-video-link.com](https://your-video-link.com)

Include quick timestamps if you want extra professionalism:

- **0:00–0:30** Overview
- **0:30–1:30** Core features demo
- **1:30–2:30** Advanced feature
- **2:30–3:00** Technical challenge solved

---

# Reflection

_(This section is required for grading.)_

### **1. What was the hardest part of this project?**

Write 3–5 sentences.

### **2. What are you most proud of?**

Could be a feature, a UI improvement, debugging work, or personal growth.

### **3. What would you do differently next time?**

Think in terms of planning, scoping, or tech choices.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

Be explicit (this is graded):

> “Based on feedback, I reduced scope by removing X and focused on stabilizing Y.”
> “I reorganized my components for readability after feedback about structure.”

---

# Acknowledgments / AI Usage Disclosure

## Icons

- All icons used throughout the app were obtained through [SVGRepo](https://svgrepo.com/)

## AI Usage

- Used GitHub Copilot for autocomplete suggestions whenever they were useful.
- Asked Copilot about a React key error that I was getting, but ended up solving the problem myself as its suggestions did not work.
- Used ChatGPT briefly for some help with sorting out how to organize my Socket endpoints in the server.
