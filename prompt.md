# AI Usage Log

## Message 1: React + Vite Setup
**Prompt**: "Can you provide a simple react + vite setup please"
**Context**: Initial project setup and scaffolding

What Claude helped with:

- Provided step-by-step bash commands to create a new Vite project with React template
- Included npm install and development server startup commands
- Added build and preview commands for production

Key parts of project affected:

- Project initialization and development environment setup

## Message 2: Dev Server Port Configuration
**Prompt**: "How to setup Dev server runs on port 4000"
**Context**: Configuring Vite development server to use a custom port

What Claude helped with:

- Provided complete vite.config.js configuration file for port 4000
- Explained the server object and its key properties (port, open)
- Included optional advanced settings (host, strictPort)
- Showed command to run dev server with new configuration

Key parts of project affected:

- Vite configuration (vite.config.js)
- Development environment setup

## Message 3: Create 2 Sample React Pages in TypeScript
**Prompt**: "Create 2 simple sample page for react in ts"
**Context**: Building sample pages to demonstrate React + TypeScript patterns

What Claude helped with:

- Created Anime.tsx page with basic component structure and FC typing
- Created About.tsx page with useState hook and TypeScript typing for state
- Updated App.tsx to include navigation between pages
- Provided setup instructions for enabling TypeScript in Vite project
- Showed proper TypeScript patterns (FC type, interface definitions, generic typing for useState)

Key parts of project affected:

- src/pages/Anime.tsx
- src/App.tsx

## Message 4: Jikan API Integration Sample
**Prompt**: "Sample of using jikan api"
**Context**: Creating a React component that fetches and displays anime data from the Jikan API

What Claude helped with:

- Created Anime.tsx component with full Jikan API integration
- Implemented TypeScript interfaces for API response types (AnimeData, AnimeListResponse)
- Added search functionality with form handling

Key parts of project affected:

- src/pages/Anime.tsx
- API integration patterns and error handling

## Message 5: Debounced Search Input
**Prompt**: "A simple sample of debounce typing a field to send request instead of click submit button"
**Context**: Implementing debounced search functionality to automatically trigger API requests after user stops typing

What Claude helped with:

- Implemented automatic search trigger after 500ms of no typing
- Added cleanup function to clear timeouts on component unmount

Key parts of project affected:

- src/pages/Anime.tsx

## Message 6: Global State Management Implementation
**Prompt**: "How to implement a simple global variable to store it so that i can reuse the variable"
**Context**: Setting up global state management for sharing data across components

What Claude helped with:

- Provided four different approaches to global state management
- Method 1: React Context API with custom hook (recommended, built-in React solution)

Key parts of project affected:

- src/context/GlobalContext.tsx (new file)
