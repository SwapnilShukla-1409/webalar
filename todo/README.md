Real-Time Collaborative To‑Do Board
A full‑stack, real‑time Kanban‑style to‑do board for teams—build with the MERN stack plus Socket.IO—featuring live sync, smart assignment, conflict resolution, and an activity log.

📖 Table of Contents
Overview

Features

Tech Stack

Project Structure

Setup & Installation

Prerequisites

Backend

Frontend

Environment Variables

Usage

API Endpoints

Deployment

Demo & Video

License

🔍 Overview
This application lets multiple users collaborate on shared to‑do boards in real time. Tasks move through three stages—Todo, In Progress, Done—and can be created, edited, deleted, assigned, and dragged between columns. Every action is broadcast live via WebSockets, logged for audit, and protected by JWT‑based authentication.

✨ Features
User Auth: Secure sign‑up & login with hashed passwords and JWT

Kanban Board: Three columns; click‑to‑move or drag‑and‑drop tasks

Real‑Time Sync: Socket.IO broadcasts creates, updates, deletes instantly

Smart Assign: One‑click assign to the user with the fewest active tasks

Conflict Resolution: Detect concurrent edits, prompt to merge or overwrite

Activity Log: Records last 20 actions (who, what, when) and updates live

Responsive UI: Works on desktop and mobile, custom‑styled

🛠 Tech Stack
Frontend

React (Vite)

Axios

Socket.IO‑client

React Router

Backend

Node.js, Express

MongoDB (Mongoose)

Socket.IO

JWT for auth, bcrypt for password hashing

📂 Project Structure
pgsql
Copy
Edit
real-time-todo/
├── backend/
│   ├── controllers/
│   ├── models/
│   │   ├── Task.js
│   │   ├── User.js
│   │   └── ActionLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── actionRoutes.js
│   ├── utils/
│   │   └── logger.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Column.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── ActivityLog.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── SocketContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Board.jsx
│   │   │   └── TaskPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── vite.config.js
└── README.md
⚙️ Setup & Installation
Prerequisites
Node.js v16+

npm

MongoDB (running locally or MongoDB Atlas)

Backend
Navigate

cd backend
Install dependencies

npm install
Create .env (see Env Variables)

Start server

bash
Copy
Edit
npm run dev
npm start runs node server.js

npm run dev runs nodemon server.js

The backend listens on http://localhost:5000/.

Frontend
Navigate

cd frontend
Install dependencies

npm install
Start dev server

npm run dev
The frontend runs on http://localhost:5173/.

🔑 Environment Variables
Create backend/.env with:

PORT=5000
MONGO_URI=mongodb://localhost:27017/realtime-todo
JWT_SECRET=your_jwt_secret
🚀 Usage
Register a new user → log in.

Access the Board at /board: create tasks, move them, assign.

Use Smart Assign to auto‑allocate tasks.

Watch Activity Log update live.

If two people edit the same task, you’ll see a conflict prompt.

📡 API Endpoints
Authentication
Method	Endpoint	Body	Response
POST	/api/auth/register	{ username, email, password }	{ message }
POST	/api/auth/login	{ username, password }	{ token, user }

Tasks
Method	Endpoint	Body	Response
GET	/api/tasks	—	[Task]
POST	/api/tasks	{ title, description, status, priority, assignedTo, username, userId }	Task
PUT	/api/tasks/:id	{ ...fields, username }	Task
DELETE	/api/tasks/:id	{ username } (in data for axios)	{ message }

Actions (Activity Log)
Method	Endpoint	Body	Response
GET	/api/actions	—	[ActionLog]
📜 License
This project is licensed under the MIT License. Feel free to use and modify!