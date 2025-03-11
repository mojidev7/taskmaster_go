# TaskMaster - Full Stack Task Management App

A simple task management application built with:

- Go (Gin + GORM) for the backend
- MySQL for persistent storage
- Redis for caching
- Next.js for the frontend

## Project Structure

```
taskmaster/
├── backend/         # Go backend API
├── frontend/        # Next.js frontend
└── docker-compose.yml
```

## Setup and Running

1. Start the database and Redis:

```bash
docker-compose up -d
```

2. Start the backend:

```bash
cd backend
go run main.go
```

3. Start the frontend:

```bash
cd frontend
npm run dev
```

4. Open http://localhost:3000 in your browser

## API Endpoints

- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Features

- Create, read, update, and delete tasks
- Task status management
- Caching with Redis for performance
- Responsive UI built with Chakra UI
