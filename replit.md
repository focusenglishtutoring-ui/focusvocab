# FocusVocab - Vocabulary Learning Application

## Overview

FocusVocav is a vocabulary learning web application built with React and Express. It provides a structured learning experience where users can navigate through units containing modules of vocabulary entries, learn word definitions, and test their knowledge with quizzes. The application features a clean, academic design focused on effective language learning.

The app currently serves Spanish vocabulary content from a static JSON file, with a simple learn-then-quiz flow for each vocabulary sense. Progress is ephemeral and resets on page refresh.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth transitions between learning cards
- **Build Tool**: Vite with HMR support

The frontend follows a pages-based structure:
- `Home` - Landing page with unit overview
- `Unit` - Lists modules within a unit
- `Module` - The main learning experience with learn/quiz steps

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with tsx for TypeScript execution
- **API Pattern**: Simple REST endpoints defined in `shared/routes.ts`
- **Data Storage**: Currently uses `JsonStorage` class that loads vocabulary from a static JSON file at startup
- **Database Schema**: Drizzle ORM configured with PostgreSQL (schema defined but database features not yet implemented)

### Shared Code Pattern
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts` - Zod schemas defining data types (Unit, Module, Entry, Sense, Quiz)
- `routes.ts` - API route definitions with type-safe response schemas

### Build System
- Development: Vite dev server with Express backend via middleware
- Production: Vite builds to `dist/public`, esbuild bundles server to `dist/index.cjs`
- Path aliases: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

## External Dependencies

### Database
- **PostgreSQL**: Configured via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema-first ORM with push migrations via `drizzle-kit`
- **Note**: Database is provisioned but currently unused; app reads from JSON file

### UI Framework
- **shadcn/ui**: Pre-built accessible components based on Radix UI
- **Tailwind CSS**: Utility-first CSS with custom theme configuration

### Key NPM Packages
- `@tanstack/react-query` - Server state management
- `framer-motion` - Animation library
- `wouter` - Lightweight routing
- `zod` - Runtime type validation
- `drizzle-orm` / `drizzle-zod` - Database ORM and schema integration

### Fonts
- Inter (sans-serif) - Body text
- Libre Baskerville (serif) - Available for headings
- Google Fonts CDN integration