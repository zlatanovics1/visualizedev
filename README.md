# DEVELOP & VISUALIZE

## ABOUT

Done with NextJS14, TypeScript, TailwindCSS, PostgreSQL edge functions and real-time operations, Zod, Shadcn, React-hook-form, ReactQuery, Redux...

This project uses Framer Motion and other libraries to visualize some basic data structures and algorithms.

Other part is more of a social media app that helps developers connect and interact with each other. You can create standalone channels, add friends (direct messages are in progress - v2) explore various tech stacks and build something fun with integrated code editor.

## 🚀 Features

- ✅ Realtime channel-based messaging (Supabase)
- ✅ Friend system with invites
- ✅ Auth (Sign up, login, secure settings)
- ✅ DSA playground with interactive visualizers
- ✅ Dark mode and responsive UI
- ✅ Fully typed with TypeScript


## 🧩 Tech Stack

- **Frontend**: Next.js (App Router), Tailwind CSS
- **Backend**: Supabase (auth, db, realtime)
- **State**: Redux Toolkit, React Query
- **Styling**: Tailwind, custom components
- **Deployment**: Vercel (recommended)

---
<img width="1508" alt="image" src="https://github.com/user-attachments/assets/7dbc78cc-c9df-4462-bc36-4825fce81139" />

---
<img width="1507" alt="image" src="https://github.com/user-attachments/assets/3907229d-8d1e-4881-bb5a-a4cba9d627da" />

---

## IMPORTANT

You need to authenticate yourself before sending messages and creating channels, or doing other CRUD operations.

### NOTICE
Working on v2 - real-time coding support & AI assistance in the playground.


## 📁 Project Structure

### `app/`
Main entry point for pages and routing.

- **`(main)/`**: Core app sections
  - **`(chat)/`**: Full chat experience with:
    - **Channels** (`channels/`): Create, join, and explore chat channels
    - **Explore** (`explore/`): Discover public content or chats
    - **Friends** (`friends/`): Add/search friends, manage friend list
    - **Settings**: Update credentials or preferences
  - **`(dsa)/playground/`**: DSA visual learning with:
    - **Learn**: BFS, DFS, Sorting, Stack, Recursion – with live visualizers
    - **Session**: WIP section for guided problem-solving sessions
    - **DarkMode**, **NavCollapse**: UX controls
  - **`login/` and `signup/`**: Auth screens

- **`actions/`**: Server and client actions
  - Auth, chat, channel, and settings logic

- **`auth/`**: Auth callback handler (e.g., OAuth)

- **`routes/`**: API route logic (e.g., friends)

- **Global files**: `error.tsx`, `globals.css`, `layout.tsx`, `not-found.tsx`

---

### `client-config/`
Client-side configuration for:
- Code editor defaults
- Constants and navigation options
- Graph rendering parameters

---

### `components/`
Organized UI and functional components.

- **`providers/`**: Context providers (Redux, React Query)
- **`ui/`**: Reusable UI parts
  - **Chat**: `Message.tsx`, `MessageInput.tsx`, `GlobalChat.tsx`, etc.
  - **Playground**: Visualizer toggles, definitions, code editors
  - Common UI: `Modal`, `DropdownMenu`, `Loader`, etc.

---

### `context/`
- Global state management (e.g., dark mode provider)

---

### `database/`
Supabase clients and types for:
- Realtime chat
- Auth and user data

---

### `hooks/`
Custom React hooks:
- Local state sync
- Modal behavior
- Input handling

---

### `lib/`
Utility functions (shared logic)

---

### `project-config/`
Project meta:
- Features list
- UI and tech stack breakdown

---

### `public/`
Static assets: logos, visual aids (e.g., sorting.png, recursion.png)

---

### `store/`
Redux slices and central store configuration

---

### `types/`
TypeScript interfaces for:
- Forms
- React Query
- Database

---

### `utils/`
Domain-specific utilities:
- **Auth**: User/session fetching
- **Channels & Friends**: API handlers
- **Messages**: Likes/messages/query client updates
- **Algorithms**: Shared helpers for playground


---

## 📚 Learning Playground Topics

- Graph Algorithms (BFS, DFS)
- Recursion
- Stack
- Sorting
- Definitions and editor snippets

---

## 📬 Contributing

Feel free to open issues, request features, or fork the repo and build your own learning/chat fusion platform!


