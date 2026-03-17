# UniVerse

This project is organized into the following directories:

## Directory Structure

- **frontend/**: Contains the React + Vite frontend application.
  - Run with: `npm run dev` (inside `frontend` directory)
  - Port: 5173

- **backend/**: Contains the Node.js + Express + Prisma backend API.
  - Run with: `npm run dev` (inside `backend` directory)
  - Port: 3001

- **database/**: Contains database schemas and migration scripts (Prisma).
  - The main Prisma setup is currently inside `backend/prisma` as it's tightly coupled with the backend service.
  - This directory contains additional or backup Prisma configurations.

## Getting Started

1. **Setup Backend:**
   ```bash
   cd backend
   npm install
   # Configure .env if needed
   npm run dev
   ```

2. **Setup Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
