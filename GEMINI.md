# Gemini Project Context: Git Cards Frontend (Next.js)

This document provides a comprehensive overview of the Git Cards frontend project, intended to be used as a context for AI-powered development assistance.

## Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with `create-next-app`. It serves as the frontend for the Git Cards application. The project uses the App Router paradigm introduced in Next.js 13.

### Main Technologies

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Framework**: React
- **UI Components**: Shadcn/ui (Radix UI Primitives), Lucide React, Phosphor Icons
- **State Management & Data Fetching**:
    - **TanStack Query**: Gerenciamento de estado assíncrono e cache de API.
- **Forms & Validation**: React Hook Form, Zod
- **Authentication**: NextAuth.js
- **Networking**: React Query (Axios)

### Architecture

The project follows a modular structure using the Next.js App Router, emphasizing separation of concerns through specialized directories.

- **`src/app`**: Contains the main application routes, layouts, and providers.
    - **`(authenticated)`**: Route group for pages requiring authentication.
    - **`api/auth`**: NextAuth.js route handlers.
    - **`guest`**: Public routes for guests.
    - **`login`**: Authentication pages.
    - **`ui`**: This directory contains visual reference components and pages (`/ui/marketplace`, `/ui/customize`, `/ui/profile`, `/ui/sign`). **These files should not be altered, as they serve purely as visual examples and will not be integrated into the final application logic.**
- **`src/modules`**: Encapsulates feature-specific logic and UI components. This is the core organizational pattern. Modules are intended for more granular, domain-specific components and functionalities, in contrast to the more generic and reusable components found in `src/components`. Modules often contain sub-folders like `form` (handlers and schemas) or specific view components.
- **`src/components`**: Reusable UI components.
    - **`ui`**: Base components (buttons, dialogs, inputs) typically from Shadcn/ui.
    - **`form`**: Specialized form field wrappers and submit buttons.
    - **`_global`**: App-wide components like `Navbar`, `Header`, `ConfirmDialog`.
- **`src/hooks`**: Custom React hooks.
    - **`api`**: Contains TanStack Query hooks organized by entity (e.g., `locker/use-get-all.ts`, `delivery/use-create.ts`).
- **`src/lib`**: Utility libraries and configurations.
    - **`api`**: Configured Axios clients for Client-side and Server-side usage.
    - **`utils.ts`**: Helper functions (e.g., class name merging).
- **`src/config`**: Configuration files, such as environment variable validation (`env.ts` using Zod).
- **`src/_types`**: TypeScript type definitions and overrides (e.g., extending NextAuth session types).
- **`src/utils`**: Helper functions for specific logic (e.g., formatting, auth checks).

## Building and Running

### Prerequisites

- Node.js and a package manager (npm, yarn, pnpm, or bun)

### Setup

1.  Install dependencies:
    ```bash
    pnpm install
    ```

### Running the Application

1.  Start the development server:
    ```bash
    pnpm run dev
    ```

2.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The main page can be modified by editing `src/app/page.tsx`. The page will auto-update as you edit the file.

### Key Scripts

- `pnpm run dev`: Starts the development server using Turbopack.
- `pnpm run build`: Creates a production-ready build of the application.
- `pnpm run start`: Starts the application in production mode (requires a build first).

## Development Conventions

- **Coding Style**: The project uses TypeScript strict mode. Forms are strictly typed using Zod schemas.
- **Data Fetching**: API calls are abstracted into custom hooks in `src/hooks/api` using TanStack Query for caching and state management. Direct `useEffect` for data fetching is discouraged.
- **Styling**: Utility-first CSS with Tailwind CSS. `cn()` utility is used for conditional class merging.
- **Path Aliases**: The alias `@/*` maps to `src/*`, and `@packages/*` maps to external/monorepo packages (e.g., shared Zod schemas).
