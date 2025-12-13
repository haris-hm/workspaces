# Workspaces

_A lightweight collaborative note taking app with real-time updates._

---

## Overview

This is a full-stack note taking application which allows multiple users to connect to a "workspace" and edit and create notes all in real-time. Implements a WebSocket server using Socket.IO to facilitate broadcasting real-time updates to all users in a given workspace. The app is intended to be a lightweight alternative for quick collaborative note-taking tasks and can be used by students, professionals, or just about anyone.

---

## Live Demo

| Type                         | Link                                                                                             | Alternate Link                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| **Frontend (Deployed Site)** | [https://workspaces.harismehuljic.com](https://workspaces.harismehuljic.com/)                    | [Netlify URL](https://workspaces-cs195.netlify.app/)           | 
| **Backend (API Base URL)**   | [https://workspaces-api.harismehuljic.com](https://workspaces-api.harismehuljic.com/api/routes/) | [Render URL](https://workspaces-ajr3.onrender.com/api/routes/) |

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

### Desktop UI

![Desktop UI](/assets/desktop-ui.png)

### Mobile UI

![Mobile UI](/assets/mobile-ui.png)

### Landing Page

![Landing Page UI](/assets/landing-page.png)

### New Workspace Modal

![New Workspace Modal](/assets/workspace-changing-modal.png)

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

### HTTP Server

#### **GET /api/workspace/:code**

Returns a [Workspace](/server/models/Workspace.js) object that is identified by the 6-digit code provided as a URL parameter.

#### **POST /api/workspace**

Creates a new workspace. Returns the resulting [Workspace](/server/models/Workspace.js) object.

Body example:

```json
{
  "name": "Example Workspace"
}
```

#### **GET /api/note?workspaceId=<ID>**

Gets all the notes attached to the given workspace ID. Returns an array of [Note](/server/models/Note.js) objects.

#### **GET /api/note/:id**

Returns the [Note](/server/models/Note.js) object identified by the `:id` note ID.

#### **POST /api/note/**

Creates a new note in the given workspace. Returns the resulting [Note](/server/models/Note.js) object.

Body example:

```json
{
  "workspaceId": "693c76418d8c08cd377294cb"
}
```

Optional body parameters:

```json
{
  "title": "New Example Note",
  "content": "Example note body."
}
```

#### **PUT /api/note/:id**

Updates the note with a new title and content. Returns the resulting [Note](/server/models/Note.js) object.

Body example:

```json
{
  "title": "Example Note",
  "content": "Example note body. Wow! More content in the body!"
}
```

#### **DELETE /api/note/:id**

Deletes a note given its ID. Returns nothing.

### Socket.IO Server

#### **join-workspace**

Parameters:

- `workspaceId`
- The name of the person joining the room

Emits:

- An `update-members` event to all the clients connected to the `workspaceId` room.
- Payload contains the new members list.

#### **leave-workspace**

Emits:

- An `update-members` event to all the clients connected to the `workspaceId` room.
- Payload contains the new members list.

#### **disconnect**

Occurs when a client closes the website.

Emits:

- An `update-members` event to all the clients connected to the `workspaceId` room.
- Payload contains the new members list.

#### **note-created**

Parameters:

- `workspaceId`
- The note object created

Emits:

- A `note-created` event to all the clients connected to the `workspaceId` room.
- Payload contains the newly created note object.

#### **note-updated**

Parameters:

- `workspaceId`
- The note object that was updated

Emits:

- A `note-updated` event to all the clients connected to the `workspaceId` room.
- Payload contains the updated note object.

#### **note-deleted**

Parameters:

- `workspaceId`
- The note object that was deleted with a modified `updatedAt` date.

Emits:

- A `note-deleted` event to all the clients connected to the `workspaceId` room.
- Payload contains the deleted note's ID.

---

## Deployment Notes

### **Frontend**

- Deployed using [Netlify](https://www.netlify.com/)
- Built using `npm run build`, then served with `npm start`
- Environment variables used to define backend URLs

### **Backend**

- Deployed using [Render](https://render.com/)
- Built using `npm run build`, then served with `npm start`
- Environment variables configured to define the frontend URL for CORS and the MongoDB connection string

---

## Video Walkthrough

**View the showcase on [YouTube](https://youtu.be/lkY9bKPoGlQ)**

Timestamps:

- 0:00 Intro
- 0:17 Desktop Demo
- 2:05 Mobile UI Demo
- 2:38 Codebase Tour
- 3:02 Codebase Tour - Backend Logic
- 3:58 Codebase Tour - Frontend Logic
- 4:38 Codebase Tour - Debouncing Technical Challenge
- 5:23 Codebase Tour - Frontend Logic (cont.)

---

# Reflection

### **1. What was the hardest part of this project?**

The hardest part of the project was definitely implementing the real-time updating features through Socket.IO. I had some prior experience with Socket.IO, which definitely helped, but it's always a bit of a challenge trying to wrap your mind around how to implement both the HTTP API endpoints and the WebSocket events. There were also a lot of considerations that I had to keep in mind when implementing the real-time updates, as I had to implement a way to delay sending updates by a bit in order to not completely spam the server with WebSocket and API requests.

### **2. What are you most proud of?**

I think I'm most proud of the real-time features, as it was really satisfying being able to see updates happen on other clients when typing on a note. Another thing I'm proud of is probably how the desktop and mobile UI turned out, although, I would still tweak some things if I had more time.

### **3. What would you do differently next time?**

Given the time constraint, I would've probably reduced the scope a little bit. I ended up having to skip some of the stretch features, like tagging notes and being able to search/filter through notes by tag. Most of my time was spent on getting the real-time updates to work. Also, I would probably make my own components to display on the page instead of using window alerts for things like delete confirmations or error messages. Because of time constraints, I went with the latter.

### **4. How did you incorporate feedback from the 12/5 check-in gallery?**

Some feedback I received was to add other features, like embedding images into notes, but I chose not to and kept my scope the same as I wanted to be able to finish the MVP. Also, based on feedback, I revamped the original mobile UI, as it was not very friendly to use

---

# Acknowledgments / AI Usage Disclosure

## Icons

- All icons used throughout the app were obtained through [SVGRepo](https://svgrepo.com/)

## AI Usage

- Used GitHub Copilot for autocomplete suggestions whenever they were useful.
- Asked Copilot about a React key error that I was getting, but ended up solving the problem myself as its suggestions did not work.
- Used ChatGPT briefly for some help with sorting out how to organize my Socket endpoints in the server.
- Used GitHub Copilot to start writing function documentation. Most generated documentation was edited after the fact.
