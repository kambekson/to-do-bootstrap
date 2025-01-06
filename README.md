# To-Do Bootstrap App

A small React + Vite dashboard for managing tasks with a Bootstrap-based interface. The project includes a sidebar navigation, a task board, and sample pages for clients, inbox, and contacts.

## Features

- Responsive layout built with Bootstrap and Bootstrap Icons
- Sidebar navigation between main sections
- Task management page with:
  - creating new tasks
  - viewing tasks by status
  - updating task status in the board
- Simple routing with React Router

## Tech Stack

- React 18
- Vite
- React Router DOM
- Bootstrap 5
- Bootstrap Icons

## Getting Started

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

3. Open the local URL shown by Vite in your browser.

## Available Scripts

- npm run dev — starts the development server
- npm run build — creates a production build
- npm run preview — previews the production build locally
- npm run lint — runs ESLint checks

## Project Structure

- src/main.jsx — app entry point and router setup
- src/App.jsx — main layout with sidebar and outlet
- src/components/ — reusable UI components such as Header, Sidebar, TaskForm, and TaskList
- src/pages/ — page views for Clients, Tasks, Inbox, and Contacts

## Mobile View

The layout includes a responsive breakpoint for smaller screens using Bootstrap utilities and the shared CSS variables in src/index.css.

- `--sidebar-width` controls the desktop sidebar width.
- `--mobile-breakpoint` is used as the responsive threshold for the mobile layout.

## Notes

The task page uses sample data for demonstration purposes. You can extend the project by connecting the task board to a real backend or persistence layer in the future.
